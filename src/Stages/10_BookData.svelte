<script lang="ts">
  export let stage: BookData;
  export let series: Immutable<Series>;
  export let backToSearch: () => void;
  
  import download from 'downloadjs';
  import BackToSearch from '../Components/BackToSearch.svelte';
  import ErrorMessage from '../Components/ErrorMessage.svelte';
  import Loading from '../Components/Loading.svelte';
  import SeriesCard from '../Components/SeriesCard.svelte';
  import { config } from '../configstore';
  import { fetchBookData, transformChapters } from '../sources';
  import type { BookData } from '../stages';
  import { bookDataStore, store } from '../stages';
  import { decode, fold } from '../util';

  let showChapters = false;
  
  const fetchData = (): Promise<Bookdata> => $bookDataStore
    ? Promise.resolve($bookDataStore)
    : fetchBookData(series).then(data => {
      const bookData = { ...data, chapters: transformChapters($config, data.chapters) };
      bookDataStore.update(() => bookData);
      return bookData;
    });
  let fetchPromise = fetchData();

  const exportBook = () => {
    if (!$bookDataStore) throw new Error('Inconsistent state, expected to have book data');
    const json = JSON.stringify({ bookData: $bookDataStore, series: $store.series });
    download(new Blob([json]), `${decode($bookDataStore.author)} - ${decode($bookDataStore.title)}.json`, 'application/json');
  };
</script>

<style lang="postcss">
  @import '../variables';

  .list {
    margin: 1em 0;
  }

  .spacer {
    display: inline-block;
    width: 1.5em;
  }

  .no-margin {
    margin: 0;
  }

  .chapter-list {
    margin-top: .5em;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2px 10px;

    @include medium {
      grid-template-columns: 1fr 1fr;
    }

    @include mobile {
      grid-template-columns: 1fr;
    }
  }
</style>


{#await fetchPromise}
  <Loading>Please wait, fetching data...</Loading>
{:then data}
  Got the following series:

  <div class="list">
    <SeriesCard title={data.title} author={data.author} url={series.url}>
      <p class="no-margin">Found {data.chapters.length}
        <a href="#show" class="small" on:click|preventDefault="{() => showChapters = !showChapters}">{#if !showChapters}show{:else}hide{/if}</a>
        <span class="spacer" />
        <button on:click="{() => stage.findMore()}">Find more</button>
        {#if typeof stage.newChapters === "number"}
          <a on:click|preventDefault="{() => stage.newChapters = undefined}" href="#?">Found {stage.newChapters} new</a>
        {/if}
      </p>

      {#if showChapters}
        <div class="chapter-list" transition:fold>
          {#each data.chapters as chapter (chapter.id)}
            <a href="{chapter.displayUrl}" target="_blank" class="small">{decode(chapter.title)}</a>
          {/each}
        </div>
      {/if}
    </SeriesCard>
  </div>

  {#if data.chapters.find(c => c.needsFetching !== false && c.apiUrl)} <!-- if at least one needs to still be downloaded -->
    <button on:click="{() => stage.downloadAll()}">Fetch chapter contents</button>
  {:else}
    <button on:click="{() => stage.next()}">Generate EPUB</button>
  {/if}
  <button on:click="{() => stage.edit()}">Edit book</button>
  <button on:click="{() => exportBook()}">Export</button>
  
  <BackToSearch {backToSearch} />
{:catch error}
  <ErrorMessage {error} retry={() => fetchPromise = fetchData()} />
  <BackToSearch {backToSearch} />
{/await}