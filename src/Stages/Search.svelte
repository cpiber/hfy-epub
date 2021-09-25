<script lang="ts">
  export let search: string;
  export let goNext: (series: string) => void;

  import { apiToRegular,toApiCall } from '../util';

  let series: string;

  enum Search {
    LOADING,
    OK,
    RESULTS,
    ERROR,
  };
  let ok = Search.LOADING;
  let error = '';
  let searchResults: { title: string, author?: string, url: string }[] = [];

  try {
    if (!search.match(/^https?:\/\/(?:[^.]+\.)?reddit\.com\/r\/hfy\/wiki\/series\//i))
      throw new Error();
    series = toApiCall(new URL(search));
    goNext(series);
  } catch {
    const searchSmall = search.toLowerCase();
    fetch(`https://api.reddit.com/r/hfy/wiki/series.json`).then(res => res.json()).then(json => json.data.content_md as string).then(content =>
      [...content.matchAll(/\[([^\]]+)\]\s*\(((?:https?:\/\/(?:[^.]+\.)?reddit\.com)?\/r\/hfy\/wiki\/series\/[^)]+)\)\s*(?:\[\*([^\]]+)\*\])?/igm)].map(matches => ({
        title: matches[1],
        author: matches[3],
        url: toApiCall(new URL(matches[2].startsWith('http') ? matches[2] : `https://api.reddit.com${matches[2]}`)),
      }))
    ).then(allseries => searchResults = allseries.filter(s => s.title.toLowerCase().indexOf(searchSmall) !== -1)).then(results => {
      ok = results.length ? Search.RESULTS : Search.ERROR;
      error = `No series matched input \`${search}\``;
    }).catch(reason => {
      ok = Search.ERROR;
      error = `${reason.message || reason}`;
    });
  }
</script>

<style lang="postcss">
  @import '../loading';
</style>


{#if ok === Search.LOADING}
  <div class="loading-container">
    <div class="loading-slider-container"><span class="loading-slider">•</span></div>
    <p class="loading">Please wait, fetching results...</p>
  </div>
{:else if ok === Search.ERROR}
  <p class="error">Sorry, can't process that{error ? ': ' : ''}{error}</p>
{:else if ok === Search.OK}
  <p class="valid">That's a valid series url, <a href="#?" on:click|preventDefault="{() => goNext(series)}">go on ahead</a></p>
{:else if ok === Search.RESULTS}
  <p>The search for '{search}' returned these results:</p>
  <ul>
    {#each searchResults as result}
      <li>
        <a href="{apiToRegular(result.url)}" on:click|preventDefault="{() => goNext(result.url)}">{result.title}</a>
        {#if result.author}
          [<i>{result.author}</i>]
        {/if}
      </li>
    {/each}
  </ul>
  <p class="small">Please select one.</p>
{/if}