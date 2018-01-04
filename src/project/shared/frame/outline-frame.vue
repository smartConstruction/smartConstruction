<template>
  <div id="outline-frame">
    hello
  </div>
</template>
<script>
export default {
}
</script>
<style lang="scss">

@mixin full-size {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
#frame {
  @include full-size;
  #outline-frame {
    @include full-size;
  }
  #body-frame {
    @include full-size;
  }
}
</style>
