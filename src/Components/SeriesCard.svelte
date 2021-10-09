<script lang="ts">
  export let edit = false;
  export let title: string;
  export let author: string;
  export let url = '';
  export let onSubmit: () => void = undefined;

  import { apiToRegular,decode } from '../util';
</script>

<style lang="postcss">
  @import '../variables';

  .series-card {
    padding: 10px 18px;
    border: 1px dashed lightgray;
    border-radius: 8px;
    display: grid;
    grid-template-columns: 150px auto;
    gap: 10px;
    align-items: baseline;

    @include mobile {
      grid-template-columns: 100%;
      padding: 6px 8px;

      > :global(p):not(:last-child) {
        margin-bottom: 1em;
      }
    }

    > :global(*) {
      margin: 0;
    }

    :global(button), :global(input:not([type="checkbox"])) {
      font-size: 1em;
      min-width: 60px;
    }

    :global(input:not([type="checkbox"])), .edit {
      display: block;
      width: 100%;
      box-sizing: border-box;
    }
    .edit {
      border-bottom: 1px solid currentColor;
    }
  }
</style>


<form class="series-card" on:submit|preventDefault="{onSubmit}">
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
</form>