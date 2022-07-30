<script lang="ts">
  export let bookData: Immutable<Bookdata>;
  export let goNext: (data: Bookdata) => void;
    
  import { dndzone } from "svelte-dnd-action";
  import { fly } from 'svelte/transition';
  import ChapterEdit from '../Components/ChapterEdit.svelte';
  import ChapterSelect from '../Components/ChapterSelect.svelte';
  import SeriesCard from '../Components/SeriesCard.svelte';
  import { copyData } from '../util';

  const odata = copyData(bookData);
  const data = copyData(bookData);

  let page = 0;
  const pageSize = 50;
  const flipDurationMs = 200;

  let maxPage: number;
  $: maxPage = Math.ceil(data.chapters.length / pageSize - 1);

  let chapterSlice: Bookdata['chapters'];
  $: chapterSlice = data.chapters.slice(page * pageSize, (page + 1) * pageSize);

  let selectedChapterIndex: number = -1;
  let selectedChapter: Bookdata['chapters'][number] = undefined;
  $: selectedChapter = selectedChapterIndex >= 0 ? chapterSlice[selectedChapterIndex] : undefined;

  const moveUp = (i: number) => {
    const j = i + pageSize * page;
    if (j < 1) return;
    data.chapters.splice(j - 1, 2, data.chapters[j], data.chapters[j - 1]);
    data.chapters = data.chapters;
  };
  const moveDown = (i: number) => {
    const j = i + pageSize * page;
    if (j >= data.chapters.length) return;
    data.chapters.splice(j, 2, data.chapters[j + 1], data.chapters[j]);
    data.chapters = data.chapters;
  };
  const remove = (i: number) => {
    const j = i + pageSize * page;
    data.chapters.splice(j, 1);
    data.chapters = data.chapters;
  };

  const range = (min: number, max: number) => {
    const arr = new Array<number>(max - min + 1);
    for (let i = min; i <= max; i++)
      arr[i - min] = i;
    return arr;
  };

  const handlePaging = (pg: number) => {
    if (page == pg) {
      const input = prompt('New page:', '' + (page + 1));
      const npg = +input;
      if (input !== null && !isNaN(npg) && npg > 0 && npg <= maxPage + 1)
        page = npg - 1;
    } else {
      page = pg;
    }
  };

  const acceptItems = (e: CustomEvent<DndEvent<Chapter>>) => {
    data.chapters.splice(page * pageSize, pageSize, ...e.detail.items);
    data.chapters = data.chapters;
  };
  const handleConsiderFinalize = (e: CustomEvent<DndEvent<Chapter>>) => {
    const { info: { source, trigger } } = e.detail;
    acceptItems(e);
  };

  let pageConf: { pre: number | null, pages: number[], post: number | null } = { pre: null, pages: [], post: null };
  $: {
    pageConf.pages = range(Math.max(0, page - 3), Math.min(maxPage, page + 3));
    pageConf.pre = pageConf.pages[0] !== 0 ? 1 : null;
    pageConf.post = pageConf.pages[pageConf.pages.length - 1] !== maxPage ? maxPage + 1 : null;
  };

  let hide = false;
  let float = true;
</script>

<style lang="postcss">
  .list {
    margin: 1em 0;
    position: relative;

    .hide {
      display: none;
    }

    .float {
      position: absolute;
      top: 0; left: 0; right: 0;
      background-color: white;
      z-index: 1;
    }
  }

  .chapters {

  }

  nav {
    margin: 8px 6px 2px;
    text-align: center;

    a {
      margin: 0 0.2em;
      text-decoration: none;
    }

    a[disabled="true"] {
      opacity: 0.6;
      pointer-events: none;
    }

    .current {
      opacity: 0.6;
      text-decoration: underline;
    }
  }
</style>


You are editing:

<div class="list">
  <div class:hide>
    <SeriesCard bind:title={data.title} bind:author={data.author} edit={true} onSubmit={() => goNext(data)}>
      <div class="chapters" use:dndzone={{ items: chapterSlice, flipDurationMs }} on:consider={handleConsiderFinalize} on:finalize={handleConsiderFinalize}>
        {#each chapterSlice as chapter, i (chapter.id)}
          <ChapterSelect
              title={chapter.title}
              content={chapter.content}
              select={() => selectedChapterIndex = i}
              moveUp={(page > 0 || i > 0) && moveUp.bind(null, i)}
              moveDown={(page < maxPage || i < chapterSlice.length - 1) && moveDown.bind(null, i)}
              remove={remove.bind(null, i)}
          />
        {/each}
      </div>
      <nav>
        <a class="small" href="#prevous" role="navigation" on:click|preventDefault="{() => page--}" disabled={page <= 0}>Previous</a>
        ::
        {#if pageConf.pre !== null}
          <a class="small" href="{`#page ${pageConf.pre}`}" role="navigation" on:click|preventDefault="{handlePaging.bind(null, pageConf.pre - 1)}">{pageConf.pre}</a>
          .
        {/if}
        {#each pageConf.pages as pg}
          <a class="small" href="{`#page ${pg + 1}`}" role="navigation" on:click|preventDefault="{handlePaging.bind(null, pg)}" class:current={pg == page}>{pg + 1}</a>
        {/each}
        {#if pageConf.post !== null}
          .
          <a class="small" href="{`#page ${pageConf.post}`}" role="navigation" on:click|preventDefault="{handlePaging.bind(null, pageConf.post - 1)}">{pageConf.post}</a>
        {/if}
        ::
        <a class="small" href="#next" role="navigation" on:click|preventDefault="{() => page++}" disabled={page >= maxPage}>Next</a>
      </nav>
    </SeriesCard>
  </div>
  {#if selectedChapterIndex >= 0}
    <div transition:fly|local={{ x: 50 }}
        on:introend="{() => {hide = true; float = false}}"
        on:outrostart="{() => {float = true}}" on:outroend="{() => {hide = false}}" class:float
    >
      <ChapterEdit
          bind:title={selectedChapter.title}
          bind:content={selectedChapter.content}
          bind:needsFetching={selectedChapter.needsFetching}
          bind:url={selectedChapter.displayUrl}
          canFetch={!!selectedChapter.apiUrl}
          close={() => selectedChapterIndex = -1}
      />
    </div>
  {/if}
</div>

<button type="submit" on:click="{() => goNext(data)}">Save</button>
<a href="#cancel" class="small" on:click|preventDefault="{() => goNext(odata)}">Cancel</a>