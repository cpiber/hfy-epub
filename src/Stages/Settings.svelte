<script lang="ts">
  import { onMount } from 'svelte';
  import Column from '../Components/Column.svelte';
  import Radio from '../Components/Radio.svelte';
  import { config,defaultConfig,NextLinkType } from '../configstore';
  import { sandboxFn } from '../sources/fn';

  let nextLink = $config.nextLink;
  let nextLinkRegex = $config.nextLinkRegex;
  let nextLinkFn = $config.nextLinkFn;
  let useTiny = $config.useTiny;
  const org = { ...$config };

  let error: any;
  const validateRegex = (regex: string) => {
    error = undefined;
    if (!regex.trim().length) {
      error = "Must specify a regular expression";
      return false;
    }
    try {
      new RegExp(regex, 'i');
      return true;
    } catch (e) {
      error = e;
      return false;
    }
  };
  const validateFn = (fn: string) => {
    error = undefined;
    if (!fn.trim().length) {
      error = "Must specify a function";
      return false;
    }
    try {
      sandboxFn(fn);
      return true;
    } catch (e) {
      error = e;
      return false;
    }
  }
  let disableSave = false;
  $: disableSave = nextLink === org.nextLink && nextLinkRegex === org.nextLinkRegex && nextLinkFn === org.nextLinkFn && useTiny === org.useTiny;
  $: if (!disableSave && nextLink === NextLinkType.REGEXP) disableSave = !validateRegex(nextLinkRegex);
  $: if (!disableSave && nextLink === NextLinkType.FUNCTION) disableSave = !validateFn(nextLinkFn);

  onMount(() => disableSave = true);
</script>

<style lang="postcss">
  @import '../loading';
  @include warning;

  .field {
    display: block;
    padding-top: 0.7em;

    input:not([type="checkbox"]), textarea {
      display: block;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }
  }

  .small {
    font-size: 0.8em;
  }

  .settings {
    margin: 1em 0;
  }

  .error {
    color: $error;
  }
</style>


<div class="settings">
  <Column>
    <h3>Editor</h3>
    <div>
      <label class="field">
        <input type="checkbox" bind:checked={useTiny} />
        Use TinyMCE, a powerful HTML editor, for editing chapters
      </label>
    </div>

    <h3>Next chapter</h3>
    <div>
      <p>Specify how next chapter links are extracted.</p>
      <Radio options="{[
        { value: NextLinkType.DEFAULT, label: 'Default' },
        { value: NextLinkType.REGEXP, label: 'Regex' },
        { value: NextLinkType.FUNCTION, label: 'Function' },
      ]}" bind:selected={nextLink} name="radio-next-type" />

      {#if nextLink === NextLinkType.DEFAULT}
        <span class="small">Finds a "First" link, with fallback to other links that aren't "Previous" or "Index" or "First"</span>
      {:else if nextLink === NextLinkType.REGEXP}
        <label class="field">
          Regex:
          <input type="text" bind:value={nextLinkRegex} placeholder="{defaultConfig.nextLinkRegex}" />
          <span class="small">Must produce the url in the first group</span>
        </label>
      {:else if nextLink === NextLinkType.FUNCTION}
        <label class="field">
          Function: <span class="small warning">Only input code you trust!</span>
          <textarea type="text" bind:value={nextLinkFn} rows="5" placeholder="{defaultConfig.nextLinkFn}"></textarea>
          <span class="small">Globals <code>document</code> and <code>html</code> are available; Must produce the url as <code>return</code></span>
        </label>
      {/if}
    </div>
  </Column>
</div>

<button type="submit" on:click="{() => { config.set({ nextLink, nextLinkRegex, nextLinkFn, useTiny }); disableSave = true }}" disabled={disableSave}>Save</button>
{#if disableSave && nextLink === NextLinkType.REGEXP && error}
  <span class="small error">Regex invalid: <code>{error}</code></span>
{:else if disableSave && nextLink === NextLinkType.FUNCTION && error}
  <span class="small error">Error: <code>{error}</code></span>
{/if}