<script lang="ts">
  export let series: string;

  import download from 'downloadjs';
  import { decode,toApiCall } from '../util';
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
      const content = json.data.content_md as string;
      const d = ({
        author: content.match(/\[\*\*([^*\]]+)\*\*\]/)[1],
        title: content.match(/##\s*\*\*(.+)\*\*/)[1],
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

    try {
      // TODO: make these run in parallel, better support errors
      for (const chapter of data.chapters) {
        const res = await fetch(chapter.url);
        const json = await res.json();
        // TODO: support comments?
        const { selftext_html: html, title, url } = json[0].data.children[0].data;
        finishedChapters.push({ title, content: decode(html), url });
        finishedChapters = finishedChapters;
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
    <p>{data.title}</p>
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
      <p class="valid small">{chapter.title}</p>
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