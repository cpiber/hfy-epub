<script lang="ts">
  import Footer from './Footer.svelte';
  import Header from './Header.svelte';
  import { getSourceType,Source } from './sources';
  import Input from './Stages/00_Input.svelte';
  import Search from './Stages/01_Search.svelte';
  import BookData from './Stages/10_BookData.svelte';
  import FindChapters from './Stages/11_FindChapters.svelte';
  import DownloadChapters from './Stages/12_DownloadChapters.svelte';
  import Result from './Stages/20_Result.svelte';
  import { toApiCall } from './util';

  enum Stage {
    INPUT,
    SEARCH,

    BOOK_DATA,
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
    if (input !== Source.SEARCH) series = { url: toApiCall(new URL(s)), type: input };
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
    display: block;
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
          findMore={d => (bookData = d, stage = Stage.FIND_CHAPTERS)} downloadAll={d => (bookData = d, stage = Stage.DOWNLOAD_CHAPTERS)} />
    {:else if stage === Stage.FIND_CHAPTERS}
      <FindChapters goNext={(d, n) => (bookData = d, newChapters = n, stage = Stage.BOOK_DATA)} {bookData} />
    {:else if stage === Stage.DOWNLOAD_CHAPTERS}
      <DownloadChapters goNext={d => (bookData = d, newChapters = undefined, stage = Stage.BOOK_DATA)} data={bookData} />
    {:else if stage === Stage.RESULT}
      <Result data={bookData} {backToSearch} />
    {/if}

    {#if stage !== Stage.INPUT}
      <a href="#?" on:click|preventDefault="{() => stage = Stage.INPUT}" class="homelink">Go back home</a>
    {/if}
  </main>

  <Footer />
</div>