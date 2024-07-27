<script lang="ts">
	type T = $$Generic
  export let options: Array<{ value: T, label: string }>;
  export let selected: T;
  export let name = `radio-${Math.random().toString().slice(2)}`
  let klass: string | undefined = undefined;
  export { klass as class };
</script>

<style lang="postcss">
  @import '../loading';

  label {
    display: block;
  }
</style>


<div role="radiogroup" class="{klass}">
  {#each options as opt (opt.value)}
    <label class:selected={selected === opt.value}><input type="radio" {name} value={opt.value} checked={selected === opt.value} bind:group="{selected}" /> {opt.label}</label>
  {/each}
</div>