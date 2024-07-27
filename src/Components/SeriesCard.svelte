<script lang="ts">
  export let edit = false;
  export let data: Bookdata;
  export let url = '';
  export let onSubmit: (() => void) | undefined = undefined;
  export let onTransformAll: (() => void) | undefined = undefined;

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
      <a href="{apiToRegular(url)}" target="_blank">{decode(data.title)}</a>
    {:else}
      <span class="edit" bind:innerHTML="{data.title}" contenteditable></span>
    {/if}
  </p>
  <h3>Author</h3>
  <p>
    {#if !edit}
      {decode(data.author)}
    {:else}
      <span class="edit" bind:innerHTML="{data.author}" contenteditable></span>
    {/if}
  </p>
  {#if edit}
  <h3>Actions</h3>
  <p>
    <button on:click|preventDefault="{onTransformAll}">Transform all</button>
  </p>
  {/if}
  {#if $$slots.default}
    <h3>Chapters</h3>
    <div>
      <slot></slot>
    </div>
  {/if}
</Column>