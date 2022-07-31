<script lang="ts">
  export let stage: FindChapters;
  
  import ErrorMessage from '../Components/ErrorMessage.svelte';
  import Loading from '../Components/Loading.svelte';
  import { config } from '../configstore';
  import { retryFetch } from '../fetch';
  import { findNextLink,getPostContent,transformChapter } from '../sources';
  import type { FindChapters } from '../stages';
  import { toApiCall } from '../util';

  let newchapters: { from: string, url: string }[] = [];
  let chapters: Bookdata['chapters'];

  const fetchMore = async () => {
    chapters = stage.bookData.chapters.map(c => ({ ...c })); // deep copy

    while (true) {
      let cur = chapters[chapters.length - 1];
      if (cur.needsFetching !== false) {
        const res = await retryFetch(cur.apiUrl);
        const json = await res.json();
        if (!res.ok) throw json.message;
        chapters.splice(-1, 1, cur = transformChapter($config, getPostContent(json)));
      }

      const next = findNextLink($config, cur.content);
      if (!next) break;
      const n = toApiCall(next);
      if (chapters.find(c => c.apiUrl === n)) break; // no duplicates

      newchapters.push({ from: cur.title, url: next });
      newchapters = newchapters; // tell svelte to update

      const res = await retryFetch(n);
      const json = await res.json();
      if (!res.ok) throw json.message;
      chapters.push(transformChapter($config, getPostContent(json)));
    }
    return { ...stage.bookData, chapters };
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
      <p class="valid small">{chapter.from}: Found <a href="{chapter.url}">{chapter.url}</a></p>
    {/each}
  </div>
{:then newData}
  {stage.next(newData, newchapters.length)}
{:catch error}
  <ErrorMessage {error} retry={() => fetchPromise = fetchMore()} back="{() => stage.next({ ...stage.bookData, chapters }, newchapters.length)}" />
{/await}
