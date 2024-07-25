<script lang="ts">
  export let stage: DownloadChapters;

  import ErrorMessage from '../Components/ErrorMessage.svelte';
  import Loading from '../Components/Loading.svelte';
  import { config } from '../configstore';
  import { retryFetch } from '../fetch';
  import { getChapterDataFromSource, requestToResource, transformChapter } from '../sources';
  import type { DownloadChapters } from '../stages';
  import { store } from '../stages';

  let finishedChapters: Bookdata['chapters'] & { new?: boolean }[] = [...stage.bookData.chapters.map(c => ({ ...c, new: false }))];
  const batchSize = 10;
  let stop = false;

  let errors: any[] = [];
  const fetchChapters = async () => {
    let prev = finishedChapters;
    finishedChapters = new Array(finishedChapters.length);
    errors = [];

    // bunch up several requests
    for (let i = 0; i < prev.length && !stop; i += batchSize) {
      await Promise.all(prev.slice(i, i + batchSize).map(async (chapter, index) => {
        finishedChapters[index + i] = { ...prev[index + i] };
        if (chapter.needsFetching !== false) try {
          const res = await retryFetch(chapter.apiUrl, new URL($store.series.url).origin);
          const json = await requestToResource($store.series, res);
          if (!res.ok) throw '' + (json.message ?? res.statusText ?? res.status);
          finishedChapters[index + i] = { ...transformChapter($config, getChapterDataFromSource($store.series.type, json, chapter.apiUrl)), new: true };
          finishedChapters = finishedChapters; // tell svelte to update
        } catch (err) {
          errors.push(err);
          errors = errors; // tell svelte to update
        }
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

  <button on:click|preventDefault="{() => stop = true}" disabled="{stop}">Cancel</button>
{:then finishedData}
  {#if !errors.length}{stage.next(finishedData)}{/if}
{/await}

<div class="chapters">
  {#each finishedChapters as chapter}
    {#if chapter && chapter.new === true}
      <p class="valid small">{chapter.title}</p>
    {/if}
  {/each}
</div>

{#if errors.length}
  {#key errors}
    <ErrorMessage error={errors} retry={() => fetchPromise = fetchChapters()} back="{() => stage.next({ ...stage.bookData, chapters: finishedChapters })}" />
  {/key}
{/if}