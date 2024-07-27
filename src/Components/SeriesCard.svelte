<script lang="ts">
  export let edit = false;
  export let title: string;
  export let author: string;
  export let url = '';
  export let onSubmit: (() => void) | undefined = undefined;

  import { apiToRegular, decode } from '../util';
  import Column from './Column.svelte';
</script>

<style lang="postcss">
  .edit {
    display: block;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid currentColor;
  }
</style>


<Column onSubmit={onSubmit}>
  <h3>Title</h3>
  <p>
    {#if !edit}
      <a href="{apiToRegular(url)}" target="_blank">{decode(title)}</a>
    {:else}
      <span class="edit" bind:innerHTML="{title}" contenteditable></span>
    {/if}
  </p>
  <h3>Author</h3>
  <p>
    {#if !edit}
      {decode(author)}
    {:else}
      <span class="edit" bind:innerHTML="{author}" contenteditable></span>
    {/if}
  </p>
  {#if $$slots.default}
    <h3>Chapters</h3>
    <div>
      <slot></slot>
    </div>
  {/if}
</Column>