<script lang="ts" context="module">
  import { config,loadConfig } from './configstore';
  import Footer from './Footer.svelte';
  import Header from './Header.svelte';
  import BackArrow from './icons/back-arrow.svg';
  import { getSourceType,Source } from './sources';
  import * as Stages from './stages';
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
  let stage: Stages.StageData = new Stages.Input();

  let search: string;
  let series: Series;

  const handleInput = (s: string) => {
    const input = getSourceType(s);
    search = s;
    if (input !== Source.SEARCH) series = { url: toApiCall(s), type: input };
    switch(input) {
      case Source.SEARCH:
        return stage = Stages.next(stage, Stages.Search);
      default:
        return stage = Stages.next(stage, Stages.BookData);
    }
  };
  const handleSearch = (s: Series) => {
    series = s;
    stage = Stages.next(stage, Stages.BookData);
  }

  let backToSearch: () => void;
  $: backToSearch = Stages.is(stage.from, Stages.Stage.SEARCH) ? () => stage = Stages.next(stage, Stages.Search) : undefined;

  $: if (DEV) console.table({ from: stage.from, is: stage });
  $: if (DEV) (window as any)._data = { stage, search, series };

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

  .mainnav {
    position: absolute;
    top: -0.2em;
    font-size: 0.8rem;

    :global svg {
      height: 0.65em;
    }

    a {
      text-decoration: none;
      color: inherit;

      @include hover {
        text-decoration: underline;
      }
    }
  }
</style>


<div class="App">
  {#if !Stages.is(stage, Stages.Stage.INPUT)}
    <nav class="mainnav">
      <a href="#home" on:click|preventDefault="{() => stage = Stages.next(stage, Stages.Input)}" class="homelink"><BackArrow /> home</a>
    </nav>
  {/if}
  <Header />

  <main class="App-main">
    {#if Stages.is(stage, Stages.Stage.INPUT)}
      <Input goNext={handleInput} {search} />
    {:else if Stages.is(stage, Stages.Stage.SEARCH)}
      <Search goNext={handleSearch} {search} />
    {:else if Stages.is(stage, Stages.Stage.BOOK_DATA)}
      <BookData goNext={d => Stages.next(stage, Stages.Result, d)} {series} {...stage} {backToSearch}
          edit={d => stage = Stages.next(stage, Stages.EditData, d)}
          findMore={d => stage = Stages.next(stage, Stages.FindChapters, d)}
          downloadAll={d => stage = Stages.next(stage, Stages.DownloadChapters, d)}
      />
    {:else if Stages.is(stage, Stages.Stage.EDIT_DATA)}
      <EditBook goNext={d => stage = Stages.next(stage, Stages.BookData, d)} bookData={stage.bookData} />
    {:else if Stages.is(stage, Stages.Stage.FIND_CHAPTERS)}
      <FindChapters goNext={(d, n) => stage = Stages.next(stage, Stages.BookData, d, n)} bookData={stage.bookData} />
    {:else if Stages.is(stage, Stages.Stage.DOWNLOAD_CHAPTERS)}
      <DownloadChapters goNext={d => stage = Stages.next(stage, Stages.BookData, d)} data={stage.bookData} />
    {:else if Stages.is(stage, Stages.Stage.RESULT)}
      <Result data={stage.bookData} {backToSearch} backToBook={() => stage = Stages.next(stage, Stages.BookData)} />
    {/if}
  </main>

  <Footer />
</div>