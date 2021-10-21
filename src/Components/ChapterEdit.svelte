<script lang="ts">
  export let title: string;
  export let content: string;
  export let needsFetching: boolean;
  export let url: string = undefined;
  export let canFetch = false;

  import Editor from '@tinymce/tinymce-svelte';
  import { onDestroy,onMount } from 'svelte';
  import Up from '../icons/up-arrow.svg';
  import { decode } from '../util';

  needsFetching = needsFetching ?? true;
  content = content ?? '';

  let title_: HTMLElement;
  let open = false;
  let wasInit = false;
  $: title = title.replace(/<[^>]*>/g, '');
  $: title_?.scrollTo({ left: 0 }), open;

  const toggle = () => (open = !open, wasInit = true);
  const setOpen = () => (open = true, wasInit = true);
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

  const conf = {
    plugins: 'advcode',
    toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | code',
  };
</script>

<style lang="postcss">
  @import '../variables';
  $len: 0.2s;
  $lr: 0.5em;
  $tb: 0.4em;
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
      border-bottom: 1px solid rgba(0,0,0,0);
      transition: border $len ease-in-out;
      scrollbar-width: none;

      .open & {
        border-bottom: 1px solid currentColor;
        overflow: auto;
        text-overflow: unset;
      }

      &::-webkit-scrollbar {
        display: none;
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
    .field, .content, .toggle {
      margin: $tb $lr;
    }
    .field {
      margin-top: 0;
      margin-bottom: 0;
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
    height: 200px;
    overflow: hidden;
    transition: height $len ease-in-out, margin $len ease-in-out;
    margin: 0 $lr $tb;

    &-inner {
      overflow: hidden; /* Margins are weird, without this, the height doesn't include child outer margins */
    }

    :not(.open) & {
      height: 0 !important; /* We're setting height in JS, easier than clearing */
      margin: 0 $lr;
    }

    input:not([type="checkbox"]), /* textarea, */ label {
      display: block;
      width: 100%;
      box-sizing: border-box;
    }
    :global(textarea) {
      min-height: 100px;
      height: 350px;
    }
    label {
      cursor: pointer;
    }
  }

  .field {
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: 4px;

    @include medium {
      margin-top: 0.4em;

      &, .chapter:not(.open) & {
        grid-template-columns: 1fr;
      }

      .chapter:not(.open) & .label {
        opacity: 0;
      }
    }

    span {
      margin: $tb 1px;
    }

    .label {
      overflow: hidden;
      transition: opacity $len ease-in-out;
      opacity: 1;
      width: 60px;
      transition: width $len ease-in-out;

      .chapter:not(.open) & {
        width: 0;
      }

      &::after {
        content: ':';
      }

      @include medium {
        position: absolute;
        margin-top: -0.5em;
        padding-left: 3px;
        font-size: 0.8em;
        opacity: 0.8;

        &::after {
          content: '';
        }
      }
    }
  }

  .url {
    border-bottom: 1px solid currentColor;
    word-break: break-word;
  }
</style>


<div class="chapter" class:open>
  <div class="preview" on:click="{setOpen}">
    <div class="field">
      <span class="label">Title</span>
      <span class="title" aria-label="Title" contenteditable bind:innerHTML="{title}" on:keydown="{keydown}" bind:this="{title_}"></span>
    </div>
    <span class="content">{decode(content || '')}</span>
    <span class="toggle" on:click|stopPropagation="{toggle}"><Up /></span>
  </div>
  <div class="edit" bind:this="{outer}"><div class="edit-inner" bind:this="{inner}">
    {#if url !== undefined}
      <div class="field">
        <span class="label">URL</span>
        <span class="url" aria-label="URL" contenteditable bind:innerHTML="{url}" on:keydown="{keydown}"></span>
      </div>
    {/if}
    {#if wasInit}
      <!-- Allow lateinit to avoid freezing UI -->
      <!-- svelte-ignore missing-declaration -->
      <Editor bind:value={content} disabled={needsFetching} apiKey={TINY_API_KEY} {conf} />
    {/if}
    {#if canFetch}
      <label>
        <input type="checkbox" bind:checked="{needsFetching}" /> Fetch contents
      </label>
    {/if}
  </div></div>
</div>