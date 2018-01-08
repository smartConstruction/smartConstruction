<template>
  <div id="project-map-container">

  </div>
</template>
<script>
import mapStyle from '../utils/map-style'
import pathData from '../utils/path'
let baiduMap
let rawPath = 0
let wholePoints = [] //用于存储所有的点，然后来计算一个合理的中心店和zoom范围，并且用于转换所有的点
export default {
  mounted() {
    this.initMap()
  },
  methods: {
    getMapInstance() {
      if (!baiduMap) {
        baiduMap = new BMap.Map('project-map-container')
      }
      return baiduMap
    },
    initMap() {
      let map = this.getMapInstance();
      map.setMapStyle({ styleJson: mapStyle })
      map.enableScrollWheelZoom(true)
      let convertor = new BMap.Convertor()
      pathData.forEach((element, pathDataIndex) => {
        let name = element.name
        let middlePoint = element.path[Math.floor(element.path.length / 2)]
        this.drawTip(name, middlePoint)
        element.path.forEach((position, index, array) => {
          wholePoints.push(new BMap.Point(position[0], position[1]))
        })

        let path = new BMap.Polyline(wholePoints.slice(wholePoints.length - element.path.length + 1), {
          strokeWeight: 5,
          strokeOpacity: 0.8,
          strokeColor: '#23faff'
        })
        path.addEventListener('click', () => {this.choosePath(element)})
        path.addEventListener('mouseover', () => {this.mouseOverPath(element)})
        map.addOverlay(path)
        // convertor.translate(wholePoints, wholePoints.length - element.path.length + 1, wholePoints.length, this.drawSinglePath)
      })
      let viewPort = map.getViewport(wholePoints);
      map.centerAndZoom(viewPort.center, viewPort.zoom)
    },
    choosePath(path) {
      console.log('click:' + path.name)
      this.getMapInstance().setMapType(BMAP_SATELLITE_MAP)
    },
    mouseOverPath(path) {
      console.log('mouseover:' + path.name)
    },
    drawTip(name, position) {
      let label = new BMap.Label(name, {
        position: new BMap.Point(position[0], position[1])
      })
      label.setStyle({
        color: '#fff',
        fontSize: '12px',
        height: '20px',
        lineHeight: '20px',
        padding: '0 10px',
        backgroundColor: 'blue',
        border: 'none'
      })
      this.getMapInstance().addOverlay(label)
    },
    drawSinglePath(data) {
      // 转换正常
      rawPath++
      if (data.status === 0) {
        let path = new BMap.Polyline(data.points, {
          strokeWeight: 5,
          strokeOpacity: 0.8,
          strokeColor: '#23faff'
        })
        this.getMapInstance().addOverlay(path)
      }
      if (rawPath === pathData.length) {
        let map = this.getMapInstance();
        let viewPort = map.getViewport(wholePoints);
        map.centerAndZoom(viewPort.center, viewPort.zoom)
      }
    }
  }
}
</script>
<style>
#project-map-container {
  @mixin full-size;
}
</style>

