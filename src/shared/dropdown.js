//用于下拉元素的一些属性常量
const __actionAttr = 'dropdown-action';
const __targetAttr = 'dropdown-target';

//在document对象click事件中处理下拉相关动作
document.addEventListener('click', function (event) {
  let eventEl = event.srcElement || event.target;
  let action = eventEl.getAttribute(__actionAttr);
  let target;
  action && (target = eventEl.getAttribute(__targetAttr));
  //最多往上找5层获取可能包含下拉元素的输入框组或按钮组
  let seek = eventEl.parentNode;
  let el;
  let count = 0;
  while (count++ < 5 && seek && seek.classList) {
    if (action === 'none') {
      return;
    }
    action || (action = seek.getAttribute(__actionAttr));
    target || (action && (target = seek.getAttribute(__targetAttr)));
    var clsList = seek.classList;
    if (clsList.contains('dropdown-group')) {
      el = seek;
      break;
    }
    seek = seek.parentNode;
  }
  let ddEl = el ? el.querySelector(target || '.dropdown') : undefined;
  //获取之前打开的下拉元素
  let activeEl = document.querySelector('.dropdown.active');
  //操作当前组内下拉元素
  if (ddEl) {
    switch (action) {
      case 'open':
        ddEl.classList.add('active');
        break;
      case 'toggle':
        ddEl.classList.toggle('active');
        break;
      case 'close':
        ddEl.classList.remove('active');
        break;
    }
  }
  //隐藏之前的下拉元素
  if (activeEl && activeEl !== ddEl) {
    activeEl.classList.remove('active');
  }
});
