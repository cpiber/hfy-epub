<script lang="ts">
  export let stage: Input;
  export let search: string | undefined = undefined;

  import { fade } from 'svelte/transition';
  import Radio from '../Components/Radio.svelte';
  import { getAllSeries } from '../sources/hfy';
  import { bookDataFromObject, type Input } from '../stages';
  import { apiToRegular } from '../util';

  enum Mode {
    Search = "search",
    List = "list",
    Import = "import",
  };

  let series: ReturnType<typeof getAllSeries>;
  let open = false;
  let list: string | undefined = undefined;
  let mode: Mode = Mode.Search;
  let file: File | undefined = undefined;
  let disabled = false;

  let placeholder = `https://example.com/chapter1
https://example.com/chapter2`;

  let formRef: HTMLElement;
  const onBlur = (e: FocusEvent) => open = !!formRef && formRef.contains(e.relatedTarget as HTMLElement);
  const searchSeries = async (series: ReturnType<typeof getAllSeries>, search: string) => {
    if (!series) return [];
    const all = await series;
    const searchSmall = search.toLowerCase();
    const filtered = all.filter(s => s.title.toLowerCase().indexOf(searchSmall) !== -1);
    if (!filtered.length) open = false;
    return filtered;
  };
  const update = () => {
    series = series || getAllSeries().finally(update);
    open = !!series && !!search;
  };
  const readUpload = async () => {
    if (!file) return;
    disabled = true;
    const reader = new FileReader();
    const promise = new Promise((resolve, reject) => {
      reader.onload = resolve;
      reader.onerror = reject;
    });
    reader.readAsText(file);
    await promise;
    disabled = false;
    const obj = JSON.parse(reader.result as string);
    obj.bookData = bookDataFromObject(obj.bookData);
    return obj;
  };
</script>

<style lang="postcss">
  @import '../variables';

  .form p {
    display: flex;
    gap: 6px;
    margin: 0;
  }

  .search, input[type="file"] {
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

  textarea {
    display: block;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  p.small {
    margin: 0;
  }

  :global .mode-select {
    input {
      opacity: 0;
      width: 1px;
      height: 1px;
      position: absolute;
      left: -10px;
      pointer-events: none;
    }

    label {
      display: inline-block !important;
      padding: 8px;
      border-bottom: 2px hidden black;
      cursor: pointer;

      &:hover {
        border-bottom-style: solid;
        border-bottom-color: rgba(10, 10, 10, 0.6);
      }

      &.selected {
        border-bottom-style: solid;
        border-bottom-color: black;
      }
    }
  }

  .mode {
    border: 0.5px solid rgba(20, 20, 20, 0.3);
    padding: 14px 8px;
  }
</style>

<Radio options="{[
  { value: Mode.Search, label: 'Search' },
  { value: Mode.List, label: 'URLs' },
  { value: Mode.Import, label: 'Import' },
]}" bind:selected="{mode}" name="mode" class="mode-select" />
<div class="mode">
  {#if mode == Mode.Search}
    <form class="form" on:submit|preventDefault="{() => stage.next(search || '')}" bind:this="{formRef}">
      <p>
        Search:
        <input
            bind:value="{search}" on:keyup="{update}" on:blur="{onBlur}" on:click="{update}"
            class="search" placeholder="Search or URL..."
            disabled={disabled}
        />
        <input type="submit" value="Go" class="submit" disabled={search === undefined || !search.trim().length || disabled} />
      </p>

      {#if open}
        {#await searchSeries(series, search ?? '') then all}
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
        <li>Enter a link to any reddit post, or other link (see <a href="https://github.com/cpiber/hfy-epub/blob/master/docs/other/cors.md" target="_blank">CORS</a>)</li>
      </ul>
    </div>
  {:else if mode == Mode.List}
    <form class="form" on:submit|preventDefault="{() => stage.fromList(list || '')}">
      <p>Enter list of URLs:</p>
      <textarea bind:value={list} rows="5" placeholder="{placeholder}" disabled={disabled}></textarea>
      <p class="small">One URL per line</p>
      <p><input type="submit" value="Go" class="submit" disabled={list === undefined || !list.trim().length || disabled} /></p>
    </form>
  {:else if mode == Mode.Import}
    <form class="form" on:submit|preventDefault="{async () => stage.fromJSON(await readUpload())}" enctype="multipart/form-data">
      <p>
        Import:
        <input
            id="upload" type="file" accept="application/json,*.json" name="files" size=30
            on:change="{(e) => file = e.currentTarget.files?.[0]}"
            disabled={disabled} />
        <input type="submit" value="Go" class="submit" disabled={file === undefined || disabled} />
      </p>
      <p class="small">Please only upload genuine backups, as there is no schema checking currently.</p>
    </form>
  {/if}
</div>