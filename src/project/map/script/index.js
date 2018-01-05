// import Vue from 'vue'
import outlineFrame from '../../shared/frame/outline-frame.vue'
import bodyFrame from './components/index.vue'
(function () {
  return new Vue({
    el: '#frame',
    components: {
      'cmp-outline-frame-layer': outlineFrame,
      'cmp-body-frame-layer': bodyFrame
    }
  })
})()
