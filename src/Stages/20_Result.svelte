<script lang="ts">
  export let data: Immutable<Bookdata>;
  export let backToSearch: () => void;
  export let backToBook: () => void;

  import download from 'downloadjs';
  import BackToSearch from '../Components/BackToSearch.svelte';
  import ErrorMessage from '../Components/ErrorMessage.svelte';
  import Loading from '../Components/Loading.svelte';
  import { decode } from '../util';
  const epubPromise = import(/* webpackPrefetch: true */ 'epub-gen-memory');

  let logs: ['log' | 'warn', any][] = [];

  const generate = async () => {
    logs = [];
    const { default: epub } = await epubPromise;
    return await epub({
      title: decode(data.title),
      author: decode(data.author),
      ignoreFailedDownloads: true,
      verbose: (type, msg, ...more) => {
        logs.push([type, msg]);
        if (DEV) (type === 'warn' ? console.warn : console.log)(msg, ...more);
        logs = logs; // tell svelte to update
      },
    }, data.chapters.map(c => ({ title: decode(c.title), content: c.content, url: c.displayUrl })));
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
    {#each logs as [type, msg]}
      <p class="small" class:warning={type === 'warn'}>{msg}</p>
    {/each}
  </div>
{:then book}
  <h3 class="valid">Your e-book is ready!</h3>
  <button on:click="{() => download(book, `${decode(data.author)} - ${decode(data.title)}.epub`, 'application/epub+zip')}">Download</button>
  <button on:click="{backToBook}">Back to book</button>
  <BackToSearch {backToSearch} />

  {#if logs.find(([type]) => type === 'warn')}
    <div class="logs">
      {#each logs as [type, msg]}
        {#if type === 'warn'}
          <p class="small warning">{msg}</p>
        {/if}
      {/each}
    </div>
  {/if}
{:catch error}
  <ErrorMessage {error} retry={() => promise = generate()} />
  <button on:click="{backToBook}">Back to book</button>
  <BackToSearch {backToSearch} />
{/await}