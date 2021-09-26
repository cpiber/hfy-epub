<script lang="ts">
  import Footer from './Footer.svelte';
  import Header from './Header.svelte';
  import { getSourceType,Source } from './sources';
  import BookData from './Stages/BookData.svelte';
  import Chapters from './Stages/Chapters.svelte';
  import Input from './Stages/Input.svelte';
  import Result from './Stages/Result.svelte';
  import Search from './Stages/Search.svelte';
  import { toApiCall } from './util';

  enum Stage {
    INPUT,
    SEARCH,
    BOOK_DATA,
    CHAPTERS,
    RESULT,
  };
  let stage = Stage.INPUT;

  let search: string;
  let series: Series;
  let wasSearch = false;
  let bookData: Bookdata;
  let finishedData: FinishedBookdata;

  const handleInput = (s: string) => {
    const input = getSourceType(s);
    search = s;
    wasSearch = input === Source.SEARCH;
    switch(input) {
      case Source.SEARCH:
        return stage = Stage.SEARCH;
      default:
        series = { url: toApiCall(new URL(s)), type: input };
        return stage = Stage.BOOK_DATA;
    }
  };

  let backToSearch: () => void;
  $: backToSearch = wasSearch ? () => stage = Stage.SEARCH : undefined;

  $: if (DEV) console.log({ stage, search, series, wasSearch, bookData });
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
      <BookData goNext={d => (bookData = d, stage = Stage.CHAPTERS)} {series} {backToSearch} />
    {:else if stage === Stage.CHAPTERS}
      <Chapters goNext={d => (finishedData = d, stage = Stage.RESULT)} data={bookData} />
    {:else if stage === Stage.RESULT}
      <Result data={finishedData} {backToSearch} />
    {/if}

    {#if stage !== Stage.INPUT}
      <a href="#?" on:click|preventDefault="{() => stage = Stage.INPUT}" class="homelink">Go back home</a>
    {/if}
  </main>

  <Footer />
</div>