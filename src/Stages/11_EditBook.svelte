<script lang="ts">
  export let bookData: Immutable<Bookdata>;
  export let goNext: (data: Bookdata) => void;
    
  import ChapterEdit from '../Components/ChapterEdit.svelte';
  import SeriesCard from '../Components/SeriesCard.svelte';
  import { copyData } from '../util';

  const odata = copyData(bookData);
  const data = copyData(bookData);

  let page = 0;
  const pageSize = 50;
  const maxPage = Math.ceil(odata.chapters.length / pageSize - 1);

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
    <div class="chapters">
      {#each data.chapters.slice(page * pageSize, (page + 1) * pageSize) as chapter (chapter.id)}
        <ChapterEdit
          bind:title={chapter.title}
          bind:content={chapter.content}
          bind:needsFetching={chapter.needsFetching}
          bind:url={chapter.displayUrl}
          canFetch={!!chapter.apiUrl}
        />
      {/each}
    </div>
    <nav>
      <a href="#?" role="navigation" on:click|preventDefault="{() => page--}" disabled={page <= 0}>Previous</a>
      ::
      {#each range(Math.max(0, page - 3), Math.min(maxPage, page + 3)) as pg}
        <a href="#?" role="navigation" on:click|preventDefault="{handlePaging.bind(null, pg)}" class:current={pg == page}>{pg + 1}</a>
      {/each}
      ::
      <a href="#?" role="navigation" on:click|preventDefault="{() => page++}" disabled={page >= maxPage}>Next</a>
    </nav>
  </SeriesCard>
</div>

<button type="submit" on:click="{() => goNext(data)}">Save</button>
<a href="#?" class="small" on:click|preventDefault="{() => goNext(odata)}">Cancel</a>