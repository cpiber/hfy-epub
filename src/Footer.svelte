<script lang="ts">
  import { config } from './configstore';
  import * as Stages from './stages';
  import { store } from './stages';
  import { fold, redditApiBase } from './util';

  let showPrivacy = false;
</script>

<style lang="postcss">
  footer {
    margin-top: 3rem;

    > :last-child {
      margin-bottom: 0;
    }
  }

  input {
    height: 0.9em;
  }
</style>


<footer>
  <p class="small">
    Made by <a href="https://github.com/cpiber" target="_blank">@cpiber</a>.
    Source Code &amp; bug tracker: <a href="https://github.com/cpiber/hfy-epub" target="_blank">cpiber/hfy-epub</a>.
    <!-- svelte-ignore missing-declaration -->
    Version {VERSION}.
    <a href="#privacy" on:click|preventDefault="{() => showPrivacy = !showPrivacy}">Privacy</a>.
  </p>

  {#if showPrivacy}
    <p class="small" transition:fold>
      This website (<a href="https://cpiber.github.io/hfy-epub" target="_blank">https://cpiber.github.io/hfy-epub</a>) does not, and will not, collect any data from its users.
      Any actions taken on this page are purely in the user's browser; there is no server-side component.
      No data is ever sent away.
      For collecting the chapter data, this site contacts <code>{redditApiBase}</code> only. The book is generated in the browser.
    </p>
    <p class="small" transition:fold>
      If TinyMCE-Editor is activated, the user's browser connects to <code>cdn.tiny.cloud</code> and <code>sp.tinymce.com</code> to load the necessary files.
    </p>
  {/if}

  {#if !Stages.is($store.stage, Stages.Stage.SETTINGS)}
    <label class="small">
      <input type="checkbox" bind:checked="{$config.useTiny}" aria-label="use TinyMCE editor" /> Use TinyMCE chapter editor
    </label>
  {/if}
</footer>