<script lang="ts">
  export let bookData: Immutable<Bookdata>;
  export let goNext: (data: Bookdata, len: number) => void;
  
  import ErrorMessage from '../Components/ErrorMessage.svelte';
  import Loading from '../Components/Loading.svelte';
  import { retryFetch } from '../fetch';
  import { findNextLink,getPostContent } from '../sources';
  import { toApiCall } from '../util';

  let newchapters: { from: string, url: string }[] = [];
  let chapters: Bookdata['chapters'];

  const fetchMore = async () => {
    chapters = bookData.chapters.map(c => ({ ...c })); // deep copy

    while (true) {
      let cur = chapters[chapters.length - 1];
      if (cur.needsFetching !== false) {
        const res = await retryFetch(cur.url);
        const json = await res.json();
        if (!res.ok) throw json.message;
        chapters.splice(-1, 1, cur = getPostContent(json));
      }

      const next = findNextLink(cur.content);
      if (!next) break;
      const n = toApiCall(next);
      if (chapters.find(c => c.url === n)) break; // no duplicates

      newchapters.push({ from: cur.title, url: next });
      newchapters = newchapters; // tell svelte to update

      const res = await retryFetch(n);
      const json = await res.json();
      if (!res.ok) throw json.message;
      chapters.push(getPostContent(json));
    }
    return { ...bookData, chapters };
  };
  let fetchPromise = fetchMore();
</script>

<style lang="postcss">
  @import '../loading';
  @include valid;
</style>


{#await fetchPromise}
  <Loading>Please wait, fetching chapters...</Loading>

  <div class="chapters">
    {#each newchapters as chapter}
      <p class="valid small">{chapter.from}: Extracted <a href="{chapter.url}">{chapter.url}</a></p>
    {/each}
  </div>
{:then newData}
  {goNext(newData, newchapters.length)}
{:catch error}
  <ErrorMessage {error} retry={() => fetchPromise = fetchMore()} />
{/await}
