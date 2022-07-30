<script lang="ts">
	type T = $$Generic
  export let options: Array<{ value: T, label: string }>;
  export let selected: T;
  export let name = `radio-${Math.random().toString().slice(2)}`
</script>

<style lang="postcss">
  @import '../loading';

  label {
    display: block;
  }
</style>


<div role="radiogroup">
  {#each options as opt (opt.value)}
    <label><input type="radio" {name} value={opt.value} checked={selected === opt.value} on:click="{() => selected = opt.value}" /> {opt.label}</label>
  {/each}
</div>