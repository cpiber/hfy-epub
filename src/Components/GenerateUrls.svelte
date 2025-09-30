<script lang="ts">
  export let visible: boolean = false;
  export let done: ((urls: string[]) => void) | undefined = undefined;

  let template = "https://example.com/page-{0}";
  let start = 1;
  let end = 10;
  let formatToLength = 1;

  const formatNumber = (num: number, digits: number) => {
    let str = num.toString();
    while (str.length < digits)
      str = '0' + str;
    return str;
  }
  const format = (templ: string, num: number, digits: number) => templ.replace(/(?<!\{)\{0\}/g, formatNumber(num, digits)).replace(/\{\{0\}\}/g, "{0}");
  const go = () => done?.(Array.from({ length: Math.max(0, end - start + 1) }).map((_, i) => format(template, i + start, formatToLength)));
</script>

<style lang="postcss">
  @import '../loading';
  @import '../variables';

  .modal {
    position: fixed;
    inset: 0;
    background-color: rgba(33, 33, 33, 0.4);
    overflow: auto;

    &:not(.show) {
      display: none;
    }

    &-inner {
      max-width: $medium_width;
      margin: 24px auto;
      padding: 12px 8px;
      background-color: white;

      & > :first-child {
        margin-top: 0;
      }

      & > :last-child {
        margin-bottom: 0;
      }
    }
  }

  input {
    width: 100%;
    box-sizing: border-box;
  }

  .hint {
    font-size: small;
    font-style: italic;
  }

  .row {
    display: flex;
    flex-wrap: nowrap;
    gap: 12px;

    > * {
      flex-grow: 1;
    }
  }

  .example {
    margin: 8px 0;
    border: 1px dotted gray;
    padding: 3px;

    pre {
      margin: 0;
    }
  }

  .close-button {
    flex-grow: 0;
    flex-shrink: 0;
    all: unset;
    font-size: x-large;
    align-self: flex-start;
    cursor: pointer;
  }

  .submit-button {
    flex-grow: 0;
    flex-shrink: 0;
    margin-left: auto;
  }
</style>


<div role="dialog" class="modal" class:show={visible}>
  <div class="modal-inner">
    <div class="row">
      <h2>URL generation</h2>
      <button class="close-button" on:click|preventDefault={() => visible = false} title="Close">&times;</button>
    </div>
    <p>This modal allows you to generate URLs based on simple patterns. Use this if the book you are trying to download offers chapters by their number in the URL.</p>
    <p>If this simple generator is not enough in your case, and auto-extraction does not help, you will need to use custom scripts to extract chapter URLs from the source.</p>
    <br/>
    <label>
      <span>URL template:</span>
      <input type="text" placeholder="{"http://example.com/page-{0}"}" bind:value={template}/>
      <span class="hint">Use the placeholder <code>{"{0}"}</code> to represent the numbers from below. To escape, double the brackets like so: <code>{"{{0}}"}</code></span>
    </label>
    {#if template}
      <div class="example">
        <pre>{format(template, 1, formatToLength)}</pre>
        <pre>{format(template, 2, formatToLength)}</pre>
        <pre>{format(template, 3, formatToLength)}</pre>
      </div>
    {/if}
    <div class="row">
      <label>
        <span>Start:</span>
        <input type="number" bind:value={start} min="0" step="1"/>
      </label>
      <label>
        <span>End:</span>
        <input type="number" bind:value={end} min="0" step="1"/>
      </label>
    </div>
    <div class="row">
      <label>
        <span>Format minimum digits:</span>
        <input type="number" bind:value={formatToLength} min="0" step="1"/>
      </label>
    </div>
    <br/>
    <div class="row">
      <button class="submit-button" on:click|preventDefault={go} disabled={!template} title={!template ? "Please set a template" : "Apply"}>Go</button>
    </div>
  </div>
</div>