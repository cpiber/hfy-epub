<script lang="ts">
  export let stage: Input;
  export let search: string = undefined;

  import { fade } from 'svelte/transition';
  import { getAllSeries } from '../sources/hfy';
  import type { Input } from '../stages';
  import { apiToRegular } from '../util';

  let series: ReturnType<typeof getAllSeries>;
  let open = false;

  let formRef: HTMLElement;
  const onBlur = (e: FocusEvent) => open = !!formRef && formRef.contains(e.relatedTarget as HTMLElement);
  const searchSeries = async (series: ReturnType<typeof getAllSeries>, search: string) => {
    if (!series) return [];
    const all = await series;
    const searchSmall = search.toLowerCase();
    const filtered = all.filter(s => s.title.toLowerCase().indexOf(searchSmall) !== -1);
    if (!filtered.length) open = false;
    return filtered;
  }
  const update = () => {
    series = series || getAllSeries().finally(update);
    open = !!series && !!search;
  }
</script>

<style lang="postcss">
  @import '../variables';

  .form p {
    display: flex;
    gap: 6px;
  }

  .search {
    width: 100%;
    box-sizing: border-box;
  }

  .submit {
    min-width: 60px;
    flex-shrink: 0;
  }

  .error {
    color: $error;
  }

  .spaceabove {
    margin-top: 2em;
  }

  form {
    position: relative;
  }

  .search-results {
    position: absolute;
    left: 0; right: 0;
    background-color: white;
    border: 1px solid black;
    border-radius: 3px;
    padding: 4px 8px;
    margin-top: -0.5em;
    z-index: 1;
    max-height: 15em;
    overflow: auto;
    
    .result {
      display: block;
      text-decoration: none;
      color: inherit;
      border-bottom: 1px dotted transparent;

      @include hover {
        border-bottom-color: gray;
      }
    }
  }

  .overlay {
    content: '';
    position: absolute;
    background-color: white;
    opacity: 0.6;
    left: 0; right: 0; top: 0; bottom: 0;

    &-wrapper {
      position: relative;
    }
  }
</style>

<form class="form" on:submit|preventDefault="{() => stage.next(search || '')}" bind:this="{formRef}">
  <p>
    Search:
    <input
        bind:value="{search}" on:keyup="{update}" on:blur="{onBlur}" on:click="{update}"
        class="search" placeholder="Search or URL..."
    />
    <input type="submit" value="Go" class="submit" disabled={search === undefined || !search.trim().length} />
  </p>

  {#if open}
    {#await searchSeries(series, search) then all}
      <div class="search-results">
        {#each all as series}
          <a class="result" href="{apiToRegular(series.url)}" on:click|preventDefault="{() => stage.next(series.url)}">{series.title}</a>
        {/each}
      </div>
    {/await}
  {/if}
</form>
{#if search !== undefined && !search.trim().length}
  <p class="small error">Please enter a search string</p>
{/if}


<div class="overlay-wrapper">
  {#if open}<div transition:fade={{ duration: 100 }} class="overlay"></div>{/if}
  <p class="spaceabove">You can:</p>
  <ul>
    <li>Search for a series title on the <a href="https://reddit.com/r/HFY/wiki/series" target="_blank">r/HFY wiki</a></li>
    <li>Enter a series link to the <a href="https://reddit.com/r/HFY" target="_blank">r/HFY</a> wiki</li>
    <li>Enter a link to any reddit post</li>
  </ul>
</div>