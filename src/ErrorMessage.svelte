<script lang="ts">
  export let error: any;
  export let retry: () => void;
</script>

<style lang="postcss">
  @import './loading';
  @include error;
</style>

<p class="error">Sorry, can't process that{error ? ': ' : ''}{error.message || error}</p>

<button on:click="{retry}">Retry</button>
