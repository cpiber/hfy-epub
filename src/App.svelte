<script lang="ts" context="module">
  import { config,loadConfig } from './configstore';
  import Footer from './Footer.svelte';
  import Header from './Header.svelte';
  import { getSourceType,Source } from './sources';
  import Input from './Stages/00_Input.svelte';
  import Search from './Stages/01_Search.svelte';
  import BookData from './Stages/10_BookData.svelte';
  import EditBook from './Stages/11_EditBook.svelte';
  import FindChapters from './Stages/12_FindChapters.svelte';
  import DownloadChapters from './Stages/13_DownloadChapters.svelte';
  import Result from './Stages/20_Result.svelte';
  import { toApiCall } from './util';

  loadConfig();
</script>

<script lang="ts">
  enum Stage {
    INPUT,
    SEARCH,

    BOOK_DATA,
    EDIT_DATA,
    FIND_CHAPTERS,
    DOWNLOAD_CHAPTERS,
    
    RESULT,
  };
  let stage = Stage.INPUT;

  let search: string;
  let series: Series;
  let wasSearch = false;
  let bookData: Bookdata;
  let newChapters: number;

  const handleInput = (s: string) => {
    const input = getSourceType(s);
    search = s;
    wasSearch = input === Source.SEARCH;
    if (input !== Source.SEARCH) series = { url: toApiCall(s), type: input };
    switch(input) {
      case Source.SEARCH:
        return stage = Stage.SEARCH;
      default:
        return stage = Stage.BOOK_DATA;
    }
  };
  const resetData = () => {
    bookData = undefined;
    newChapters = undefined;
  };

  let backToSearch: () => void;
  $: backToSearch = wasSearch ? () => stage = Stage.SEARCH : undefined;

  $: if (DEV) console.log({ stage: Stage[stage], search, series, wasSearch, bookData, newChapters });
  $: if (stage === Stage.INPUT || stage === Stage.SEARCH) resetData();

  $: localStorage.setItem('config', JSON.stringify($config));
</script>

<style lang="postcss">
  @import './variables';
  :global {
    @import './styles';
  }

  .App {
    padding: 14px 18px;
    border: 1px solid gray;
    border-top: none;
    border-bottom: none;

    @include mobile {
      padding: 10px;
    }
  }

  .homelink {
    display: inline-block;
    font-size: 0.8em;
    margin-top: 2em;
  }
</style>


<div class="App">
  <Header />

  <main class="App-main">
    {#if stage === Stage.INPUT}
      <Input goNext={handleInput} {search} />
    {:else if stage === Stage.SEARCH}
      <Search goNext={s => (series = s, stage = Stage.BOOK_DATA)} {search} />
    {:else if stage === Stage.BOOK_DATA}
      <BookData goNext={d => (bookData = d, stage = Stage.RESULT)} {series} {bookData} {newChapters} {backToSearch}
          edit={d => (bookData = d, stage = Stage.EDIT_DATA)}
          findMore={d => (bookData = d, stage = Stage.FIND_CHAPTERS)}
          downloadAll={d => (bookData = d, stage = Stage.DOWNLOAD_CHAPTERS)}
      />
    {:else if stage === Stage.EDIT_DATA}
      <EditBook goNext={d => (bookData = d, newChapters = undefined, stage = Stage.BOOK_DATA)} {bookData} />
    {:else if stage === Stage.FIND_CHAPTERS}
      <FindChapters goNext={(d, n) => (bookData = d, newChapters = n, stage = Stage.BOOK_DATA)} {bookData} />
    {:else if stage === Stage.DOWNLOAD_CHAPTERS}
      <DownloadChapters goNext={d => (bookData = d, newChapters = undefined, stage = Stage.BOOK_DATA)} data={bookData} />
    {:else if stage === Stage.RESULT}
      <Result data={bookData} {backToSearch} backToBook={() => stage = Stage.BOOK_DATA} />
    {/if}

    {#if stage !== Stage.INPUT}
      <div />
      <a href="#home" on:click|preventDefault="{() => stage = Stage.INPUT}" class="homelink">Go back home</a>
    {/if}
  </main>

  <Footer />
</div>