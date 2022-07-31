<script lang="ts">
  export let stage: DownloadChapters;

  import ErrorMessage from '../Components/ErrorMessage.svelte';
  import Loading from '../Components/Loading.svelte';
  import { config } from '../configstore';
  import { retryFetch } from '../fetch';
  import { getPostContent,transformChapter } from '../sources';
  import type { DownloadChapters } from '../stages';

  let finishedChapters: Bookdata['chapters'] & { new?: boolean }[] = [...stage.bookData.chapters.map(c => ({ ...c, new: false }))];
  const batchSize = 100;

  const fetchChapters = async () => {
    let prev = finishedChapters;
    finishedChapters = new Array(finishedChapters.length);

    // bunch up in 100s
    for (let i = 0; i < prev.length; i += batchSize) {
      await Promise.all(prev.slice(i, i + batchSize).map((chapter, index) => {
        finishedChapters[index + i] = { ...prev[index + i] };
        if (chapter.needsFetching !== false) return retryFetch(chapter.apiUrl)
          .then(res => res.json())
          .then((json: reddit.post) => {
            finishedChapters[index + i] = { ...transformChapter($config, getPostContent(json)), new: true };
            finishedChapters = finishedChapters; // tell svelte to update
          })
        return undefined
      }));
    }

    return { ...stage.bookData, chapters: finishedChapters };
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
      {#if chapter && chapter.new === true}
        <p class="valid small">{chapter.title}</p>
      {/if}
    {/each}
  </div>
{:then finishedData}
  {stage.next(finishedData)}
{:catch error}
  <p>Error fetching chapters:</p>

  <div class="chapters">
    {#each finishedChapters as chapter}
      {#if chapter.new === true}
        <p class="valid small">{chapter.title}</p>
      {/if}
    {/each}
  </div>

  <ErrorMessage {error} retry={() => fetchPromise = fetchChapters()} back="{() => stage.next({ ...stage.bookData, chapters: finishedChapters })}" />
{/await}