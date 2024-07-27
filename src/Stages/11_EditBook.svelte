<script lang="ts">
  export let stage: EditData;
    
  import { dndzone } from "svelte-dnd-action";
  import { fly } from 'svelte/transition';
  import ChapterEdit from '../Components/ChapterEdit.svelte';
  import ChapterSelect from '../Components/ChapterSelect.svelte';
  import SeriesCard from '../Components/SeriesCard.svelte';
  import { config } from '../configstore';
  import { Source, transformChapters } from '../sources/index';
  import type { EditData } from '../stages';
  import { bookDataStore, store } from '../stages';
  import { blankChapter, copyData, toApiCall } from '../util';

  if (!$bookDataStore) throw new Error('Inconsistent state, expected to have book data');
  const odata = copyData($bookDataStore);
  const data = $bookDataStore;

  let page = 0;
  const pageSize = 50;
  const flipDurationMs = 200;
  let dir: number;

  let maxPage: number;
  $: maxPage = Math.ceil(data.chapters.length / pageSize - 1);

  let chapterSlice: Bookdata['chapters'];
  $: chapterSlice = data.chapters.slice(page * pageSize, (page + 1) * pageSize);

  let selectedChapterIndex: number = -1;
  let selectedChapter: Bookdata['chapters'][number] | undefined = undefined;
  $: selectedChapter = selectedChapterIndex >= 0 ? data.chapters[selectedChapterIndex] : undefined;

  let newChapter: Bookdata['chapters'][number] | undefined = undefined;

  const absIdx = (i: number) => i + pageSize * page;

  const moveUp = (j: number) => {
    if (j < 1) return;
    if (j === selectedChapterIndex) --selectedChapterIndex;
    data.chapters.splice(j - 1, 2, data.chapters[j], data.chapters[j - 1]);
    data.chapters = data.chapters;
  };
  const moveDown = (j: number) => {
    if (j >= data.chapters.length) return;
    if (j === selectedChapterIndex) ++selectedChapterIndex;
    data.chapters.splice(j, 2, data.chapters[j + 1], data.chapters[j]);
    data.chapters = data.chapters;
  };
  const remove = (j: number) => {
    selectedChapterIndex = -1;
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
      const npg = +(input || '');
      if (input !== null && !isNaN(npg) && npg > 0 && npg <= maxPage + 1)
        pg = npg - 1;
    }
    dir = Math.sign(pg - page);
    page = pg;
  };

  const acceptItems = (e: CustomEvent<DndEvent<Chapter>>) => {
    data.chapters.splice(page * pageSize, pageSize, ...e.detail.items);
    data.chapters = data.chapters;
  };
  const handleConsiderFinalize = (e: CustomEvent<DndEvent<Chapter>>) => {
    acceptItems(e);
  };

  const closeChapter = (chap: Bookdata['chapters'][number]) => {
    if (!chap.displayUrl) return;
    if ($store.series.type === Source.GENERIC) chap.apiUrl = chap.displayUrl;
    else chap.apiUrl = toApiCall(chap.displayUrl);
  };

  const transformAll = () => {
    if (!window.confirm('Really continue? This will discard all changes!')) return;
    data.chapters = transformChapters($config, data.chapters);
  };

  let pageConf: { pre: number | null, pages: number[], post: number | null } = { pre: null, pages: [], post: null };
  $: {
    pageConf.pages = range(Math.max(0, page - 3), Math.min(maxPage, page + 3));
    pageConf.pre = pageConf.pages[0] !== 0 ? 1 : null;
    pageConf.post = pageConf.pages[pageConf.pages.length - 1] !== maxPage ? maxPage + 1 : null;
  };
  $: if (selectedChapter) closeChapter(selectedChapter);
  $: if (newChapter) closeChapter(newChapter);

  let hide = false;
  let float = true;
</script>

<style lang="postcss">
  @import '../variables';

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
    position: relative;

    @include touch {
      &::after {
        content: 'touch scroll area';
        background-color: red;
        opacity: 0;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 35px;
      }
    }
  }

  nav {
    margin: 8px 6px 2px;
    text-align: center;

    a {
      margin: 0 0.2em;
      text-decoration: none;
    }

    a.disabled {
      opacity: 0.6;
      pointer-events: none;
    }

    .current {
      opacity: 0.6;
      text-decoration: underline;
    }
  }

  .remove {
    color: $error;

    &:hover {
      color: color-mod($error lightness(-20%));
    }
  }
</style>


You are editing:

<div class="list">
  <div class:hide>
    <SeriesCard {data} edit={true} onSubmit={() => stage.next(data)} onTransformAll={transformAll}>
      <div class="chapters" use:dndzone={{ items: chapterSlice, flipDurationMs }} on:consider={handleConsiderFinalize} on:finalize={handleConsiderFinalize}>
        {#each chapterSlice as chapter, i (chapter.id)}
          <ChapterSelect
              title={chapter.title}
              content={chapter.transformedContent}
              select={() => selectedChapterIndex = absIdx(i)}
              moveUp={(page > 0 || i > 0) ? moveUp.bind(null, absIdx(i)) : undefined}
              moveDown={(page < maxPage || i < chapterSlice.length - 1) ? moveDown.bind(null, absIdx(i)) : undefined}
              remove={remove.bind(null, absIdx(i))}
          />
        {/each}
      </div>
      {#if data.chapters.length > 0}
        <nav>
          <a class="small" href="#prevous" on:click|preventDefault="{handlePaging.bind(null, page - 1)}" class:disabled={page <= 0}>Previous</a>
          ::
          {#if pageConf.pre !== null}
            <a class="small" href="{`#page ${pageConf.pre}`}" on:click|preventDefault="{handlePaging.bind(null, pageConf.pre - 1)}">{pageConf.pre}</a>
            .
          {/if}
          {#each pageConf.pages as pg}
            <a class="small" href="{`#page ${pg + 1}`}" on:click|preventDefault="{handlePaging.bind(null, pg)}" class:current={pg == page}>{pg + 1}</a>
          {/each}
          {#if pageConf.post !== null}
            .
            <a class="small" href="{`#page ${pageConf.post}`}" on:click|preventDefault="{handlePaging.bind(null, pageConf.post - 1)}">{pageConf.post}</a>
          {/if}
          ::
          <a class="small" href="#next" on:click|preventDefault="{handlePaging.bind(null, page + 1)}" class:disabled={page >= maxPage}>Next</a>
        </nav>
      {/if}
      <button on:click|preventDefault="{() => {newChapter = blankChapter()}}">Add new</button>
      <a class="small remove" href="#clear" on:click|preventDefault="{() => data.chapters = []}">Remove all</a>
    </SeriesCard>
  </div>
  {#if selectedChapter}
    <div transition:fly|local={{ x: 50, duration: 200 }}
        on:introend="{() => {hide = true; float = false}}"
        on:outrostart="{() => {float = true}}" on:outroend="{() => {hide = false}}" class:float
    >
      <ChapterEdit
          bind:title={selectedChapter.title}
          bind:content={selectedChapter.transformedContent}
          bind:needsFetching={selectedChapter.needsFetching}
          bind:url={selectedChapter.displayUrl}
          canFetch={!!selectedChapter.apiUrl}
          close={() => {closeChapter(selectedChapter); selectedChapterIndex = -1}}
          moveUp={(page > 0 || selectedChapterIndex > 0) ? moveUp.bind(null, selectedChapterIndex) : undefined}
          moveDown={(page < maxPage || selectedChapterIndex < chapterSlice.length - 1) ? moveDown.bind(null, selectedChapterIndex) : undefined}
          remove={remove.bind(null, selectedChapterIndex)}
      />
    </div>
  {/if}
  {#if newChapter}
    <div transition:fly|local={{ x: 50, duration: 200 }}
        on:introend="{() => {hide = true; float = false}}"
        on:outrostart="{() => {float = true}}" on:outroend="{() => {hide = false}}" class:float
    >
      <ChapterEdit
          bind:title={newChapter.title}
          bind:content={newChapter.transformedContent}
          bind:needsFetching={newChapter.needsFetching}
          bind:url={newChapter.displayUrl}
          canFetch={!!newChapter.apiUrl}
          hideControls
          close={() => {if (!newChapter) throw ''; closeChapter(newChapter); data.chapters.push(newChapter); data.chapters = data.chapters; newChapter = undefined;}}
      />
    </div>
  {/if}
</div>

<button type="submit" on:click="{() => stage.next(data)}">Save</button>
<a href="#cancel" class="small" on:click|preventDefault="{() => stage.next(odata)}">Cancel</a>