<script lang="ts">
  export let hasReddit: boolean = false;
  export let hasOther: boolean = false;

  import Alert from './Alert.svelte';
</script>


{#if hasReddit}
  <Alert>Due to <a href="https://www.redditinc.com/blog/apifacts" target="_blank">recent API changes on reddit</a>, creating ebooks has become limited. If you run into a "Too many requests" error, please wait 10 minutes before trying again.</Alert>
{/if}

{#if hasOther}
  <Alert>You are using non-reddit URLs. Please be aware of <code>NetworkError</code>s, see <a href="https://github.com/cpiber/hfy-epub/blob/master/docs/other/cors.md" target="_blank">CORS</a>. This is a security feature of the browser.</Alert>
{/if}