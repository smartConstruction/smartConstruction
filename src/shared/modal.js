//modal module cut from sparrow-ui

//import custom-event stuff
import dispatchEvent from './dispatch-custom-event';

//用于下拉元素的一些属性常量
const __actionAttr = 'modal-action';
const __targetAttr = 'modal-target';

//打开对话框和关闭对话框的方法
function modalOpen (el, arg) {
  el = (typeof el === 'string') ? document.querySelector(el) : el;
  el.classList.add('active');
  let dlg = el.querySelector('.dialog');
  dlg && dlg.classList.add('show');
  dispatchEvent(el, 'show', false, false, arg);
}
function modalClose (el, arg) {
  el = (typeof el === 'string') ? document.querySelector(el) : el;
  el.classList.remove('active');
  let dlg = el.querySelector('.dialog');
  dlg && dlg.classList.remove('show');
  dispatchEvent(el, 'close', false, false, arg);
}

//在document对象click事件中处理对话框相关动作
document.addEventListener('click', function (event) {
  let eventEl = event.srcElement || event.target;
  //表示点击在空白区域
  let maskEl = eventEl.classList.contains('modal-mask') ? eventEl : undefined;
  let action = eventEl.getAttribute(__actionAttr);
  if (action === 'none') {
    return;
  } else if (maskEl) {
    action = 'close';
  }
  //寻找触发对话框动作的元素
  let seek = action ? eventEl : eventEl.parentNode;
  if (!maskEl) {
    let count = 0;
    //最多往上找5层获取动作
    while (!action && count++ < 5 && seek && seek.nodeType === 1) {
      action = seek.getAttribute(__actionAttr);
      if (!action) seek = seek.parentNode;
    }
  }
  //执行打开或关闭动作
  switch (action) {
    case 'open':
      var selector = seek.getAttribute(__targetAttr);
      var target = selector ? document.querySelector(selector) : undefined;
      target && modalOpen(target);
      break;
    case 'close':
      while (!maskEl && seek && seek.nodeType === 1) {
        seek.classList.contains('modal-mask') ? (maskEl = seek) : (seek = seek.parentNode);
      }
      maskEl && modalClose(maskEl);
      break;
  }
});

export { modalOpen, modalClose };
