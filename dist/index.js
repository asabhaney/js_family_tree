// node_modules/d3-dispatch/src/dispatch.js
var noop = { value: () => {
} };
function dispatch() {
  for (var i = 0, n = arguments.length, _2 = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || t in _2 || /[\s.]/.test(t))
      throw new Error("illegal type: " + t);
    _2[t] = [];
  }
  return new Dispatch(_2);
}
function Dispatch(_2) {
  this._ = _2;
}
function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0)
      name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    return { type: t, name };
  });
}
Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _2 = this._, T2 = parseTypenames(typename + "", _2), t, i = -1, n = T2.length;
    if (arguments.length < 2) {
      while (++i < n)
        if ((t = (typename = T2[i]).type) && (t = get(_2[t], typename.name)))
          return t;
      return;
    }
    if (callback != null && typeof callback !== "function")
      throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T2[i]).type)
        _2[t] = set(_2[t], typename.name, callback);
      else if (callback == null)
        for (t in _2)
          _2[t] = set(_2[t], typename.name, null);
    }
    return this;
  },
  copy: function() {
    var copy = {}, _2 = this._;
    for (var t in _2)
      copy[t] = _2[t].slice();
    return new Dispatch(copy);
  },
  call: function(type2, that) {
    if ((n = arguments.length - 2) > 0)
      for (var args = new Array(n), i = 0, n, t; i < n; ++i)
        args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type2))
      throw new Error("unknown type: " + type2);
    for (t = this._[type2], i = 0, n = t.length; i < n; ++i)
      t[i].value.apply(that, args);
  },
  apply: function(type2, that, args) {
    if (!this._.hasOwnProperty(type2))
      throw new Error("unknown type: " + type2);
    for (var t = this._[type2], i = 0, n = t.length; i < n; ++i)
      t[i].value.apply(that, args);
  }
};
function get(type2, name) {
  for (var i = 0, n = type2.length, c; i < n; ++i) {
    if ((c = type2[i]).name === name) {
      return c.value;
    }
  }
}
function set(type2, name, callback) {
  for (var i = 0, n = type2.length; i < n; ++i) {
    if (type2[i].name === name) {
      type2[i] = noop, type2 = type2.slice(0, i).concat(type2.slice(i + 1));
      break;
    }
  }
  if (callback != null)
    type2.push({ name, value: callback });
  return type2;
}
var dispatch_default = dispatch;

// node_modules/d3-selection/src/namespaces.js
var xhtml = "http://www.w3.org/1999/xhtml";
var namespaces_default = {
  svg: "http://www.w3.org/2000/svg",
  xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

// node_modules/d3-selection/src/namespace.js
function namespace_default(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns")
    name = name.slice(i + 1);
  return namespaces_default.hasOwnProperty(prefix) ? { space: namespaces_default[prefix], local: name } : name;
}

// node_modules/d3-selection/src/creator.js
function creatorInherit(name) {
  return function() {
    var document2 = this.ownerDocument, uri = this.namespaceURI;
    return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
  };
}
function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function creator_default(name) {
  var fullname = namespace_default(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}

// node_modules/d3-selection/src/selector.js
function none() {
}
function selector_default(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}

// node_modules/d3-selection/src/selection/select.js
function select_default(select) {
  if (typeof select !== "function")
    select = selector_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node)
          subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new Selection(subgroups, this._parents);
}

// node_modules/d3-selection/src/array.js
function array(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}

// node_modules/d3-selection/src/selectorAll.js
function empty() {
  return [];
}
function selectorAll_default(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}

// node_modules/d3-selection/src/selection/selectAll.js
function arrayAll(select) {
  return function() {
    return array(select.apply(this, arguments));
  };
}
function selectAll_default(select) {
  if (typeof select === "function")
    select = arrayAll(select);
  else
    select = selectorAll_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }
  return new Selection(subgroups, parents);
}

// node_modules/d3-selection/src/matcher.js
function matcher_default(selector) {
  return function() {
    return this.matches(selector);
  };
}
function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}

// node_modules/d3-selection/src/selection/selectChild.js
var find = Array.prototype.find;
function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}
function childFirst() {
  return this.firstElementChild;
}
function selectChild_default(match) {
  return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
}

// node_modules/d3-selection/src/selection/selectChildren.js
var filter = Array.prototype.filter;
function children() {
  return Array.from(this.children);
}
function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}
function selectChildren_default(match) {
  return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}

// node_modules/d3-selection/src/selection/filter.js
function filter_default(match) {
  if (typeof match !== "function")
    match = matcher_default(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Selection(subgroups, this._parents);
}

// node_modules/d3-selection/src/selection/sparse.js
function sparse_default(update) {
  return new Array(update.length);
}

// node_modules/d3-selection/src/selection/enter.js
function enter_default() {
  return new Selection(this._enter || this._groups.map(sparse_default), this._parents);
}
function EnterNode(parent, datum2) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum2;
}
EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function(child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function(selector) {
    return this._parent.querySelector(selector);
  },
  querySelectorAll: function(selector) {
    return this._parent.querySelectorAll(selector);
  }
};

// node_modules/d3-selection/src/constant.js
function constant_default(x) {
  return function() {
    return x;
  };
}

// node_modules/d3-selection/src/selection/data.js
function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0, node, groupLength = group.length, dataLength = data.length;
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}
function bindKey(parent, group, enter, update, exit, data, key) {
  var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
      exit[i] = node;
    }
  }
}
function datum(node) {
  return node.__data__;
}
function data_default(value, key) {
  if (!arguments.length)
    return Array.from(this, datum);
  var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
  if (typeof value !== "function")
    value = constant_default(value);
  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j], group = groups[j], groupLength = group.length, data = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1)
          i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength)
          ;
        previous._next = next || null;
      }
    }
  }
  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
function arraylike(data) {
  return typeof data === "object" && "length" in data ? data : Array.from(data);
}

// node_modules/d3-selection/src/selection/exit.js
function exit_default() {
  return new Selection(this._exit || this._groups.map(sparse_default), this._parents);
}

// node_modules/d3-selection/src/selection/join.js
function join_default(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter)
      enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update)
      update = update.selection();
  }
  if (onexit == null)
    exit.remove();
  else
    onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

// node_modules/d3-selection/src/selection/merge.js
function merge_default(context) {
  var selection2 = context.selection ? context.selection() : context;
  for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Selection(merges, this._parents);
}

// node_modules/d3-selection/src/selection/order.js
function order_default() {
  for (var groups = this._groups, j = -1, m = groups.length; ++j < m; ) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4)
          next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}

// node_modules/d3-selection/src/selection/sort.js
function sort_default(compare) {
  if (!compare)
    compare = ascending;
  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }
  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new Selection(sortgroups, this._parents).order();
}
function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

// node_modules/d3-selection/src/selection/call.js
function call_default() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

// node_modules/d3-selection/src/selection/nodes.js
function nodes_default() {
  return Array.from(this);
}

// node_modules/d3-selection/src/selection/node.js
function node_default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node)
        return node;
    }
  }
  return null;
}

// node_modules/d3-selection/src/selection/size.js
function size_default() {
  let size = 0;
  for (const node of this)
    ++size;
  return size;
}

// node_modules/d3-selection/src/selection/empty.js
function empty_default() {
  return !this.node();
}

// node_modules/d3-selection/src/selection/each.js
function each_default(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i])
        callback.call(node, node.__data__, i, group);
    }
  }
  return this;
}

// node_modules/d3-selection/src/selection/attr.js
function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}
function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null)
      this.removeAttribute(name);
    else
      this.setAttribute(name, v);
  };
}
function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null)
      this.removeAttributeNS(fullname.space, fullname.local);
    else
      this.setAttributeNS(fullname.space, fullname.local, v);
  };
}
function attr_default(name, value) {
  var fullname = namespace_default(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
}

// node_modules/d3-selection/src/window.js
function window_default(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}

// node_modules/d3-selection/src/selection/style.js
function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}
function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null)
      this.style.removeProperty(name);
    else
      this.style.setProperty(name, v, priority);
  };
}
function style_default(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
  return node.style.getPropertyValue(name) || window_default(node).getComputedStyle(node, null).getPropertyValue(name);
}

// node_modules/d3-selection/src/selection/property.js
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}
function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}
function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null)
      delete this[name];
    else
      this[name] = v;
  };
}
function property_default(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}

// node_modules/d3-selection/src/selection/classed.js
function classArray(string) {
  return string.trim().split(/^|\s+/);
}
function classList(node) {
  return node.classList || new ClassList(node);
}
function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};
function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n)
    list.add(names[i]);
}
function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n)
    list.remove(names[i]);
}
function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}
function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}
function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}
function classed_default(name, value) {
  var names = classArray(name + "");
  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n)
      if (!list.contains(names[i]))
        return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}

// node_modules/d3-selection/src/selection/text.js
function textRemove() {
  this.textContent = "";
}
function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
function text_default(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}

// node_modules/d3-selection/src/selection/html.js
function htmlRemove() {
  this.innerHTML = "";
}
function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}
function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
function html_default(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}

// node_modules/d3-selection/src/selection/raise.js
function raise() {
  if (this.nextSibling)
    this.parentNode.appendChild(this);
}
function raise_default() {
  return this.each(raise);
}

// node_modules/d3-selection/src/selection/lower.js
function lower() {
  if (this.previousSibling)
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lower_default() {
  return this.each(lower);
}

// node_modules/d3-selection/src/selection/append.js
function append_default(name) {
  var create2 = typeof name === "function" ? name : creator_default(name);
  return this.select(function() {
    return this.appendChild(create2.apply(this, arguments));
  });
}

// node_modules/d3-selection/src/selection/insert.js
function constantNull() {
  return null;
}
function insert_default(name, before) {
  var create2 = typeof name === "function" ? name : creator_default(name), select = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
  return this.select(function() {
    return this.insertBefore(create2.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

// node_modules/d3-selection/src/selection/remove.js
function remove() {
  var parent = this.parentNode;
  if (parent)
    parent.removeChild(this);
}
function remove_default() {
  return this.each(remove);
}

// node_modules/d3-selection/src/selection/clone.js
function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function clone_default(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}

// node_modules/d3-selection/src/selection/datum.js
function datum_default(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}

// node_modules/d3-selection/src/selection/on.js
function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}
function parseTypenames2(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0)
      name = t.slice(i + 1), t = t.slice(0, i);
    return { type: t, name };
  });
}
function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on)
      return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i)
      on.length = i;
    else
      delete this.__on;
  };
}
function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on)
      for (var j = 0, m = on.length; j < m; ++j) {
        if ((o = on[j]).type === typename.type && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
          this.addEventListener(o.type, o.listener = listener, o.options = options);
          o.value = value;
          return;
        }
      }
    this.addEventListener(typename.type, listener, options);
    o = { type: typename.type, name: typename.name, value, listener, options };
    if (!on)
      this.__on = [o];
    else
      on.push(o);
  };
}
function on_default(typename, value, options) {
  var typenames = parseTypenames2(typename + ""), i, n = typenames.length, t;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on)
      for (var j = 0, m = on.length, o; j < m; ++j) {
        for (i = 0, o = on[j]; i < n; ++i) {
          if ((t = typenames[i]).type === o.type && t.name === o.name) {
            return o.value;
          }
        }
      }
    return;
  }
  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i)
    this.each(on(typenames[i], value, options));
  return this;
}

// node_modules/d3-selection/src/selection/dispatch.js
function dispatchEvent(node, type2, params) {
  var window2 = window_default(node), event = window2.CustomEvent;
  if (typeof event === "function") {
    event = new event(type2, params);
  } else {
    event = window2.document.createEvent("Event");
    if (params)
      event.initEvent(type2, params.bubbles, params.cancelable), event.detail = params.detail;
    else
      event.initEvent(type2, false, false);
  }
  node.dispatchEvent(event);
}
function dispatchConstant(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params);
  };
}
function dispatchFunction(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params.apply(this, arguments));
  };
}
function dispatch_default2(type2, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type2, params));
}

// node_modules/d3-selection/src/selection/iterator.js
function* iterator_default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i])
        yield node;
    }
  }
}

// node_modules/d3-selection/src/selection/index.js
var root = [null];
function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection() {
  return new Selection([[document.documentElement]], root);
}
function selection_selection() {
  return this;
}
Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: select_default,
  selectAll: selectAll_default,
  selectChild: selectChild_default,
  selectChildren: selectChildren_default,
  filter: filter_default,
  data: data_default,
  enter: enter_default,
  exit: exit_default,
  join: join_default,
  merge: merge_default,
  selection: selection_selection,
  order: order_default,
  sort: sort_default,
  call: call_default,
  nodes: nodes_default,
  node: node_default,
  size: size_default,
  empty: empty_default,
  each: each_default,
  attr: attr_default,
  style: style_default,
  property: property_default,
  classed: classed_default,
  text: text_default,
  html: html_default,
  raise: raise_default,
  lower: lower_default,
  append: append_default,
  insert: insert_default,
  remove: remove_default,
  clone: clone_default,
  datum: datum_default,
  on: on_default,
  dispatch: dispatch_default2,
  [Symbol.iterator]: iterator_default
};
var selection_default = selection;

// node_modules/d3-selection/src/select.js
function select_default2(selector) {
  return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
}

// node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition)
    prototype[key] = definition[key];
  return prototype;
}

// node_modules/d3-color/src/color.js
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a) {
  if (a <= 0)
    r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define_default(Rgb, rgb, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
  if (a <= 0)
    h = s = l = NaN;
  else if (l <= 0 || l >= 1)
    h = s = NaN;
  else if (s <= 0)
    h = NaN;
  return new Hsl(h, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl)
    return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Hsl();
  if (o instanceof Hsl)
    return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min2 = Math.min(r, g, b), max2 = Math.max(r, g, b), h = NaN, s = max2 - min2, l = (max2 + min2) / 2;
  if (s) {
    if (r === max2)
      h = (g - b) / s + (g < b) * 6;
    else if (g === max2)
      h = (b - r) / s + 2;
    else
      h = (r - g) / s + 4;
    s /= l < 0.5 ? max2 + min2 : 2 - max2 - min2;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Hsl, hsl, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

// node_modules/d3-interpolate/src/basis.js
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
function basis_default(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/constant.js
var constant_default2 = (x) => () => x;

// node_modules/d3-interpolate/src/color.js
function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}
function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}
function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant_default2(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant_default2(isNaN(a) ? b : a);
}

// node_modules/d3-interpolate/src/rgb.js
var rgb_default = function rgbGamma(y) {
  var color2 = gamma(y);
  function rgb2(start2, end) {
    var r = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g = color2(start2.g, end.g), b = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
    return function(t) {
      start2.r = r(t);
      start2.g = g(t);
      start2.b = b(t);
      start2.opacity = opacity(t);
      return start2 + "";
    };
  }
  rgb2.gamma = rgbGamma;
  return rgb2;
}(1);
function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color2;
    for (i = 0; i < n; ++i) {
      color2 = rgb(colors[i]);
      r[i] = color2.r || 0;
      g[i] = color2.g || 0;
      b[i] = color2.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color2.opacity = 1;
    return function(t) {
      color2.r = r(t);
      color2.g = g(t);
      color2.b = b(t);
      return color2 + "";
    };
  };
}
var rgbBasis = rgbSpline(basis_default);
var rgbBasisClosed = rgbSpline(basisClosed_default);

// node_modules/d3-interpolate/src/number.js
function number_default(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}

// node_modules/d3-interpolate/src/string.js
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");
function zero(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t) {
    return b(t) + "";
  };
}
function string_default(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
  a = a + "", b = b + "";
  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s[i])
        s[i] += bs;
      else
        s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i])
        s[i] += bm;
      else
        s[++i] = bm;
    } else {
      s[++i] = null;
      q.push({ i, x: number_default(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i])
      s[i] += bs;
    else
      s[++i] = bs;
  }
  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
    for (var i2 = 0, o; i2 < b; ++i2)
      s[(o = q[i2]).i] = o.x(t);
    return s.join("");
  });
}

// node_modules/d3-interpolate/src/transform/decompose.js
var degrees = 180 / Math.PI;
var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose_default(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b))
    a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d)
    c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d))
    c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c)
    a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX,
    scaleY
  };
}

// node_modules/d3-interpolate/src/transform/parse.js
var svgNode;
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity : decompose_default(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
  if (value == null)
    return identity;
  if (!svgNode)
    svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate()))
    return identity;
  value = value.matrix;
  return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
}

// node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180)
        b += 360;
      else if (b - a > 180)
        a += 360;
      q.push({ i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number_default(a, b) });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }
  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({ i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number_default(a, b) });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a, b) {
    var s = [], q = [];
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null;
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n)
        s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

// node_modules/d3-timer/src/timer.js
var frame = 0;
var timeout = 0;
var interval = 0;
var pokeDelay = 1e3;
var taskHead;
var taskTail;
var clockLast = 0;
var clockNow = 0;
var clockSkew = 0;
var clock = typeof performance === "object" && performance.now ? performance : Date;
var setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
  setTimeout(f, 17);
};
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail)
        taskTail._next = this;
      else
        taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};
function timer(callback, delay, time) {
  var t = new Timer();
  t.restart(callback, delay, time);
  return t;
}
function timerFlush() {
  now();
  ++frame;
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0)
      t._call.call(void 0, e);
    t = t._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay = now2 - clockLast;
  if (delay > pokeDelay)
    clockSkew -= delay, clockLast = now2;
}
function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time)
        time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}
function sleep(time) {
  if (frame)
    return;
  if (timeout)
    timeout = clearTimeout(timeout);
  var delay = time - clockNow;
  if (delay > 24) {
    if (time < Infinity)
      timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval)
      interval = clearInterval(interval);
  } else {
    if (!interval)
      clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}

// node_modules/d3-timer/src/timeout.js
function timeout_default(callback, delay, time) {
  var t = new Timer();
  delay = delay == null ? 0 : +delay;
  t.restart((elapsed) => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}

// node_modules/d3-transition/src/transition/schedule.js
var emptyOn = dispatch_default("start", "end", "cancel", "interrupt");
var emptyTween = [];
var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;
function schedule_default(node, name, id2, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules)
    node.__transition = {};
  else if (id2 in schedules)
    return;
  create(node, id2, {
    name,
    index,
    group,
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}
function init(node, id2) {
  var schedule = get2(node, id2);
  if (schedule.state > CREATED)
    throw new Error("too late; already scheduled");
  return schedule;
}
function set2(node, id2) {
  var schedule = get2(node, id2);
  if (schedule.state > STARTED)
    throw new Error("too late; already running");
  return schedule;
}
function get2(node, id2) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id2]))
    throw new Error("transition not found");
  return schedule;
}
function create(node, id2, self2) {
  var schedules = node.__transition, tween;
  schedules[id2] = self2;
  self2.timer = timer(schedule, 0, self2.time);
  function schedule(elapsed) {
    self2.state = SCHEDULED;
    self2.timer.restart(start2, self2.delay, self2.time);
    if (self2.delay <= elapsed)
      start2(elapsed - self2.delay);
  }
  function start2(elapsed) {
    var i, j, n, o;
    if (self2.state !== SCHEDULED)
      return stop();
    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self2.name)
        continue;
      if (o.state === STARTED)
        return timeout_default(start2);
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      } else if (+i < id2) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }
    timeout_default(function() {
      if (self2.state === STARTED) {
        self2.state = RUNNING;
        self2.timer.restart(tick, self2.delay, self2.time);
        tick(elapsed);
      }
    });
    self2.state = STARTING;
    self2.on.call("start", node, node.__data__, self2.index, self2.group);
    if (self2.state !== STARTING)
      return;
    self2.state = STARTED;
    tween = new Array(n = self2.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self2.tween[i].value.call(node, node.__data__, self2.index, self2.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }
  function tick(elapsed) {
    var t = elapsed < self2.duration ? self2.ease.call(null, elapsed / self2.duration) : (self2.timer.restart(stop), self2.state = ENDING, 1), i = -1, n = tween.length;
    while (++i < n) {
      tween[i].call(node, t);
    }
    if (self2.state === ENDING) {
      self2.on.call("end", node, node.__data__, self2.index, self2.group);
      stop();
    }
  }
  function stop() {
    self2.state = ENDED;
    self2.timer.stop();
    delete schedules[id2];
    for (var i in schedules)
      return;
    delete node.__transition;
  }
}

// node_modules/d3-transition/src/interrupt.js
function interrupt_default(node, name) {
  var schedules = node.__transition, schedule, active, empty2 = true, i;
  if (!schedules)
    return;
  name = name == null ? null : name + "";
  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) {
      empty2 = false;
      continue;
    }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }
  if (empty2)
    delete node.__transition;
}

// node_modules/d3-transition/src/selection/interrupt.js
function interrupt_default2(name) {
  return this.each(function() {
    interrupt_default(this, name);
  });
}

// node_modules/d3-transition/src/transition/tween.js
function tweenRemove(id2, name) {
  var tween0, tween1;
  return function() {
    var schedule = set2(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }
    schedule.tween = tween1;
  };
}
function tweenFunction(id2, name, value) {
  var tween0, tween1;
  if (typeof value !== "function")
    throw new Error();
  return function() {
    var schedule = set2(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = { name, value }, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n)
        tween1.push(t);
    }
    schedule.tween = tween1;
  };
}
function tween_default(name, value) {
  var id2 = this._id;
  name += "";
  if (arguments.length < 2) {
    var tween = get2(this.node(), id2).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove : tweenFunction)(id2, name, value));
}
function tweenValue(transition2, name, value) {
  var id2 = transition2._id;
  transition2.each(function() {
    var schedule = set2(this, id2);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });
  return function(node) {
    return get2(node, id2).value[name];
  };
}

// node_modules/d3-transition/src/transition/interpolate.js
function interpolate_default(a, b) {
  var c;
  return (typeof b === "number" ? number_default : b instanceof color ? rgb_default : (c = color(b)) ? (b = c, rgb_default) : string_default)(a, b);
}

// node_modules/d3-transition/src/transition/attr.js
function attrRemove2(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS2(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrConstantNS2(fullname, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrFunction2(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null)
      return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attrFunctionNS2(fullname, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null)
      return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attr_default2(name, value) {
  var fullname = namespace_default(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate_default;
  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS2 : attrFunction2)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS2 : attrRemove2)(fullname) : (fullname.local ? attrConstantNS2 : attrConstant2)(fullname, i, value));
}

// node_modules/d3-transition/src/transition/attrTween.js
function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}
function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}
function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function attrTween_default(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2)
    return (key = this.tween(key)) && key._value;
  if (value == null)
    return this.tween(key, null);
  if (typeof value !== "function")
    throw new Error();
  var fullname = namespace_default(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}

// node_modules/d3-transition/src/transition/delay.js
function delayFunction(id2, value) {
  return function() {
    init(this, id2).delay = +value.apply(this, arguments);
  };
}
function delayConstant(id2, value) {
  return value = +value, function() {
    init(this, id2).delay = value;
  };
}
function delay_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id2, value)) : get2(this.node(), id2).delay;
}

// node_modules/d3-transition/src/transition/duration.js
function durationFunction(id2, value) {
  return function() {
    set2(this, id2).duration = +value.apply(this, arguments);
  };
}
function durationConstant(id2, value) {
  return value = +value, function() {
    set2(this, id2).duration = value;
  };
}
function duration_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id2, value)) : get2(this.node(), id2).duration;
}

// node_modules/d3-transition/src/transition/ease.js
function easeConstant(id2, value) {
  if (typeof value !== "function")
    throw new Error();
  return function() {
    set2(this, id2).ease = value;
  };
}
function ease_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each(easeConstant(id2, value)) : get2(this.node(), id2).ease;
}

// node_modules/d3-transition/src/transition/easeVarying.js
function easeVarying(id2, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function")
      throw new Error();
    set2(this, id2).ease = v;
  };
}
function easeVarying_default(value) {
  if (typeof value !== "function")
    throw new Error();
  return this.each(easeVarying(this._id, value));
}

// node_modules/d3-transition/src/transition/filter.js
function filter_default2(match) {
  if (typeof match !== "function")
    match = matcher_default(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Transition(subgroups, this._parents, this._name, this._id);
}

// node_modules/d3-transition/src/transition/merge.js
function merge_default2(transition2) {
  if (transition2._id !== this._id)
    throw new Error();
  for (var groups0 = this._groups, groups1 = transition2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Transition(merges, this._parents, this._name, this._id);
}

// node_modules/d3-transition/src/transition/on.js
function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0)
      t = t.slice(0, i);
    return !t || t === "start";
  });
}
function onFunction(id2, name, listener) {
  var on0, on1, sit = start(name) ? init : set2;
  return function() {
    var schedule = sit(this, id2), on = schedule.on;
    if (on !== on0)
      (on1 = (on0 = on).copy()).on(name, listener);
    schedule.on = on1;
  };
}
function on_default2(name, listener) {
  var id2 = this._id;
  return arguments.length < 2 ? get2(this.node(), id2).on.on(name) : this.each(onFunction(id2, name, listener));
}

// node_modules/d3-transition/src/transition/remove.js
function removeFunction(id2) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition)
      if (+i !== id2)
        return;
    if (parent)
      parent.removeChild(this);
  };
}
function remove_default2() {
  return this.on("end.remove", removeFunction(this._id));
}

// node_modules/d3-transition/src/transition/select.js
function select_default3(select) {
  var name = this._name, id2 = this._id;
  if (typeof select !== "function")
    select = selector_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node)
          subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule_default(subgroup[i], name, id2, i, subgroup, get2(node, id2));
      }
    }
  }
  return new Transition(subgroups, this._parents, name, id2);
}

// node_modules/d3-transition/src/transition/selectAll.js
function selectAll_default2(select) {
  var name = this._name, id2 = this._id;
  if (typeof select !== "function")
    select = selectorAll_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children2 = select.call(node, node.__data__, i, group), child, inherit2 = get2(node, id2), k = 0, l = children2.length; k < l; ++k) {
          if (child = children2[k]) {
            schedule_default(child, name, id2, k, children2, inherit2);
          }
        }
        subgroups.push(children2);
        parents.push(node);
      }
    }
  }
  return new Transition(subgroups, parents, name, id2);
}

// node_modules/d3-transition/src/transition/selection.js
var Selection2 = selection_default.prototype.constructor;
function selection_default2() {
  return new Selection2(this._groups, this._parents);
}

// node_modules/d3-transition/src/transition/style.js
function styleNull(name, interpolate) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}
function styleRemove2(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function styleFunction2(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
    if (value1 == null)
      string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function styleMaybeRemove(id2, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove2;
  return function() {
    var schedule = set2(this, id2), on = schedule.on, listener = schedule.value[key] == null ? remove2 || (remove2 = styleRemove2(name)) : void 0;
    if (on !== on0 || listener0 !== listener)
      (on1 = (on0 = on).copy()).on(event, listener0 = listener);
    schedule.on = on1;
  };
}
function style_default2(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate_default;
  return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove2(name)) : typeof value === "function" ? this.styleTween(name, styleFunction2(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant2(name, i, value), priority).on("end.style." + name, null);
}

// node_modules/d3-transition/src/transition/styleTween.js
function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}
function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}
function styleTween_default(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2)
    return (key = this.tween(key)) && key._value;
  if (value == null)
    return this.tween(key, null);
  if (typeof value !== "function")
    throw new Error();
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}

// node_modules/d3-transition/src/transition/text.js
function textConstant2(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction2(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
function text_default2(value) {
  return this.tween("text", typeof value === "function" ? textFunction2(tweenValue(this, "text", value)) : textConstant2(value == null ? "" : value + ""));
}

// node_modules/d3-transition/src/transition/textTween.js
function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}
function textTween(value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function textTween_default(value) {
  var key = "text";
  if (arguments.length < 1)
    return (key = this.tween(key)) && key._value;
  if (value == null)
    return this.tween(key, null);
  if (typeof value !== "function")
    throw new Error();
  return this.tween(key, textTween(value));
}

// node_modules/d3-transition/src/transition/transition.js
function transition_default() {
  var name = this._name, id0 = this._id, id1 = newId();
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit2 = get2(node, id0);
        schedule_default(node, name, id1, i, group, {
          time: inherit2.time + inherit2.delay + inherit2.duration,
          delay: 0,
          duration: inherit2.duration,
          ease: inherit2.ease
        });
      }
    }
  }
  return new Transition(groups, this._parents, name, id1);
}

// node_modules/d3-transition/src/transition/end.js
function end_default() {
  var on0, on1, that = this, id2 = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = { value: reject }, end = { value: function() {
      if (--size === 0)
        resolve();
    } };
    that.each(function() {
      var schedule = set2(this, id2), on = schedule.on;
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule.on = on1;
    });
    if (size === 0)
      resolve();
  });
}

// node_modules/d3-transition/src/transition/index.js
var id = 0;
function Transition(groups, parents, name, id2) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id2;
}
function transition(name) {
  return selection_default().transition(name);
}
function newId() {
  return ++id;
}
var selection_prototype = selection_default.prototype;
Transition.prototype = transition.prototype = {
  constructor: Transition,
  select: select_default3,
  selectAll: selectAll_default2,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: filter_default2,
  merge: merge_default2,
  selection: selection_default2,
  transition: transition_default,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: on_default2,
  attr: attr_default2,
  attrTween: attrTween_default,
  style: style_default2,
  styleTween: styleTween_default,
  text: text_default2,
  textTween: textTween_default,
  remove: remove_default2,
  tween: tween_default,
  delay: delay_default,
  duration: duration_default,
  ease: ease_default,
  easeVarying: easeVarying_default,
  end: end_default,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};

// node_modules/d3-ease/src/cubic.js
function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

// node_modules/d3-transition/src/selection/transition.js
var defaultTiming = {
  time: null,
  delay: 0,
  duration: 250,
  ease: cubicInOut
};
function inherit(node, id2) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id2])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id2} not found`);
    }
  }
  return timing;
}
function transition_default2(name) {
  var id2, timing;
  if (name instanceof Transition) {
    id2 = name._id, name = name._name;
  } else {
    id2 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule_default(node, name, id2, i, group, timing || inherit(node, id2));
      }
    }
  }
  return new Transition(groups, this._parents, name, id2);
}

// node_modules/d3-transition/src/selection/index.js
selection_default.prototype.interrupt = interrupt_default2;
selection_default.prototype.transition = transition_default2;

// node_modules/d3-brush/src/brush.js
var { abs, max, min } = Math;
function number1(e) {
  return [+e[0], +e[1]];
}
function number2(e) {
  return [number1(e[0]), number1(e[1])];
}
var X = {
  name: "x",
  handles: ["w", "e"].map(type),
  input: function(x, e) {
    return x == null ? null : [[+x[0], e[0][1]], [+x[1], e[1][1]]];
  },
  output: function(xy) {
    return xy && [xy[0][0], xy[1][0]];
  }
};
var Y = {
  name: "y",
  handles: ["n", "s"].map(type),
  input: function(y, e) {
    return y == null ? null : [[e[0][0], +y[0]], [e[1][0], +y[1]]];
  },
  output: function(xy) {
    return xy && [xy[0][1], xy[1][1]];
  }
};
var XY = {
  name: "xy",
  handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(type),
  input: function(xy) {
    return xy == null ? null : number2(xy);
  },
  output: function(xy) {
    return xy;
  }
};
function type(t) {
  return { type: t };
}

// node_modules/d3-zoom/src/transform.js
function Transform(k, x, y) {
  this.k = k;
  this.x = x;
  this.y = y;
}
Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x, y) {
    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
  },
  apply: function(point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function(x) {
    return x * this.k + this.x;
  },
  applyY: function(y) {
    return y * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x) {
    return (x - this.x) / this.k;
  },
  invertY: function(y) {
    return (y - this.y) / this.k;
  },
  rescaleX: function(x) {
    return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
  },
  rescaleY: function(y) {
    return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var identity2 = new Transform(1, 0, 0);
transform.prototype = Transform.prototype;
function transform(node) {
  while (!node.__zoom)
    if (!(node = node.parentNode))
      return identity2;
  return node.__zoom;
}

// node_modules/d3-dag/bundle/d3-dag.esm.min.js
var Tn = Object.create;
var Se = Object.defineProperty;
var En = Object.defineProperties;
var Vn = Object.getOwnPropertyDescriptor;
var Pn = Object.getOwnPropertyDescriptors;
var Bn = Object.getOwnPropertyNames;
var Ce = Object.getOwnPropertySymbols;
var _n = Object.getPrototypeOf;
var rt = Object.prototype.hasOwnProperty;
var Rt = Object.prototype.propertyIsEnumerable;
var $t = (e, t, r) => t in e ? Se(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r;
var A = (e, t) => {
  for (var r in t || (t = {}))
    rt.call(t, r) && $t(e, r, t[r]);
  if (Ce)
    for (var r of Ce(t))
      Rt.call(t, r) && $t(e, r, t[r]);
  return e;
};
var T = (e, t) => En(e, Pn(t));
var Wn = (e) => Se(e, "__esModule", { value: true });
var B = (e, t) => {
  var r = {};
  for (var n in e)
    rt.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && Ce)
    for (var n of Ce(e))
      t.indexOf(n) < 0 && Rt.call(e, n) && (r[n] = e[n]);
  return r;
};
var _ = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var Rn = (e, t, r, n) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let o of Bn(t))
      !rt.call(e, o) && (r || o !== "default") && Se(e, o, { get: () => t[o], enumerable: !(n = Vn(t, o)) || n.enumerable });
  return e;
};
var nt = (e, t) => Rn(Wn(Se(e != null ? Tn(_n(e)) : {}, "default", !t && e && e.__esModule ? { get: () => e.default, enumerable: true } : { value: e, enumerable: true })), e);
var ft = _((Hi, rr) => {
  function tr(e, t, r, n) {
    this.feasible = r, this.evaluation = t, this.bounded = n, this._tableau = e;
  }
  rr.exports = tr;
  tr.prototype.generateSolutionSet = function() {
    for (var e = {}, t = this._tableau, r = t.varIndexByRow, n = t.variablesPerIndex, o = t.matrix, a = t.rhsColumn, i = t.height - 1, s = Math.round(1 / t.precision), u = 1; u <= i; u += 1) {
      var c = r[u], d = n[c];
      if (!(d === void 0 || d.isSlack === true)) {
        var l = o[u][a];
        e[d.id] = Math.round((Number.EPSILON + l) * s) / s;
      }
    }
    return e;
  };
});
var ir = _((Zi, or) => {
  var nr = ft();
  function Be(e, t, r, n, o) {
    nr.call(this, e, t, r, n), this.iter = o;
  }
  or.exports = Be;
  Be.prototype = Object.create(nr.prototype);
  Be.constructor = Be;
});
var K = _((Qi, ar) => {
  var uo = ft(), lo = ir();
  function ee(e) {
    this.model = null, this.matrix = null, this.width = 0, this.height = 0, this.costRowIndex = 0, this.rhsColumn = 0, this.variablesPerIndex = [], this.unrestrictedVars = null, this.feasible = true, this.evaluation = 0, this.simplexIters = 0, this.varIndexByRow = null, this.varIndexByCol = null, this.rowByVarIndex = null, this.colByVarIndex = null, this.precision = e || 1e-8, this.optionalObjectives = [], this.objectivesByPriority = {}, this.savedState = null, this.availableIndexes = [], this.lastElementIndex = 0, this.variables = null, this.nVars = 0, this.bounded = true, this.unboundedVarIndex = null, this.branchAndCutIterations = 0;
  }
  ar.exports = ee;
  ee.prototype.solve = function() {
    return this.model.getNumberOfIntegerVariables() > 0 ? this.branchAndCut() : this.simplex(), this.updateVariableValues(), this.getSolution();
  };
  function pt(e, t) {
    this.priority = e, this.reducedCosts = new Array(t);
    for (var r = 0; r < t; r += 1)
      this.reducedCosts[r] = 0;
  }
  pt.prototype.copy = function() {
    var e = new pt(this.priority, this.reducedCosts.length);
    return e.reducedCosts = this.reducedCosts.slice(), e;
  };
  ee.prototype.setOptionalObjective = function(e, t, r) {
    var n = this.objectivesByPriority[e];
    if (n === void 0) {
      var o = Math.max(this.width, t + 1);
      n = new pt(e, o), this.objectivesByPriority[e] = n, this.optionalObjectives.push(n), this.optionalObjectives.sort(function(a, i) {
        return a.priority - i.priority;
      });
    }
    n.reducedCosts[t] = r;
  };
  ee.prototype.initialize = function(e, t, r, n) {
    this.variables = r, this.unrestrictedVars = n, this.width = e, this.height = t;
    for (var o = new Array(e), a = 0; a < e; a++)
      o[a] = 0;
    this.matrix = new Array(t);
    for (var i = 0; i < t; i++)
      this.matrix[i] = o.slice();
    this.varIndexByRow = new Array(this.height), this.varIndexByCol = new Array(this.width), this.varIndexByRow[0] = -1, this.varIndexByCol[0] = -1, this.nVars = e + t - 2, this.rowByVarIndex = new Array(this.nVars), this.colByVarIndex = new Array(this.nVars), this.lastElementIndex = this.nVars;
  };
  ee.prototype._resetMatrix = function() {
    var e = this.model.variables, t = this.model.constraints, r = e.length, n = t.length, o, a, i = this.matrix[0], s = this.model.isMinimization === true ? -1 : 1;
    for (o = 0; o < r; o += 1) {
      var u = e[o], c = u.priority, d = s * u.cost;
      c === 0 ? i[o + 1] = d : this.setOptionalObjective(c, o + 1, d), a = e[o].index, this.rowByVarIndex[a] = -1, this.colByVarIndex[a] = o + 1, this.varIndexByCol[o + 1] = a;
    }
    for (var l = 1, p = 0; p < n; p += 1) {
      var g = t[p], m = g.index;
      this.rowByVarIndex[m] = l, this.colByVarIndex[m] = -1, this.varIndexByRow[l] = m;
      var f, N, h, b = g.terms, O = b.length, x = this.matrix[l++];
      if (g.isUpperBound) {
        for (f = 0; f < O; f += 1)
          N = b[f], h = this.colByVarIndex[N.variable.index], x[h] = N.coefficient;
        x[0] = g.rhs;
      } else {
        for (f = 0; f < O; f += 1)
          N = b[f], h = this.colByVarIndex[N.variable.index], x[h] = -N.coefficient;
        x[0] = -g.rhs;
      }
    }
  };
  ee.prototype.setModel = function(e) {
    this.model = e;
    var t = e.nVariables + 1, r = e.nConstraints + 1;
    return this.initialize(t, r, e.variables, e.unrestrictedVariables), this._resetMatrix(), this;
  };
  ee.prototype.getNewElementIndex = function() {
    if (this.availableIndexes.length > 0)
      return this.availableIndexes.pop();
    var e = this.lastElementIndex;
    return this.lastElementIndex += 1, e;
  };
  ee.prototype.density = function() {
    for (var e = 0, t = this.matrix, r = 0; r < this.height; r++)
      for (var n = t[r], o = 0; o < this.width; o++)
        n[o] !== 0 && (e += 1);
    return e / (this.height * this.width);
  };
  ee.prototype.setEvaluation = function() {
    var e = Math.round(1 / this.precision), t = this.matrix[this.costRowIndex][this.rhsColumn], r = Math.round((Number.EPSILON + t) * e) / e;
    this.evaluation = r, this.simplexIters === 0 && (this.bestPossibleEval = r);
  };
  ee.prototype.getSolution = function() {
    var e = this.model.isMinimization === true ? this.evaluation : -this.evaluation;
    return this.model.getNumberOfIntegerVariables() > 0 ? new lo(this, e, this.feasible, this.bounded, this.branchAndCutIterations) : new uo(this, e, this.feasible, this.bounded);
  };
});
var sr = _(() => {
  var we = K();
  we.prototype.simplex = function() {
    return this.bounded = true, this.phase1(), this.feasible === true && this.phase2(), this;
  };
  we.prototype.phase1 = function() {
    for (var e = this.model.checkForCycles, t = [], r = this.matrix, n = this.rhsColumn, o = this.width - 1, a = this.height - 1, i, s = 0; ; ) {
      for (var u = 0, c = -this.precision, d = 1; d <= a; d++) {
        i = this.unrestrictedVars[this.varIndexByRow[d]] === true;
        var l = r[d][n];
        l < c && (c = l, u = d);
      }
      if (u === 0)
        return this.feasible = true, s;
      for (var p = 0, g = -1 / 0, m = r[0], f = r[u], N = 1; N <= o; N++) {
        var h = f[N];
        if (i = this.unrestrictedVars[this.varIndexByCol[N]] === true, i || h < -this.precision) {
          var b = -m[N] / h;
          g < b && (g = b, p = N);
        }
      }
      if (p === 0)
        return this.feasible = false, s;
      if (e) {
        t.push([this.varIndexByRow[u], this.varIndexByCol[p]]);
        var O = this.checkForCycles(t);
        if (O.length > 0)
          return this.model.messages.push("Cycle in phase 1"), this.model.messages.push("Start :" + O[0]), this.model.messages.push("Length :" + O[1]), this.feasible = false, s;
      }
      this.pivot(u, p), s += 1;
    }
  };
  we.prototype.phase2 = function() {
    for (var e = this.model.checkForCycles, t = [], r = this.matrix, n = this.rhsColumn, o = this.width - 1, a = this.height - 1, i = this.precision, s = this.optionalObjectives.length, u = null, c = 0, d, l; ; ) {
      var p = r[this.costRowIndex];
      s > 0 && (u = []);
      for (var g = 0, m = i, f = false, N = 1; N <= o; N++) {
        if (d = p[N], l = this.unrestrictedVars[this.varIndexByCol[N]] === true, s > 0 && -i < d && d < i) {
          u.push(N);
          continue;
        }
        if (l && d < 0) {
          -d > m && (m = -d, g = N, f = true);
          continue;
        }
        d > m && (m = d, g = N, f = false);
      }
      if (s > 0)
        for (var h = 0; g === 0 && u.length > 0 && h < s; ) {
          var b = [], O = this.optionalObjectives[h].reducedCosts;
          m = i;
          for (var x = 0; x < u.length; x++) {
            if (N = u[x], d = O[N], l = this.unrestrictedVars[this.varIndexByCol[N]] === true, -i < d && d < i) {
              b.push(N);
              continue;
            }
            if (l && d < 0) {
              -d > m && (m = -d, g = N, f = true);
              continue;
            }
            d > m && (m = d, g = N, f = false);
          }
          u = b, h += 1;
        }
      if (g === 0)
        return this.setEvaluation(), this.simplexIters += 1, c;
      for (var w = 0, y = 1 / 0, L = this.varIndexByRow, D = 1; D <= a; D++) {
        var C = r[D], S = C[n], z = C[g];
        if (!(-i < z && z < i)) {
          if (z > 0 && i > S && S > -i) {
            y = 0, w = D;
            break;
          }
          var k = f ? -S / z : S / z;
          k > i && y > k && (y = k, w = D);
        }
      }
      if (y === 1 / 0)
        return this.evaluation = -1 / 0, this.bounded = false, this.unboundedVarIndex = this.varIndexByCol[g], c;
      if (e) {
        t.push([this.varIndexByRow[w], this.varIndexByCol[g]]);
        var V = this.checkForCycles(t);
        if (V.length > 0)
          return this.model.messages.push("Cycle in phase 2"), this.model.messages.push("Start :" + V[0]), this.model.messages.push("Length :" + V[1]), this.feasible = false, c;
      }
      this.pivot(w, g, true), c += 1;
    }
  };
  var ht = [];
  we.prototype.pivot = function(e, t) {
    var r = this.matrix, n = r[e][t], o = this.height - 1, a = this.width - 1, i = this.varIndexByRow[e], s = this.varIndexByCol[t];
    this.varIndexByRow[e] = s, this.varIndexByCol[t] = i, this.rowByVarIndex[s] = e, this.rowByVarIndex[i] = -1, this.colByVarIndex[s] = -1, this.colByVarIndex[i] = t;
    for (var u = r[e], c = 0, d = 0; d <= a; d++)
      u[d] >= -1e-16 && u[d] <= 1e-16 ? u[d] = 0 : (u[d] /= n, ht[c] = d, c += 1);
    u[t] = 1 / n;
    for (var l, p, g, m = this.precision, f = 0; f <= o; f++)
      if (f !== e && !(r[f][t] >= -1e-16 && r[f][t] <= 1e-16)) {
        var N = r[f];
        if (l = N[t], l >= -1e-16 && l <= 1e-16)
          l !== 0 && (N[t] = 0);
        else {
          for (p = 0; p < c; p++)
            d = ht[p], g = u[d], g >= -1e-16 && g <= 1e-16 ? g !== 0 && (u[d] = 0) : N[d] = N[d] - l * g;
          N[t] = -l / n;
        }
      }
    var h = this.optionalObjectives.length;
    if (h > 0)
      for (var b = 0; b < h; b += 1) {
        var O = this.optionalObjectives[b].reducedCosts;
        if (l = O[t], l !== 0) {
          for (p = 0; p < c; p++)
            d = ht[p], g = u[d], g !== 0 && (O[d] = O[d] - l * g);
          O[t] = -l / n;
        }
      }
  };
  we.prototype.checkForCycles = function(e) {
    for (var t = 0; t < e.length - 1; t++)
      for (var r = t + 1; r < e.length; r++) {
        var n = e[t], o = e[r];
        if (n[0] === o[0] && n[1] === o[1]) {
          if (r - t > e.length - r)
            break;
          for (var a = true, i = 1; i < r - t; i++) {
            var s = e[t + i], u = e[r + i];
            if (s[0] !== u[0] || s[1] !== u[1]) {
              a = false;
              break;
            }
          }
          if (a)
            return [t, r - t];
        }
      }
    return [];
  };
});
var _e = _((Yi, cr) => {
  function mt(e, t, r, n) {
    this.id = e, this.cost = t, this.index = r, this.value = 0, this.priority = n;
  }
  function ur(e, t, r, n) {
    mt.call(this, e, t, r, n);
  }
  ur.prototype.isInteger = true;
  function gt(e, t) {
    mt.call(this, e, 0, t, 0);
  }
  gt.prototype.isSlack = true;
  function dr(e, t) {
    this.variable = e, this.coefficient = t;
  }
  function lr(e, t, r) {
    return r === 0 || r === "required" ? null : (t = t || 1, r = r || 1, e.isMinimization === false && (t = -t), e.addVariable(t, "r" + e.relaxationIndex++, false, false, r));
  }
  function de(e, t, r, n) {
    this.slack = new gt("s" + r, r), this.index = r, this.model = n, this.rhs = e, this.isUpperBound = t, this.terms = [], this.termsByVarIndex = {}, this.relaxation = null;
  }
  de.prototype.addTerm = function(e, t) {
    var r = t.index, n = this.termsByVarIndex[r];
    if (n === void 0)
      n = new dr(t, e), this.termsByVarIndex[r] = n, this.terms.push(n), this.isUpperBound === true && (e = -e), this.model.updateConstraintCoefficient(this, t, e);
    else {
      var o = n.coefficient + e;
      this.setVariableCoefficient(o, t);
    }
    return this;
  };
  de.prototype.removeTerm = function(e) {
    return this;
  };
  de.prototype.setRightHandSide = function(e) {
    if (e !== this.rhs) {
      var t = e - this.rhs;
      this.isUpperBound === true && (t = -t), this.rhs = e, this.model.updateRightHandSide(this, t);
    }
    return this;
  };
  de.prototype.setVariableCoefficient = function(e, t) {
    var r = t.index;
    if (r === -1) {
      console.warn("[Constraint.setVariableCoefficient] Trying to change coefficient of inexistant variable.");
      return;
    }
    var n = this.termsByVarIndex[r];
    if (n === void 0)
      this.addTerm(e, t);
    else if (e !== n.coefficient) {
      var o = e - n.coefficient;
      this.isUpperBound === true && (o = -o), n.coefficient = e, this.model.updateConstraintCoefficient(this, t, o);
    }
    return this;
  };
  de.prototype.relax = function(e, t) {
    this.relaxation = lr(this.model, e, t), this._relax(this.relaxation);
  };
  de.prototype._relax = function(e) {
    e !== null && (this.isUpperBound ? this.setVariableCoefficient(-1, e) : this.setVariableCoefficient(1, e));
  };
  function me(e, t) {
    this.upperBound = e, this.lowerBound = t, this.model = e.model, this.rhs = e.rhs, this.relaxation = null;
  }
  me.prototype.isEquality = true;
  me.prototype.addTerm = function(e, t) {
    return this.upperBound.addTerm(e, t), this.lowerBound.addTerm(e, t), this;
  };
  me.prototype.removeTerm = function(e) {
    return this.upperBound.removeTerm(e), this.lowerBound.removeTerm(e), this;
  };
  me.prototype.setRightHandSide = function(e) {
    this.upperBound.setRightHandSide(e), this.lowerBound.setRightHandSide(e), this.rhs = e;
  };
  me.prototype.relax = function(e, t) {
    this.relaxation = lr(this.model, e, t), this.upperBound.relaxation = this.relaxation, this.upperBound._relax(this.relaxation), this.lowerBound.relaxation = this.relaxation, this.lowerBound._relax(this.relaxation);
  };
  cr.exports = { Constraint: de, Variable: mt, IntegerVariable: ur, SlackVariable: gt, Equality: me, Term: dr };
});
var fr = _(() => {
  var We = K(), vt = _e().SlackVariable;
  We.prototype.addCutConstraints = function(e) {
    for (var t = e.length, r = this.height, n = r + t, o = r; o < n; o += 1)
      this.matrix[o] === void 0 && (this.matrix[o] = this.matrix[o - 1].slice());
    this.height = n, this.nVars = this.width + this.height - 2;
    for (var a, i = this.width - 1, s = 0; s < t; s += 1) {
      var u = e[s], c = r + s, d = u.type === "min" ? -1 : 1, l = u.varIndex, p = this.rowByVarIndex[l], g = this.matrix[c];
      if (p === -1) {
        for (g[this.rhsColumn] = d * u.value, a = 1; a <= i; a += 1)
          g[a] = 0;
        g[this.colByVarIndex[l]] = d;
      } else {
        var m = this.matrix[p], f = m[this.rhsColumn];
        for (g[this.rhsColumn] = d * (u.value - f), a = 1; a <= i; a += 1)
          g[a] = -d * m[a];
      }
      var N = this.getNewElementIndex();
      this.varIndexByRow[c] = N, this.rowByVarIndex[N] = c, this.colByVarIndex[N] = -1, this.variablesPerIndex[N] = new vt("s" + N, N), this.nVars += 1;
    }
  };
  We.prototype._addLowerBoundMIRCut = function(e) {
    if (e === this.costRowIndex)
      return false;
    var t = this.model, r = this.matrix, n = this.variablesPerIndex[this.varIndexByRow[e]];
    if (!n.isInteger)
      return false;
    var o = r[e][this.rhsColumn], a = o - Math.floor(o);
    if (a < this.precision || 1 - this.precision < a)
      return false;
    var i = this.height;
    r[i] = r[i - 1].slice(), this.height += 1, this.nVars += 1;
    var s = this.getNewElementIndex();
    this.varIndexByRow[i] = s, this.rowByVarIndex[s] = i, this.colByVarIndex[s] = -1, this.variablesPerIndex[s] = new vt("s" + s, s), r[i][this.rhsColumn] = Math.floor(o);
    for (var u = 1; u < this.varIndexByCol.length; u += 1) {
      var c = this.variablesPerIndex[this.varIndexByCol[u]];
      if (!c.isInteger)
        r[i][u] = Math.min(0, r[e][u] / (1 - a));
      else {
        var d = r[e][u], l = Math.floor(d) + Math.max(0, d - Math.floor(d) - a) / (1 - a);
        r[i][u] = l;
      }
    }
    for (var p = 0; p < this.width; p += 1)
      r[i][p] -= r[e][p];
    return true;
  };
  We.prototype._addUpperBoundMIRCut = function(e) {
    if (e === this.costRowIndex)
      return false;
    var t = this.model, r = this.matrix, n = this.variablesPerIndex[this.varIndexByRow[e]];
    if (!n.isInteger)
      return false;
    var o = r[e][this.rhsColumn], a = o - Math.floor(o);
    if (a < this.precision || 1 - this.precision < a)
      return false;
    var i = this.height;
    r[i] = r[i - 1].slice(), this.height += 1, this.nVars += 1;
    var s = this.getNewElementIndex();
    this.varIndexByRow[i] = s, this.rowByVarIndex[s] = i, this.colByVarIndex[s] = -1, this.variablesPerIndex[s] = new vt("s" + s, s), r[i][this.rhsColumn] = -a;
    for (var u = 1; u < this.varIndexByCol.length; u += 1) {
      var c = this.variablesPerIndex[this.varIndexByCol[u]], d = r[e][u], l = d - Math.floor(d);
      c.isInteger ? l <= a ? r[i][u] = -l : r[i][u] = -(1 - l) * a / l : d >= 0 ? r[i][u] = -d : r[i][u] = d * a / (1 - a);
    }
    return true;
  };
  We.prototype.applyMIRCuts = function() {
  };
});
var pr = _(() => {
  var te = K();
  te.prototype._putInBase = function(e) {
    var t = this.rowByVarIndex[e];
    if (t === -1) {
      for (var r = this.colByVarIndex[e], n = 1; n < this.height; n += 1) {
        var o = this.matrix[n][r];
        if (o < -this.precision || this.precision < o) {
          t = n;
          break;
        }
      }
      this.pivot(t, r);
    }
    return t;
  };
  te.prototype._takeOutOfBase = function(e) {
    var t = this.colByVarIndex[e];
    if (t === -1) {
      for (var r = this.rowByVarIndex[e], n = this.matrix[r], o = 1; o < this.height; o += 1) {
        var a = n[o];
        if (a < -this.precision || this.precision < a) {
          t = o;
          break;
        }
      }
      this.pivot(r, t);
    }
    return t;
  };
  te.prototype.updateVariableValues = function() {
    for (var e = this.variables.length, t = Math.round(1 / this.precision), r = 0; r < e; r += 1) {
      var n = this.variables[r], o = n.index, a = this.rowByVarIndex[o];
      if (a === -1)
        n.value = 0;
      else {
        var i = this.matrix[a][this.rhsColumn];
        n.value = Math.round((i + Number.EPSILON) * t) / t;
      }
    }
  };
  te.prototype.updateRightHandSide = function(e, t) {
    var r = this.height - 1, n = this.rowByVarIndex[e.index];
    if (n === -1) {
      for (var o = this.colByVarIndex[e.index], a = 0; a <= r; a += 1) {
        var i = this.matrix[a];
        i[this.rhsColumn] -= t * i[o];
      }
      var s = this.optionalObjectives.length;
      if (s > 0)
        for (var u = 0; u < s; u += 1) {
          var c = this.optionalObjectives[u].reducedCosts;
          c[this.rhsColumn] -= t * c[o];
        }
    } else
      this.matrix[n][this.rhsColumn] -= t;
  };
  te.prototype.updateConstraintCoefficient = function(e, t, r) {
    if (e.index === t.index)
      throw new Error("[Tableau.updateConstraintCoefficient] constraint index should not be equal to variable index !");
    var n = this._putInBase(e.index), o = this.colByVarIndex[t.index];
    if (o === -1)
      for (var a = this.rowByVarIndex[t.index], i = 0; i < this.width; i += 1)
        this.matrix[n][i] += r * this.matrix[a][i];
    else
      this.matrix[n][o] -= r;
  };
  te.prototype.updateCost = function(e, t) {
    var r = e.index, n = this.width - 1, o = this.colByVarIndex[r];
    if (o === -1) {
      var a = this.matrix[this.rowByVarIndex[r]], i;
      if (e.priority === 0) {
        var s = this.matrix[0];
        for (i = 0; i <= n; i += 1)
          s[i] += t * a[i];
      } else {
        var u = this.objectivesByPriority[e.priority].reducedCosts;
        for (i = 0; i <= n; i += 1)
          u[i] += t * a[i];
      }
    } else
      this.matrix[0][o] -= t;
  };
  te.prototype.addConstraint = function(e) {
    var t = e.isUpperBound ? 1 : -1, r = this.height, n = this.matrix[r];
    n === void 0 && (n = this.matrix[0].slice(), this.matrix[r] = n);
    for (var o = this.width - 1, a = 0; a <= o; a += 1)
      n[a] = 0;
    n[this.rhsColumn] = t * e.rhs;
    for (var i = e.terms, s = i.length, u = 0; u < s; u += 1) {
      var c = i[u], d = c.coefficient, l = c.variable.index, p = this.rowByVarIndex[l];
      if (p === -1)
        n[this.colByVarIndex[l]] += t * d;
      else {
        var g = this.matrix[p], m = g[this.rhsColumn];
        for (a = 0; a <= o; a += 1)
          n[a] -= t * d * g[a];
      }
    }
    var f = e.index;
    this.varIndexByRow[r] = f, this.rowByVarIndex[f] = r, this.colByVarIndex[f] = -1, this.height += 1;
  };
  te.prototype.removeConstraint = function(e) {
    var t = e.index, r = this.height - 1, n = this._putInBase(t), o = this.matrix[r];
    this.matrix[r] = this.matrix[n], this.matrix[n] = o, this.varIndexByRow[n] = this.varIndexByRow[r], this.varIndexByRow[r] = -1, this.rowByVarIndex[t] = -1, this.availableIndexes[this.availableIndexes.length] = t, e.slack.index = -1, this.height -= 1;
  };
  te.prototype.addVariable = function(e) {
    var t = this.height - 1, r = this.width, n = this.model.isMinimization === true ? -e.cost : e.cost, o = e.priority, a = this.optionalObjectives.length;
    if (a > 0)
      for (var i = 0; i < a; i += 1)
        this.optionalObjectives[i].reducedCosts[r] = 0;
    o === 0 ? this.matrix[0][r] = n : (this.setOptionalObjective(o, r, n), this.matrix[0][r] = 0);
    for (var s = 1; s <= t; s += 1)
      this.matrix[s][r] = 0;
    var u = e.index;
    this.varIndexByCol[r] = u, this.rowByVarIndex[u] = -1, this.colByVarIndex[u] = r, this.width += 1;
  };
  te.prototype.removeVariable = function(e) {
    var t = e.index, r = this._takeOutOfBase(t), n = this.width - 1;
    if (r !== n) {
      for (var o = this.height - 1, a = 0; a <= o; a += 1) {
        var i = this.matrix[a];
        i[r] = i[n];
      }
      var s = this.optionalObjectives.length;
      if (s > 0)
        for (var u = 0; u < s; u += 1) {
          var c = this.optionalObjectives[u].reducedCosts;
          c[r] = c[n];
        }
      var d = this.varIndexByCol[n];
      this.varIndexByCol[r] = d, this.colByVarIndex[d] = r;
    }
    this.varIndexByCol[n] = -1, this.colByVarIndex[t] = -1, this.availableIndexes[this.availableIndexes.length] = t, e.index = -1, this.width -= 1;
  };
});
var hr = _(() => {
  var co = K();
  co.prototype.log = function(e, t) {
    console.log("****", e, "****"), console.log("Nb Variables", this.width - 1), console.log("Nb Constraints", this.height - 1), console.log("Basic Indexes", this.varIndexByRow), console.log("Non Basic Indexes", this.varIndexByCol), console.log("Rows", this.rowByVarIndex), console.log("Cols", this.colByVarIndex);
    var r = 5, n = "", o = [" "], a, i, s, u, c, d, l, p, g, m, f, N, h;
    for (i = 1; i < this.width; i += 1)
      d = this.varIndexByCol[i], c = this.variablesPerIndex[d], c === void 0 ? l = "c" + d : l = c.id, p = l.length, g = Math.abs(p - 5), m = " ", f = "	", p > 5 ? m += " " : f += "	", o[i] = m, n += f + l;
    console.log(n);
    var b, O = this.matrix[this.costRowIndex], x = "	";
    for (a = 1; a < this.width; a += 1)
      b = "	", x += b, x += o[a], x += O[a].toFixed(r);
    for (b = "	", x += b + o[0] + O[0].toFixed(r), console.log(x + "	Z"), u = 1; u < this.height; u += 1) {
      for (N = this.matrix[u], h = "	", i = 1; i < this.width; i += 1)
        b = "	", h += b + o[i] + N[i].toFixed(r);
      b = "	", h += b + o[0] + N[0].toFixed(r), d = this.varIndexByRow[u], c = this.variablesPerIndex[d], c === void 0 ? l = "c" + d : l = c.id, console.log(h + "	" + l);
    }
    console.log("");
    var w = this.optionalObjectives.length;
    if (w > 0) {
      console.log("    Optional objectives:");
      for (var y = 0; y < w; y += 1) {
        var L = this.optionalObjectives[y].reducedCosts, D = "";
        for (a = 1; a < this.width; a += 1)
          b = L[a] < 0 ? "" : " ", D += b, D += o[a], D += L[a].toFixed(r);
        b = L[0] < 0 ? "" : " ", D += b + o[0] + L[0].toFixed(r), console.log(D + " z" + y);
      }
    }
    return console.log("Feasible?", this.feasible), console.log("evaluation", this.evaluation), this;
  };
});
var mr = _(() => {
  var Re = K();
  Re.prototype.copy = function() {
    var e = new Re(this.precision);
    e.width = this.width, e.height = this.height, e.nVars = this.nVars, e.model = this.model, e.variables = this.variables, e.variablesPerIndex = this.variablesPerIndex, e.unrestrictedVars = this.unrestrictedVars, e.lastElementIndex = this.lastElementIndex, e.varIndexByRow = this.varIndexByRow.slice(), e.varIndexByCol = this.varIndexByCol.slice(), e.rowByVarIndex = this.rowByVarIndex.slice(), e.colByVarIndex = this.colByVarIndex.slice(), e.availableIndexes = this.availableIndexes.slice();
    for (var t = [], r = 0; r < this.optionalObjectives.length; r++)
      t[r] = this.optionalObjectives[r].copy();
    e.optionalObjectives = t;
    for (var n = this.matrix, o = new Array(this.height), a = 0; a < this.height; a++)
      o[a] = n[a].slice();
    return e.matrix = o, e;
  };
  Re.prototype.save = function() {
    this.savedState = this.copy();
  };
  Re.prototype.restore = function() {
    if (this.savedState !== null) {
      var e = this.savedState, t = e.matrix;
      this.nVars = e.nVars, this.model = e.model, this.variables = e.variables, this.variablesPerIndex = e.variablesPerIndex, this.unrestrictedVars = e.unrestrictedVars, this.lastElementIndex = e.lastElementIndex, this.width = e.width, this.height = e.height;
      var r, n;
      for (r = 0; r < this.height; r += 1) {
        var o = t[r], a = this.matrix[r];
        for (n = 0; n < this.width; n += 1)
          a[n] = o[n];
      }
      var i = e.varIndexByRow;
      for (n = 0; n < this.height; n += 1)
        this.varIndexByRow[n] = i[n];
      for (; this.varIndexByRow.length > this.height; )
        this.varIndexByRow.pop();
      var s = e.varIndexByCol;
      for (r = 0; r < this.width; r += 1)
        this.varIndexByCol[r] = s[r];
      for (; this.varIndexByCol.length > this.width; )
        this.varIndexByCol.pop();
      for (var u = e.rowByVarIndex, c = e.colByVarIndex, d = 0; d < this.nVars; d += 1)
        this.rowByVarIndex[d] = u[d], this.colByVarIndex[d] = c[d];
      if (e.optionalObjectives.length > 0 && this.optionalObjectives.length > 0) {
        this.optionalObjectives = [], this.optionalObjectivePerPriority = {};
        for (var l = 0; l < e.optionalObjectives.length; l++) {
          var p = e.optionalObjectives[l].copy();
          this.optionalObjectives[l] = p, this.optionalObjectivePerPriority[p.priority] = p;
        }
      }
    }
  };
});
var Nr = _(() => {
  var gr = K();
  function vr(e, t) {
    this.index = e, this.value = t;
  }
  gr.prototype.getMostFractionalVar = function() {
    for (var e = 0, t = null, r = null, n = 0.5, o = this.model.integerVariables, a = o.length, i = 0; i < a; i++) {
      var s = o[i].index, u = this.rowByVarIndex[s];
      if (u !== -1) {
        var c = this.matrix[u][this.rhsColumn], d = Math.abs(c - Math.round(c));
        e < d && (e = d, t = s, r = c);
      }
    }
    return new vr(t, r);
  };
  gr.prototype.getFractionalVarWithLowestCost = function() {
    for (var e = 1 / 0, t = null, r = null, n = this.model.integerVariables, o = n.length, a = 0; a < o; a++) {
      var i = n[a], s = i.index, u = this.rowByVarIndex[s];
      if (u !== -1) {
        var c = this.matrix[u][this.rhsColumn];
        if (Math.abs(c - Math.round(c)) > this.precision) {
          var d = i.cost;
          e > d && (e = d, t = s, r = c);
        }
      }
    }
    return new vr(t, r);
  };
});
var br = _(() => {
  var Nt = K();
  Nt.prototype.countIntegerValues = function() {
    for (var e = 0, t = 1; t < this.height; t += 1)
      if (this.variablesPerIndex[this.varIndexByRow[t]].isInteger) {
        var r = this.matrix[t][this.rhsColumn];
        r = r - Math.floor(r), r < this.precision && -r < this.precision && (e += 1);
      }
    return e;
  };
  Nt.prototype.isIntegral = function() {
    for (var e = this.model.integerVariables, t = e.length, r = 0; r < t; r++) {
      var n = this.rowByVarIndex[e[r].index];
      if (n !== -1) {
        var o = this.matrix[n][this.rhsColumn];
        if (Math.abs(o - Math.round(o)) > this.precision)
          return false;
      }
    }
    return true;
  };
  Nt.prototype.computeFractionalVolume = function(e) {
    for (var t = -1, r = 1; r < this.height; r += 1)
      if (this.variablesPerIndex[this.varIndexByRow[r]].isInteger) {
        var n = this.matrix[r][this.rhsColumn];
        n = Math.abs(n);
        var o = Math.min(n - Math.floor(n), Math.floor(n + 1));
        if (o < this.precision) {
          if (!e)
            return 0;
        } else
          t === -1 ? t = n : t *= n;
      }
    return t === -1 ? 0 : t;
  };
});
var yr = _((ca, xr) => {
  sr();
  fr();
  pr();
  hr();
  mr();
  Nr();
  br();
  xr.exports = K();
});
var xt = _(() => {
  var Or = K();
  function wr(e, t, r) {
    this.type = e, this.varIndex = t, this.value = r;
  }
  function bt(e, t) {
    this.relaxedEvaluation = e, this.cuts = t;
  }
  function fo(e, t) {
    return t.relaxedEvaluation - e.relaxedEvaluation;
  }
  Or.prototype.applyCuts = function(e) {
    if (this.restore(), this.addCutConstraints(e), this.simplex(), this.model.useMIRCuts)
      for (var t = true; t; ) {
        var r = this.computeFractionalVolume(true);
        this.applyMIRCuts(), this.simplex();
        var n = this.computeFractionalVolume(true);
        n >= 0.9 * r && (t = false);
      }
  };
  Or.prototype.branchAndCut = function() {
    var e = [], t = 0, r = this.model.tolerance, n = true, o = 1e99;
    this.model.timeout && (o = Date.now() + this.model.timeout);
    for (var a = 1 / 0, i = null, s = [], u = 0; u < this.optionalObjectives.length; u += 1)
      s.push(1 / 0);
    var c = new bt(-1 / 0, []), d;
    for (e.push(c); e.length > 0 && n === true && Date.now() < o; )
      if (this.model.isMinimization ? d = this.bestPossibleEval * (1 + r) : d = this.bestPossibleEval * (1 - r), r > 0 && a < d && (n = false), c = e.pop(), !(c.relaxedEvaluation > a)) {
        var l = c.cuts;
        if (this.applyCuts(l), t++, this.feasible !== false) {
          var p = this.evaluation;
          if (!(p > a)) {
            if (p === a) {
              for (var g = true, m = 0; m < this.optionalObjectives.length && !(this.optionalObjectives[m].reducedCosts[0] > s[m]); m += 1)
                if (this.optionalObjectives[m].reducedCosts[0] < s[m]) {
                  g = false;
                  break;
                }
              if (g)
                continue;
            }
            if (this.isIntegral() === true) {
              if (this.__isIntegral = true, t === 1) {
                this.branchAndCutIterations = t;
                return;
              }
              i = c, a = p;
              for (var f = 0; f < this.optionalObjectives.length; f += 1)
                s[f] = this.optionalObjectives[f].reducedCosts[0];
            } else {
              t === 1 && this.save();
              for (var N = this.getMostFractionalVar(), h = N.index, b = [], O = [], x = l.length, w = 0; w < x; w += 1) {
                var y = l[w];
                y.varIndex === h ? y.type === "min" ? O.push(y) : b.push(y) : (b.push(y), O.push(y));
              }
              var L = Math.ceil(N.value), D = Math.floor(N.value), C = new wr("min", h, L);
              b.push(C);
              var S = new wr("max", h, D);
              O.push(S), e.push(new bt(p, b)), e.push(new bt(p, O)), e.sort(fo);
            }
          }
        }
      }
    i !== null && this.applyCuts(i.cuts), this.branchAndCutIterations = t;
  };
});
var Sr = _((ga, Lr) => {
  var po = K(), ha = xt(), De = _e(), $e = De.Constraint, Dr = De.Equality, ho = De.Variable, mo = De.IntegerVariable, ma = De.Term;
  function G(e, t) {
    this.tableau = new po(e), this.name = t, this.variables = [], this.integerVariables = [], this.unrestrictedVariables = {}, this.constraints = [], this.nConstraints = 0, this.nVariables = 0, this.isMinimization = true, this.tableauInitialized = false, this.relaxationIndex = 1, this.useMIRCuts = false, this.checkForCycles = true, this.messages = [];
  }
  Lr.exports = G;
  G.prototype.minimize = function() {
    return this.isMinimization = true, this;
  };
  G.prototype.maximize = function() {
    return this.isMinimization = false, this;
  };
  G.prototype._getNewElementIndex = function() {
    if (this.availableIndexes.length > 0)
      return this.availableIndexes.pop();
    var e = this.lastElementIndex;
    return this.lastElementIndex += 1, e;
  };
  G.prototype._addConstraint = function(e) {
    var t = e.slack;
    this.tableau.variablesPerIndex[t.index] = t, this.constraints.push(e), this.nConstraints += 1, this.tableauInitialized === true && this.tableau.addConstraint(e);
  };
  G.prototype.smallerThan = function(e) {
    var t = new $e(e, true, this.tableau.getNewElementIndex(), this);
    return this._addConstraint(t), t;
  };
  G.prototype.greaterThan = function(e) {
    var t = new $e(e, false, this.tableau.getNewElementIndex(), this);
    return this._addConstraint(t), t;
  };
  G.prototype.equal = function(e) {
    var t = new $e(e, true, this.tableau.getNewElementIndex(), this);
    this._addConstraint(t);
    var r = new $e(e, false, this.tableau.getNewElementIndex(), this);
    return this._addConstraint(r), new Dr(t, r);
  };
  G.prototype.addVariable = function(e, t, r, n, o) {
    if (typeof o == "string")
      switch (o) {
        case "required":
          o = 0;
          break;
        case "strong":
          o = 1;
          break;
        case "medium":
          o = 2;
          break;
        case "weak":
          o = 3;
          break;
        default:
          o = 0;
          break;
      }
    var a = this.tableau.getNewElementIndex();
    t == null && (t = "v" + a), e == null && (e = 0), o == null && (o = 0);
    var i;
    return r ? (i = new mo(t, e, a, o), this.integerVariables.push(i)) : i = new ho(t, e, a, o), this.variables.push(i), this.tableau.variablesPerIndex[a] = i, n && (this.unrestrictedVariables[a] = true), this.nVariables += 1, this.tableauInitialized === true && this.tableau.addVariable(i), i;
  };
  G.prototype._removeConstraint = function(e) {
    var t = this.constraints.indexOf(e);
    if (t === -1) {
      console.warn("[Model.removeConstraint] Constraint not present in model");
      return;
    }
    this.constraints.splice(t, 1), this.nConstraints -= 1, this.tableauInitialized === true && this.tableau.removeConstraint(e), e.relaxation && this.removeVariable(e.relaxation);
  };
  G.prototype.removeConstraint = function(e) {
    return e.isEquality ? (this._removeConstraint(e.upperBound), this._removeConstraint(e.lowerBound)) : this._removeConstraint(e), this;
  };
  G.prototype.removeVariable = function(e) {
    var t = this.variables.indexOf(e);
    if (t === -1) {
      console.warn("[Model.removeVariable] Variable not present in model");
      return;
    }
    return this.variables.splice(t, 1), this.tableauInitialized === true && this.tableau.removeVariable(e), this;
  };
  G.prototype.updateRightHandSide = function(e, t) {
    return this.tableauInitialized === true && this.tableau.updateRightHandSide(e, t), this;
  };
  G.prototype.updateConstraintCoefficient = function(e, t, r) {
    return this.tableauInitialized === true && this.tableau.updateConstraintCoefficient(e, t, r), this;
  };
  G.prototype.setCost = function(e, t) {
    var r = e - t.cost;
    return this.isMinimization === false && (r = -r), t.cost = e, this.tableau.updateCost(t, r), this;
  };
  G.prototype.loadJson = function(e) {
    this.isMinimization = e.opType !== "max";
    for (var t = e.variables, r = e.constraints, n = {}, o = {}, a = Object.keys(r), i = a.length, s = 0; s < i; s += 1) {
      var u = a[s], c = r[u], d = c.equal, l = c.weight, p = c.priority, g = l !== void 0 || p !== void 0, m, f;
      if (d === void 0) {
        var N = c.min;
        N !== void 0 && (m = this.greaterThan(N), n[u] = m, g && m.relax(l, p));
        var h = c.max;
        h !== void 0 && (f = this.smallerThan(h), o[u] = f, g && f.relax(l, p));
      } else {
        m = this.greaterThan(d), n[u] = m, f = this.smallerThan(d), o[u] = f;
        var b = new Dr(m, f);
        g && b.relax(l, p);
      }
    }
    var O = Object.keys(t), x = O.length;
    this.tolerance = e.tolerance || 0, e.timeout && (this.timeout = e.timeout), e.options && (e.options.timeout && (this.timeout = e.options.timeout), this.tolerance === 0 && (this.tolerance = e.options.tolerance || 0), e.options.useMIRCuts && (this.useMIRCuts = e.options.useMIRCuts), typeof e.options.exitOnCycles == "undefined" ? this.checkForCycles = true : this.checkForCycles = e.options.exitOnCycles);
    for (var w = e.ints || {}, y = e.binaries || {}, L = e.unrestricted || {}, D = e.optimize, C = 0; C < x; C += 1) {
      var S = O[C], z = t[S], k = z[D] || 0, V = !!y[S], E = !!w[S] || V, P = !!L[S], M = this.addVariable(k, S, E, P);
      V && this.smallerThan(1).addTerm(1, M);
      var $ = Object.keys(z);
      for (s = 0; s < $.length; s += 1) {
        var j = $[s];
        if (j !== D) {
          var q = z[j], R = n[j];
          R !== void 0 && R.addTerm(q, M);
          var ne = o[j];
          ne !== void 0 && ne.addTerm(q, M);
        }
      }
    }
    return this;
  };
  G.prototype.getNumberOfIntegerVariables = function() {
    return this.integerVariables.length;
  };
  G.prototype.solve = function() {
    return this.tableauInitialized === false && (this.tableau.setModel(this), this.tableauInitialized = true), this.tableau.solve();
  };
  G.prototype.isFeasible = function() {
    return this.tableau.feasible;
  };
  G.prototype.save = function() {
    return this.tableau.save();
  };
  G.prototype.restore = function() {
    return this.tableau.restore();
  };
  G.prototype.activateMIRCuts = function(e) {
    this.useMIRCuts = e;
  };
  G.prototype.debug = function(e) {
    this.checkForCycles = e;
  };
  G.prototype.log = function(e) {
    return this.tableau.log(e);
  };
});
var Ir = _((Cr) => {
  Cr.CleanObjectiveAttributes = function(e) {
    var t, r, n;
    if (typeof e.optimize == "string")
      if (e.constraints[e.optimize]) {
        t = Math.random();
        for (r in e.variables)
          e.variables[r][e.optimize] && (e.variables[r][t] = e.variables[r][e.optimize]);
        return e.constraints[t] = e.constraints[e.optimize], delete e.constraints[e.optimize], e;
      } else
        return e;
    else {
      for (n in e.optimize)
        if (e.constraints[n])
          if (e.constraints[n] === "equal")
            delete e.optimize[n];
          else {
            t = Math.random();
            for (r in e.variables)
              e.variables[r][n] && (e.variables[r][t] = e.variables[r][n]);
            e.constraints[t] = e.constraints[n], delete e.constraints[n];
          }
      return e;
    }
  };
});
var Ge = _((Na, kr) => {
  function go(e) {
    var t = { is_blank: /^\W{0,}$/, is_objective: /(max|min)(imize){0,}\:/i, is_int: /^(?!\/\*)\W{0,}int/i, is_bin: /^(?!\/\*)\W{0,}bin/i, is_constraint: /(\>|\<){0,}\=/i, is_unrestricted: /^\S{0,}unrestricted/i, parse_lhs: /(\-|\+){0,1}\s{0,1}\d{0,}\.{0,}\d{0,}\s{0,}[A-Za-z]\S{0,}/gi, parse_rhs: /(\-|\+){0,1}\d{1,}\.{0,}\d{0,}\W{0,}\;{0,1}$/i, parse_dir: /(\>|\<){0,}\=/gi, parse_int: /[^\s|^\,]+/gi, parse_bin: /[^\s|^\,]+/gi, get_num: /(\-|\+){0,1}(\W|^)\d+\.{0,1}\d{0,}/g, get_word: /[A-Za-z].*/ }, r = { opType: "", optimize: "_obj", constraints: {}, variables: {} }, n = { ">=": "min", "<=": "max", "=": "equal" }, o = "", a = 0, i = null, s = "", u = "", c = "", d = 0;
    typeof e == "string" && (e = e.split(`
`));
    for (var l = 0; l < e.length; l++)
      if (c = "__" + l, o = e[l], a = 0, i = null, t.is_objective.test(o))
        r.opType = o.match(/(max|min)/gi)[0], i = o.match(t.parse_lhs).map(function(m) {
          return m.replace(/\s+/, "");
        }).slice(1), i.forEach(function(m) {
          s = m.match(t.get_num), s === null ? m.substr(0, 1) === "-" ? s = -1 : s = 1 : s = s[0], s = parseFloat(s), u = m.match(t.get_word)[0].replace(/\;$/, ""), r.variables[u] = r.variables[u] || {}, r.variables[u]._obj = s;
        });
      else if (t.is_int.test(o))
        i = o.match(t.parse_int).slice(1), r.ints = r.ints || {}, i.forEach(function(m) {
          m = m.replace(";", ""), r.ints[m] = 1;
        });
      else if (t.is_bin.test(o))
        i = o.match(t.parse_bin).slice(1), r.binaries = r.binaries || {}, i.forEach(function(m) {
          m = m.replace(";", ""), r.binaries[m] = 1;
        });
      else if (t.is_constraint.test(o)) {
        var p = o.indexOf(":"), g = p === -1 ? o : o.slice(p + 1);
        i = g.match(t.parse_lhs).map(function(m) {
          return m.replace(/\s+/, "");
        }), i.forEach(function(m) {
          s = m.match(t.get_num), s === null ? m.substr(0, 1) === "-" ? s = -1 : s = 1 : s = s[0], s = parseFloat(s), u = m.match(t.get_word)[0], r.variables[u] = r.variables[u] || {}, r.variables[u][c] = s;
        }), d = parseFloat(o.match(t.parse_rhs)[0]), o = n[o.match(t.parse_dir)[0]], r.constraints[c] = r.constraints[c] || {}, r.constraints[c][o] = d;
      } else
        t.is_unrestricted.test(o) && (i = o.match(t.parse_int).slice(1), r.unrestricted = r.unrestricted || {}, i.forEach(function(m) {
          m = m.replace(";", ""), r.unrestricted[m] = 1;
        }));
    return r;
  }
  function vo(e) {
    if (!e)
      throw new Error("Solver requires a model to operate on");
    var t = "", r = [], n = 1, o = { max: "<=", min: ">=", equal: "=" }, a = new RegExp("[^A-Za-z0-9_[{}/.&#$%~'@^]", "gi");
    if (e.opType) {
      t += e.opType + ":";
      for (var i in e.variables)
        e.variables[i][i] = e.variables[i][i] ? e.variables[i][i] : 1, e.variables[i][e.optimize] && (t += " " + e.variables[i][e.optimize] + " " + i.replace(a, "_"));
    } else
      t += "max:";
    t += `;

`;
    for (var s in e.constraints)
      for (var u in e.constraints[s])
        if (typeof o[u] != "undefined") {
          for (var c in e.variables)
            typeof e.variables[c][s] != "undefined" && (t += " " + e.variables[c][s] + " " + c.replace(a, "_"));
          t += " " + o[u] + " " + e.constraints[s][u], t += `;
`;
        }
    if (e.ints) {
      t += `

`;
      for (var d in e.ints)
        t += "int " + d.replace(a, "_") + `;
`;
    }
    if (e.unrestricted) {
      t += `

`;
      for (var l in e.unrestricted)
        t += "unrestricted " + l.replace(a, "_") + `;
`;
    }
    return t;
  }
  kr.exports = function(e) {
    return e.length ? go(e) : vo(e);
  };
});
var zr = _(() => {
});
var Mr = _(() => {
});
var Tr = _((yt) => {
  yt.reformat = Ge();
  function Ar(e) {
    return e = e.replace("\\r\\n", `\r
`), e = e.split(`\r
`), e = e.filter(function(t) {
      var r;
      return r = new RegExp(" 0$", "gi"), !(r.test(t) === true || (r = new RegExp("\\d$", "gi"), r.test(t) === false));
    }).map(function(t) {
      return t.split(/\:{0,1} +(?=\d)/);
    }).reduce(function(t, r, n) {
      return t[r[0]] = r[1], t;
    }, {}), e;
  }
  yt.solve = function(e) {
    return new Promise(function(t, r) {
      typeof window != "undefined" && r("Function Not Available in Browser");
      var n = Ge()(e);
      e.external || r("Data for this function must be contained in the 'external' attribute. Not seeing anything there."), e.external.binPath || r("No Executable | Binary path provided in arguments as 'binPath'"), e.external.args || r("No arguments array for cli | bash provided on 'args' attribute"), e.external.tempName || r("No 'tempName' given. This is necessary to produce a staging file for the solver to operate on");
      var o = zr();
      o.writeFile(e.external.tempName, n, function(a, i) {
        if (a)
          r(a);
        else {
          var s = Mr().execFile;
          e.external.args.push(e.external.tempName), s(e.external.binPath, e.external.args, function(u, c) {
            if (u)
              if (u.code === 1)
                t(Ar(c));
              else {
                var d = { "-2": "Out of Memory", "1": "SUBOPTIMAL", "2": "INFEASIBLE", "3": "UNBOUNDED", "4": "DEGENERATE", "5": "NUMFAILURE", "6": "USER-ABORT", "7": "TIMEOUT", "9": "PRESOLVED", "25": "ACCURACY ERROR", "255": "FILE-ERROR" }, l = { code: u.code, meaning: d[u.code], data: c };
                r(l);
              }
            else
              t(Ar(c));
          });
        }
      });
    });
  };
});
var Vr = _((Da, Er) => {
  Er.exports = { lpsolve: Tr() };
});
var Ot = _((La, Pr) => {
  Pr.exports = function(e, t) {
    var r = t.optimize, n = JSON.parse(JSON.stringify(t.optimize)), o = Object.keys(t.optimize), a, i = 0, s = {}, u = "", c = {}, d = [], l, p, g, m, f;
    for (delete t.optimize, l = 0; l < o.length; l++)
      n[o[l]] = 0;
    for (l = 0; l < o.length; l++) {
      t.optimize = o[l], t.opType = r[o[l]], a = e.Solve(t, void 0, void 0, true);
      for (m in o)
        if (!t.variables[o[m]]) {
          a[o[m]] = a[o[m]] ? a[o[m]] : 0;
          for (g in t.variables)
            t.variables[g][o[m]] && a[g] && (a[o[m]] += a[g] * t.variables[g][o[m]]);
        }
      for (u = "base", p = 0; p < o.length; p++)
        a[o[p]] ? u += "-" + (a[o[p]] * 1e3 | 0) / 1e3 : u += "-0";
      if (!s[u]) {
        for (s[u] = 1, i++, p = 0; p < o.length; p++)
          a[o[p]] && (n[o[p]] += a[o[p]]);
        delete a.feasible, delete a.result, d.push(a);
      }
    }
    for (l = 0; l < o.length; l++)
      t.constraints[o[l]] = { equal: n[o[l]] / i };
    t.optimize = "cheater-" + Math.random(), t.opType = "max";
    for (l in t.variables)
      t.variables[l].cheater = 1;
    for (l in d)
      for (g in d[l])
        c[g] = c[g] || { min: 1e99, max: -1e99 };
    for (l in c)
      for (g in d)
        d[g][l] ? (d[g][l] > c[l].max && (c[l].max = d[g][l]), d[g][l] < c[l].min && (c[l].min = d[g][l])) : (d[g][l] = 0, c[l].min = 0);
    return a = e.Solve(t, void 0, void 0, true), { midpoint: a, vertices: d, ranges: c };
  };
});
var Wr = _((Sa, _r) => {
  var No = yr(), wt = Sr(), bo = xt(), Ue = _e(), Br = Ir(), xo = Ue.Constraint, yo = Ue.Variable, Oo = Ue.Numeral, wo = Ue.Term, qe = Vr(), je = function() {
    "use strict";
    this.Model = wt, this.branchAndCut = bo, this.Constraint = xo, this.Variable = yo, this.Numeral = Oo, this.Term = wo, this.Tableau = No, this.lastSolvedModel = null, this.External = qe, this.Solve = function(e, t, r, n) {
      if (n)
        for (var o in Br)
          e = Br[o](e);
      if (!e)
        throw new Error("Solver requires a model to operate on");
      if (typeof e.optimize == "object" && Object.keys(e.optimize > 1))
        return Ot()(this, e);
      if (e.external) {
        var a = Object.keys(qe);
        if (a = JSON.stringify(a), !e.external.solver)
          throw new Error("The model you provided has an 'external' object that doesn't have a solver attribute. Use one of the following:" + a);
        if (!qe[e.external.solver])
          throw new Error("No support (yet) for " + e.external.solver + ". Please use one of these instead:" + a);
        return qe[e.external.solver].solve(e);
      } else {
        e instanceof wt || (e = new wt(t).loadJson(e));
        var i = e.solve();
        if (this.lastSolvedModel = e, i.solutionSet = i.generateSolutionSet(), r)
          return i;
        var s = {};
        return s.feasible = i.feasible, s.result = i.evaluation, s.bounded = i.bounded, i._tableau.__isIntegral && (s.isIntegral = true), Object.keys(i.solutionSet).forEach(function(u) {
          i.solutionSet[u] !== 0 && (s[u] = i.solutionSet[u]);
        }), s;
      }
    }, this.ReformatLP = Ge(), this.MultiObjective = function(e) {
      return Ot()(this, e);
    };
  };
  typeof define == "function" ? define([], function() {
    return new je();
  }) : typeof window == "object" ? window.solver = new je() : typeof self == "object" && (self.solver = new je());
  _r.exports = new je();
});
var qr = _((Va, Ur) => {
  "use strict";
  var Le = 1e-60, $r, Gr;
  do
    Le += Le, $r = 1 + 0.1 * Le, Gr = 1 + 0.2 * Le;
  while ($r <= 1 || Gr <= 1);
  Ur.exports = Le;
});
var Fr = _((Pa, jr) => {
  "use strict";
  function So(e, t, r) {
    let n, o;
    for (let a = 1; a <= r; a += 1) {
      e[a][a] = 1 / e[a][a], o = -e[a][a];
      for (let i = 1; i < a; i += 1)
        e[i][a] *= o;
      if (n = a + 1, r < n)
        break;
      for (let i = n; i <= r; i += 1) {
        o = e[a][i], e[a][i] = 0;
        for (let s = 1; s <= a; s += 1)
          e[s][i] += o * e[s][a];
      }
    }
  }
  jr.exports = So;
});
var Zr = _((Ba, Hr) => {
  "use strict";
  function Co(e, t, r, n) {
    let o, a;
    for (o = 1; o <= r; o += 1) {
      a = 0;
      for (let i = 1; i < o; i += 1)
        a += e[i][o] * n[i];
      n[o] = (n[o] - a) / e[o][o];
    }
    for (let i = 1; i <= r; i += 1) {
      o = r + 1 - i, n[o] /= e[o][o], a = -n[o];
      for (let s = 1; s < o; s += 1)
        n[s] += a * e[s][o];
    }
  }
  Hr.exports = Co;
});
var Jr = _((_a, Qr) => {
  "use strict";
  function Io(e, t, r, n) {
    let o, a, i;
    for (let s = 1; s <= r; s += 1) {
      if (n[1] = s, i = 0, o = s - 1, o < 1) {
        if (i = e[s][s] - i, i <= 0)
          break;
        e[s][s] = Math.sqrt(i);
      } else {
        for (let u = 1; u <= o; u += 1) {
          a = e[u][s];
          for (let c = 1; c < u; c += 1)
            a -= e[c][s] * e[c][u];
          a /= e[u][u], e[u][s] = a, i += a * a;
        }
        if (i = e[s][s] - i, i <= 0)
          break;
        e[s][s] = Math.sqrt(i);
      }
      n[1] = 0;
    }
  }
  Qr.exports = Io;
});
var Yr = _((Wa, Kr) => {
  "use strict";
  var Lt = qr(), ko = Fr(), zo = Zr(), Mo = Jr();
  function Ao(e, t, r, n, o, a, i, s, u, c, d, l, p, g = 0, m, f, N) {
    let h, b, O, x, w, y, L, D, C, S, z, k, V, E, P = Math.min(n, d), M = 2 * n + P * (P + 5) / 2 + 2 * d + 1;
    for (let v = 1; v <= n; v += 1)
      f[v] = t[v];
    for (let v = n + 1; v <= M; v += 1)
      f[v] = 0;
    for (let v = 1; v <= d; v += 1)
      p[v] = 0, a[v] = 0;
    let $ = [];
    if (N[1] === 0) {
      if (Mo(e, r, n, $), $[1] !== 0) {
        N[1] = 2;
        return;
      }
      zo(e, r, n, t), ko(e, r, n);
    } else {
      for (let v = 1; v <= n; v += 1) {
        o[v] = 0;
        for (let I = 1; I <= v; I += 1)
          o[v] += e[I][v] * t[I];
      }
      for (let v = 1; v <= n; v += 1) {
        t[v] = 0;
        for (let I = v; I <= n; I += 1)
          t[v] += e[v][I] * o[I];
      }
    }
    i[1] = 0;
    for (let v = 1; v <= n; v += 1) {
      o[v] = t[v], i[1] += f[v] * o[v], f[v] = 0;
      for (let I = v + 1; I <= n; I += 1)
        e[I][v] = 0;
    }
    i[1] = -i[1] / 2, N[1] = 0;
    let j = n, q = j + n, R = q + P, ne = R + P + 1, Y2 = ne + P * (P + 1) / 2, tt = Y2 + d;
    for (let v = 1; v <= d; v += 1) {
      y = 0;
      for (let I = 1; I <= n; I += 1)
        y += s[I][v] * s[I][v];
      f[tt + v] = Math.sqrt(y);
    }
    x = g, m[1] = 0, m[2] = 0;
    function kn() {
      m[1] += 1, M = Y2;
      for (let v = 1; v <= d; v += 1) {
        M += 1, y = -u[v];
        for (let I = 1; I <= n; I += 1)
          y += s[I][v] * o[I];
        if (Math.abs(y) < Lt && (y = 0), v > l)
          f[M] = y;
        else if (f[M] = -Math.abs(y), y > 0) {
          for (let I = 1; I <= n; I += 1)
            s[I][v] = -s[I][v];
          u[v] = -u[v];
        }
      }
      for (let v = 1; v <= x; v += 1)
        f[Y2 + p[v]] = 0;
      O = 0, w = 0;
      for (let v = 1; v <= d; v += 1)
        f[Y2 + v] < w * f[tt + v] && (O = v, w = f[Y2 + v] / f[tt + v]);
      if (O === 0) {
        for (let v = 1; v <= x; v += 1)
          a[p[v]] = f[R + v];
        return 999;
      }
      return 0;
    }
    function zn() {
      for (let v = 1; v <= n; v += 1) {
        y = 0;
        for (let I = 1; I <= n; I += 1)
          y += e[I][v] * s[I][O];
        f[v] = y;
      }
      h = j;
      for (let v = 1; v <= n; v += 1)
        f[h + v] = 0;
      for (let v = x + 1; v <= n; v += 1)
        for (let I = 1; I <= n; I += 1)
          f[h + I] = f[h + I] + e[I][v] * f[v];
      k = true;
      for (let v = x; v >= 1; v -= 1) {
        y = f[v], M = ne + v * (v + 3) / 2, h = M - v;
        for (let I = v + 1; I <= x; I += 1)
          y -= f[M] * f[q + I], M += I;
        y /= f[h], f[q + v] = y, !(p[v] <= l) && (y <= 0 || (k = false, b = v));
      }
      if (!k) {
        L = f[R + b] / f[q + b];
        for (let v = 1; v <= x; v += 1)
          p[v] <= l || f[q + v] <= 0 || (w = f[R + v] / f[q + v], w < L && (L = w, b = v));
      }
      y = 0;
      for (let v = j + 1; v <= j + n; v += 1)
        y += f[v] * f[v];
      if (Math.abs(y) <= Lt) {
        if (k)
          return N[1] = 1, 999;
        for (let v = 1; v <= x; v += 1)
          f[R + v] = f[R + v] - L * f[q + v];
        return f[R + x + 1] = f[R + x + 1] + L, 700;
      }
      y = 0;
      for (let v = 1; v <= n; v += 1)
        y += f[j + v] * s[v][O];
      D = -f[Y2 + O] / y, V = true, k || L < D && (D = L, V = false);
      for (let v = 1; v <= n; v += 1)
        o[v] += D * f[j + v], Math.abs(o[v]) < Lt && (o[v] = 0);
      i[1] += D * y * (D / 2 + f[R + x + 1]);
      for (let v = 1; v <= x; v += 1)
        f[R + v] = f[R + v] - D * f[q + v];
      if (f[R + x + 1] = f[R + x + 1] + D, V) {
        x += 1, p[x] = O, M = ne + (x - 1) * x / 2 + 1;
        for (let v = 1; v <= x - 1; v += 1)
          f[M] = f[v], M += 1;
        if (x === n)
          f[M] = f[n];
        else {
          for (let v = n; v >= x + 1; v -= 1)
            if (f[v] !== 0 && (C = Math.max(Math.abs(f[v - 1]), Math.abs(f[v])), S = Math.min(Math.abs(f[v - 1]), Math.abs(f[v])), f[v - 1] >= 0 ? w = Math.abs(C * Math.sqrt(1 + S * S / (C * C))) : w = -Math.abs(C * Math.sqrt(1 + S * S / (C * C))), C = f[v - 1] / w, S = f[v] / w, C !== 1))
              if (C === 0) {
                f[v - 1] = S * w;
                for (let I = 1; I <= n; I += 1)
                  w = e[I][v - 1], e[I][v - 1] = e[I][v], e[I][v] = w;
              } else {
                f[v - 1] = w, z = S / (1 + C);
                for (let I = 1; I <= n; I += 1)
                  w = C * e[I][v - 1] + S * e[I][v], e[I][v] = z * (e[I][v - 1] + w) - e[I][v], e[I][v - 1] = w;
              }
          f[M] = f[x];
        }
      } else {
        y = -u[O];
        for (let v = 1; v <= n; v += 1)
          y += o[v] * s[v][O];
        if (O > l)
          f[Y2 + O] = y;
        else if (f[Y2 + O] = -Math.abs(y), y > 0) {
          for (let v = 1; v <= n; v += 1)
            s[v][O] = -s[v][O];
          u[O] = -u[O];
        }
        return 700;
      }
      return 0;
    }
    function Mn() {
      if (M = ne + b * (b + 1) / 2 + 1, h = M + b, f[h] === 0 || (C = Math.max(Math.abs(f[h - 1]), Math.abs(f[h])), S = Math.min(Math.abs(f[h - 1]), Math.abs(f[h])), f[h - 1] >= 0 ? w = Math.abs(C * Math.sqrt(1 + S * S / (C * C))) : w = -Math.abs(C * Math.sqrt(1 + S * S / (C * C))), C = f[h - 1] / w, S = f[h] / w, C === 1))
        return 798;
      if (C === 0) {
        for (let v = b + 1; v <= x; v += 1)
          w = f[h - 1], f[h - 1] = f[h], f[h] = w, h += v;
        for (let v = 1; v <= n; v += 1)
          w = e[v][b], e[v][b] = e[v][b + 1], e[v][b + 1] = w;
      } else {
        z = S / (1 + C);
        for (let v = b + 1; v <= x; v += 1)
          w = C * f[h - 1] + S * f[h], f[h] = z * (f[h - 1] + w) - f[h], f[h - 1] = w, h += v;
        for (let v = 1; v <= n; v += 1)
          w = C * e[v][b] + S * e[v][b + 1], e[v][b + 1] = z * (e[v][b] + w) - e[v][b + 1], e[v][b] = w;
      }
      return 0;
    }
    function An() {
      h = M - b;
      for (let v = 1; v <= b; v += 1)
        f[h] = f[M], M += 1, h += 1;
      return f[R + b] = f[R + b + 1], p[b] = p[b + 1], b += 1, b < x ? 797 : 0;
    }
    function Wt() {
      return f[R + x] = f[R + x + 1], f[R + x + 1] = 0, p[x] = 0, x -= 1, m[2] += 1, 0;
    }
    for (E = 0; ; ) {
      if (E = kn(), E === 999)
        return;
      for (; E = zn(), E !== 0; ) {
        if (E === 999)
          return;
        if (E === 700)
          if (b === x)
            Wt();
          else {
            for (; Mn(), E = An(), E === 797; )
              ;
            Wt();
          }
      }
    }
  }
  Kr.exports = Ao;
});
var en = _((Xr) => {
  "use strict";
  var To = Yr();
  function Eo(e, t, r, n = [], o = 0, a = [0, 0]) {
    let i = [], s = [], u = [], c = [], d = [], l = [], p = "", g = e.length - 1, m = r[1].length - 1;
    if (!n)
      for (let h = 1; h <= m; h += 1)
        n[h] = 0;
    if (g !== e[1].length - 1 && (p = "Dmat is not symmetric!"), g !== t.length - 1 && (p = "Dmat and dvec are incompatible!"), g !== r.length - 1 && (p = "Amat and dvec are incompatible!"), m !== n.length - 1 && (p = "Amat and bvec are incompatible!"), (o > m || o < 0) && (p = "Value of meq is invalid!"), p !== "")
      return { message: p };
    for (let h = 1; h <= m; h += 1)
      s[h] = 0, c[h] = 0;
    let f = 0, N = Math.min(g, m);
    for (let h = 1; h <= g; h += 1)
      u[h] = 0;
    i[1] = 0;
    for (let h = 1; h <= 2 * g + N * (N + 5) / 2 + 2 * m + 1; h += 1)
      d[h] = 0;
    for (let h = 1; h <= 2; h += 1)
      l[h] = 0;
    return To(e, t, g, g, u, c, i, r, n, g, m, o, s, f, l, d, a), a[1] === 1 && (p = "constraints are inconsistent, no solution!"), a[1] === 2 && (p = "matrix D in quadratic function is not positive definite!"), { solution: u, Lagrangian: c, value: i, unconstrained_solution: t, iterations: l, iact: s, message: p };
  }
  Xr.solveQP = Eo;
});
var rn = _(($a, tn) => {
  "use strict";
  tn.exports = en();
});
var wn = _((nu, On) => {
  "use strict";
  var ti = function(e, t) {
    return e < t;
  };
  function U(e) {
    if (!(this instanceof U))
      return new U(e);
    this.array = [], this.size = 0, this.compare = e || ti;
  }
  U.prototype.clone = function() {
    var e = new U(this.compare);
    return e.size = this.size, e.array = this.array.slice(0, this.size), e;
  };
  U.prototype.add = function(e) {
    var t = this.size;
    this.array[this.size] = e, this.size += 1;
    for (var r, n; t > 0 && (r = t - 1 >> 1, n = this.array[r], !!this.compare(e, n)); )
      this.array[t] = n, t = r;
    this.array[t] = e;
  };
  U.prototype.heapify = function(e) {
    this.array = e, this.size = e.length;
    var t;
    for (t = this.size >> 1; t >= 0; t--)
      this._percolateDown(t);
  };
  U.prototype._percolateUp = function(e, t) {
    for (var r = this.array[e], n, o; e > 0 && (n = e - 1 >> 1, o = this.array[n], !(!t && !this.compare(r, o))); )
      this.array[e] = o, e = n;
    this.array[e] = r;
  };
  U.prototype._percolateDown = function(e) {
    for (var t = this.size, r = this.size >>> 1, n = this.array[e], o, a, i; e < r && (o = (e << 1) + 1, a = o + 1, i = this.array[o], a < t && this.compare(this.array[a], i) && (o = a, i = this.array[a]), !!this.compare(i, n)); )
      this.array[e] = i, e = o;
    this.array[e] = n;
  };
  U.prototype._removeAt = function(e) {
    if (!(e > this.size - 1 || e < 0))
      return this._percolateUp(e, true), this.poll();
  };
  U.prototype.remove = function(e) {
    for (var t = 0; t < this.size; t++)
      if (!this.compare(this.array[t], e) && !this.compare(e, this.array[t]))
        return this._removeAt(t), true;
    return false;
  };
  U.prototype.removeOne = function(e) {
    if (typeof e == "function") {
      for (var t = 0; t < this.size; t++)
        if (e(this.array[t]))
          return this._removeAt(t);
    }
  };
  U.prototype.removeMany = function(e, t) {
    if (typeof e != "function" || this.size < 1)
      return [];
    t = t ? Math.min(t, this.size) : this.size;
    for (var r = 0, n = new Array(t), o = 0, a = new Array(this.size); r < t && !this.isEmpty(); ) {
      var i = this.poll();
      e(i) ? n[r++] = i : a[o++] = i;
    }
    n.length = r;
    for (var s = 0; s < o; )
      this.add(a[s++]);
    return n;
  };
  U.prototype.peek = function() {
    if (this.size != 0)
      return this.array[0];
  };
  U.prototype.poll = function() {
    if (this.size != 0) {
      var e = this.array[0];
      return this.size > 1 ? (this.array[0] = this.array[--this.size], this._percolateDown(0)) : this.size -= 1, e;
    }
  };
  U.prototype.replaceTop = function(e) {
    if (this.size != 0) {
      var t = this.array[0];
      return this.array[0] = e, this._percolateDown(0), t;
    }
  };
  U.prototype.trim = function() {
    this.array = this.array.slice(0, this.size);
  };
  U.prototype.isEmpty = function() {
    return this.size === 0;
  };
  U.prototype.forEach = function(e) {
    if (!(this.isEmpty() || typeof e != "function"))
      for (var t = 0, r = this.clone(); !r.isEmpty(); )
        e(r.poll(), t++);
  };
  U.prototype.kSmallest = function(e) {
    if (this.size == 0)
      return [];
    e = Math.min(this.size, e);
    var t = new U(this.compare);
    let r = Math.min((e > 0 ? Math.pow(2, e - 1) : 0) + 1, this.size);
    t.size = r, t.array = this.array.slice(0, r);
    for (var n = new Array(e), o = 0; o < e; o++)
      n[o] = t.poll();
    return n;
  };
  On.exports = U;
});
function* Q(e) {
  let t = 0;
  for (let r of e)
    yield [t++, r];
}
function* F(e, t) {
  for (let [r, n] of Q(e))
    yield* t(n, r);
}
function ot(e, t, r) {
  let n = t, o = r;
  for (let [a, i] of Q(e))
    o = n(o, i, a);
  return o;
}
function* W(e, t) {
  for (let [r, n] of Q(e))
    yield t(n, r);
}
function* Gt(e, t) {
  for (let [r, n] of Q(e))
    t(n, r) && (yield n);
}
function fe(e, t) {
  for (let [r, n] of Q(e))
    if (t(n, r))
      return true;
  return false;
}
function Ut(e, t) {
  return !fe(e, (r, n) => !t(r, n));
}
function* Ie(e) {
  for (let t = e.length; t != 0; )
    yield e[--t];
}
function ge(e) {
  if (!e)
    throw new Error("internal error: failed assert");
}
function jt(e, t) {
  t.size < e.size && ([t, e] = [e, t]);
  for (let r of e)
    if (t.has(r))
      return true;
  return false;
}
function ke(e) {
  let { done: t, value: r } = e.values().next();
  if (!t)
    return e.delete(r), r;
}
function ue(e, t, r) {
  let n = e.get(t);
  n === void 0 ? e.set(t, [r]) : n.push(r);
}
function ze(e, t, r) {
  let n = e.get(t);
  n === void 0 ? e.set(t, /* @__PURE__ */ new Set([r])) : n.add(r);
}
function $n() {
  let e = /* @__PURE__ */ new WeakSet();
  return (t, r) => {
    if (typeof r == "object" && r !== null) {
      if (e.has(r))
        return "[circular]";
      e.add(r);
    }
    return r;
  };
}
function H(e, ...t) {
  let [r, ...n] = e;
  return [r].concat(...n.map((o, a) => [JSON.stringify(t[a], $n()), o])).join("");
}
function* Z(e) {
  let [t, ...r] = e;
  for (let n of r)
    yield [t, n], t = n;
}
function* X2(e, ...t) {
  let r = /* @__PURE__ */ new Set(), n;
  for (; (n = t.pop()) !== void 0; )
    r.has(n) || (yield n, r.add(n), t.push(...e(n)));
}
function J(e) {
  let t = /* @__PURE__ */ new Map();
  for (let r of e)
    for (let n of r.ichildren())
      ue(t, n, r);
  return t;
}
var ve = class {
  constructor(t, r, n = [], o = false) {
    this.child = t;
    this.data = r;
    this.points = n;
    this.reversed = o;
  }
};
var Ft = class {
  constructor(t, r, n, o, a) {
    this.source = t;
    this.target = r;
    this.data = n;
    this.points = o;
    this.reversed = a;
  }
};
var oe = class {
  constructor(t) {
    t && (this.proots = t);
  }
  [Symbol.iterator]() {
    return this.idescendants()[Symbol.iterator]();
  }
  iroots() {
    return { [Symbol.iterator]: () => this.proots[Symbol.iterator]() };
  }
  roots() {
    return [...this.iroots()];
  }
  *idepth() {
    yield* X2((r) => r.ichildren(), ...this.iroots());
  }
  *ibreadth() {
    let t = /* @__PURE__ */ new Set(), r = this.roots(), n = [];
    do {
      n = r.reverse(), r = [];
      let o;
      for (; o = n.pop(); )
        t.has(o) || (t.add(o), yield o, r.push(...o.ichildren()));
    } while (r.length);
  }
  *ibefore() {
    let t = /* @__PURE__ */ new Map();
    for (let o of this)
      for (let a of o.ichildren())
        t.set(a, (t.get(a) || 0) + 1);
    let r = this.roots(), n;
    for (; n = r.pop(); ) {
      yield n;
      for (let o of n.ichildren()) {
        let a = t.get(o);
        a > 1 ? t.set(o, a - 1) : r.push(o);
      }
    }
  }
  *iafter() {
    let t = this.roots(), r = /* @__PURE__ */ new Set(), n;
    for (; n = t.pop(); )
      r.has(n) || (Ut(n.ichildren(), (o) => r.has(o)) ? (r.add(n), yield n) : t.push(n, ...n.ichildren()));
  }
  idescendants(t = "depth") {
    if (t === "depth")
      return this.idepth();
    if (t === "breadth")
      return this.ibreadth();
    if (t === "before")
      return this.ibefore();
    if (t === "after")
      return this.iafter();
    throw new Error(`unknown iteration style: ${t}`);
  }
  descendants(t = "depth") {
    return [...this.idescendants(t)];
  }
  ilinks() {
    return F(this, (t) => t.ichildLinks());
  }
  links() {
    return [...this.ilinks()];
  }
  size() {
    return ot(this, (t) => t + 1, 0);
  }
  sum(t) {
    let r = /* @__PURE__ */ new Map();
    for (let [n, o] of Q(this.idescendants("after"))) {
      let a = t(o, n), i = /* @__PURE__ */ new Map();
      i.set(o, a);
      for (let s of o.ichildren()) {
        let u = r.get(s);
        for (let [c, d] of u.entries())
          i.set(c, d);
      }
      o.value = ot(i.values(), (s, u) => s + u, 0), r.set(o, i);
    }
    return this;
  }
  count() {
    let t = /* @__PURE__ */ new Map();
    for (let r of this.idescendants("after"))
      if (r.ichildren()[Symbol.iterator]().next().done)
        t.set(r, /* @__PURE__ */ new Set([r])), r.value = 1;
      else {
        let n = /* @__PURE__ */ new Set();
        for (let o of r.ichildren()) {
          let a = t.get(o);
          for (let i of a)
            n.add(i);
        }
        t.set(r, n), r.value = n.size;
      }
    return this;
  }
  height() {
    for (let t of this.idescendants("after"))
      t.value = Math.max(0, ...W(t.ichildren(), (r) => r.value + 1));
    return this;
  }
  depth() {
    var r;
    let t = J(this);
    for (let n of this.idescendants("before"))
      n.value = Math.max(0, ...W((r = t.get(n)) != null ? r : [], (o) => o.value + 1));
    return this;
  }
  *isplit() {
    let t = J(this);
    function* r(o) {
      var a;
      yield* o.ichildren(), yield* (a = t.get(o)) != null ? a : [];
    }
    let n = new Set(this.iroots());
    for (let o of this.iroots()) {
      if (!n.delete(o))
        continue;
      let a = [o];
      for (let i of X2(r, o))
        n.delete(i) && a.push(i);
      yield a.length > 1 ? new oe(a) : a[0];
    }
  }
  split() {
    return [...this.isplit()];
  }
  connected() {
    let t = this.isplit()[Symbol.iterator]();
    t.next();
    let { done: r } = t.next();
    return !!r;
  }
  multidag() {
    return this.pmultidag === void 0 ? this.pmultidag = fe(this.iroots(), (t) => t.multidag()) : this.pmultidag;
  }
};
var Ne = class extends oe {
  constructor(t) {
    super();
    this.data = t;
    this.dataChildren = [];
  }
  childrenCountsMap() {
    var t;
    if (this.cachedChildrenCounts === void 0) {
      let r = /* @__PURE__ */ new Map();
      for (let { child: n } of this.dataChildren)
        r.set(n, ((t = r.get(n)) != null ? t : 0) + 1);
      return this.cachedChildrenCounts = r.size === this.dataChildren.length ? null : r;
    } else
      return this.cachedChildrenCounts;
  }
  iroots() {
    let t = [this];
    return { [Symbol.iterator]: () => t[Symbol.iterator]() };
  }
  nchildren() {
    var t, r;
    return (r = (t = this.childrenCountsMap()) == null ? void 0 : t.size) != null ? r : this.dataChildren.length;
  }
  nchildLinks() {
    return this.dataChildren.length;
  }
  nchildLinksTo(t) {
    var r, n;
    return (n = (r = this.childrenCountsMap()) == null ? void 0 : r.get(t)) != null ? n : 1;
  }
  *ichildren() {
    let t = this.childrenCountsMap();
    if (t === null)
      for (let { child: r } of this.dataChildren)
        yield r;
    else
      yield* t.keys();
  }
  children() {
    return [...this.ichildren()];
  }
  *ichildrenCounts() {
    let t = this.childrenCountsMap();
    if (t === null)
      for (let { child: r } of this.dataChildren)
        yield [r, 1];
    else
      yield* t;
  }
  childrenCounts() {
    return [...this.ichildrenCounts()];
  }
  *ichildLinks() {
    for (let { child: t, data: r, points: n, reversed: o } of this.dataChildren)
      yield new Ft(this, t, r, n, o);
  }
  childLinks() {
    return [...this.ichildLinks()];
  }
  isplit() {
    return this.iroots();
  }
  split() {
    return this.roots();
  }
  connected() {
    return true;
  }
  multidag() {
    return this.pmultidag === void 0 ? this.pmultidag = this.childrenCountsMap() !== null || fe(this.ichildren(), (t) => t.multidag()) : this.pmultidag;
  }
};
function it(e) {
  if (typeof e != "string")
    throw new Error(`id is supposed to be string but got type ${typeof e}`);
  return e;
}
function at(e, t) {
  if (!e.length)
    throw new Error("dag contained no roots; this often indicates a cycle");
  for (let i of new oe(e))
    for (let s of i.ichildren())
      if (s === i)
        throw new Error(H`node '${i.data}' contained a self loop`);
  if (!t)
    return;
  let r = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), o = null;
  function a(i) {
    if (r.has(i))
      return [];
    if (n.has(i))
      return o = i, [i];
    {
      n.add(i);
      let s = [];
      for (let u of i.ichildren())
        if (s = a(u), s.length)
          break;
      return n.delete(i), r.add(i), s.length && o !== null && s.push(i), o === i && (o = null), s;
    }
  }
  for (let i of e) {
    let s = a(i);
    if (s.length) {
      let u = s.reverse().map(({ data: c }) => H`'${c}'`).join(" -> ");
      throw new Error(`dag contained a cycle: ${u}`);
    }
  }
}
function Gn(e) {
  return e && ke(e);
}
function st(e) {
  var g, m, f;
  let t = /* @__PURE__ */ new Map();
  for (let N of e)
    for (let { child: h } of N.dataChildren)
      ue(t, h, N);
  let r = new Map(W(e, (N) => {
    var h, b;
    return [N, { indeg: (b = (h = t.get(N)) == null ? void 0 : h.length) != null ? b : 0, outdeg: N.nchildLinks(), node: N }];
  })), n = Math.max(...W(Gt(r.values(), ({ indeg: N, outdeg: h }) => N > 0 && h > 0), ({ indeg: N, outdeg: h }) => h - N));
  if (n === -1 / 0) {
    let N = [];
    for (let { indeg: h, node: b } of r.values())
      h === 0 && N.push(b);
    return N;
  }
  let o = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
  for (let N of r.values()) {
    let { outdeg: h, indeg: b } = N;
    if (b === 0)
      o.add(N);
    else if (h === 0)
      a.add(N);
    else {
      let O = h - b;
      ze(i, O, N);
    }
  }
  let s = 0, u = e.length, c = n, d = new Array(e.length);
  for (; s < u; ) {
    let N = (m = (g = ke(o)) != null ? g : ke(a)) != null ? m : Gn(i.get(c));
    if (N === void 0)
      --c;
    else {
      let { node: h, indeg: b, outdeg: O } = N, x = N.rank = b > 0 && O === 0 ? --u : s++;
      d[x] = h;
      for (let w of (f = t.get(h)) != null ? f : []) {
        let y = r.get(w);
        if (y.rank === void 0 && y.indeg > 0 && y.outdeg > 0) {
          let L = y.outdeg - y.indeg;
          i.get(L).delete(y), --y.outdeg, y.outdeg > 0 ? ze(i, L - 1, y) : a.add(y);
        }
      }
      for (let { child: w } of h.dataChildren) {
        let y = r.get(w);
        if (!(y.rank !== void 0 || y.indeg === 0))
          if (y.outdeg === 0)
            --y.indeg, y.indeg === 0 && (a.delete(y), o.add(y));
          else {
            let L = y.outdeg - y.indeg;
            L === c && ++c, i.get(L).delete(y), --y.indeg, y.indeg === 0 ? o.add(y) : ze(i, L + 1, y);
          }
      }
    }
  }
  let l = [], p = /* @__PURE__ */ new Set();
  for (let [N, h] of d.entries()) {
    let b = [];
    for (let O of h.dataChildren) {
      let x = r.get(O.child);
      x.rank < N ? x.node.dataChildren.push(new ve(h, O.data, O.points, true)) : b.push(O);
    }
    b.length === h.nchildLinks() && !p.has(h) && l.push(h);
    for (let { child: O } of b)
      p.add(O);
    h.dataChildren = b;
  }
  return l;
}
function Un(e, t) {
  let r = [];
  for (let [n, o] of e.entries())
    t.has(n) || r.push(o);
  return r;
}
function pe(e) {
  function t(s) {
    if (!s.length)
      throw new Error("can't connect empty data");
    let u = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Set();
    for (let [l, p] of s.entries()) {
      let g = it(e.sourceId(p, l)), m = u.get(g);
      m === void 0 && (m = new Ne(e.nodeDatum(g, l)), u.set(g, m));
      let f = it(e.targetId(p, l)), N = u.get(f);
      N === void 0 && (N = new Ne(e.nodeDatum(f, l)), u.set(f, N)), (g !== f || !e.single) && (m.dataChildren.push(new ve(N, p)), c.add(f));
    }
    let d = e.decycle ? st([...u.values()]) : Un(u, c);
    return at(d, !e.decycle), d.length > 1 ? new oe(d) : d[0];
  }
  function r(s) {
    if (s === void 0)
      return e.sourceId;
    {
      let u = e, { sourceId: c } = u, d = B(u, ["sourceId"]);
      return pe(T(A({}, d), { sourceId: s }));
    }
  }
  t.sourceId = r;
  function n(s) {
    if (s === void 0)
      return e.targetId;
    {
      let u = e, { targetId: c } = u, d = B(u, ["targetId"]);
      return pe(T(A({}, d), { targetId: s }));
    }
  }
  t.targetId = n;
  function o(s) {
    if (s === void 0)
      return e.nodeDatum;
    {
      let u = e, { nodeDatum: c } = u, d = B(u, ["nodeDatum"]);
      return pe(T(A({}, d), { nodeDatum: s }));
    }
  }
  t.nodeDatum = o;
  function a(s) {
    return s === void 0 ? e.single : pe(T(A({}, e), { single: s }));
  }
  t.single = a;
  function i(s) {
    return s === void 0 ? e.decycle : pe(T(A({}, e), { decycle: s }));
  }
  return t.decycle = i, t;
}
function qn(e) {
  try {
    return typeof e[0] == "string";
  } catch (t) {
    return false;
  }
}
function jn(e) {
  if (qn(e))
    return e[0];
  throw new Error(`default source id expected datum[0] to be a string but got datum: ${e}`);
}
function Fn(e) {
  try {
    return typeof e[1] == "string";
  } catch (t) {
    return false;
  }
}
function Hn(e) {
  if (Fn(e))
    return e[1];
  throw new Error(`default target id expected datum[1] to be a string but got datum: ${e}`);
}
function Zn(e) {
  return { id: e };
}
function Qn(...e) {
  if (e.length)
    throw new Error(`got arguments to connect(${e}), but constructor takes no arguments. These were probably meant as data which should be called as connect()(...)`);
  return pe({ sourceId: jn, targetId: Hn, nodeDatum: Zn, single: false, decycle: false });
}
function be(e) {
  function t(...i) {
    var f;
    if (!i.length)
      throw new Error("must pass in at least one node");
    let s = /* @__PURE__ */ new Map(), u = [];
    function c(N) {
      let h = s.get(N);
      return h === void 0 && (h = new Ne(N), s.set(N, h), u.push(h)), h;
    }
    let d = i.map(c), l, p = 0;
    for (; l = u.pop(); )
      l.dataChildren = ((f = e.childrenData(l.data, p++)) != null ? f : []).map(([N, h]) => new ve(c(N), h));
    let g = new Set(d);
    for (let N of s.values())
      for (let { child: h } of N.dataChildren)
        if (g.delete(h) && e.roots)
          throw new Error(H`node '${N.data}' pointed to a root`);
    let m = e.decycle ? st([...s.values()]) : g.size ? [...g] : d;
    return at(m, !e.decycle), m.length > 1 ? new oe(m) : m[0];
  }
  function r(i) {
    if (i === void 0)
      return e.children;
    {
      let s = e, { children: u, childrenData: c } = s, d = B(s, ["children", "childrenData"]);
      return be(T(A({}, d), { children: i, childrenData: Ht(i) }));
    }
  }
  t.children = r;
  function n(i) {
    if (i === void 0)
      return e.childrenData;
    {
      let s = e, { children: u, childrenData: c } = s, d = B(s, ["children", "childrenData"]);
      return be(T(A({}, d), { children: Jn(i), childrenData: i }));
    }
  }
  t.childrenData = n;
  function o(i) {
    return i === void 0 ? e.roots : be(T(A({}, e), { roots: i }));
  }
  t.roots = o;
  function a(i) {
    return i === void 0 ? e.decycle : be(T(A({}, e), { decycle: i }));
  }
  return t.decycle = a, t;
}
function Ht(e) {
  function t(r, n) {
    var o;
    return ((o = e(r, n)) != null ? o : []).map((a) => [a, void 0]);
  }
  return t.wrapped = e, t;
}
function Jn(e) {
  function t(r, n) {
    var o;
    return ((o = e(r, n)) != null ? o : []).map(([a]) => a);
  }
  return t.wrapped = e, t;
}
function Kn(e) {
  try {
    let t = e.children;
    return t === void 0 || t instanceof Array;
  } catch (t) {
    return false;
  }
}
function Zt(e) {
  if (Kn(e))
    return e.children;
  throw new Error(H`default children function expected datum to have a children field but got: ${e}`);
}
function ut(...e) {
  if (e.length)
    throw new Error(`got arguments to hierarchy(${e}), but constructor takes no arguments. These were probably meant as data which should be called as hierarchy()(...)`);
  return be({ children: Zt, childrenData: Ht(Zt), roots: true, decycle: false });
}
var Rr = nt(Wr());
function re(e, t, r, n, o = {}) {
  let s = Rr.Solve.call({}, { optimize: e, opType: t, constraints: n, variables: r, ints: o }), { feasible: a } = s, i = B(s, ["feasible"]);
  if (!a)
    throw new Error("could not find a feasible simplex solution");
  return i;
}
var nn = nt(rn());
function Je(e) {
  let t = J(F(e, (a) => a));
  function* r(a) {
    var i;
    yield* a.ichildren(), yield* (i = t.get(a)) != null ? i : [];
  }
  let n = 0, o = /* @__PURE__ */ new Map();
  for (let a of F(e, (i) => i))
    if (!o.has(a)) {
      for (let i of X2(r, a))
        o.set(i, n);
      n++;
    }
  return o;
}
function Ke(e, t) {
  let r = [], n = [], o = /* @__PURE__ */ new Set();
  for (let a of e) {
    let i = new Set(a.map((s) => t.get(s)));
    jt(o, i) || r.push(n = []), n.push(a), o = i;
  }
  return r;
}
function Po(e) {
  let [t, r, n] = e;
  if (t <= 0 || r <= 0 || n <= 0)
    throw new Error("const accessors should return non-negative values");
  let o = () => e;
  return o.value = e, o;
}
function Bo(e) {
  return "value" in e && typeof e.value == "object" && e.value.length === 3 && e.value.every((t) => typeof t == "number");
}
function _o(e, t) {
  if (Bo(t)) {
    let [r, n, o] = t.value;
    if (r <= 0 || n <= 0 || o <= 0)
      throw new Error(`simplex weights must be positive, but got: ${r}, ${n}, ${o}`);
    return (i, s) => {
      switch (+("node" in i.data) + +("node" in s.data)) {
        case 0:
          return o;
        case 1:
          return n;
        case 2:
          return r;
        default:
          throw new Error("internal error");
      }
    };
  } else {
    let r = /* @__PURE__ */ new Map();
    for (let o of F(e, (a) => a))
      if ("node" in o.data) {
        let a = o.data.node, i = /* @__PURE__ */ new Map();
        for (let s of a.ichildLinks()) {
          let { target: u } = s, c = t(s), [d, l, p] = c;
          if (d <= 0 || l <= 0 || p <= 0)
            throw new Error(`simplex weights must be positive, but got: ${d}, ${l}, ${p}`);
          i.set(u, c);
        }
        r.set(a, i);
      }
    return (o, a) => {
      if ("link" in o.data) {
        let { source: i, target: s } = o.data.link, [, u, c] = r.get(i).get(s);
        return "link" in a.data ? c : u;
      } else if ("link" in a.data) {
        let { source: i, target: s } = a.data.link, [, u] = r.get(i).get(s);
        return u;
      } else {
        let [i] = r.get(o.data.node).get(a.data.node);
        return i;
      }
    };
  }
}
function an(e) {
  function t(o, a) {
    var m;
    let i = {}, s = {}, u = _o(o, e.weight), c = /* @__PURE__ */ new Map();
    for (let [f, N] of Q(F(o, (h) => h))) {
      let h = f.toString();
      c.set(N, h), i[h] = {};
    }
    function d(f) {
      return c.get(f);
    }
    for (let f of o)
      for (let [N, h] of Z(f)) {
        let b = d(N), O = d(h), x = `layer ${b} -> ${O}`, w = (a(N) + a(h)) / 2;
        s[x] = { min: w }, i[b][x] = -1, i[O][x] = 1;
      }
    for (let f of F(o, (N) => N)) {
      let N = d(f);
      for (let h of f.ichildren()) {
        let b = d(h), O = `link ${N} -> ${b}`, x = `${O} parent`;
        s[x] = { min: 0 };
        let w = `${O} child`;
        s[w] = { min: 0 }, i[N][x] = 1, i[N][w] = -1, i[b][x] = -1, i[b][w] = 1;
        let y = u(f, h);
        i[O] = { opt: y, [x]: 1, [w]: 1 };
      }
    }
    let l = re("opt", "min", i, s), p = 0, g = 0;
    for (let f of o) {
      for (let b of f)
        b.x = (m = l[d(b)]) != null ? m : 0;
      let N = f[0];
      p = Math.min(p, N.x - a(N) / 2);
      let h = f[f.length - 1];
      g = Math.max(g, h.x + a(h) / 2);
    }
    for (let f of F(o, (N) => N))
      f.x -= p;
    return g - p;
  }
  function r(o, a) {
    let i = Je(o), s = Ke(o, i), u = s.map((d) => t(d, a)), c = Math.max(...u);
    if (c <= 0)
      throw new Error("must assign nonzero width to at least one node");
    for (let [d, l] of s.entries()) {
      let p = (c - u[d]) / 2;
      for (let g of l)
        for (let m of g)
          m.x += p;
    }
    return c;
  }
  function n(o) {
    if (o === void 0)
      return e.weight;
    {
      let a = e, { weight: i } = a, s = B(a, ["weight"]);
      return an(T(A({}, s), { weight: o }));
    }
  }
  return r.weight = n, r;
}
function Ct(...e) {
  if (e.length)
    throw new Error(`got arguments to simplex(${e}), but constructor takes no arguments.`);
  return an({ weight: Po([1, 2, 8]) });
}
var dn = class {
  constructor() {
    this.vals = [];
  }
  add(t) {
    this.vals.push(t);
  }
  val() {
    if (this.vals.sort((t, r) => t - r), this.vals.length !== 0) {
      if (this.vals.length === 2)
        return (this.vals[0] + this.vals[1]) / 2;
      if (this.vals.length % 2 === 0) {
        let t = this.vals.length / 2, r = this.vals[0], n = this.vals[t - 1], o = this.vals[t], a = this.vals[this.vals.length - 1], i = n - r, s = a - o;
        return (n * s + o * i) / (i + s);
      } else
        return this.vals[(this.vals.length - 1) / 2];
    }
  }
};
var ln = () => new dn();
function $o(e, t) {
  let r = e();
  for (let n of t)
    r.add(n);
  return r.val();
}
function cn(e, t) {
  let r = /* @__PURE__ */ new Map();
  for (let d of e) {
    let l = t.get(d);
    l !== void 0 && ue(r, l, d);
  }
  let n = [...r.entries()].sort(([d], [l]) => d - l).flatMap(([, d]) => d), o = new Map(e.map((d, l) => [d, l])), a = e.filter((d) => t.get(d) === void 0), i = new Array(a.length).fill(null);
  function s(d, l, p, g) {
    if (l <= d)
      return;
    let m = Math.floor((d + l) / 2), f = a[m], N = o.get(f), h = 0, b = [h];
    for (let x = p; x < g; ++x)
      h += o.get(n[x]) < N ? -1 : 1, b.push(h);
    let O = p + b.indexOf(Math.min(...b));
    i[m] = O, s(d, m, p, O), s(m + 1, l, O, g);
  }
  s(0, a.length, 0, n.length), i.push(n.length + 1);
  let u = 0, c = 0;
  for (let [d, l] of n.entries()) {
    for (; i[c] == d; )
      e[u++] = a[c++];
    e[u++] = l;
  }
  for (; i[c] == n.length; )
    e[u++] = a[c++];
}
function fn({ factory: e }) {
  function t(n, o, a) {
    if (a) {
      let i = new Map(o.map((u) => [u, e()]));
      for (let [u, c] of n.entries())
        for (let d of c.ichildren())
          i.get(d).add(u);
      let s = new Map([...i.entries()].map(([u, c]) => [u, c.val()]));
      cn(o, s);
    } else {
      let i = new Map(o.map((u, c) => [u, c])), s = new Map(n.map((u) => {
        let c = $o(e, W(u.ichildren(), (d) => i.get(d)));
        return [u, c];
      }));
      cn(n, s);
    }
  }
  function r(n) {
    return n === void 0 ? e : fn({ factory: n });
  }
  return t.aggregator = r, t;
}
function It(...e) {
  if (e.length)
    throw new Error(`got arguments to agg(${e}), but constructor takes no arguments.`);
  return fn({ factory: ln });
}
function pn(e, t) {
  let r = /* @__PURE__ */ new Map(), n = new Map(e.map((a, i) => [a, i]));
  function o(a, i) {
    var u;
    let s = (u = r.get(a)) == null ? void 0 : u.get(i);
    if (s !== void 0)
      return s;
    {
      let c = 0;
      for (let p of t(a))
        for (let g of t(i))
          c += Math.sign(n.get(p) - n.get(g));
      let d = r.get(a);
      d === void 0 ? r.set(a, /* @__PURE__ */ new Map([[i, c]])) : d.set(i, c);
      let l = r.get(i);
      return l === void 0 ? r.set(i, /* @__PURE__ */ new Map([[a, -c]])) : l.set(a, -c), c;
    }
  }
  return o;
}
function Go(e, t) {
  let r = [[0, e.length]], n;
  for (; n = r.pop(); ) {
    let [o, a] = n;
    if (o >= a)
      continue;
    let i = 0, s = a;
    for (let u = o; u < a - 1; ++u) {
      let c = t(e[u], e[u + 1]);
      c > i && (i = c, s = u);
    }
    s !== a && ([e[s], e[s + 1]] = [e[s + 1], e[s]], r.push([o, s], [s + 2, a]));
  }
}
function Uo(e, t) {
  let r = new Array(e.length * (e.length - 1) / 2);
  for (; ; ) {
    let n = 0;
    for (let u = 1; u < e.length; ++u) {
      let c = 0, d = n;
      for (let l = u - 1; l >= 0; --l)
        r[d] = c, c += t(e[l], e[u]), d -= e.length - l - 1;
      n += e.length - u;
    }
    let o = 0, a = 0, i = 0, s = 0;
    for (let u = 0; u < e.length - 1; ++u) {
      let c = 0;
      for (let d = u + 1; d < e.length; ++d) {
        c += t(e[u], e[d]);
        let l = r[o++] + c;
        l > a && (a = l, i = u, s = d);
      }
    }
    if (a === 0)
      break;
    [e[i], e[s]] = [e[s], e[i]];
  }
}
function kt({ baseOp: e, doScan: t }) {
  function r(a, i, s) {
    e(a, i, s);
    let u, c;
    if (s) {
      let d = J(a);
      c = pn(a, (l) => {
        var p;
        return (p = d.get(l)) != null ? p : [];
      }), u = i;
    } else
      c = pn(i, (d) => d.ichildren()), u = a;
    t ? Uo(u, c) : Go(u, c);
  }
  function n(a) {
    return a === void 0 ? e : kt({ baseOp: a, doScan: t });
  }
  r.base = n;
  function o(a) {
    return a === void 0 ? t : kt({ baseOp: e, doScan: a });
  }
  return r.scan = o, r;
}
function zt(...e) {
  if (e.length)
    throw new Error(`got arguments to greedy(${e}), but constructor takes no arguments.`);
  return kt({ baseOp: () => {
  }, doScan: false });
}
function qo(e) {
  if (e.value === void 0)
    throw new Error(H`node with data '${e.data}' did not get a defined value during layering`);
  if (e.value < 0)
    throw new Error(H`node with data '${e.data}' got an invalid (negative) value during layering: ${e.value}`);
  return e.value;
}
function Mt(e) {
  let t = new Map(W(e, (i) => [i, { node: i, layer: qo(i) }]));
  for (let { source: i, target: s } of e.ilinks()) {
    let u = i.nchildLinksTo(s) > 1;
    if (u && i.value + 1 >= s.value)
      throw new Error(H`layering left child data '${s.data}' (${s.value}) whose layer was not two more than its parent data '${i.data}' (${i.value})`);
    if (!u && i.value >= s.value)
      throw new Error(H`layering left child data '${s.data}' (${s.value}) whose layer was not greater than its parent data '${i.data}' (${i.value})`);
  }
  function r(i) {
    let s = i.layer + 1;
    return ("node" in i ? i.node.childLinks() : [i.link]).map((c) => {
      let d = t.get(c.target);
      return d.layer === s ? d : { link: c, layer: s };
    });
  }
  let o = ut().children(r)(...W(e.iroots(), (i) => t.get(i)));
  ge(!o.multidag());
  let a = [];
  for (let i of o)
    (a[i.data.layer] || (a[i.data.layer] = [])).push(i);
  if (!a[0] || !a[0].length)
    throw new Error("no nodes were assigned to layer 0");
  for (let i of a)
    ge(i && i.length);
  return a;
}
function At(e) {
  for (let t of e)
    for (let r of t) {
      if ("link" in r.data)
        continue;
      r.data.node.x = r.x, r.data.node.y = r.y;
      let n = new Map(W(r.data.node.ichildLinks(), ({ points: o, target: a }) => [a, o]));
      for (let o of r.ichildren()) {
        let a = [{ x: r.x, y: r.y }];
        for (; "link" in o.data; )
          a.push({ x: o.x, y: o.y }), [o] = o.ichildren();
        a.push({ x: o.x, y: o.y });
        let i = n.get(o.data.node);
        i.splice(0, i.length, ...a);
      }
    }
}
function hn(e, t) {
  for (let r of e) {
    let n = 0;
    for (let o of r) {
      if (o.x === void 0)
        throw new Error(H`coord didn't assign an x to node '${o}'`);
      if (o.x < n)
        throw new Error(H`coord assigned an x (${o.x}) smaller than a previous node in the layer '${o}'`);
      n = o.x;
    }
    if (n > t)
      throw new Error(`coord assigned an x (${n}) greater than width (${t})`);
  }
}
function mn(e, t, r) {
  for (let n of e)
    for (let o of n)
      o.x *= t, o.y *= r;
}
function Ye(e) {
  let t = 0;
  for (let [r, n] of Z(e)) {
    let o = new Map(n.map((a, i) => [a, i]));
    for (let [a, i] of r.entries())
      for (let s of r.slice(a + 1))
        for (let u of i.ichildren())
          for (let c of s.ichildren())
            u !== c && o.get(u) > o.get(c) && t++;
  }
  return t;
}
function gn(e) {
  function t(n) {
    let o;
    if (e.topDown)
      o = X2((a) => a.ichildren(), ...F(Ie(n), (a) => a));
    else {
      let a = J(F(n, (i) => i));
      o = X2((i) => {
        var s;
        return (s = a.get(i)) != null ? s : [];
      }, ...F(n, (i) => i));
    }
    for (let a of n)
      a.splice(0);
    for (let a of o)
      n[a.data.layer].push(a);
  }
  function r(n) {
    return n === void 0 ? e.topDown : gn({ topDown: n });
  }
  return t.topDown = r, t;
}
function Xe(...e) {
  if (e.length)
    throw new Error(`got arguments to dfs(${e}), but constructor takes no arguments.`);
  return gn({ topDown: true });
}
function et(e) {
  function t(a) {
    let i = a.slice().reverse(), s = a.map((c) => c.slice()), u = Ye(s);
    for (let c of e.inits) {
      c(a);
      let d = true;
      for (let l = 0; l < e.passes && d; ++l) {
        d = false;
        for (let [m, f] of Z(a)) {
          let N = f.slice();
          e.order(m, f, true), f.some((h, b) => N[b] !== h) && (d = true);
        }
        let p = Ye(a);
        p < u && (u = p, s = a.map((m) => m.slice()));
        for (let [m, f] of Z(i)) {
          let N = f.slice();
          e.order(f, m, false), f.some((h, b) => N[b] !== h) && (d = true);
        }
        let g = Ye(a);
        g < u && (u = g, s = a.map((m) => m.slice()));
      }
    }
    a.splice(0, a.length, ...s);
  }
  function r(a) {
    if (a === void 0)
      return e.order;
    {
      let i = e, { order: s } = i, u = B(i, ["order"]);
      return et(T(A({}, u), { order: a }));
    }
  }
  t.order = r;
  function n(a) {
    if (a === void 0)
      return [...e.inits];
    if (a.length) {
      let i = e, { inits: s } = i, u = B(i, ["inits"]);
      return et(T(A({}, u), { inits: [...a] }));
    } else
      throw new Error("inits must be a non-empty array, maybe you intended the singleton noop: `[() => undefined]`");
  }
  t.inits = n;
  function o(a) {
    if (a === void 0)
      return e.passes;
    if (a <= 0)
      throw new Error("number of passes must be positive");
    return et(T(A({}, e), { passes: a }));
  }
  return t.passes = o, t;
}
function Tt(...e) {
  if (e.length)
    throw new Error(`got arguments to twoLayer(${e}), but constructor takes no arguments.`);
  return et({ order: zt().base(It()), inits: [Xe(), Xe().topDown(false)], passes: 24 });
}
function Et(e) {
  function t(o) {
    var N;
    let a = {}, i = {}, s = {}, u = new Map(W(o, (h, b) => [h, b.toString()]));
    function c(h) {
      return u.get(h);
    }
    function d(h) {
      return a[c(h)];
    }
    function l(h, b, O, x = 1) {
      let w = d(b), y = d(O), L = `${h}: ${c(b)} -> ${c(O)}`;
      i[L] = { min: x }, w[L] = -1, y[L] = 1;
    }
    function p(h, b, O) {
      l(`${h} before`, b, O, 0), l(`${h} after`, O, b, 0);
    }
    let g = [], m = /* @__PURE__ */ new Map();
    for (let h of o) {
      let b = c(h);
      s[b] = 1, a[b] = { opt: 0 };
      let O = e.rank(h);
      O !== void 0 && g.push([O, h]);
      let x = e.group(h);
      if (x !== void 0) {
        let w = m.get(x);
        w ? w.push(h) : m.set(x, [h]);
      }
    }
    for (let h of o)
      for (let [b, O] of h.ichildrenCounts())
        l("link", h, b, O > 1 ? 2 : 1), d(h).opt += O, d(b).opt -= O;
    let f = g.sort(([h], [b]) => h - b);
    for (let [[h, b], [O, x]] of Z(f))
      h < O ? l("rank", b, x) : p("rank", b, x);
    for (let h of m.values())
      for (let [b, O] of Z(h))
        p("group", b, O);
    try {
      let h = re("opt", "max", a, i, s);
      for (let b of o)
        b.value = (N = h[c(b)]) != null ? N : 0;
    } catch (h) {
      throw ge(g.length || m.size), new Error("could not find a feasible simplex layout, check that rank or group accessors are not ill-defined");
    }
  }
  function r(o) {
    if (o === void 0)
      return e.rank;
    {
      let a = e, { rank: i } = a, s = B(a, ["rank"]);
      return Et(T(A({}, s), { rank: o }));
    }
  }
  t.rank = r;
  function n(o) {
    if (o === void 0)
      return e.group;
    {
      let a = e, { group: i } = a, s = B(a, ["group"]);
      return Et(T(A({}, s), { group: o }));
    }
  }
  return t.group = n, t;
}
function vn() {
}
function Vt(...e) {
  if (e.length)
    throw new Error(`got arguments to simplex(${e}), but constructor takes no arguments.`);
  return Et({ rank: vn, group: vn });
}
function Nn(e) {
  let t = e();
  function r(n) {
    return "node" in n.data ? e(n.data.node) : t;
  }
  return r.wrapped = e, r;
}
function jo(e, t = true) {
  let r = /* @__PURE__ */ new Map();
  function n(i) {
    let s = r.get(i);
    if (s === void 0) {
      s = e(i);
      let [u, c] = s;
      if (t && (u < 0 || c < 0))
        throw new Error(H`all node sizes must be non-negative, but got width ${u} and height ${c} for node '${i}'`);
      r.set(i, s);
    }
    return s;
  }
  return [(i) => n(i)[0], (i) => n(i)[1]];
}
function bn(e, t) {
  let r = 0;
  for (let n of e) {
    let o = Math.max(...n.map(t));
    for (let a of n)
      a.y = r + o / 2;
    r += o;
  }
  return r;
}
function le(e) {
  function t(u) {
    e.layering(u);
    let c = Mt(u), [d, l] = jo(e.sugiNodeSize), p = bn(c, l);
    if (p <= 0)
      throw new Error("at least one node must have positive height, but total height was zero");
    e.decross(c);
    let g = e.coord(c, d);
    if (hn(c, g), e.size !== null) {
      let [m, f] = e.size;
      mn(c, m / g, f / p), g = m, p = f;
    }
    return At(c), { width: g, height: p };
  }
  function r(u) {
    if (u === void 0)
      return e.layering;
    {
      let c = e, { layering: d } = c, l = B(c, ["layering"]);
      return le(T(A({}, l), { layering: u }));
    }
  }
  t.layering = r;
  function n(u) {
    if (u === void 0)
      return e.decross;
    {
      let c = e, { decross: d } = c, l = B(c, ["decross"]);
      return le(T(A({}, l), { decross: u }));
    }
  }
  t.decross = n;
  function o(u) {
    if (u === void 0)
      return e.coord;
    {
      let c = e, { coord: d } = c, l = B(c, ["coord"]);
      return le(T(A({}, l), { coord: u }));
    }
  }
  t.coord = o;
  function a(u) {
    return u !== void 0 ? le(T(A({}, e), { size: u })) : e.size;
  }
  t.size = a;
  function i(u) {
    if (u !== void 0) {
      let c = e, { nodeSize: d, sugiNodeSize: l } = c, p = B(c, ["nodeSize", "sugiNodeSize"]);
      return le(T(A({}, p), { nodeSize: u, sugiNodeSize: Nn(u) }));
    } else
      return e.nodeSize;
  }
  t.nodeSize = i;
  function s(u) {
    if (u !== void 0) {
      let c = e, { sugiNodeSize: d, nodeSize: l } = c, p = B(c, ["sugiNodeSize", "nodeSize"]);
      return le(T(A({}, p), { sugiNodeSize: u, nodeSize: null }));
    } else
      return e.sugiNodeSize;
  }
  return t.sugiNodeSize = s, t;
}
function xn(e) {
  return [+(e !== void 0), 1];
}
function Fo(...e) {
  if (e.length)
    throw new Error(`got arguments to sugiyama(${e}), but constructor takes no arguments.`);
  return le({ layering: Vt(), decross: Tt(), coord: Ct(), size: null, nodeSize: xn, sugiNodeSize: Nn(xn) });
}
function Pt(e) {
  function t(o) {
    let a = o.reduce((x, w) => x + w.length * Math.max(w.length - 1, 0) / 2, 0), i = o.reduce((x, w) => x + w.reduce((y, L) => y + L.nchildren(), 0), 0);
    if (e.large !== "large" && a > 1200)
      throw new Error('size of dag to decrossOpt is too large and will likely crash instead of complete, enable "large" graphs to run anyway');
    if (e.large !== "large" && e.large !== "medium" && (a > 400 || i > 100))
      throw new Error('size of dag to decrossOpt is too large and will likely not complete, enable "medium" graphs to run anyway');
    let s = [];
    for (let [x, w] of Z(o)) {
      let y = new Set(x.flatMap((k) => k.children())), L = w.filter((k) => !y.has(k)), D = x.map((k) => k.children()).filter((k) => k.length > 1);
      s.push([L, D]);
      let C = x.filter((k) => !k.nchildren()), z = [...J(x).values()];
      s.push([C, z]);
    }
    let u = s.reduce((x, [w, y]) => y.reduce((L, D) => L + D.length * D.length, 0) * w.length, 0) / 4, c = 1 / (u + 1), d = c / (a + 1), l = {}, p = {}, g = {}, m = /* @__PURE__ */ new Map();
    {
      let x = 0;
      for (let w of o)
        for (let y of w)
          m.set(y, x++);
    }
    function f(...x) {
      return x.map((w) => m.get(w)).sort((w, y) => w - y).join(" => ");
    }
    function N(x) {
      for (let [w, y] of x.slice(0, x.length - 1).entries())
        for (let L of x.slice(w + 1)) {
          let D = f(y, L);
          g[D] = 1, p[D] = { max: 1 }, l[D] = { opt: -d, [D]: 1 };
        }
      for (let [w, y] of x.slice(0, x.length - 1).entries())
        for (let [L, D] of x.slice(w + 1).entries())
          for (let C of x.slice(w + L + 2)) {
            let S = f(y, D), z = f(y, C), k = f(D, C), V = f(y, D, C), E = V + "+";
            p[E] = { max: 1 }, l[S][E] = 1, l[z][E] = -1, l[k][E] = 1;
            let P = V + "-";
            p[P] = { min: 0 }, l[S][P] = 1, l[z][P] = -1, l[k][P] = 1;
          }
    }
    function h(x) {
      for (let [w, y] of x.slice(0, x.length - 1).entries())
        for (let L of x.slice(w + 1)) {
          let D = f(y, L);
          for (let C of y.ichildren())
            for (let S of L.ichildren()) {
              if (C === S)
                continue;
              let z = f(C, S), k = `slack (${D}) (${z})`, V = `${k} +`, E = `${k} -`;
              l[k] = { opt: 1, [V]: 1, [E]: 1 };
              let P = Math.sign(m.get(C) - m.get(S)), M = Math.max(P, 0);
              p[V] = { min: M }, l[D][V] = 1, l[z][V] = P, p[E] = { min: -M }, l[D][E] = -1, l[z][E] = -P;
            }
        }
    }
    function b(x, w) {
      for (let y of x)
        for (let L of w)
          for (let [D, C] of L.entries())
            for (let S of L.slice(D + 1)) {
              let k = `dist ${[C, y, S].map((M) => m.get(M)).join(" => ")}`, V = `${k} normal`, E = `${k} reversed`;
              l[k] = { opt: c, [V]: 1, [E]: 1 };
              let P = 0;
              for (let [M, $] of [[C, y], [C, S], [y, S]]) {
                let j = f(M, $), q = Math.sign(m.get(M) - m.get($));
                P += +(q > 0), l[j][V] = -q, l[j][E] = q;
              }
              p[V] = { min: 1 - P }, p[E] = { min: P - 2 };
            }
    }
    for (let x of o)
      N(x);
    for (let x of o.slice(0, o.length - 1))
      h(x);
    if (e.dist)
      for (let [x, w] of s)
        b(x, w);
    let O = re("opt", "min", l, p, g);
    for (let x of o)
      x.sort((w, y) => O[f(w, y)] || -1);
  }
  function r(o) {
    return o === void 0 ? e.large : Pt(T(A({}, e), { large: o }));
  }
  t.large = r;
  function n(o) {
    return o === void 0 ? e.dist : Pt(T(A({}, e), { dist: o }));
  }
  return t.dist = n, t;
}
function ei(...e) {
  if (e.length)
    throw new Error(`got arguments to opt(${e}), but constructor takes no arguments.`);
  return Pt({ large: "small", dist: false });
}
var Dn = nt(wn());

// src/familytree.js
var FamilyTree = class {
  constructor(data, svg2) {
    this.dag = Qn()(data.links);
    console.log(this.dag);
    console.log("decedents", this.dag.descendants());
    const layout = Fo().nodeSize(() => [50, 120]).layering(Vt()).decross(ei());
    console.log("A", this.dag.proots[0].x);
    console.log("layout 2", layout(this.dag));
    console.log("B", this.dag.proots[0].x);
    const g = svg2.append("g");
    var node = g.selectAll("g.node").data(this.dag.descendants(), (node2) => node2.id);
    var nodeEnter = node.enter().append("g").attr("class", "node").attr("transform", (d) => "translate(" + d.y + "," + d.x + ")").attr("visible", true);
    nodeEnter.append("circle").attr("class", "person").attr("r", 1e-6);
  }
};

// src/data.js
var data_default2 = {
  "start": "id4",
  "persons": {
    "id1": { "id": "id1", "name": "Adam", "birthyear": 1900, "deathyear": 1980, "own_unions": ["u1"], "birthplace": "Alberta", "deathplace": "Austin" },
    "id2": { "id": "id2", "name": "Berta", "birthyear": 1901, "deathyear": 1985, "own_unions": ["u1"], "birthplace": "Berlin", "deathplace": "Bern" },
    "id3": { "id": "id3", "name": "Charlene", "birthyear": 1930, "deathyear": 2010, "own_unions": ["u3", "u4"], "parent_union": "u1", "birthplace": "Ch\xE2teau", "deathplace": "Cuxhaven" },
    "id4": { "id": "id4", "name": "Dan", "birthyear": 1926, "deathyear": 2009, "own_unions": [], "parent_union": "u1", "birthplace": "den Haag", "deathplace": "Derince" },
    "id5": { "id": "id5", "name": "Eric", "birthyear": 1931, "deathyear": 2015, "own_unions": ["u3"], "parent_union": "u2", "birthplace": "Essen", "deathplace": "Edinburgh" },
    "id6": { "id": "id6", "name": "Francis", "birthyear": 1902, "deathyear": 1970, "own_unions": ["u2"], "birthplace": "Firenze", "deathplace": "Faizabad" },
    "id7": { "id": "id7", "name": "Greta", "birthyear": 1905, "deathyear": 1990, "own_unions": ["u2"] },
    "id8": { "id": "id8", "name": "Heinz", "birthyear": 1970, "own_unions": ["u5"], "parent_union": "u3" },
    "id9": { "id": "id9", "name": "Iver", "birthyear": 1925, "deathyear": 1963, "own_unions": ["u4"] },
    "id10": { "id": "id10", "name": "Jennifer", "birthyear": 1950, "own_unions": [], "parent_union": "u4" },
    "id11": { "id": "id11", "name": "Klaus", "birthyear": 1933, "deathyear": 2013, "own_unions": [], "parent_union": "u1" },
    "id12": { "id": "id12", "name": "Lennart", "birthyear": 1999, "own_unions": [], "parent_union": "u5" }
  },
  "unions": {
    "u1": { "id": "u1", "partner": ["id1", "id2"], "children": ["id3", "id4", "id11"] },
    "u2": { "id": "u2", "partner": ["id6", "id7"], "children": ["id5"] },
    "u3": { "id": "u3", "partner": ["id3", "id5"], "children": ["id8"] },
    "u4": { "id": "u4", "partner": ["id3", "id9"], "children": ["id10"] },
    "u5": { "id": "u5", "partner": ["id8"], "children": ["id12"] }
  },
  "links": [
    ["id1", "u1"],
    ["id2", "u1"],
    ["u1", "id3"],
    ["u1", "id4"],
    ["id6", "u2"],
    ["id7", "u2"],
    ["u2", "id5"],
    ["id3", "u3"],
    ["id5", "u3"],
    ["u3", "id8"],
    ["id3", "u4"],
    ["id9", "u4"],
    ["u4", "id10"],
    ["u1", "id11"],
    ["id8", "u5"],
    ["u5", "id12"]
  ]
};

// src/index.js
var svg = select_default2("body").append("svg").attr("width", document.body.offsetWidth).attr("height", document.documentElement.clientHeight);
var FT = new FamilyTree(data_default2, svg);
