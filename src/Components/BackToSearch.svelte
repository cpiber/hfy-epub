<script lang="ts">
  export let backToSearch: (() => void) | undefined = undefined;
</script>


{#if backToSearch}
  <a href="#search" on:click|preventDefault="{backToSearch}" class="small">Back to Search</a>
{/if}