import { modalOpen } from './modal';

//消息对话框
let callbackHandler;
let sysDialogEl = (() => {
  var el = document.createElement('div');
  el.className = 'modal-mask';
  el.innerHTML = '<div class="dialog">' +
    '<div class="dialog-header"><span></span><a class="dialog-close-btn" modal-action="close"></a></div>' +
    '<div class="dialog-body"></div>' +
    '<div class="dialog-footer">' +
    '<a class="btn btn-action btn-ok" modal-action="close">确定</a>' +
    '<a class="btn btn-cancel" modal-action="close">取消</a>' +
    '</div>' +
    '</div>';
  document.body.appendChild(el);
  el.addEventListener('click', function (event) {
    if (!callbackHandler) return;
    let eventEl = event.srcElement || event.target;
    var cls = eventEl.classList;
    let act;
    if (cls.contains('modal-mask') || cls.contains('btn-cancel') || cls.contains('dialog-close-btn')) {
      act = 'cancel';
    } else if (cls.contains('btn-ok')) {
      act = 'ok';
    }
    if (act) callbackHandler(act);
  });
  return el;
})();

function showDialog (messageType, message, callback) {
  let h = sysDialogEl.querySelector('.dialog-header>span');
  let btnOk = sysDialogEl.querySelector('.btn-ok');
  let btnCancel = sysDialogEl.querySelector('.btn-cancel');
  callbackHandler = callback;
  switch (messageType) {
    case 'alert':
      h.innerText = '提示';
      btnOk.className = 'btn btn-action btn-ok';
      btnCancel.style.display = 'none';
      break;
    case 'confirm':
      h.innerText = '确认提示';
      btnOk.className = 'btn btn-action btn-ok';
      btnCancel.style.display = 'inline-block';
      break;
    case 'warn':
      h.innerText = '确认警告';
      btnOk.className = 'btn btn-negative btn-ok';
      btnCancel.style.display = 'inline-block';
      break;
  }
  sysDialogEl.querySelector('.dialog-body').innerText = message;
  modalOpen(sysDialogEl);
}

//快速浮动消息
var quickMsgEl = (() => {
  let el = document.createElement('div');
  el.className = 'float-message';
  el.innerHTML = '<div></div>';
  document.body.appendChild(el);
  return el;
})();
var quickMsgTimer;
function quickMessage (message, type) {
  let block = quickMsgEl.querySelector('div');
  block.innerText = message;
  block.className = type;
  quickMsgEl.classList.add('active');
  if (quickMsgTimer) clearTimeout(quickMsgTimer);
  quickMsgTimer = setTimeout(() => {
    quickMsgEl.classList.remove('active');
  }, 3000);
}

export function alert (message, callback) {
  showDialog('alert', message, callback);
};
export function confirm (message, callback) {
  showDialog('confirm', message, callback);
};
export function warn (message, callback) {
  showDialog('warn', message, callback);
};
export function showMessage (message, type) {
  quickMessage(message, type || 'info');
};

