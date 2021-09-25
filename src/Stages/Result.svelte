<script lang="ts">
  export let backToSearch: () => void;
  export let series: string;

  import download from 'downloadjs';
  import { retryFetch } from '../fetch';
  import { apiToRegular,decode,toApiCall } from '../util';
  const epubPromise = import(/* webpackPrefetch: true */ 'epub-gen-memory');


  enum Result {
    LOADING,
    PRESENT,
    FETCHING,
    GENERATING,
    DOWNLOAD,
    ERROR,
  };
  let stage = Result.LOADING;
  let data: {
    author: string,
    title: string,
    chapters: { title: string, url: string }[],
  };
  let error: string;

  let finishedChapters: { title: string, content: string, url: string }[] = [];
  let book: Buffer;

  const fetchData = async () => {
    stage = Result.LOADING;

    try {
      const res = await fetch(series);
      const json = await res.json();
      if (!res.ok) throw json.message;

      const content = json.data.content_md as string;
      const d = ({
        author: content.match(/\[\*\*([^*\]]+)\*\*\]|A Story By \[(?:\*\*)?([^\]]+?)(?:\*\*)?\]/i).slice(1).find(Boolean),
        title: content.match(/##?\s*\*\*(.+)\*\*/)?.[1],
        chapters: [...content.matchAll(/\[([^\]]+)\]\s*\(((?:https?:\/\/(?:[^.]+\.)?reddit\.com)?\/r\/hfy\/comments\/[^)]+)\)/igm)].map(matches => ({
          title: matches[1],
          url: toApiCall(new URL(matches[2].startsWith('http') ? matches[2] : `https://api.reddit.com${matches[2]}`)),
        }))
      });

      data = d;
      stage = d.chapters.length ? Result.PRESENT : Result.ERROR;
      error = 'No chapters found';
    } catch (err) {
      stage = Result.ERROR;
      error = `${err.message || err}`;
    }
  };

  const fetchChapters = async () => {
    stage = Result.FETCHING;
    finishedChapters = new Array(data.chapters.length);

    try {
      // bunch up in 100s
      for (let i = 0; i < data.chapters.length; i += 100) {
        await Promise.all(data.chapters.slice(i, i + 100).map((chapter, index) =>
          retryFetch(chapter.url)
            .then(res => res.json())
            .then(json => {
              const { selftext_html: html, title, url } = json[0].data.children[0].data;
              finishedChapters.splice(index + i, 1, { title, content: decode(html), url });
              finishedChapters = finishedChapters;
            })
        ));
      }
    } catch (err) {
      stage = Result.ERROR;
      error = `${err.message || err}`;
    }

    generate();
  };

  const generate = async () => {
    stage = Result.GENERATING;

    const { default: epub } = await epubPromise;
    book = await epub({
      title: data.title,
      author: data.author,
      verbose: true,
    }, finishedChapters);

    stage = Result.DOWNLOAD;
  };

  fetchData();
</script>

<style lang="postcss">
  @import '../loading';

  .series-card {
    margin: 1em 0;
    padding: 10px 18px;
    border: 1px dashed lightgray;
    border-radius: 8px;
    display: grid;
    grid-template-columns: 100px auto;
    gap: 10px;
    align-items: baseline;

    @include mobile {
      grid-template-columns: 100%;

      > :global(p):not(:last-child) {
        margin-bottom: 1em;
      }
    }

    > :global(*) {
      margin: 0;
    }
  }

  .chapters {
    margin: 1em 0;

    :global(p) {
      margin: 0;
    }
  }
</style>

{#if stage === Result.LOADING}
  <div class="loading-container">
    <div class="loading-slider-container"><span class="loading-slider">•</span></div>
    <p class="loading">Please wait, fetching data...</p>
  </div>
{:else if stage === Result.PRESENT}
  Got the following series:

  <div class="series-card">
    <h3>Title</h3>
    <p><a href="{apiToRegular(series)}" target="_blank">{data.title}</a></p>
    <h3>Author</h3>
    <p>{data.author}</p>
    <h3>Chapters</h3>
    <p>Found {data.chapters.length}</p>
  </div>

  <button on:click="{fetchChapters}">Fetch chapters and generate EPUB</button>
{:else if stage === Result.FETCHING}
  <div class="loading-container">
    <div class="loading-slider-container"><span class="loading-slider">•</span></div>
    <p class="loading">Please wait, fetching chapters...</p>
  </div>

  <div class="chapters">
    {#each finishedChapters as chapter}
      {#if chapter}
        <p class="valid small">{chapter.title}</p>
      {/if}
    {/each}
  </div>
{:else if stage === Result.GENERATING}
  <div class="loading-container">
    <div class="loading-slider-container"><span class="loading-slider">•</span></div>
    <p class="loading">Please wait, generating ebook...</p>
  </div>
{:else if stage === Result.DOWNLOAD}
  <h3 class="valid">Your ebook is ready!</h3>
  <button on:click="{() => download(book, `${data.title}.epub`, 'application/epub+zip')}">Download</button>
{:else if stage === Result.ERROR}
  <p class="error">Sorry, there was an error{error ? ': ' : ''}{error}</p>
  <button on:click="{fetchData}">Retry</button>
{/if}

{#if backToSearch && stage !== Result.LOADING && stage !== Result.FETCHING}
  <a href="#?" on:click|preventDefault="{backToSearch}" class="small">Back to Search</a>
{/if}