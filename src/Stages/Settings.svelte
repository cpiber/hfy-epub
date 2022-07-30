<script lang="ts">
  import { onMount } from 'svelte';
  import Column from '../Components/Column.svelte';
  import Radio from '../Components/Radio.svelte';
  import { config,NextLinkType } from '../configstore';

  let nextLink = $config.nextLink;
  let nextLinkRegex = $config.nextLinkRegex;
  let useTiny = $config.useTiny;
  const org = { ...$config };

  const validateRegex = (regex: string) => {
    try {
      new RegExp(regex, 'i');
      return true;
    } catch {
      return false;
    }
  };
  let disableSave = false;
  $: disableSave = nextLink === org.nextLink && nextLinkRegex === org.nextLinkRegex && useTiny === org.useTiny;
  $: if (!disableSave && nextLink === NextLinkType.REGEXP) disableSave = !validateRegex(nextLinkRegex);

  onMount(() => disableSave = true);
</script>

<style lang="postcss">
  @import '../loading';

  .field {
    display: block;
    padding-top: 0.7em;

    input:not([type="checkbox"]) {
      display: block;
      width: 100%;
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
        Use TinyMCE for editing chapters, a powerful HTML editor
      </label>
    </div>

    <h3>Next chapter</h3>
    <div>
      <p>Specify how next chapter links are extracted.</p>
      <Radio options="{[
        { value: NextLinkType.DEFAULT, label: 'Default' },
        { value: NextLinkType.REGEXP, label: 'Regex' },
      ]}" bind:selected={nextLink} name="radio-next-type" />

      {#if nextLink === NextLinkType.DEFAULT}
        <span class="small">Finds a "First" link, with fallback to other links that aren't "Previous" or "Index" or "First"</span>
      {:else if nextLink === NextLinkType.REGEXP}
        <label class="field">
          Regex:
          <input type="text" bind:value={nextLinkRegex} />
          <span class="small">Must produce the url in the first group</span>
        </label>
      {/if}
    </div>
  </Column>
</div>

<button type="submit" on:click="{() => { config.update(c => ({ ...c, nextLink, nextLinkRegex })); disableSave = true }}" disabled={disableSave}>Save</button>
{#if disableSave && nextLink === NextLinkType.REGEXP && !validateRegex(nextLinkRegex)}
  <span class="small error">Regex invalid</span>
{/if}