(window.webpackJsonp=window.webpackJsonp||[]).push([["lX6j"],{lX6j:function(e,t,a){"use strict";a.r(t);var i=a("P2sY"),l=a.n(i),n={data:function(){var e={super_uid:""};return e=l()(e,this.p_page_base.page_data)},mounted:function(){console.log("mounted"),this.g_page.funcSetVue(this),this.g_page.funcSetApiUrlList("/app_admin/admin/app_admin"),this.g_page.funcSetApiUrlSave("/app_admin/admin/app_admin/save"),this.g_page.funcSetPageSize(10),this.form_q={compKw:""},this.g_page.funcGetList(),this.form_rules={acc_uidX:[{required:!0,message:"必填",trigger:"blur"}]}},methods:{funcEdit:function(e){this.g_cc.func_redirect("/app_admin/edit",{id:e.id,callback_url:"/app_admin/list"})},funcSaveBefore:function(e){return console.log("funcSaveBefore",e),e.reply_pic=this.g_page.funcImgArrToStr(e.reply_pic_imgs),e}}},o=a("KHd+"),r=Object(o.a)(n,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",[a("el-header",{staticClass:"x-header"},[a("b",{staticClass:"title"},[e._v(e._s(e.page_info.title))]),e._v(" "),a("el-button",{attrs:{size:"mini",icon:"el-icon-refresh"},on:{click:function(t){e.g_cc.func_reload()}}},[e._v("刷新")])],1),e._v(" "),a("el-main",{staticClass:"x-main"},[a("el-form",{attrs:{inline:!0,model:e.form_q,size:"mini"}},[a("el-form-item",{attrs:{label:"名称"}},[a("el-input",{attrs:{name:"compKw",placeholder:"名称"},model:{value:e.form_q.compKw,callback:function(t){e.$set(e.form_q,"compKw",t)},expression:"form_q.compKw"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.g_page.funcSearch}},[e._v("搜索")])],1)],1),e._v(" "),a("div",{staticClass:"table-wrap"},[a("el-table",{ref:"multipleTable",attrs:{stripe:"","tooltip-effect":"dark",data:e.list_data},on:{"selection-change":e.g_page.funcTableSelectionChange}},[a("el-table-column",{attrs:{type:"selection"}}),e._v(" "),a("el-table-column",{attrs:{label:"APPID"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n            "+e._s(t.row.app_id)+"\n          ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{domProps:{innerHTML:e._s(t.row.app_name)}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){e.funcEdit(t.row)}}},[e._v("应用配置")])]}}])})],1),e._v(" "),a("a",{attrs:{target:"_blank"}})],1)],1),e._v(" "),a("el-footer",[a("el-pagination",{staticClass:"paging",attrs:{background:"",layout:"total, prev, pager, next, jumper","current-page":e.page_index,"page-size":e.page_size,total:e.page_total},on:{"current-change":e.g_page.funcPageChange}})],1),e._v(" "),a("el-dialog",{attrs:{title:e.form.app_idx+"配置",visible:e.form_dialog_visible,width:"70%"},on:{"update:visible":function(t){e.form_dialog_visible=t}}},[a("el-form",{ref:"form",attrs:{rules:e.form_rules,model:e.form,size:"mini","label-width":"15%"}},[e.g_page.funcIsAdminAdd()?e._e():a("el-form-item",{attrs:{label:"入口链接"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.form.oauth_url,callback:function(t){e.$set(e.form,"oauth_url",t)},expression:"form.oauth_url"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:e.g_page.funcBack}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"success",size:"mini"},on:{click:e.g_page.funcSave}},[e._v("保存")])],1)],1)],1)},[],!1,null,null,null);r.options.__file="list.vue";t.default=r.exports}}]);