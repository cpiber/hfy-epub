<script lang="ts">
  export let title: string;
  export let content: string;
  export let select: () => void;
  export let moveUp: () => void = undefined;
  export let moveDown: () => void = undefined;
  export let remove: () => void;

  import { decode } from '../util';
  import ChapterControls from './ChapterControls.svelte';

  content = content ?? '';
  $: empty = !content || !content.trim().length;
  let decoded = ''
  $: setTimeout(() => (decoded = decode(content || '')), 0); // moves the strain of decoding
</script>

<style lang="postcss">
  @import '../variables';
  $len: 0.1s;
  $wait: 0.2s;
  $lr: 0.5em;
  $tb: 0.4em;

  .chapter {
    border: 1px dotted lightgray;
    margin: 0;
    cursor: move;
    $radius: 2px;
    
    &:global(:first-child) {
      border-top-left-radius: $radius;
      border-top-right-radius: $radius;
    }
    &:global(:last-child) {
      border-bottom-left-radius: $radius;
      border-bottom-right-radius: $radius;
    }
    &:global(:not(:first-child)) {
      margin-top: -1px;
    }

    .more {
      transition: height $len ease-in-out, padding $len ease-in-out;
      height: 0;
      padding: 0 $lr;
      overflow: hidden;
    }

    &:global(:not([draggable]#dnd-action-dragged-el)) {
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
    grid-template-columns: 2fr 3fr;
    gap: 5px;
    align-items: center;
    overflow: hidden;

    &.empty {
      grid-template-columns: 1fr;
    }

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
</style>


<div class="chapter" tabindex="0" {title} on:click="{select}" on:contextmenu|preventDefault >
  <div class="preview" class:empty>
    <span class="title" aria-label="Title">{title}</span>
    {#if !empty}<span class="content">{decoded}</span>{/if}
  </div>
  <div class="more">
    <ChapterControls {moveUp} {moveDown} {remove} />
  </div>
</div>