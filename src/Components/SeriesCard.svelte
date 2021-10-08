<script lang="ts">
  export let edit = false;
  export let title: string;
  export let author: string;
  export let url = '';
  export let onSubmit: () => void = undefined;
  export let onCancel: () => void = undefined;

  import { apiToRegular } from '../util';
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

    .save {
      grid-column: 1 / span 2; /* don't be restricted to heading column */
    }

    @include mobile {
      grid-template-columns: 100%;
      padding: 6px 8px;

      > :global(p):not(:last-child) {
        margin-bottom: 1em;
      }

      .save {
        grid-column: 1;
      }
    }

    > :global(*) {
      margin: 0;
    }

    :global(button), :global(input:not([type="checkbox"])) {
      font-size: 1em;
      min-width: 60px;
    }

    :global(input:not([type="checkbox"])) {
      width: 100%;
      box-sizing: border-box;
    }
  }
</style>


<form class="series-card" on:submit|preventDefault="{onSubmit}">
  <h3>Title</h3>
  <p>
    {#if !edit}
      <a href="{apiToRegular(url)}" target="_blank">{title}</a>
    {:else}
      <input type="text" bind:value="{title}" placeholder="Title" />
    {/if}
  </p>
  <h3>Author</h3>
  <p>
    {#if !edit}
      {author}
    {:else}
      <input type="text" bind:value="{author}" placeholder="Author" />
    {/if}
  </p>
  {#if $$slots.default}
    <h3>Chapters</h3>
    <div>
      <slot></slot>
    </div>
  {/if}

  {#if edit && onSubmit}
    <div class="save">
      <button type="submit" on:click="{onSubmit}">Save</button>
      {#if onCancel}<a href="#?" class="small" on:click|preventDefault="{onCancel}">Cancel</a>{/if}
    </div>
  {/if}
</form>