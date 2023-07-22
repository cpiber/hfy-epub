<script lang="ts">
  import Alert from './Components/Alert.svelte';
</script>

<style lang="postcss">
  header {
    margin-bottom: 2.5rem;

    > :first-child {
      margin-top: 0;
    }
  }

  .small {
    font-size: 0.45em;
    vertical-align: text-top;
  }
</style>


<header>
  <h1>r/HFY epub generator <a class="small" href="https://github.com/cpiber/hfy-epub/tree/master/docs/index.md" target="_blank">Help</a></h1>
  <Alert>Due to <a href="https://www.redditinc.com/blog/apifacts" target="_blank">recent API changes on reddit</a>, creating ebooks has become limited. If you run into a "Too many requests" error, please wait 10 minutes before trying again.</Alert>
</header>