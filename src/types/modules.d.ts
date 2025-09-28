declare module '*.svg' {
  import type { SvelteComponent } from "svelte";
  class Svg extends SvelteComponent { }
  export default Svg;
}