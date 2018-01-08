<template>
  <div id="project-map-container">

  </div>
</template>
<script>
import mapStyle from '../utils/map-style'
let baiduMap;
export default {
  mounted() {
    // const map = new BMap.Map('project-map-container')
    
    let map = this.getMapInstance();
    map.setMapStyle({styleJson: mapStyle})
    map.enableScrollWheelZoom(true)
    let point = new BMap.Point(116.417854, 39.921988)
    map.centerAndZoom(point, 15)
  },
  methods: {
    getMapInstance() {
      if(!baiduMap) {
        baiduMap = new BMap.Map('project-map-container')
      }
      return baiduMap
    }
  }
}
</script>
<style>
#project-map-container {
  @mixin full-size;
}
</style>

