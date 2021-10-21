<script lang="ts">
  export let bookData: Immutable<Bookdata>;
  export let goNext: (data: Bookdata) => void;
    
  import ChapterEdit from '../Components/ChapterEdit.svelte';
  import SeriesCard from '../Components/SeriesCard.svelte';
  import { copyData } from '../util';

  const odata = copyData(bookData);
  const data = copyData(bookData);
</script>

<style lang="postcss">
  .list {
    margin: 1em 0;
  }
</style>


You are editing:

<div class="list">
  <SeriesCard bind:title={data.title} bind:author={data.author} edit={true} onSubmit={() => goNext(data)}>
    {#each data.chapters as chapter (chapter.id)}
      <ChapterEdit
        bind:title={chapter.title}
        bind:content={chapter.content}
        bind:needsFetching={chapter.needsFetching}
        bind:url={chapter.displayUrl}
        canFetch={!!chapter.apiUrl}
      />
    {/each}
  </SeriesCard>
</div>

<button type="submit" on:click="{() => goNext(data)}">Save</button>
<a href="#?" class="small" on:click|preventDefault="{() => goNext(odata)}">Cancel</a>