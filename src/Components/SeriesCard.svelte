<script lang="ts">  
  export let edit = false;
  export let data: Bookdata;
  export let url = '';
  export let onSubmit: (() => void) | undefined = undefined;
  export let onTransformAll: (() => void) | undefined = undefined;
  export let onFetchAll: (() => void) | undefined = undefined;

  import Editor from '@tinymce/tinymce-svelte';
  import { config } from '../configstore';
  import { apiToRegular } from '../util';
  import Column from './Column.svelte';

  const keydownDisableEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.keyCode === 13) e.preventDefault(); // prevent newlines
  };

  const conf = {
    plugins: 'code',
    toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | code',
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

  .wrap {
    > :global(p) {
      margin-block: 0.1em;
    }

    > :global(:first-child) {
      margin-top: 0;
    }
    
    > :global(:last-child) {
      margin-bottom: 0;
    }
  }
</style>


<Column onSubmit={onSubmit}>
  <h3>Title</h3>
  <p>
    {#if !edit}
      <a href="{apiToRegular(url)}" target="_blank">{data.title}</a>
    {:else}
      <span class="edit" bind:innerText="{data.title}" contenteditable on:keydown="{keydownDisableEnter}" role="textbox" tabindex="0"></span>
    {/if}
  </p>
  <h3>Author</h3>
  <p>
    {#if !edit}
      {data.author}
    {:else}
      <span class="edit" bind:innerText="{data.author}" contenteditable on:keydown="{keydownDisableEnter}" role="textbox" tabindex="0"></span>
    {/if}
  </p>
  <h3>Description</h3>
  <div class="wrap">
    {#if !edit && data.description}
      {@html data.description}
    {:else if !edit}
      <i>None set</i>
    {:else if $config.useTiny}
      <!-- svelte-ignore missing-declaration -->
      <Editor bind:value={data.description} apiKey={TINY_API_KEY} {conf} />
    {:else}
      <textarea bind:value="{data.description}"></textarea>
    {/if}
  </div>
  {#if edit}
  <h3>Actions</h3>
  <p>
    <button on:click|preventDefault="{onTransformAll}">Transform all</button>
    <button on:click|preventDefault="{onFetchAll}">Fetch all</button>
  </p>
  {/if}
  {#if $$slots.default}
    <h3>Chapters</h3>
    <div>
      <slot></slot>
    </div>
  {/if}
</Column>