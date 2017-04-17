/**
 * 获取当前元素计算后的样式
 */
 window.getComputedStyle = window.getComputedStyle || function(dom) {
   return dom.currentStyle;
 };
/**
 * 扩展数组，实现插入方法
 */
 Array.prototype.insert = function(index, item) {
   this.splice(index, 0, item);
 };
 var console = console || {log:function(str){}};
 var base = base || {};
/**
 * 返回对象，拥有传入对象的属性（参数越靠后，优先级越高）
 */
 base.clone = function() {
   if (arguments.length == 0) {
    return {};
  }
  var _att = {};
  for (var int = 0; int < arguments.length; int++) {
    for ( var p in arguments[int]) {
     switch (Object.prototype.toString.call(arguments[int][p])) {
       case "[object Number]":
       _att[p] = arguments[int][p];
       break;
       case "[object String]":
       _att[p] = arguments[int][p];
       break;
       case "[object Object]":
       _att[p] = base.clone(arguments[int][p]);
       break;
       default:
       _att[p] = arguments[int][p];
       break;
     }
   }
 }
 return _att;
};
base.initDom = function(dom) {
 /*
  * 禁止鼠标右键
  */
  [].slice.call(dom.querySelectorAll('.noselect')).forEach(function(e) {
  // e.oncontextmenu = function() {
  // return false;
  // }
  e.onselectstart = function() {
   return false;
 }
});

  [].slice.call(dom.querySelectorAll('[class*="="]')).forEach(function(e) {
    e.className.match(/\S+=\S+/g).forEach(function(str) {
     var _s = str.split("=");
     var key = _s[0].replace(/-([a-z])/, function(_t, _d) {
      return _d.toUpperCase();
    });
     var value;
     if (_s[1].charAt(0) == '-' || _s[1].charAt(0) == '+') {
      var px = getComputedStyle(e)[key];
      value = parseInt(px) + parseInt(_s[1]) + px.replace(/-?\d*/, "");
    } else {
      value = _s[1];
    }
    if (value == "parent") {
      e.style[key] = getComputedStyle(e.parent)[key];
    } else {
      e.style[key] = value;
    }
  });
  });
};

window.addEventListener("load", function() {
 base.initDom(document);
});

base.search = ((function() {
 var URLParams = {};
 var aParams = decodeURI(document.location.search).substr(1).split('&');
 for (i = 0; i < aParams.length; i++) {
  var aParam = aParams[i].split('=');
  URLParams[aParam[0]] = aParam[1];
}
return URLParams;
})());

/**
 * 将对象组装成search字符串
 */
 base.toSearchStr = function(obj) {
   var _r = "?"
   obj = obj || base.search;
   for ( var _p in (obj)) {
    _r += "&" + _p + "=" + encodeURI(obj[_p]);
  }
  return _r;
};

base.goLogin = function() {
  sessionStorage.removeItem("username1");
  top.location.href = location.href.split("static")[0] + "static/login.html" + base.toSearchStr();
};

base.goSrc = function(tosrc) {
 base.search.tosrc = tosrc ? tosrc : "static/albumlist.html";
 top.location.href = location.href.split("static")[0] + "static/main.html" + base.toSearchStr();
};

base.openSrc = function(tosrc) {
 base.search.tosrc = tosrc ? tosrc : "static/albumlist.html";
 var win = window.open(location.href.split("static")[0] + "static/main.html" + base.toSearchStr(),"abc");
 window.blur();
 win.focus();
};

/**
 * obj 作为键值对，遍历obj将obj的key作为name查找页面上所有元素，将其值刷新。<br>
 * 传入{mydiv:"dis"}，则页面上所有name为mydiv的元素value 或 innerText设置为 "dis"
 */
 base.freshNams = function(obj, dom) {
   dom = dom || document;
   for ( var name in obj) {
    [].slice.call(dom.querySelectorAll('[name="' + name + '"]')).forEach(function(e) {
     if (e.tagName == "INPUT" || e.tagName == "input") {
      e.value = obj[name];
    } else {
      e.innerText = obj[name];
      e.textContent = obj[name];
    }
  });
  }
};

base.printKeys = function(obj, level) {
 level = level || 0;
 var pri = "";
 for (var int = 0; int < level; int++) {
  pri += "  ";
}
for ( var s in obj) {
  var type = Object.prototype.toString.call(obj[s]);
  console.log(pri + s + ":" + type);
  if (type == "[object Object]") {
   base.printKeys(obj[s], level + 1);
 }
}
};

base.timeToString = function(long) {
 var _d = new Date(long);
 return (_d.getHours() < 10 ? "0" + _d.getHours() : _d.getHours()) + ":"
 + (_d.getMinutes() < 10 ? "0" + _d.getMinutes() : _d.getMinutes()) + ":"
 + (_d.getSeconds() < 10 ? "0" + _d.getSeconds() : _d.getSeconds());
};
base.dateToString = function(long) {
 var _d = new Date(long);
 return _d.getFullYear() + "-" + (_d.getMonth() < 9 ? "0" + (_d.getMonth() + 1) : (_d.getMonth() + 1)) + "-"
 + (_d.getDate() < 10 ? "0" + _d.getDate() : _d.getDate());
};
base.dateTimeToString = function(long) {
 var _d = new Date(long);
 return _d.getFullYear() + "-" + (_d.getMonth() < 9 ? "0" + (_d.getMonth() + 1) : (_d.getMonth() + 1)) + "-"
 + (_d.getDate() < 10 ? "0" + _d.getDate() : _d.getDate()) + " " 
 + (_d.getHours() < 10 ? "0" + _d.getHours() : _d.getHours()) + ":"
 + (_d.getMinutes() < 10 ? "0" + _d.getMinutes() : _d.getMinutes()) + ":"
 + (_d.getSeconds() < 10 ? "0" + _d.getSeconds() : _d.getSeconds());
};

/* <!-- 初始化 --> */
if (window.$){
 $.ajaxSetup({
  beforeSend: function (xhr, settings) {
//   console.log(settings.async);
top.showBoard&&top.showBoard();
if (!settings.async) {
}
},
complete : function(xhr, status) {
 top.hideBoard &&
 setTimeout(function(){
  top.hideBoard();
},400);
}
});
}

alert = function(msg,recall) {
 var lin = msg ? ((msg+"").replace(/[^\n\r]+/g,"").length + 1) : 1; // 消息的行数
 lin = (lin + 1) / 2;
 top.document.querySelector("#msg_bord_content").innerHTML = msg ? msg.replace(/[\n\r]+/g,'<br>'):"";
 top.document.querySelector("#msg_bord_content").style.paddingTop = (250 - 15*lin)+"px";
 var board=top.document.getElementById("msg_board");
 board.className = "";
 board.focus();
 board.onclick = function(){
  board.className = "hidden";
  recall && recall();
};
};
base.validate = function(v){

//是否是空字符串或者null

v = $.trim(v);
return v== null || v=="" || v.length<=0;

};

//获取isrc重复数据的次数
base.countIsrc = function(data,p){
  var count = {};
  if(p == "isrc"){
    for(var i=0;i<data.length;i++){
      if(count[data[i].isrc]){
        count[data[i].isrc]++;
      }else{
        count[data[i].isrc] = 1;
      } 
    }
  }
  return count;
}

base.sideId =  function(data){
  var sideId = {};
  for(var i=0; i<data.length;i++){
    if(sideId[data[i].side]){
      sideId[data[i].side]++;
    }else{
      sideId[data[i].side] = 1;
    }
    sideId = data[i].itemID;
  }
  return sideId;
};
base.changeTo707 = function(p){
  if(p.statusid==708 || p.statusid==705){
      $.post("AlbumInfo/changeTo707",{albumid:p.albumid},function(data){
        if(data.responseHeader.status != 00) {
            alert(data.responseHeader.errorinfo, data.responseHeader.status == 1009 ? function(){base.goLogin();} : null);
            return;
          }
          base.search.statusid=707;
          base.search.tosrc = p.tosrc;
          alert(data.responseHeader.errorinfo,function(){
              base.goSrc(p.tosrc);
          });
      });
  }else{
  }
}