<script lang="ts" context="module">
  import { config,loadConfig } from './configstore';
  import Footer from './Footer.svelte';
  import Header from './Header.svelte';
  import BackArrow from './icons/back-arrow.svg';
  import Gear from './icons/gear.svg';
  import * as Stages from './stages';
  import { store } from './stages';
  import Input from './Stages/00_Input.svelte';
  import Search from './Stages/01_Search.svelte';
  import BookData from './Stages/10_BookData.svelte';
  import EditBook from './Stages/11_EditBook.svelte';
  import FindChapters from './Stages/12_FindChapters.svelte';
  import DownloadChapters from './Stages/13_DownloadChapters.svelte';
  import Result from './Stages/20_Result.svelte';
  import Settings from './Stages/Settings.svelte';

  loadConfig();
  Stages.loadFromHistory();
</script>

<script lang="ts">
  $: stage = $store.stage;
  $: backToSearch = Stages.is(stage.from, Stages.Stage.SEARCH) ? () => Stages.next(Stages.Search) : undefined;

  const openSettings = () => {
    if (!stage.needsSaving || confirm("Unsaved changes. Continue?")) Stages.next(Stages.Settings);
  };

  $: if (DEV) console.table({ is: stage, from: stage.from });
  $: if (DEV) (window as any)._data = { ...$store, store };
  $: if (DEV) (window as any)._config = { ...$config, config };

  $: localStorage.setItem('config', JSON.stringify($config));
  $: localStorage.setItem('state', JSON.stringify({ data: $store.stage.dump(), search: $store.search, series: $store.series }));
</script>

<style lang="postcss">
  @import './variables';
  :global {
    @import './styles';
  }

  $lr: 18px;
  .App {
    position: relative;
    padding: 14px $lr;
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
    left: $lr; right: $lr;
    font-size: 0.8rem;
    display: flex;

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

    .settingslink {
      margin-left: auto;

      :global svg {
        height: 1.2em;
      }
    }
  }
</style>


<div class="App">
  <nav class="mainnav">
    {#if !Stages.is(stage, Stages.Stage.INPUT) && !Stages.is(stage, Stages.Stage.SETTINGS)}
      <a href="#home" on:click|preventDefault="{() => Stages.next(Stages.Input)}" class="homelink"><BackArrow /> home</a>
    {/if}
    {#if Stages.is(stage, Stages.Stage.SETTINGS)}
      <a href="#home" on:click|preventDefault="{() => stage.next()}" class="homelink"><BackArrow /> back</a>
    {:else}
      <a href="#settings" on:click|preventDefault="{openSettings}" class="settingslink"><Gear /></a>
    {/if}
  </nav>
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
    {:else if Stages.is(stage, Stages.Stage.SETTINGS)}
      <Settings />
    {:else if Stages.is(stage, Stages.Stage._404)}
      <h2>Page not found</h2>
      <p>Sorry, the requested page could not be found</p>
    {/if}
  </main>

  <Footer />
</div>