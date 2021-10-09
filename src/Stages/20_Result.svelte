<script lang="ts">
  export let data: Immutable<Bookdata>;
  export let backToSearch: () => void;

  import download from 'downloadjs';
  import BackToSearch from '../Components/BackToSearch.svelte';
  import ErrorMessage from '../Components/ErrorMessage.svelte';
  import Loading from '../Components/Loading.svelte';
  import { apiToRegular,decode } from '../util';
  const epubPromise = import(/* webpackPrefetch: true */ 'epub-gen-memory');

  let logs: ['log' | 'warn', any][] = [];

  const generate = async () => {
    logs = [];
    const { default: epub } = await epubPromise;
    return await epub({
      title: decode(data.title),
      author: decode(data.author),
      verbose: (type, msg) => {
        logs.push([type, msg]);
        if (DEV) (type === 'warn' ? console.warn : console.log)(msg);
        logs = logs; // tell svelte to update
      },
    }, data.chapters.map(c => ({ title: decode(c.title), content: c.content, url: apiToRegular(c.url) })));
  };
  let promise = generate();
</script>

<style lang="postcss">
  @import '../loading';
  @include valid;
  @include warning;

  .logs {
    margin: 1em 0;

    :global(p) {
      margin: 0;
    }
  }
</style>


{#await promise}
  <Loading>Please wait, generating ebook...</Loading>

  <div class="logs">
    {#each logs as [type, msg]}
      <p class="small" class:warning={type === 'warn'}>{msg}</p>
    {/each}
  </div>
{:then book}
  <h3 class="valid">Your ebook is ready!</h3>
  <button on:click="{() => download(book, `${decode(data.author)} - ${decode(data.title)}.epub`, 'application/epub+zip')}">Download</button>
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
  <BackToSearch {backToSearch} />
{/await}