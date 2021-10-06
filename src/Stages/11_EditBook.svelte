<script lang="ts">
  export let bookData: Immutable<Bookdata>;
  export let goNext: (data: Bookdata) => void;
    
  import SeriesCard from '../Components/SeriesCard.svelte';

  const odata = { ...bookData, chapters: bookData.chapters.map(c => ({ ...c })) };
  const data = { ...bookData, chapters: bookData.chapters.map(c => ({ ...c })) };
</script>


<SeriesCard bind:title={data.title} bind:author={data.author} edit={true} onSubmit={() => goNext(data)} onCancel={() => goNext(odata)}>

</SeriesCard>