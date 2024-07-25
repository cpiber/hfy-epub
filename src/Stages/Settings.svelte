<script lang="ts">
  import { onMount } from 'svelte';
  import Column from '../Components/Column.svelte';
  import Radio from '../Components/Radio.svelte';
  import { ChapterTransformType, config, defaultConfig, NextLinkType } from '../configstore';
  import { sandboxFn } from '../sources/fn';

  const cur = { ...$config };
  const org = { ...$config };

  const validateRegex = (regex: string, wasDisabled: boolean) => {
    if (!regex.trim().length) {
      return { error: "Must specify a regular expression", disableSave: true };
    }
    try {
      new RegExp(regex, 'i');
      return { error: undefined, disableSave: wasDisabled };
    } catch (error) {
      return { error, disableSave: true };
    }
  };
  const validateSelector = (sel: string, wasDisabled: boolean) => {
    if (!sel.trim().length) {
      return { error: "Must specify a selector", disableSave: true };
    }
    try {
      document.querySelector(sel);
      return { error: undefined, disableSave: wasDisabled };
    } catch (error) {
      return { error, disableSave: true };
    }
  };
  const validateFn = (fn: string, wasDisabled: boolean) => {
    if (!fn.trim().length) {
      return { error: "Must specify a function", disableSave: true };
    }
    try {
      sandboxFn(fn);
      return { error: undefined, disableSave: wasDisabled };
    } catch (error) {
      return { error, disableSave: true };
    }
  };
  
  let disableSave = false;
  $: disableSave =
         cur.nextLink === org.nextLink && cur.nextLinkRegex === org.nextLinkRegex && cur.nextLinkFn === org.nextLinkFn
      && cur.transform === org.transform && cur.transformRegex === org.transformRegex && cur.transformSelector === org.transformSelector && cur.transformFn === org.transformFn
      && cur.useTiny === org.useTiny;
  let nextLinkError: any;
  let tranformError: any;
  $: if (cur.nextLink === NextLinkType.REGEXP) ({ disableSave, error: nextLinkError } = validateRegex(cur.nextLinkRegex, disableSave));
  $: if (cur.nextLink === NextLinkType.FUNCTION) ({ disableSave, error: nextLinkError } = validateFn(cur.nextLinkFn, disableSave));
  $: if (cur.transform === ChapterTransformType.REGEXP) ({ disableSave, error: tranformError } = validateRegex(cur.transformRegex, disableSave));
  $: if (cur.transform === ChapterTransformType.SELECTOR) ({ disableSave, error: tranformError } = validateSelector(cur.transformSelector, disableSave));
  $: if (cur.transform === ChapterTransformType.FUNCTION) ({ disableSave, error: tranformError } = validateFn(cur.transformFn, disableSave));

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
        <input type="checkbox" bind:checked={cur.useTiny} />
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
      ]}" bind:selected={cur.nextLink} name="radio-next-type" />

      {#if cur.nextLink === NextLinkType.DEFAULT}
        <span class="small">Finds a "First" link, with fallback to other links that aren't "Previous" or "Index" or "First"</span>
      {:else if cur.nextLink === NextLinkType.REGEXP}
        <label class="field">
          Regex:
          <input type="text" bind:value={cur.nextLinkRegex} placeholder="{defaultConfig.nextLinkRegex}" />
          <span class="small">Must produce the url in the first group</span>
        </label>
      {:else if cur.nextLink === NextLinkType.FUNCTION}
        <label class="field">
          Function: <span class="small warning">Only input code you trust!</span>
          <textarea bind:value={cur.nextLinkFn} rows="5" placeholder="{defaultConfig.nextLinkFn}"></textarea>
          <span class="small">Globals <code>document</code> and <code>html</code> are available; Must produce the url as <code>return</code></span>
        </label>
      {/if}
    </div>

    <h3>Chapter transform</h3>
    <div>
      <p>Automatically transform chapter contents.</p>
      <Radio options="{[
        { value: ChapterTransformType.NONE, label: 'No transform' },
        { value: ChapterTransformType.REGEXP, label: 'Regex' },
        { value: ChapterTransformType.SELECTOR, label: 'Query-Selector' },
        { value: ChapterTransformType.FUNCTION, label: 'Function' },
      ]}" bind:selected={cur.transform} name="radio-transform" />

      {#if cur.transform === ChapterTransformType.REGEXP}
        <label class="field">
          Regex:
          <input type="text" bind:value={cur.transformRegex} placeholder="{defaultConfig.transformRegex}" />
          <span class="small">Must produce the new html in the first group</span>
        </label>
      {:else if cur.transform === ChapterTransformType.SELECTOR}
        <label class="field">
          Selector:
          <input type="text" bind:value={cur.transformSelector} placeholder="{defaultConfig.transformSelector}" />
        </label>
      {:else if cur.transform === ChapterTransformType.FUNCTION}
        <label class="field">
          Function: <span class="small warning">Only input code you trust!</span>
          <textarea bind:value={cur.transformFn} rows="5" placeholder="{defaultConfig.transformFn}"></textarea>
          <span class="small">Globals <code>document</code>, <code>html</code>, <code>title</code> and <code>url</code> are available; Modify the latter three to transform</span>
        </label>
      {/if}
    </div>
  </Column>
</div>

<button type="submit" on:click="{() => { config.set(cur); disableSave = true }}" disabled={disableSave}>Save</button>
{#if disableSave && cur.nextLink === NextLinkType.REGEXP && nextLinkError}
  <span class="small error">Chapter Regex invalid: <code>{nextLinkError}</code></span>
{:else if disableSave && cur.nextLink === NextLinkType.FUNCTION && nextLinkError}
  <span class="small error">Chapter Function invalid: <code>{nextLinkError}</code></span>
{:else if disableSave && cur.transform === ChapterTransformType.REGEXP && tranformError}
  <span class="small error">Transform Regex invalid: <code>{tranformError}</code></span>
{:else if disableSave && cur.transform === ChapterTransformType.SELECTOR && tranformError}
  <span class="small error">Transform Selector invalid: <code>{tranformError}</code></span>
{:else if disableSave && cur.transform === ChapterTransformType.FUNCTION && tranformError}
  <span class="small error">Transform Function invalid: <code>{tranformError}</code></span>
{/if}