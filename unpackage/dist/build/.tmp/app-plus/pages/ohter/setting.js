(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ohter/setting"],{"114c":function(t,n,e){"use strict";e.r(n);var o=e("947d"),i=e("d3a1");for(var u in i)"default"!==u&&function(t){e.d(n,t,function(){return i[t]})}(u);e("4bae");var c=e("2877"),s=Object(c["a"])(i["default"],o["a"],o["b"],!1,null,null,null);n["default"]=s.exports},1497:function(t,n,e){"use strict";(function(t,o){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=function(){return e.e("components/uni-list/uni-list").then(e.bind(null,"f90b"))},u=function(){return e.e("components/uni-list-item/uni-list-item").then(e.bind(null,"644c"))},c={components:{uniList:i,uniListItem:u},data:function(){return{checked:!0}},onShow:function(){this.getStorageInfo()},methods:{switchChange:function(n){1==this.checked?(this.checked=!1,t.showToast({title:"已关闭消息通知",icon:"none"})):(this.checked=!0,t.showToast({title:"已开启消息通知",icon:"none"}))},getStorageInfo:function(){t.getStorageInfo({success:function(t){console.log(o(t.keys," at pages\\ohter\\setting.vue:58")),console.log(o(t.currentSize," at pages\\ohter\\setting.vue:59")),console.log(o(t.limitSize," at pages\\ohter\\setting.vue:60"))}})},outBtn:function(){this.$store.commit("logout",this.$store.state.obj),t.clearStorage(),t.reLaunch({url:"/pages/login/login"})},gotoProtocol:function(){t.navigateTo({url:"protocol"})},clearcatch:function(){t.showToast({title:"清除缓存",icon:"none"})}}};n.default=c}).call(this,e("6e42")["default"],e("0de9")["default"])},"4bae":function(t,n,e){"use strict";var o=e("ef87"),i=e.n(o);i.a},"947d":function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return i})},d3a1:function(t,n,e){"use strict";e.r(n);var o=e("1497"),i=e.n(o);for(var u in o)"default"!==u&&function(t){e.d(n,t,function(){return o[t]})}(u);n["default"]=i.a},ef87:function(t,n,e){}},[["b62f","common/runtime","common/vendor"]]]);