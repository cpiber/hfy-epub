<script lang="ts">
  export let moveUp: (() => void) | undefined = undefined;
  export let moveDown: (() => void) | undefined = undefined;
  export let remove: (() => void) | undefined = undefined;

  import Triangle from '../icons/triangle.svg';
</script>

<style lang="postcss">
  @import '../variables';
  @import '../loading';
  @include remove;

  %button {
    display: inline-flex;
    align-items: baseline;
    gap: 2px;
    padding: 2px 5px;
    background-color: lightgray;
    border: 1px dotted gray;
    border-radius: 4px;
    text-decoration: none;

    &:hover {
      border: 1px solid gray;
    }
  }
  .controls :global(svg) {
    height: 0.8em;
  }
  .control-disabled {
    opacity: 0.7;
    cursor: inherit;
  }
  .up {
    @extend %button;
  }
  .down {
    @extend %button;

    :global(svg) {
      transform: rotate(180deg);
      margin: auto 0;
    }
  }
</style>


<div class="controls">
  <a href="#up" class="small up" on:click|preventDefault|stopPropagation="{moveUp}" class:control-disabled={!moveUp}><Triangle /> move up</a>
  <a href="#dowm" class="small down" on:click|preventDefault|stopPropagation="{moveDown}" class:control-disabled={!moveDown}><Triangle /> move down</a>
  <a href="#remove" class="small remove" on:click|preventDefault|stopPropagation="{remove}" class:control-disabled={!remove}>remove</a>
</div>