<script lang="ts">
  export let series: Immutable<Series>;
  export let bookData: Immutable<Bookdata> = undefined;
  export let newChapters: number = undefined;
  export let goNext: (data: Bookdata) => void;
  export let backToSearch: () => void;
  export let edit: (data: Bookdata) => void;
  export let findMore: (data: Bookdata) => void;
  export let downloadAll: (data: Bookdata) => void;
  
  import BackToSearch from '../Components/BackToSearch.svelte';
  import ErrorMessage from '../Components/ErrorMessage.svelte';
  import Loading from '../Components/Loading.svelte';
  import SeriesCard from '../Components/SeriesCard.svelte';
  import { fetchBookData } from '../sources';
  import { apiToRegular } from '../util';

  let showChapters = false;
  
  const fetchData = (): Promise<Bookdata> => bookData
    ? Promise.resolve({ ...bookData, chapters: bookData.chapters.map(c => ({ ...c })) })
    : fetchBookData(series);
  let fetchPromise = fetchData();
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
        <button on:click="{() => findMore(data)}">Find more</button>
        {#if typeof newChapters === "number"}
          Found {newChapters} new
        {/if}
      </p>

      {#if showChapters}
        <div class="chapter-list">
          {#each data.chapters as chapter}
            <a href="{apiToRegular(chapter.url)}" target="_blank" class="small">{chapter.title}</a>
          {/each}
        </div>
      {/if}
    </SeriesCard>
  </div>

  {#if data.chapters.find(c => c.needsFetching !== false)} <!-- if at least one needs to still be downloaded -->
    <button on:click="{() => downloadAll(data)}">Fetch chapter contents</button>
  {:else}
    <button on:click="{() => goNext(data)}">Generate EPUB</button>
  {/if}
  <button on:click="{() => edit(data)}">Edit book</button>
  
  <BackToSearch {backToSearch} />
{:catch error}
  <ErrorMessage {error} retry={() => fetchPromise = fetchData()} />
  <BackToSearch {backToSearch} />
{/await}