<script lang="ts">
  export let search: string;
  export let goNext: (series: Series) => void;

  import ErrorMessage from '../Components/ErrorMessage.svelte';
  import Loading from '../Components/Loading.svelte';
  import { Source } from '../sources';
  import { getAllSeries } from '../sources/hfy';
  import { apiToRegular } from '../util';

  const fetchSearch = () => getAllSeries(search).then(results => {
      if (!results.length)
        throw new Error(`No series matched input \`${search}\``);
      return results;
    });
  let fetchPromise = fetchSearch();
</script>


{#await fetchPromise}
  <Loading>Please wait, fetching results...</Loading>
{:then searchResults}
  <p>The search for '{search}' returned these results:</p>
  <ul>
    {#each searchResults as result}
      <li>
        <a href="{apiToRegular(result.url)}" on:click|preventDefault="{() => goNext({ url: result.url, type: Source.HFY_SERIES })}">{result.title}</a>
        {#if result.author}
          [<i>{result.author}</i>]
        {/if}
      </li>
    {/each}
  </ul>
  <p class="small">Please select one.</p>
{:catch error}
  <ErrorMessage {error} retry={() => fetchPromise = fetchSearch()} />
{/await}