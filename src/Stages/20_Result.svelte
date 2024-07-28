<script lang="ts">
  export let stage: Result;
  export let backToSearch: (() => void) | undefined;

  import download from 'downloadjs';
  import BackToSearch from '../Components/BackToSearch.svelte';
  import ErrorMessage from '../Components/ErrorMessage.svelte';
  import Loading from '../Components/Loading.svelte';
  import type { Result } from '../stages';
  import { bookDataStore } from '../stages';
  const epubPromise = import(/* webpackPrefetch: true */ 'epub-gen-memory');

  if (!$bookDataStore) throw new Error('Inconsistent state, expected to have book data');
  let logs: ['log' | 'warn', any, number][] = [];

  const generate = async () => {
    logs = [];
    const { default: epub } = await epubPromise;
    return await epub({
      title: $bookDataStore.title,
      author: $bookDataStore.author,
      description: $bookDataStore.description,
      ignoreFailedDownloads: true,
      verbose: (type, msg, ...more) => {
        const strMsg = [msg, ...more].join(' ');
        const found = logs.find(x => x[1] === strMsg);
        if (found) ++found[2];
        else logs.push([type, strMsg, 1]);
        if (DEV) (type === 'warn' ? console.warn : console.log)(msg, ...more);
        logs = logs; // tell svelte to update
      },
    }, $bookDataStore.chapters.map(c => ({ title: c.title, content: c.transformedContent ?? '<i>Content missing</i>', url: c.displayUrl })));
  };
  let promise = generate();
</script>

<style lang="postcss">
  @import '../loading';
  @include valid;
  @include warning;

  .logs {
    margin: 1em 0;

    p {
      margin: 0;
    }
  }
</style>


{#await promise}
  <Loading>Please wait, generating e-book...</Loading>

  <div class="logs">
    {#each logs as [type, msg, count]}
      <p class="small" class:warning={type === 'warn'}>{msg}{#if count > 1}&nbsp;({count} times){/if}</p>
    {/each}
  </div>
{:then book}
  <h3 class="valid">Your e-book is ready!</h3>
  <button on:click="{() => download(book, `${$bookDataStore.author} - ${$bookDataStore.title}.epub`, 'application/epub+zip')}">Download</button>
  <button on:click="{stage.next.bind(stage)}">Back to book</button>
  <BackToSearch {backToSearch} />

  {#if logs.find(([type]) => type === 'warn')}
    <div class="logs">
      {#each logs as [type, msg, count]}
        {#if type === 'warn'}
          <p class="small warning">{msg}{#if count > 1}&nbsp;({count} times){/if}</p>
        {/if}
      {/each}
    </div>
  {/if}
{:catch error}
  <ErrorMessage {error} retry={() => promise = generate()} />
  <button on:click="{stage.next.bind(stage)}">Back to book</button>
  <BackToSearch {backToSearch} />
{/await}