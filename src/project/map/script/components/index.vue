<template>
  <body-frame>
    <div slot="body">
      <cmp-map></cmp-map>
    </div>
  </body-frame>  
</template>
<script>
import cmpBodyFrame from '../../../shared/frame/body-frame.vue'
import cmpMap from './map.vue'
export default {
  components: {
    'body-frame': cmpBodyFrame,
    cmpMap
  }
}
</script>
<style>

</style>

