<script lang="ts">
  export let edit = false;
  export let data: Bookdata;
  export let url = '';
  export let onSubmit: (() => void) | undefined = undefined;
  export let onTransformAll: (() => void) | undefined = undefined;

  import { apiToRegular, decode } from '../util';
  import Column from './Column.svelte';

  const keydownDisableEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.keyCode === 13) e.preventDefault(); // prevent newlines
  };
</script>

<style lang="postcss">
  .edit {
    display: block;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid currentColor;
    word-break: break-all;
  }
</style>


<Column onSubmit={onSubmit}>
  <h3>Title</h3>
  <p>
    {#if !edit}
      <a href="{apiToRegular(url)}" target="_blank">{decode(data.title)}</a>
    {:else}
      <span class="edit" bind:innerText="{data.title}" contenteditable on:keydown="{keydownDisableEnter}" role="textbox" tabindex="0"></span>
    {/if}
  </p>
  <h3>Author</h3>
  <p>
    {#if !edit}
      {decode(data.author)}
    {:else}
      <span class="edit" bind:innerText="{data.author}" contenteditable on:keydown="{keydownDisableEnter}" role="textbox" tabindex="0"></span>
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