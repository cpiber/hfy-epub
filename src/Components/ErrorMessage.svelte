<script lang="ts">
  export let error: any;
  export let retry: () => void;
  export let back: () => void = undefined;

  if (DEV) console.error(error);
</script>

<style lang="postcss">
  @import '../loading';
  @include error;
</style>


<p class="error">Sorry, can't process that{error ? ': ' : ''}{error.message || error}</p>

<button on:click="{retry}">Retry</button>

{#if back}
  <a href="#back" on:click|preventDefault="{back}">back</a>
{/if}