<script lang="ts">
  export let series: Series;
  export let goNext: (data: Bookdata) => void;
  export let backToSearch: () => void;
  
  import BackToSearch from '../BackToSearch.svelte';
  import ErrorMessage from '../ErrorMessage.svelte';
  import { retryFetch } from '../fetch';
  import Loading from '../Loading.svelte';
  import { getHFYSeriesPageData,Source } from '../sources';
  import { apiToRegular } from '../util';

  let showChapters = false;
  
  const fetchData = async () => {
    const res = await retryFetch(series.url);
    const json = await res.json();
    if (!res.ok) throw json.message;

    const data: Bookdata =
      series.type === Source.HFY_SERIES ? getHFYSeriesPageData(json)
      : undefined;

    if (!data || !data.chapters || !data.chapters.length)
      throw new Error('No chapters found');
    return data;
  };
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

    > :global(*) {
      margin: 0;
    }
  }

  .chapter-list {
    margin: 1em 18px 2em;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2px 10px;

    @include medium {
      grid-template-columns: 1fr 1fr;
    }

    @include mobile {
      grid-template-columns: 1fr;
      margin: 1em 8px 2em;
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
    <p>Found {data.chapters.length} <a href="#show" class="small" on:click|preventDefault="{() => showChapters = !showChapters}">show</a></p>
  </div>

  {#if showChapters}
    <div class="chapter-list">
      {#each data.chapters as chapter}
        <a href="{apiToRegular(chapter.url)}" target="_blank" class="small">{chapter.title}</a>
      {/each}
    </div>
  {/if}

  <button on:click="{() => goNext(data)}">Fetch chapters and generate EPUB</button>
  <BackToSearch {backToSearch} />
{:catch error}
  <ErrorMessage {error} retry={() => fetchPromise = fetchData()} />
  <BackToSearch {backToSearch} />
{/await}