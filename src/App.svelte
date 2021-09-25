<script lang="ts">
  import Footer from './Footer.svelte';
  import Header from './Header.svelte';
  import Input from './Stages/Input.svelte';
  import Result from './Stages/Result.svelte';
  import Search from './Stages/Search.svelte';

  enum Stage {
    INPUT,
    SEARCH,
    RESULT,
  };
  let stage = Stage.INPUT;

  let search: string;
  let series: string;
  const goNext = () => stage = Math.min(stage + 1, Stage.RESULT);
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
      <Input goNext={s => (search = s.trim(), goNext())} {search} />
    {:else if stage === Stage.SEARCH}
      <Search goNext={s => (series = s, goNext())} {search} />
    {:else if stage === Stage.RESULT}
      <Result {series} />
    {:else}
      {search}
      {series}
    {/if}

    {#if stage !== Stage.INPUT}
      <a href="#?" on:click|preventDefault="{() => stage = 0}" class="homelink">Go back home</a>
    {/if}
  </main>

  <Footer />
</div>