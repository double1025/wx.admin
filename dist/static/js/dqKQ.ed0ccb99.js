(window.webpackJsonp=window.webpackJsonp||[]).push([["dqKQ"],{dqKQ:function(e,t,a){"use strict";a.r(t);var n=a("P2sY"),o=a.n(n),i={data:function(){var e={super_uid:""};return e=o()(e,this.p_page_base.page_data),console.log("page_data",e),e},mounted:function(){console.log("mounted"),this.g_page.funcSetVue(this),this.g_page.funcSetApiUrlList("/cashbook/admin/cashbook"),this.g_page.funcSetApiUrlEdit("/cashbook/admin/cashbook/edit"),this.g_page.funcSetApiUrlDel("/cashbook/admin/cashbook/del"),this.g_page.funcSetPageSize(10),this.form_q={compKw:""},this.g_page.funcGetList(),this.form_rules={acc_uidX:[{required:!0,message:"必填",trigger:"blur"}]}},methods:{}},l=a("KHd+"),c=Object(l.a)(i,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",[a("el-header",{staticClass:"x-header"},[a("div",{staticClass:"title"},[a("b",[e._v("\n        "+e._s(e.page_info.title)+"\n      ")]),e._v(" "),a("el-button",{attrs:{size:"mini",icon:"el-icon-s-tools",type:"primary",plain:""},on:{click:function(t){e.g_page.funcRedirectAppEdit()}}})],1),e._v(" "),a("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-download"},on:{click:function(t){e.g_page.funcExport("/cashbook/admin/cashbook/export")}}},[e._v("导出")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete"},on:{click:function(t){e.g_page.funcDel()}}},[e._v("删除")]),e._v(" "),a("el-button",{attrs:{size:"mini",icon:"el-icon-refresh"},on:{click:function(t){e.g_cc.func_reload()}}},[e._v("刷新")])],1),e._v(" "),a("el-main",{staticClass:"x-main"},[a("el-form",{attrs:{inline:!0,model:e.form_q,size:"mini"}},[a("el-form-item",{attrs:{label:"名称"}},[a("el-input",{attrs:{name:"compKw",placeholder:"名称"},model:{value:e.form_q.compKw,callback:function(t){e.$set(e.form_q,"compKw",t)},expression:"form_q.compKw"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.g_page.funcSearch}},[e._v("搜索")])],1)],1),e._v(" "),a("div",{staticClass:"table-wrap"},[a("el-table",{ref:"multipleTable",attrs:{stripe:"","tooltip-effect":"dark",data:e.list_data},on:{"selection-change":e.g_page.funcTableSelectionChange}},[a("el-table-column",{attrs:{type:"selection"}}),e._v(" "),a("el-table-column",{attrs:{label:"日期"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n            "+e._s(t.row.date)+"\n          ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"用户"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[e._v(e._s(t.row.wxuser_nickname))]),e._v(" "),a("div",[e._v(e._s(t.row.wxuser_openid))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"金额"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n            "+e._s(t.row.cashrec_num_r)+"\n          ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"创建时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n            "+e._s(t.row.cashrec_create_date)+"\n          ")]}}])})],1)],1)],1),e._v(" "),a("el-footer",[a("el-pagination",{staticClass:"paging",attrs:{background:"",layout:"total, prev, pager, next, jumper","current-page":e.page_index,"page-size":e.page_size,total:e.page_total},on:{"current-change":e.g_page.funcPageChange}})],1)],1)},[],!1,null,null,null);c.options.__file="list.vue";t.default=c.exports}}]);