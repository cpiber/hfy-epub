<script lang="ts">
  export let title: string;
  export let content: string | undefined;
  export let needsFetching: boolean | undefined;
  export let url: string | undefined = undefined;
  export let canFetch = false;
  export let close: () => void;
  export let moveUp: (() => void) | undefined = undefined;
  export let moveDown: (() => void) | undefined = undefined;
  export let remove: (() => void) | undefined = undefined;
  export let hideControls = false;

  import { config } from '../configstore';
  import BackArrow from '../icons/back-arrow.svg';
  import ChapterControls from './ChapterControls.svelte';
  import Column from './Column.svelte';
  import Editor from './Editor.svelte';

  needsFetching = needsFetching ?? true;
  content = content ?? '';

  const keydownDisableEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.keyCode === 13) e.preventDefault(); // prevent newlines
  };
</script>

<style lang="postcss">
  @import '../variables';
  $len: 0.2s;
  $lr: 0.5em;
  $tb: 0.4em;
  $tgl: 28px;

  .chapter {
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

    border-radius: $radius;

    :global(:not(:first-child)) > & {
      margin-top: 1em;
    }
    :global(:not(:last-child)) > & {
      margin-bottom: 1em;
    }
  }
  .edit {
    input:not([type="checkbox"]), textarea, label {
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
    }

    span {
      margin: $tb 1px;
    }

    span[contenteditable] {
      word-break: break-all;
    }

    .label {
      overflow: hidden;
      transition: opacity $len ease-in-out;
      opacity: 1;
      width: 60px;
      transition: width $len ease-in-out;

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

    :not(.label) {
      border-bottom: 1px solid currentColor;
    }
  }

  .back {
    :global svg {
      height: 0.65em;
    }

    a {
      text-decoration: none;
      color: inherit;

      @include hover {
        text-decoration: underline;
      }
    }
  }

  .url {
    word-break: break-word;
  }
</style>


<Column onSubmit={close}>
  <h3 class="back"><a href="#home" on:click|preventDefault="{close}" class="homelink"><BackArrow /> back</a></h3>
  <div class="chapter edit">
    <div class="field">
      <span class="label">Title</span>
      <span class="title" aria-label="Title" contenteditable bind:innerText="{title}" on:keydown="{keydownDisableEnter}" role="textbox" tabindex="0"></span>
    </div>
    {#if url !== undefined}
      <div class="field">
        <span class="label">URL</span>
        <span class="url" aria-label="URL" contenteditable bind:innerText="{url}" on:keydown="{keydownDisableEnter}" role="textbox" tabindex="0"></span>
      </div>
    {/if}
    {#if $config.useTiny}
      <Editor bind:value="{content}" disabled={needsFetching && canFetch} />
    {:else}
      <textarea bind:value="{content}" disabled={needsFetching && canFetch}></textarea>
    {/if}
    {#if canFetch}
      <label>
        <input type="checkbox" bind:checked="{needsFetching}" /> Fetch contents
      </label>
    {/if}
  </div>
  {#if !hideControls}
    <span />
    <ChapterControls {moveUp} {moveDown} {remove} />
  {/if}
</Column>