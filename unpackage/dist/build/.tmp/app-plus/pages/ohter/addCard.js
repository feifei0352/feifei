(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ohter/addCard"],{"268a":function(t,e,n){},"778d":function(t,e,n){"use strict";var a=n("268a"),r=n.n(a);r.a},"9f61":function(t,e,n){"use strict";n.r(e);var a=n("e51f"),r=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e["default"]=r.a},c6e6:function(t,e,n){"use strict";n.r(e);var a=n("de21"),r=n("9f61");for(var i in r)"default"!==i&&function(t){n.d(e,t,function(){return r[t]})}(i);n("778d");var u=n("2877"),o=Object(u["a"])(r["default"],a["a"],a["b"],!1,null,null,null);e["default"]=o.exports},de21:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return r})},e51f:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(n("a34a"));function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e,n,a,r,i,u){try{var o=t[i](u),s=o.value}catch(c){return void n(c)}o.done?e(s):Promise.resolve(s).then(a,r)}function u(t){return function(){var e=this,n=arguments;return new Promise(function(a,r){var u=t.apply(e,n);function o(t){i(u,a,r,o,s,"next",t)}function s(t){i(u,a,r,o,s,"throw",t)}o(void 0)})}}var o={data:function(){return{state:0,addon:"请选择",list:[{type:0,name:"持卡人",plac:"请输入持卡人姓名"},{type:1,name:"卡号",plac:"请输入银行卡号"},{type:2,name:"银行",backName:""}],data:["",""],background:"#2cc3be"}},methods:{changeColor:function(){var e=u(a.default.mark(function e(){var n;return a.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.data[0]&&this.data[1]?this.background="#11D6D3":this.background="#2cc3be",8!=this.data[1].length){e.next=6;break}return e.next=4,this.util.request({url:"/etenantsvr/myModule/bankName",method:"post",data:{cardNum:this.data[1]}});case 4:n=e.sent,0==n.code?this.list[2].backName=n.data.obj:(this.list[2].backName="",t.showToast({title:"银行卡格式有误",duration:2e3,icon:"none"}));case 6:case"end":return e.stop()}},e,this)}));function n(){return e.apply(this,arguments)}return n}(),check:function(e){if(0==e){var n=/^([\u4e00-\u9fa5]){2,7}$/;n.test(this.data[0])||t.showToast({title:"姓名格式错误",duration:2e3,icon:"none"})}else if(1==e){if(0==this.data[1].length)return t.showToast({title:"银行卡号不能为空",duration:2e3,icon:"none"}),!1;if(this.data[1].length<6)return t.showToast({title:"银行卡号至少6位",duration:2e3,icon:"none"}),!1}},submit:function(){var e=u(a.default.mark(function e(){var n,r,i;return a.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(n=/^([\u4e00-\u9fa5]){2,7}$/,n.test(this.data[0])){e.next=4;break}return t.showToast({title:"姓名格式错误",duration:2e3,icon:"none"}),e.abrupt("return",!1);case 4:if(0!=this.data[1].length){e.next=7;break}return t.showToast({title:"银行卡号不能为空",duration:2e3,icon:"none"}),e.abrupt("return",!1);case 7:if(!(this.data[1].length<6)){e.next=10;break}return t.showToast({title:"银行卡号至少6位",duration:2e3,icon:"none"}),e.abrupt("return",!1);case 10:return e.next=12,this.util.request({url:"/etenantsvr/myModule/bankName",method:"post",data:{cardNum:this.data[1]}});case 12:if(r=e.sent,0!=r.code){e.next=19;break}return this.list[2].backName=r.data.obj,e.next=17,this.util.request({url:"/etenantsvr/myModule/bindBankCard",method:"post",data:{bankCardNum:this.data[1],bankCardName:this.list[2].backName,settleAcctNm:this.data[0],identityCardNo:this.$store.state.obj.identityNumber}});case 17:i=e.sent,0==i.code&&(t.showToast({title:"添加成功！",duration:2e3}),setTimeout(function(){t.navigateBack({delta:1})},500));case 19:case"end":return e.stop()}},e,this)}));function n(){return e.apply(this,arguments)}return n}()}};e.default=o}).call(this,n("6e42")["default"])}},[["605c","common/runtime","common/vendor"]]]);