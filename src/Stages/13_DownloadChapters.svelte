<script lang="ts">
  export let stage: DownloadChapters;
  
  import ChapterAlert from '../Components/ChapterAlert.svelte';
  import ErrorMessage from '../Components/ErrorMessage.svelte';
  import Loading from '../Components/Loading.svelte';
  import { config } from '../configstore';
  import { retryFetchChapter } from '../fetch';
  import { fetchStore } from '../fetchstore';
  import { getChapterDataFromSource, transformChapter } from '../sources';
  import type { DownloadChapters } from '../stages';
  import { bookDataStore, store } from '../stages';

  if (!$bookDataStore) throw new Error('Inconsistent state, expected to have book data');
  let finishedChapters: Bookdata['chapters'] & { new?: boolean }[] = [...$bookDataStore.chapters.map(c => ({ ...c, new: false }))];
  const batchSize = 10;
  let stop = false;

  let errors: any[] = [];
  const fetchChapters = async () => {
    let prev = finishedChapters;
    finishedChapters = new Array(finishedChapters.length);
    errors = [];
    let i: number;

    // bunch up several requests
    for (i = 0; i < prev.length && !stop; i += batchSize) {
      await Promise.all(prev.slice(i, i + batchSize).map(async (chapter, index) => {
        finishedChapters[index + i] = { ...prev[index + i] };
        if (chapter.needsFetching !== false) try {
          const json = await retryFetchChapter($fetchStore, $store.series, chapter.apiUrl);
          finishedChapters[index + i] = { ...transformChapter($config, getChapterDataFromSource($store.series.type, json, chapter.apiUrl)), new: true };
          finishedChapters = finishedChapters; // tell svelte to update
        } catch (err) {
          errors.push(err);
          errors = errors; // tell svelte to update
        }
        return undefined
      }));
    }
    for (; i < prev.length; i++) {
      finishedChapters[i] = { ...prev[i] };
    }

    return { ...$bookDataStore, chapters: finishedChapters };
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


<ChapterAlert hasReddit={!!$bookDataStore.chapters.find(x => x.apiUrl.indexOf('reddit.com') >= 0)} hasOther={!!$bookDataStore.chapters.find(x => x.apiUrl.indexOf('reddit.com') < 0)}/>

{#await fetchPromise}
  <Loading>Please wait, fetching chapters...</Loading>

  <button on:click|preventDefault="{() => stop = true}" disabled="{stop}">Cancel</button>

  <div class="chapters">
    {#each finishedChapters as chapter}
      {#if chapter && chapter.new === true}
        <p class="valid small">{chapter.title}</p>
      {/if}
    {/each}
  </div>

  {#if errors.length}
    {#key errors}
      <ErrorMessage error={errors} />
    {/key}
  {/if}
{:then finishedData}
  {#if !errors.length}{stage.next(finishedData)}{/if}

  <div class="chapters">
    {#each finishedChapters as chapter}
      {#if chapter && chapter.new === true}
        <p class="valid small">{chapter.title}</p>
      {/if}
    {/each}
  </div>

  {#if errors.length}
    {#key errors}
      <ErrorMessage error={errors} retry={() => fetchPromise = fetchChapters()} back="{() => stage.next({ ...$bookDataStore, chapters: finishedChapters })}" />
    {/key}
  {/if}
{/await}