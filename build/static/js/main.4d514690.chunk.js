(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{134:function(e,t,a){e.exports=a(410)},139:function(e,t,a){},141:function(e,t,a){},410:function(e,t,a){"use strict";a.r(t);var n=a(2),i=a.n(n),r=a(8),o=a.n(r),s=(a(139),a(59)),c=a(124),u=a(125),g=a(57),l=a(133),p=a(132),d=(a(140),a(141),a(44)),m=a(58),h=a(82),f=a.n(h),v=a(127),b=a(128),j=a.n(b),O={BASEURL:window.location.origin,PORT:"9000"},S=1;function y(e){return{id:S++,type:"loading",loading:e}}var E=function(e){Object(l.a)(a,e);var t=Object(p.a)(a);function a(e){var n;Object(c.a)(this,a);return(n=t.call(this,e)).props.loadImages(1,100),n.state={pageNo:1,pageSize:100},n.imageLoaded=n.imageLoaded.bind(Object(g.a)(n)),n}return Object(u.a)(a,[{key:"updatePageNo",value:function(e){var t=this;this.setState((function(t){Object.assign({},t).pageNo=e}),(function(){window.stop(),document.execCommand("Stop",!1),t.props.loadImages(t.state.pageNo,t.state.pageSize)}))}},{key:"imageLoaded",value:function(e){if(e+1<this.state.pageSize&&this.state.urls[e].url.length>0){var t=this.state.images[e+1].url,a=Object(s.a)(this.state.urls);a[e+1].url=t,this.setState({urls:a})}}},{key:"render",value:function(){var e=this;return i.a.createElement("div",null,i.a.createElement(d.Pagination,{className:"pagination",pageSize:this.state.pageSize,layout:"prev, pager, next, jumper",currentPage:this.state.pageNo,total:21e3,onCurrentChange:this.updatePageNo.bind(this)}),i.a.createElement("div",{className:"container"},this.props.load?i.a.createElement(d.Loading,null):this.props.images.map((function(t,a){return i.a.createElement("div",{className:"Image",key:e.state.pageNo*e.state.pageSize+a},i.a.createElement("img",{src:t.url,alt:a}))}))))}}]),a}(i.a.Component),N=function(e){return e.images},w=function(e){return e.loading},k=Object(m.b)((function(e){return{images:N(e),load:w(e)}}),(function(e){return{loadImages:function(t,a){return e(function(e,t){return function(){var a=Object(v.a)(f.a.mark((function a(n){var i;return f.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n(y(!0)),a.next=3,j()({method:"get",url:O.BASEURL+"/getImages",params:{pageNo:e,pageSize:t}});case 3:i=a.sent,console.log(i.data),"PASS"===i.data.status&&n((r=i.data.data,{id:S++,type:"set_images",images:r})),n(y(!1));case 7:case"end":return a.stop()}var r}),a)})));return function(e){return a.apply(this,arguments)}}()}(t,a))}}}))(E),z=a(33),L=Object(z.c)({images:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;return"set_images"===t.type?Object(s.a)(t.images):e},loading:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;return"loading"==t.type?t.loading:e}}),I=a(129),P=a(130),x=a(131);d.i18n.use(I.a);var C=Object(x.createLogger)(),A=Object(z.d)(L,Object(z.a)(P.a,C));o.a.render(i.a.createElement(m.a,{store:A},i.a.createElement(k,null)),document.getElementById("root"))}},[[134,1,2]]]);
//# sourceMappingURL=main.4d514690.chunk.js.map