<script lang="ts">
  export let title: string;
  export let content: string;
  export let select: () => void;
  export let moveUp: () => void = undefined;
  export let moveDown: () => void = undefined;
  export let remove: () => void;

  import Triangle from '../icons/triangle.svg';
  import { decode } from '../util';

  content = content ?? '';
</script>

<style lang="postcss">
  @import '../variables';
  $len: 0.1s;
  $wait: 0.5s;
  $lr: 0.5em;
  $tb: 0.4em;

  .chapter {
    border: 1px dotted lightgray;
    margin: 0;
    cursor: move;
    $radius: 2px;
    
    :global(:first-child) > & {
      border-top-left-radius: $radius;
      border-top-right-radius: $radius;
    }
    :global(:last-child) > & {
      border-bottom-left-radius: $radius;
      border-bottom-right-radius: $radius;
    }
    :global(:not(:first-child)) > & {
      margin-top: -1px;
    }

    .more {
      transition: height $len ease-in-out, padding $len ease-in-out;
      height: 0;
      padding: 0 $lr;
      overflow: hidden;
    }

    :global([draggable]:not(#dnd-action-dragged-el)) & {
      @include hover {
        .more {
          transition: height $len ease-in-out $wait, padding $len ease-in-out $wait;
          height: 1.5em;
          padding: $tb $lr;
        }
      }
    }
  }

  .preview {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 5px;
    align-items: center;
    overflow: hidden;

    .title {
      position: relative;
      border-bottom: 1px solid rgba(0,0,0,0);
    }
    .content {

    }

    .title, .content {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: $tb $lr;
    }

    @include medium {
      & {
        grid-template-columns: 1fr;
      }

      .content {
        display: none;
      }
    }
  }

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
    pointer-events: none;
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
  .remove {
    color: $error;

    &:hover {
      color: color-mod($error lightness(-20%));
    }
  }
</style>


<div class="chapter" tabindex="0" {title} on:click="{select}">
  <div class="preview">
    <span class="title" aria-label="Title">{title}</span>
    <span class="content">{decode(content || '')}</span>
  </div>
  <div class="more controls">
    <a href="#up" class="small up" on:click|preventDefault|stopPropagation="{moveUp}" class:control-disabled={!moveUp}><Triangle /> move up</a>
    <a href="#dowm" class="small down" on:click|preventDefault|stopPropagation="{moveDown}" class:control-disabled={!moveDown}><Triangle /> move down</a>
    <a href="#remove" class="small remove" on:click|preventDefault|stopPropagation="{remove}">remove</a>
  </div>
</div>