<script lang="ts">
  import { onDestroy } from 'svelte';

  export let stage: FindChapters;
  
  import ErrorMessage from '../Components/ErrorMessage.svelte';
  import Loading from '../Components/Loading.svelte';
  import { config } from '../configstore';
  import { retryFetch } from '../fetch';
  import { findNextLink, getChapterDataFromSource, getFetchUrlForSource, requestToResource, transformChapter } from '../sources';
  import type { FindChapters } from '../stages';
  import { store } from '../stages';

  let newchapters: { from: string, url: string }[] = [];
  let chapters: Bookdata['chapters'];
  let stop = false;

  const fetchMore = async () => {
    chapters = stage.bookData.chapters.map(c => ({ ...c })); // deep copy

    while (!stop) {
      let cur = chapters[chapters.length - 1];
      if (cur.needsFetching !== false) {
        const res = await retryFetch(cur.apiUrl, new URL($store.series.url).origin);
        const json = await requestToResource($store.series, res);
        if (!res.ok) throw '' + (json.message ?? res.statusText ?? res.status);
        chapters.splice(-1, 1, cur = transformChapter($config, getChapterDataFromSource($store.series.type, json, cur.apiUrl)));
      }

      let next = findNextLink($config, cur.transformedContent ?? '');
      if (DEV) console.debug('Got next link', next, ' from', cur.apiUrl, 'via transformed content');
      if (!next) next = findNextLink($config, cur.content);
      if (DEV) console.debug('Got next link', next, ' from', cur.apiUrl, 'via original content');
      if (!next) break;
      const n = getFetchUrlForSource($store.series.type, next);
      if (chapters.find(c => c.apiUrl === n)) break; // no duplicates

      newchapters.push({ from: cur.title, url: next });
      newchapters = newchapters; // tell svelte to update

      const res = await retryFetch(n, new URL($store.series.url).origin);
      const json = await requestToResource($store.series, res);
      if (!res.ok) throw '' + (json.message ?? res.statusText ?? res.status);
      chapters.push(transformChapter($config, getChapterDataFromSource($store.series.type, json, n)));
    }
    return { ...stage.bookData, chapters };
  };
  let fetchPromise = fetchMore();

  let forceScroll = true;
  function isContentScrolledToBottom() {
    // https://stackoverflow.com/a/55473962/
    const rest = document.documentElement.scrollHeight - document.documentElement.scrollTop;
    forceScroll = Math.abs(document.documentElement.clientHeight - rest) < 1;
  }
  window.addEventListener('scroll', isContentScrolledToBottom);
  onDestroy(() => {
    window.removeEventListener('scroll', isContentScrolledToBottom);
  });

  const scrollToBottom = (_: HTMLElement, __: any) => {
    return {
      update: ({ scroll }: { scroll: boolean }) => {
        if (scroll) document.querySelector('footer').scrollIntoView();
      },
    };
  }
</script>

<style lang="postcss">
  @import '../loading';
  @include valid;
</style>


{#await fetchPromise}
  <Loading>Please wait, fetching chapters...</Loading>

  <div class="chapters" use:scrollToBottom={{newchapters, scroll: forceScroll}}>
    {#each newchapters as chapter}
      <p class="valid small">{chapter.from}: Found <a href="{chapter.url}">{chapter.url}</a></p>
    {/each}
  </div>

  <button on:click|preventDefault="{() => stop = true}" disabled="{stop}">Cancel</button>
{:then newData}
  {stage.next(newData, newchapters.length)}
{:catch error}
  <ErrorMessage {error} retry={() => fetchPromise = fetchMore()} back="{() => stage.next({ ...stage.bookData, chapters }, newchapters.length)}" />
{/await}
