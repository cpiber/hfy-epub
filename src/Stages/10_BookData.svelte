<script lang="ts">
  export let series: Immutable<Series>;
  export let bookData: Immutable<Bookdata> = undefined;
  export let newChapters: number = undefined;
  export let goNext: (data: Bookdata) => void;
  export let backToSearch: () => void;
  export let findMore: (data: Bookdata) => void;
  
  import BackToSearch from '../BackToSearch.svelte';
  import ErrorMessage from '../ErrorMessage.svelte';
  import Loading from '../Loading.svelte';
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
      padding: 6px 8px;

      > :global(p):not(:last-child) {
        margin-bottom: 1em;
      }
    }

    > :global(*), .no-margin {
      margin: 0;
    }

    :global(button) {
      font-size: 1em;
    }

    .spacer {
      display: inline-block;
      width: 1.5em;
    }
  }

  .chapter-list {
    /* margin: 2em 18px 1em; */
    margin-top: 1em;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2px 10px;

    @include medium {
      grid-template-columns: 1fr 1fr;
    }

    @include mobile {
      grid-template-columns: 1fr;
      /* margin: 2em 8px 1em; */
    }
  }
</style>


{#await fetchPromise}
  <Loading>Please wait, fetching data...</Loading>
{:then data}
  Got the following series:

  <div class="series-card">
    <h3>Title</h3>
    <p><a href="{apiToRegular(series.url)}" target="_blank">{data.title}</a></p>
    <h3>Author</h3>
    <p>{data.author}</p>
    <h3>Chapters</h3>
    <div>
      <p class="no-margin">Found {data.chapters.length}
        <a href="#show" class="small" on:click|preventDefault="{() => showChapters = !showChapters}">show</a><span class="spacer" />
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
    </div>
  </div>

  <button on:click="{() => goNext(data)}">
    {#if data.chapters.find(c => c.needsFetching !== false)} <!-- if at least one needs to still be downloaded -->
      Fetch chapters and generate EPUB
    {:else}
      Generate EPUB
    {/if}
  </button>
  <BackToSearch {backToSearch} />
{:catch error}
  <ErrorMessage {error} retry={() => fetchPromise = fetchData()} />
  <BackToSearch {backToSearch} />
{/await}