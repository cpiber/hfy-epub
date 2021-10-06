<style lang="postcss">
  @import '../loading';
  @include loading;
</style>


<div class="loading-container">
  <div class="loading-slider-container"><span class="loading-slider">•</span></div>
  <p class="loading"><slot>Loading...</slot></p>
</div>