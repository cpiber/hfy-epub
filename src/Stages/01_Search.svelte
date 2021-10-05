<script lang="ts">
  export let search: string;
  export let goNext: (series: Series) => void;

  import ErrorMessage from '../ErrorMessage.svelte';
  import { retryFetch } from '../fetch';
  import Loading from '../Loading.svelte';
  import { Source } from '../sources';
  import { apiToRegular,toApiCall } from '../util';

  const searchSmall = search.toLowerCase();

  const fetchSearch = () => retryFetch(`https://api.reddit.com/r/hfy/wiki/series.json`)
    .then(res => res.json())
    .then((json: reddit.wikipage) => json.data.content_md)
    .then(content =>
      [...content.matchAll(/\[([^\]]+)\]\s*\(((?:https?:\/\/(?:[^.]+\.)?reddit\.com)?\/r\/hfy\/wiki\/series\/[^)]+)\)\s*(?:\[\*([^\]]+)\*\])?/igm)].map(matches => ({
        title: matches[1],
        author: matches[3],
        url: toApiCall(matches[2].startsWith('http') ? matches[2] : `https://api.reddit.com${matches[2]}`),
      }))
    ).then(allseries => allseries.filter(s => s.title.toLowerCase().indexOf(searchSmall) !== -1)).then(results => {
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