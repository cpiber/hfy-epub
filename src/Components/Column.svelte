<script lang="ts">
  export let onSubmit: () => void = undefined;
</script>

<style lang="postcss">
  @import '../variables';

  .column-card {
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

      > :global(p:not(:last-child)) {
        margin-bottom: 1em;
      }
    }

    @include tiny {
      margin: 0 -5px;
    }

    > :global(*) {
      margin: 0;
    }
  }
</style>


<form class="column-card" on:submit|preventDefault="{onSubmit}">
  <slot></slot>
</form>