<script lang="ts">
  export let data: Bookdata;
  export let goNext: (data: FinishedBookdata) => void;

  import ErrorMessage from '../ErrorMessage.svelte';
  import { retryFetch } from '../fetch';
  import Loading from '../Loading.svelte';
  import { decode } from '../util';

  let finishedChapters: Required<Chapter>[];

  const fetchChapters = async () => {
    finishedChapters = new Array(data.chapters.length);

    // bunch up in 100s
    for (let i = 0; i < data.chapters.length; i += 100) {
      await Promise.all(data.chapters.slice(i, i + 100).map((chapter, index) =>
        retryFetch(chapter.url)
          .then(res => res.json())
          .then((json: reddit.post) => {
            const { selftext_html: html, title, url } = json[0].data.children[0].data;
            finishedChapters[index + i] = { title: decode(title), content: decode(html), url };
            finishedChapters = finishedChapters; // tell svelte to update
          })
      ));
    }

    return { ...data, chapters: finishedChapters };
  };
  let fetchPromise = fetchChapters();
</script>

<style lang="postcss">
  @import '../loading';
  @include valid;

  .chapters {
    margin: 1em 0;

    :global(p) {
      margin: 0;
    }
  }
</style>


{#await fetchPromise}
  <Loading>Please wait, fetching chapters...</Loading>

  <div class="chapters">
    {#each finishedChapters as chapter}
      {#if chapter}
        <p class="valid small">{chapter.title}</p>
      {/if}
    {/each}
  </div>
{:then finishedData}
  {goNext(finishedData)}
{:catch error}
  <ErrorMessage {error} retry={() => fetchPromise = fetchChapters()} />
{/await}