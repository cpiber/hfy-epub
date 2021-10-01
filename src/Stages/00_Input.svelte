<script lang="ts">
  export let search = '';
  export let goNext: (search: string) => void;
</script>

<style lang="postcss">
  @import '../variables';

  .heading {
    margin-bottom: 0;

    & + :global(p) {
      margin-top: 0.5em;
    }
  }

  .form p {
    display: flex;
    gap: 6px;
  }

  .search {
    width: 100%;
    box-sizing: border-box;
  }

  .submit {
    min-width: 60px;
    flex-shrink: 0;
  }

  .error {
    color: $error;
  }

  .spaceabove {
    margin-top: 2em;
  }
</style>


<h2 class="heading">Please enter your search terms below:</h2>

<form class="form" on:submit|stopPropagation="{() => goNext(search)}">
  <p>
    <input bind:value="{search}" class="search" placeholder="Search..." />
    <input type="submit" value="Go" class="submit" disabled={!search.trim().length} name="search" />
  </p>
</form>
{#if !search.trim().length}
  <p class="small error">Please enter a search string</p>
{/if}


<p class="spaceabove">You can:</p>
<ul>
  <li>Search for a series title on the <a href="https://reddit.com/r/HFY" target="_blank">r/HFY</a> wiki</li>
  <li>Enter a series link to the <a href="https://reddit.com/r/HFY" target="_blank">r/HFY</a> wiki</li>
  <li>Enter a link to any reddit post</li>
</ul>