<script lang="ts">
  export let backToSearch: () => void = undefined;
</script>


{#if backToSearch}
  <a href="#?" on:click|preventDefault="{backToSearch}" class="small">Back to Search</a>
{/if}