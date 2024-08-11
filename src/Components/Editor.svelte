<script lang="ts">
  export let value: string | undefined;
  export let disabled: boolean = false;

  import Editor from '@tinymce/tinymce-svelte';
  import type { TinyMCE } from 'tinymce';
  type EditorOptions = Parameters<TinyMCE['init']>[0];

  const conf: EditorOptions = {
    plugins: 'code',
    toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | code',
    promotion: false,
  };
  // remove the / at the beginning, since it confuses the editor
  // assumes the define ends in a trailing slash
  const scriptSrc = `${__webpack_public_path__.slice(1)}tinymce/tinymce.min.js`
</script>

<!-- svelte-ignore missing-declaration -->
<Editor bind:value={value} apiKey={TINY_API_KEY} scriptSrc={scriptSrc} {conf} {disabled} />