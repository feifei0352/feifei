(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ohter/wallet"],{"33ad":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return o})},3831:function(t,n,e){"use strict";e.r(n);var a=e("c1cd"),o=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,function(){return a[t]})}(i);n["default"]=o.a},"72b3":function(t,n,e){},"8bd5":function(t,n,e){"use strict";e.r(n);var a=e("33ad"),o=e("3831");for(var i in o)"default"!==i&&function(t){e.d(n,t,function(){return o[t]})}(i);e("d18d");var u=e("2877"),r=Object(u["a"])(o["default"],a["a"],a["b"],!1,null,null,null);n["default"]=r.exports},c1cd:function(t,n,e){"use strict";(function(t,a){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=i(e("a34a"));function i(t){return t&&t.__esModule?t:{default:t}}function u(t,n,e,a,o,i,u){try{var r=t[i](u),c=r.value}catch(l){return void e(l)}r.done?n(c):Promise.resolve(c).then(a,o)}function r(t){return function(){var n=this,e=arguments;return new Promise(function(a,o){var i=t.apply(n,e);function r(t){u(i,a,o,r,c,"next",t)}function c(t){u(i,a,o,r,c,"throw",t)}r(void 0)})}}var c=function(){return e.e("components/uni-list/uni-list").then(e.bind(null,"f90b"))},l=function(){return e.e("components/uni-list-item/uni-list-item").then(e.bind(null,"644c"))},s=function(){return e.e("components/shufei-action/action").then(e.bind(null,"8193"))},d={components:{uniList:c,uniListItem:l,action:s},data:function(){return{list:[{title:"我的银行卡",themb:"../../static/other/yue_card.png",url:"chooseBankCard",type:"1"}],type:"",balance:0}},methods:{onShow:function(){t.showLoading(),this.loading()},onNavigationBarButtonTap:function(n){console.log(a(n.index," at pages\\ohter\\wallet.vue:59")),t.navigateTo({url:"/pages/ohter/balance"})},goDetailPage:function(n,e){t.navigateTo({url:"/pages/ohter/"+n+"?typ="+e})},loading:function(){var t=r(o.default.mark(function t(){var n;return o.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.util.request({url:"/etenantsvr/myModule/queryAccountBalance",method:"post",data:{identityCardNo:this.$store.state.obj.identityNumber}});case 2:n=t.sent,0==n.code&&(this.balance=n.data.obj.balance);case 4:case"end":return t.stop()}},t,this)}));function n(){return t.apply(this,arguments)}return n}(),itemClick:function(n,e){console.log(a(n," at pages\\ohter\\wallet.vue:79")),0==n?t.navigateTo({url:"/pages/ohter/withdraw?type=".concat(n,"&balance=").concat(this.balance)}):t.navigateTo({url:"/pages/ohter/AlipayCash?balance=".concat(this.balance)})},openType0:function(){this.$refs.action.actionConfig={title:"提现到",list:["银行卡","支付宝"],type:0,isBorderColor:!1,isCloseCancel:!0,specClass:"show"}},terminate:function(){t.navigateTo({url:"reCharge"})}}};n.default=d}).call(this,e("6e42")["default"],e("0de9")["default"])},d18d:function(t,n,e){"use strict";var a=e("72b3"),o=e.n(a);o.a}},[["14c9","common/runtime","common/vendor"]]]);