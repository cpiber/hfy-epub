<script lang="ts">
  export let bookData: Immutable<Bookdata>;
  export let goNext: (data: Bookdata) => void;
    
  import ChapterEdit from '../Components/ChapterEdit.svelte';
  import SeriesCard from '../Components/SeriesCard.svelte';
  import { copyData } from '../util';

  const odata = copyData(bookData);
  const data = copyData(bookData);
</script>


<SeriesCard bind:title={data.title} bind:author={data.author} edit={true} onSubmit={() => goNext(data)} onCancel={() => goNext(odata)}>
  {#each data.chapters as chapter}
    <ChapterEdit bind:title={chapter.title} bind:content={chapter.content} bind:needsFetching={chapter.needsFetching} />
  {/each}
</SeriesCard>