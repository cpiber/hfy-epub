<script lang="ts">
  export let error: any;
  export let retry: (() => void) | undefined = undefined;
  export let back: (() => void) | undefined = undefined;

  if (DEV) console.error(error);
  let errors = Array.isArray(error) ? error : [error];
</script>

<style lang="postcss">
  @import '../loading';
  @include error;

  .error {
    display: block;
    margin: 0.2em 0;
  }
</style>


<p>
  {#each errors as err}
    <span class="error">Sorry, can't process that{err ? ': ' : ''}{err?.message || err || ''}</span>
  {/each}
</p>

{#if retry}
  <button on:click="{retry}">Retry</button>
{/if}

{#if back}
  <a href="#back" on:click|preventDefault="{back}">back</a>
{/if}