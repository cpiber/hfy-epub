<script lang="ts">
  export let title: string;
  export let content: string;
  export let needsFetching: boolean;

  import { onDestroy,onMount } from 'svelte';
  import Up from '../icons/up-arrow.svg';
  import { decode } from '../util';

  needsFetching = needsFetching ?? true;
  content = content ?? '';

  let open = false;
  const toggle = () => open = !open;
  const keydown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.keyCode === 13) e.preventDefault(); // prevent newlines
  }

  let [inner, outer]: HTMLElement[] = [];
  let observer: ResizeObserver;
  onMount(() => {
    observer = new ResizeObserver(() => outer.style.height = `${inner.scrollHeight}px`);
    observer.observe(inner);
  });
  onDestroy(() => {
    observer.disconnect();
  });
</script>

<style lang="postcss">
  @import '../variables';
  $len: 0.2s;
  $lr: 6px;
  $tgl: 28px;

  .chapter {
    border: 1px dotted lightgray;
    margin: 0;
    transition: margin $len ease-in-out;
    $radius: 2px;
    
    &:first-child {
      border-top-left-radius: $radius;
      border-top-right-radius: $radius;
    }
    &:last-child {
      border-bottom-left-radius: $radius;
      border-bottom-right-radius: $radius;
    }
    &:not(:first-child) {
      margin-top: -1px;
    }

    &.open {
      border-radius: $radius;

      &:not(:first-child) {
        margin-top: 1em;
      }
      &:not(:last-child) {
        margin-bottom: 1em;
      }
    }
  }

  .preview {
    display: grid;
    grid-template-columns: 1fr 2fr $tgl;
    gap: 5px;
    align-items: center;
    overflow: hidden;
    transition: grid-template-columns $len ease-in-out;

    .open & {
      grid-template-columns: 1fr 0fr $tgl;
    }
    :not(.open) &, .toggle {
      cursor: pointer;
    }

    .title {
      position: relative;

      &::after {
        content: '';
        opacity: 0;
        transition: opacity $len ease-in-out;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        background-color: currentColor;
      }

      .open &::after {
        opacity: 1;
      }
    }
    .content {

    }
    .toggle {
      display: flex;
      align-items: center;
      transform: rotate(-180deg);
      transition: transform $len ease-in-out;

      .open & {
        transform: rotate(0deg);
      }
    }

    .title, .content {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .title, .content, .toggle {
      margin: 4px $lr;
    }

    @include medium {
      &, .open & {
        grid-template-columns: 1fr $tgl;
      }

      .content {
        display: none;
      }
    }
  }

  .edit {
    position: relative;
    height: 200px;
    overflow: hidden;
    transition: height $len ease-in-out, margin $len ease-in-out;
    margin: 4px $lr;

    :not(.open) & {
      height: 0 !important; /* We're setting height in JS, easier than clearing */
      margin: 0 $lr;
    }

    :global(input:not([type="checkbox"])), :global(textarea), :global(label) {
      display: block;
      width: 100%;
      box-sizing: border-box;
    }
    :global(textarea) {
      min-height: 100px;
      height: 250px;
    }
    :global(label) {
      cursor: pointer;
    }
  }
</style>


<div class="chapter" class:open>
  <div class="preview" on:click="{() => open = true}">
    <span class="title" contenteditable bind:innerHTML="{title}" on:keydown="{keydown}"></span>
    <span class="content">{decode(content || '')}</span>
    <span class="toggle" on:click|stopPropagation="{toggle}"><Up /></span>
  </div>
  <div class="edit" bind:this="{outer}"><div class="edit-inner" bind:this="{inner}">
    <textarea bind:value="{content}" disabled={needsFetching}></textarea>
    <label>
      <input type="checkbox" bind:checked="{needsFetching}" /> Fetch contents
    </label>
  </div></div>
</div>