(window.webpackJsonp=window.webpackJsonp||[]).push([["AT0G"],{AT0G:function(e,t,l){"use strict";l.r(t);var r=l("P2sY"),a=l.n(r),o={data:function(){var e={super_uid:""};return e=a()(e,this.p_page_base.page_data),console.log("page_data"),console.log(e),e},mounted:function(){console.log("mounted"),this.g_page.funcSetVue(this),this.g_page.funcSetApiUrlList("/reply/admin/reply"),this.g_page.funcSetApiUrlEdit("/reply/admin/reply/edit"),this.g_page.funcSetApiUrlSave("/reply/admin/reply/save"),this.g_page.funcSetApiUrlDel("/reply/admin/reply/del"),this.g_page.funcSetPageSize(10),this.form_q={compKw:""},this.g_page.funcGetList(),this.form_rules={acc_uidX:[{required:!0,message:"必填",trigger:"blur"}]}},methods:{funcSaveBefore:function(e){return console.log("funcSaveBefore",e),e.reply_pic=this.g_page.funcImgArrToStr(e.reply_pic_imgs),e},isMsg:function(){return"msg"==this.form.reply_type}}},i=l("KHd+"),s=Object(i.a)(o,function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("el-container",[l("el-header",{staticClass:"x-header"},[l("b",{staticClass:"title"},[e._v("回复列表")]),e._v(" "),l("el-button",{attrs:{size:"mini",type:"success",icon:"el-icon-edit"},on:{click:e.g_page.funcEdit}},[e._v("添加")]),e._v(" "),l("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete"},on:{click:function(t){e.g_page.funcDel()}}},[e._v("删除\n      ")]),e._v(" "),l("el-button",{attrs:{size:"mini",icon:"el-icon-refresh"},on:{click:function(t){e.g_cc.func_reload()}}},[e._v("刷新")])],1),e._v(" "),l("el-main",{staticClass:"x-main"},[l("el-form",{attrs:{inline:!0,model:e.form_q,size:"mini"}},[l("el-form-item",{attrs:{label:"名称"}},[l("el-input",{attrs:{name:"compKw",placeholder:"名称"},model:{value:e.form_q.compKw,callback:function(t){e.$set(e.form_q,"compKw",t)},expression:"form_q.compKw"}})],1),e._v(" "),l("el-form-item",[l("el-button",{attrs:{type:"primary"},on:{click:e.g_page.funcSearch}},[e._v("搜索")])],1)],1),e._v(" "),l("div",{staticClass:"table-wrap"},[l("el-table",{ref:"multipleTable",attrs:{stripe:"","tooltip-effect":"dark",data:e.list_data},on:{"selection-change":e.g_page.funcTableSelectionChange}},[l("el-table-column",{attrs:{type:"selection"}}),e._v(" "),l("el-table-column",{attrs:{label:"KEY"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n              "+e._s(t.row.reply_key)+"\n            ")]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n              "+e._s(t.row.reply_name)+"\n            ")]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n              "+e._s(t.row.type)+"\n            ")]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(l){e.g_page.funcEdit(t.row)}}},[e._v("编辑")])]}}])})],1)],1)],1),e._v(" "),l("el-footer",[l("el-pagination",{staticClass:"paging",attrs:{background:"",layout:"total, prev, pager, next, jumper","current-page":e.page_index,"page-size":e.page_size,total:e.page_total},on:{"current-change":e.g_page.funcPageChange}})],1),e._v(" "),l("el-dialog",{attrs:{title:"编辑",visible:e.form_dialog_visible,width:"70%"},on:{"update:visible":function(t){e.form_dialog_visible=t}}},[l("el-form",{ref:"form",attrs:{rules:e.form_rules,model:e.form,size:"mini","label-width":"15%"}},[l("el-form-item",{attrs:{label:"KEY",prop:"reply_key"}},[l("el-input",{model:{value:e.form.reply_key,callback:function(t){e.$set(e.form,"reply_key",t)},expression:"form.reply_key"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"名称",prop:"reply_name"}},[l("el-input",{model:{value:e.form.reply_name,callback:function(t){e.$set(e.form,"reply_name",t)},expression:"form.reply_name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"类型",prop:"reply_type"}},[l("el-radio",{attrs:{label:"text"},model:{value:e.form.reply_type,callback:function(t){e.$set(e.form,"reply_type",t)},expression:"form.reply_type"}},[e._v("文本回复")]),e._v(" "),l("el-radio",{attrs:{label:"msg"},model:{value:e.form.reply_type,callback:function(t){e.$set(e.form,"reply_type",t)},expression:"form.reply_type"}},[e._v("图文回复")])],1),e._v(" "),l("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.isMsg(),expression:"isMsg()"}],attrs:{label:"图文-标题",prop:"reply_title"}},[l("el-input",{model:{value:e.form.reply_title,callback:function(t){e.$set(e.form,"reply_title",t)},expression:"form.reply_title"}})],1),e._v(" "),l("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.isMsg(),expression:"isMsg()"}],attrs:{label:"图文-图片",prop:"reply_pic"}},[l("x-upload-imgs",{ref:"uploadEle",attrs:{sortable:!0,"max-num":1,value:e.form.reply_pic_imgs,"remote-fuc":e.g_page.funcUpdateImg,"before-upload":e.g_page.funcUpdateImgBefore},on:{"update:value":function(t){e.$set(e.form,"reply_pic_imgs",t)}}})],1),e._v(" "),l("el-form-item",{attrs:{label:e.isMsg()?"图文-描述":"回复内容",prop:"reply_desc"}},[l("el-input",{attrs:{type:"textarea",rows:5},model:{value:e.form.reply_desc,callback:function(t){e.$set(e.form,"reply_desc",t)},expression:"form.reply_desc"}})],1),e._v(" "),l("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.isMsg(),expression:"isMsg()"}],attrs:{label:"跳转方式",prop:"reply_redirect_type"}},[l("el-radio",{attrs:{label:""},model:{value:e.form.reply_redirect_type,callback:function(t){e.$set(e.form,"reply_redirect_type",t)},expression:"form.reply_redirect_type"}},[e._v("键跳转")]),e._v(" "),l("el-radio",{attrs:{label:"url"},model:{value:e.form.reply_redirect_type,callback:function(t){e.$set(e.form,"reply_redirect_type",t)},expression:"form.reply_redirect_type"}},[e._v("链接跳转")])],1),e._v(" "),l("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.isMsg(),expression:"isMsg()"}],attrs:{label:"跳转-内容",prop:"reply_redirect"}},[l("el-input",{model:{value:e.form.reply_redirect,callback:function(t){e.$set(e.form,"reply_redirect",t)},expression:"form.reply_redirect"}})],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{size:"mini"},on:{click:e.g_page.funcBack}},[e._v("取消")]),e._v(" "),l("el-button",{attrs:{type:"success",size:"mini"},on:{click:e.g_page.funcSave}},[e._v("保存")])],1)],1)],1)},[],!1,null,null,null);s.options.__file="list.vue";t.default=s.exports}}]);