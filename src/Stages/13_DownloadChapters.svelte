<script lang="ts">
  export let data: Immutable<Bookdata>;
  export let goNext: (data: Bookdata) => void;

  import ErrorMessage from '../Components/ErrorMessage.svelte';
  import Loading from '../Components/Loading.svelte';
  import { retryFetch } from '../fetch';
  import { getPostContent } from '../sources';

  let finishedChapters: Bookdata['chapters'];

  const fetchChapters = async () => {
    finishedChapters = new Array(data.chapters.length);

    // bunch up in 100s
    for (let i = 0; i < data.chapters.length; i += 100) {
      await Promise.all(data.chapters.slice(i, i + 100).map((chapter, index) => chapter.needsFetching !== false
        ? retryFetch(chapter.apiUrl)
          .then(res => res.json())
          .then((json: reddit.post) => {
            finishedChapters[index + i] = getPostContent(json);
            finishedChapters = finishedChapters; // tell svelte to update
          })
        : (finishedChapters[index + i] = { ...chapter }, undefined)
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

    p {
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