function PopMenu(popAtt) {
 var _popAtt = base.clone(popAtt, {
  pop : "down"
});
 var _target = _popAtt.dom?_popAtt.dom:(_popAtt.id ? document.getElementById(_popAtt.id) : document);
 _target.setAttribute("title",_popAtt.tile?_popAtt.title:"点击鼠标右键呼出菜单");
 var _eventTarget;
 var _dom = document.createElement("DIV");
 var _link = document.createElement("A");
 _link.setAttribute("data-toggle", "dropdown");
 _dom.appendChild(_link);
 _dom.className = "drop" + _popAtt.pop;
 _dom.style.position = "fixed";
 _dom.style.zIndex = 9999;
 // 在添加右键菜单的元素上呼出自定义菜单
 _target.oncontextmenu = function(event) {
  if((_popAtt.check) && !_popAtt.check(event.target)){
   return false;
 }else{
  _eventTarget = event.target;
  var topStatusid = base.search.statusid;
  var getStatus = _eventTarget.parentNode.getAttribute("statusid");
  var repeat = _eventTarget.parentNode.getAttribute("repeat");
  var setSideIds = _eventTarget.parentNode.getAttribute("setSideIds");
  _dom.style.left = event.clientX + "px";
  _dom.style.top = event.clientY + "px";
  $(_link).dropdown('toggle');
  _itemsDom.innerHTML = "";
  if (!_popAtt.items) {
    return;
  }
  for (var int = 0; int < _popAtt.items.length; int++) {
    var _item = document.createElement("LI"); 
    if (_popAtt.items[int] == "|") {
     _item.className = "divider";
   }else {
    if(_popAtt.items[int].Newly && (getStatus !=407 && getStatus !=408)){
      continue;
    }
    if(_popAtt.items[int].Newly && base.search.statusid != 705){
      continue;
    }    
    if(_popAtt.items[int].isrc && repeat!="true"){
      continue;
    }
    if(_popAtt.items[int].sides && setSideIds!="true"){
      continue;
    }
    var _a = document.createElement("A");
    _a.href = "javascript:";
    _a.innerHTML = _popAtt.items[int].html;
    _a.setAttribute("index", int);
    _a.onclick = function(event) {
      _popAtt.items[event.target.getAttribute("index")].click(_eventTarget, event.target);
    };
    _item.appendChild(_a);
  }
  _itemsDom.appendChild(_item);
}
_dom.appendChild(_itemsDom);
document.body.appendChild(_dom);
return false;
}
};
var _itemsDom = document.createElement("UL");
_itemsDom.className = "dropdown-menu";
}
