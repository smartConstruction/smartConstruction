<template>
  <div id="outline-frame">
    hello
  </div>
</template>
<script>
import './autoScale'
export default {}
</script>
<style lang="scss">
@mixin full-size {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
body {
  margin: 0
}
#frame {
  width: 1366px;
  height: 768px;
  transform-origin: 0 0;
  -ms-transform-origin: 0 0;
  position: absolute;
  top: 0;
  #outline-frame {
    @include full-size;
  }
  #body-frame {
    @include full-size;
  }
}
</style>
