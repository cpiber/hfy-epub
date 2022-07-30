<script lang="ts" context="module">
  import { config,loadConfig } from './configstore';
  import Footer from './Footer.svelte';
  import Header from './Header.svelte';
  import BackArrow from './icons/back-arrow.svg';
  import * as Stages from './stages';
  import { store } from './stages';
  import Input from './Stages/00_Input.svelte';
  import Search from './Stages/01_Search.svelte';
  import BookData from './Stages/10_BookData.svelte';
  import EditBook from './Stages/11_EditBook.svelte';
  import FindChapters from './Stages/12_FindChapters.svelte';
  import DownloadChapters from './Stages/13_DownloadChapters.svelte';
  import Result from './Stages/20_Result.svelte';

  loadConfig();
</script>

<script lang="ts">
  $: stage = $store.stage;

  let backToSearch: () => void;
  $: backToSearch = Stages.is(stage.from, Stages.Stage.SEARCH) ? () => Stages.next(stage, Stages.Search) : undefined;

  $: if (DEV) console.table({ from: stage.from, is: stage });
  $: if (DEV) (window as any)._data = { ...$store, store };

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
      <a href="#home" on:click|preventDefault="{() => Stages.next(stage, Stages.Input)}" class="homelink"><BackArrow /> home</a>
    </nav>
  {/if}
  <Header />

  <main class="App-main">
    {#if Stages.is(stage, Stages.Stage.INPUT)}
      <Input {stage} search={$store.search} />
    {:else if Stages.is(stage, Stages.Stage.SEARCH)}
      <Search {stage} search={$store.search} />
    {:else if Stages.is(stage, Stages.Stage.BOOK_DATA)}
      <BookData {stage} series={$store.series} {backToSearch} />
    {:else if Stages.is(stage, Stages.Stage.EDIT_DATA)}
      <EditBook {stage} />
    {:else if Stages.is(stage, Stages.Stage.FIND_CHAPTERS)}
      <FindChapters {stage} />
    {:else if Stages.is(stage, Stages.Stage.DOWNLOAD_CHAPTERS)}
      <DownloadChapters {stage} />
    {:else if Stages.is(stage, Stages.Stage.RESULT)}
      <Result {stage} {backToSearch} />
    {/if}
  </main>

  <Footer />
</div>