<script lang="ts">
  export let data: Immutable<Bookdata>;
  export let backToSearch: () => void;

  import download from 'downloadjs';
  import BackToSearch from '../Components/BackToSearch.svelte';
  import ErrorMessage from '../Components/ErrorMessage.svelte';
  import Loading from '../Components/Loading.svelte';
  const epubPromise = import(/* webpackPrefetch: true */ 'epub-gen-memory');

  const generate = async () => {
    const { default: epub } = await epubPromise;
    return await epub({
      title: data.title,
      author: data.author,
    }, data.chapters.map(c => ({ ...c, content: c.content })), DEV);
  };
  let promise = generate();
</script>

<style lang="postcss">
  @import '../loading';
  @include valid;
</style>


{#await promise}
  <Loading>Please wait, generating ebook...</Loading>
{:then book}
  <h3 class="valid">Your ebook is ready!</h3>
  <button on:click="{() => download(book, `${data.author} - ${data.title}.epub`, 'application/epub+zip')}">Download</button>

  <BackToSearch {backToSearch} />
{:catch error}
  <ErrorMessage {error} retry={() => promise = generate()} />
  <BackToSearch {backToSearch} />
{/await}