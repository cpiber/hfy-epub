<script lang="ts">
</script>

<style lang="postcss">
  @import '../loading';
  @include info;

  .alert {
    padding: 8px 16px;
    border-radius: 6px;
    border: 1px solid;
  }
  .alert.info {
    border-color: color-mod($info blend(black 20%));
    color: black;
    background-color: color-mod($info blend(white 20%));
  }
</style>


<p class="info alert">
  <slot />
</p>
