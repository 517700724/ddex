/**
 * 初始化dom、列数、行数（涉及分页）
 */
function Table(tableAtt) {
 var _tableAtt = base.clone(tableAtt); // 用于记录属性
 var _table = document.getElementById(_tableAtt.id);
 if (!_table) {
  _table = document.createElement("TABLE");
  document.appendChild(_table);
 }

 var _thead = document.createElement("THEAD");
 var _tbody = document.createElement("TBODY");
 var _tfoot = document.createElement("TFOOT");
 _table.appendChild(_thead);
 _table.appendChild(_tbody);
 _table.appendChild(_tfoot);
 var _bar = {}; // 搜索栏
 var _heads; // 表头
 var _rows = []; // 行，其中包含cell
 this.getAtt = function() {
  return _tableAtt;
 };

 /**
  * 添加并返回一行
  */
 this.createRow = function(rowAtt) {
  var _row = new Table.Row(rowAtt, _rows.length);
  _rows.push(_row);
  return _row;
 };
 this.createRowCells = function(rowCells) {
  var _row = this.createRow();
  for ( var ce in rowCells) {
   if (Object.prototype.toString.call(rowCells[ce]) == "[object Object]") {
    _row.createCell(rowCells[ce]);
   } else {
    if (_heads.getIndex(ce)) {
     _row.createCell({
      html : rowCells[ce],
      index : _heads.getIndex(ce).index
     });
    }
   }
   _row.getAtt()[ce] = rowCells[ce];
  }
  return _row;
 };

 this.createHead = function(headAtt) {
  var _headAtt = base.clone({
   tagName : "TH"
  }, headAtt);
  if (!_heads) {
   _heads = new Table.Row();
   _bar.search = new Table.Row();
   _heads.size = 1;
  } else {
   _heads.size++;
  }
  _heads.createCell(_headAtt);
  if (_headAtt.bar) {
   _bar.search.createCell(base.clone({
    name : headAtt.key
   }, _headAtt.bar));
  } else {
   if (_headAtt.type == "no")
    _bar.search.createCell({
     name : headAtt.key,
     html : '<div class="editable" style="height:100%;min-height:22px;"></div>'
    });
   else
    _bar.search.createCell({
     name : headAtt.key,
     html : '<div class="editable" style="height:100%;min-height:22px;" contenteditable="true">'
       + (headAtt.defaultValue ? headAtt.defaultValue : "") + '</div>'
    });
  }
 };

 this.createHeads = function(headAtts) {
  for (var int = 0; int < headAtts.length; int++) {
   this.createHead(headAtts[int]);
  }
 };

 /**
  * 将数据写入dom
  */
 this.initDom = function() {
  /*
   * 初始化表格
   */

  // 搜索框
  var _search = function() {
   var serchParameters = {};
   for (var int = 0; int < _bar.search.getDom().children.length; int++) {
    child = _bar.search.getDom().children[int];
    var key = child.getAttribute("name");
    if (!key) {
     console.log("no key");
     continue;
    }
    var value = child.getAttribute("value");
    var item = child.querySelector(".editable");
    if (!value) {
     value = item
       && ((item.innerText && item.innerText) || (item.textContent && item.textContent)).replace(/[\n\r]/g, '');
     item && (item.innerHTML = value);
    }
    if (!value) {
     console.log("no value");
     continue;
    }
    var headAtt = _heads.getCell(int).getAtt();
    if (headAtt.checker) {
     if (!headAtt.checker(value)) {
      return;
     }
    } else if (headAtt.type && headAtt.errorMsg) {
     var reg;
     switch (headAtt.type) {
     case "number":
      reg = /^\d*$/;
      break;
     case "date":
      reg = /^\d\d\d\d-\d\d?-\d\d?$/;
      break;
     case "time":
      reg = /^\d\d?:\d\d?:\d\d?$/;
      break;
     case "dateTime":
      reg = /^\d\d\d\d-\d\d?-\d\d?\s\d\d?:\d\d?:\d\d?$/;
      break;
     }
     if (!reg.test(value)) {
      item && item.focus();
      alert(headAtt.errorMsg, function() {
       item && item.focus();
      });
      return;
     }
    } 
    serchParameters[key.toLowerCase()] = value;
   }
   _tableAtt.onsearch && _tableAtt.onsearch(serchParameters);
  };
  if (_tableAtt.hasHeadBar) {
   _thead.appendChild(_bar.search.createDom());
   _bar.search.getDom().onkeypress = function(event) {
    if (event.keyCode == "13") {
     event.preventDefault();
     _search();
    }
   };
   _bar.search.getDom().setAttribute("title", "输入回车进行搜索");
   this.search = _search;
  }
  // 表头
  _thead.appendChild(_heads.createDom());
  // 初始化表body
  this.freshDom();
 };

 this.freshDom = function() {
  _tbody.innerHTML = "";
  for (var int = 0; int < _rows.length; int++) {
   _tbody.appendChild((_rows[int] ? _rows[int] : new Table.Row()).createDom(_tableAtt, _heads));
  }
 };

 this.clearData = function() {
  _rows = [];
 };

 this.getRow = function(rowIndex) {
  return _rows[rowIndex];
 };
 this.getCell = function(rowIndex, colIndex) {
  return _rows[rowIndex].getCell(colIndex);
 };
 this.getDom = function(arg) {
  switch (arg) {
  case "head":
   return _thead;
  case "body":
   return _tbody;
  case "foot":
   return _tfoot;
  case undefined:
   return _table;
  }

 };
}

Table.Row = function(rowAtt, index) {
 var _rowAtt = base.clone(rowAtt, {
  tabindex : index
 });
 var _cells = [];
 var _dom;
 this.size = function() {
  return _cells.length;
 };
 this.getIndex = function(value) {
  for (var int = 0; int < _cells.length; int++) {
   if (_cells[int].getAtt().key == value) {
    _cells[int].index = int;
    return _cells[int];
   }
  }
 };
 this.getAtt = function() {
  return _rowAtt;
 };
 this.setAtt = function(att, replace) {
  _rowAtt = base.clone(_rowAtt, att, replace);
 };
 this.createCell = function(cellAtt) {
  var _cell = new Table.Row.Cell(cellAtt);
  if (cellAtt.index || cellAtt.index === 0) {
   while (_cells.length < cellAtt.index) {
    _cells.push(null);
   }
   _cells[cellAtt.index] = _cell;
  } else {
   _cells.push(_cell);
  }
  return _cell;
 };
 this.getCell = function(colIndex) {
  return _cells[colIndex];
 }

 /**
  * 产生dom元素
  * 
  * @returns
  */
 this.createDom = function(tableAtt, heads) {
  _dom = _dom || document.createElement("TR");
  for ( var par in _rowAtt) {
   _dom.setAttribute(par, _rowAtt[par]);
  }
  // 初始化内容
  for (var int = 0; int < _cells.length; int++) {
   var _ce = _cells[int] ? _cells[int] : new Table.Row.Cell();
   if (heads && (_ce.getAtt().index || _ce.getAtt().index == 0)) {
    // 此处生成tbody
    _dom.appendChild(_ce.createDom(_dom, _rowAtt, heads.getCell(_ce.getAtt().index).getAtt()));
   } else {
    // 此处生成thead
    _dom.appendChild(_ce.createDom(_dom));
   }
  }
  return _dom;
 };
 this.getDom = function() {
  return _dom;
 };
};
Table.Row.Cell = function(cellAtt) {
 var _cellAtt = base.clone(cellAtt); // 用于记录属性
 var _dom;
 this.getAtt = function() {
  return _cellAtt;
 };
 this.setAtt = function(att, replace) {
  _cellAtt = base.clone(_cellAtt, att, replace);
 };
 /**
  * 产生dom元素
  * 
  * @returns {___anonymous1989_1993}
  */
 this.createDom = function(trDom, rowAtt, head) {
  _dom = _dom ? _dom : document.createElement(_cellAtt.tagName || "TD");
  for ( var par in _cellAtt) {
   if (par === "html" && _cellAtt[par] != null) {
    if (_cellAtt[par] == "input:check") {
     _dom.innerHTML = "<input class='table-check' type='checkbox'>";
    } else if (head && head.initer) {
     _dom.innerHTML = head.initer(_cellAtt[par], rowAtt, _dom, trDom);
    } else if (head && head.type) {
     switch (head.type) {
     case "dateTime":
      if (!isNaN(_cellAtt[par]))
       _dom.innerHTML = base.dateTimeToString(_cellAtt[par]);
      else
       _dom.innerHTML = _cellAtt[par];
      break;
     case "date":
      if (!isNaN(_cellAtt[par]))
       _dom.innerHTML = base.dateToString(_cellAtt[par]);
      else
       _dom.innerHTML = _cellAtt[par];
      break;
     case "time":
      if (!isNaN(_cellAtt[par]))
       _dom.innerHTML = base.timeToString(_cellAtt[par]);
      else
       _dom.innerHTML = _cellAtt[par];
      break;
     default:
      _dom.innerHTML = _cellAtt[par];
      break;
     }
    } else {
     _dom.innerHTML = _cellAtt[par];
    }
   } else {
    _dom.setAttribute(par, _cellAtt[par]);
   }
  }
  return _dom;
 };
 this.getDom = function() {
  return _dom;
 };
};
