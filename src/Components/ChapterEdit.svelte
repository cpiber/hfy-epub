<script lang="ts">
  export let title: string;
  export let content: string;
  export let needsFetching: boolean;
  export let url: string = undefined;
  export let canFetch = false;
  export let close: () => void;

  import Editor from '@tinymce/tinymce-svelte';
  import { config } from '../configstore';
  import BackArrow from '../icons/back-arrow.svg';
  import Column from './Column.svelte';

  needsFetching = needsFetching ?? true;
  content = content ?? '';

  $: title = title.replace(/<[^>]*>/g, '');

  const keydownDisableEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.keyCode === 13) e.preventDefault(); // prevent newlines
  };

  const conf = {
    plugins: 'code',
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
      <span class="title" aria-label="Title" contenteditable bind:innerHTML="{title}" on:keydown="{keydownDisableEnter}"></span>
    </div>
    {#if url !== undefined}
      <div class="field">
        <span class="label">URL</span>
        <span class="url" aria-label="URL" contenteditable bind:innerHTML="{url}" on:keydown="{keydownDisableEnter}"></span>
      </div>
    {/if}
    {#if $config.useTiny}
      <!-- svelte-ignore missing-declaration -->
      <Editor bind:value={content} disabled={needsFetching} apiKey={TINY_API_KEY} {conf} />
    {:else}
      <textarea bind:value="{content}" disabled={needsFetching}></textarea>
    {/if}
    {#if canFetch}
      <label>
        <input type="checkbox" bind:checked="{needsFetching}" /> Fetch contents
      </label>
    {/if}
  </div>
</Column>