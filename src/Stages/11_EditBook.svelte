<script lang="ts">
  export let bookData: Immutable<Bookdata>;
  export let goNext: (data: Bookdata) => void;
    
  import { dndzone,SOURCES,TRIGGERS } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import ChapterEdit from '../Components/ChapterEdit.svelte';
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
    const arr = new Array(max - min + 1);
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

  let dragDisabled = true;
  const acceptItems = (e: CustomEvent<DndEvent<Chapter>>) => {
    data.chapters.splice(page * pageSize, pageSize, ...e.detail.items);
    data.chapters = data.chapters;
  };
  const handleConsider = (e: CustomEvent<DndEvent<Chapter>>) => {
    const { info: { source, trigger } } = e.detail;
    acceptItems(e);
    // Ensure dragging is stopped on drag finish via keyboard
		if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED)
			dragDisabled = true;
  };
  const handleFinalize = (e: CustomEvent<DndEvent<Chapter>>) => {
    const { info: { source } } = e.detail;
    acceptItems(e);
    // Ensure dragging is stopped on drag finish via pointer (mouse, touch)
		if (source === SOURCES.POINTER)
			dragDisabled = true;
  };
  const startDrag = (e: Event) => {
    if (!(e instanceof KeyboardEvent))
      e.preventDefault();
    dragDisabled = false;
  };
  const stopDrag = (e: Event) => {
    e.preventDefault();
    dragDisabled = true;
  }
</script>

<style lang="postcss">
  .list {
    margin: 1em 0;
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
  <SeriesCard bind:title={data.title} bind:author={data.author} edit={true} onSubmit={() => goNext(data)}>
    <div class="chapters" use:dndzone={{ items: chapterSlice, dragDisabled, flipDurationMs }} on:consider={handleConsider} on:finalize={handleFinalize}>
      {#each chapterSlice as chapter, i (chapter.id)}
        <div animate:flip="{{ duration: flipDurationMs }}" on:mouseup="{stopDrag}">
          <ChapterEdit
            bind:title={chapter.title}
            bind:content={chapter.content}
            bind:needsFetching={chapter.needsFetching}
            bind:url={chapter.displayUrl}
            canFetch={!!chapter.apiUrl}
            {startDrag}
            moveUp={(page > 0 || i > 0) && moveUp.bind(null, i)}
            moveDown={(page < maxPage || i < chapterSlice.length - 1) && moveDown.bind(null, i)}
            remove={remove.bind(null, i)}
          />
        </div>
      {/each}
    </div>
    <nav>
      <a class="small" href="#prevous" role="navigation" on:click|preventDefault="{() => page--}" disabled={page <= 0}>Previous</a>
      ::
      {#each range(Math.max(0, page - 3), Math.min(maxPage, page + 3)) as pg}
        <a class="small" href="{`#page ${pg + 1}`}" role="navigation" on:click|preventDefault="{handlePaging.bind(null, pg)}" class:current={pg == page}>{pg + 1}</a>
      {/each}
      ::
      <a class="small" href="#next" role="navigation" on:click|preventDefault="{() => page++}" disabled={page >= maxPage}>Next</a>
    </nav>
  </SeriesCard>
</div>

<button type="submit" on:click="{() => goNext(data)}">Save</button>
<a href="#cancel" class="small" on:click|preventDefault="{() => goNext(odata)}">Cancel</a>