(this.webpackJsonphackduke21=this.webpackJsonphackduke21||[]).push([[0],{15:function(t,e,n){},16:function(t,e,n){},19:function(t,e,n){"use strict";n.r(e);var r=n(3),c=n.n(r),a=n(5),i=n.n(a),o=(n(15),n.p+"static/media/logo.6ce24c58.svg"),s=(n(16),n(1)),u=n.n(s),p=n(2),d=n(6),l=n(7),f=n(10),h=n(8),j=n(9),O=function(){var t=Object(p.a)(u.a.mark((function t(){var e,n,r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}),n=e.API_KEY,e.NODE_ENV,console.log(n),r=fetch("https://thefluentme.p.rapidapi.com/post?page=1&per_page=10",{method:"GET",headers:{"x-rapidapi-host":"thefluentme.p.rapidapi.com","x-rapidapi-key":n}}).then(function(){var t=Object(p.a)(u.a.mark((function t(e){var n,r,c,a,i;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.json();case 2:n=t.sent,r=[],c=Object(j.a)(n[1].posts);try{for(c.s();!(a=c.n()).done;)i=a.value,r.push({difficulty:i.post_title.split("_")[0],id:i.post_id,content:i.post_content})}catch(o){c.e(o)}finally{c.f()}return t.abrupt("return",r);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),console.log(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0})),t.abrupt("return",r);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),v=n(0),b=function(t){Object(f.a)(n,t);var e=Object(h.a)(n);function n(t){var r;return Object(d.a)(this,n),(r=e.call(this,t)).state={difficulty:"",textid:"",text:""},r}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var t=Object(p.a)(u.a.mark((function t(){var e,n,r,c=this;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,O();case 2:e=t.sent,n=e.filter((function(t){return t.difficulty===c.props.difficulty})),r=Math.floor(Math.random()*n.length),this.setState({textid:n[r].id,text:n[r].content});case 6:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){return Object(v.jsx)("div",{children:this.state.text})}}]),n}(c.a.Component),_=b;var x=function(){return Object(v.jsxs)("div",{className:"App",children:[Object(v.jsxs)("header",{className:"App-header",children:[Object(v.jsx)("img",{src:o,className:"App-logo",alt:"logo"}),Object(v.jsxs)("p",{children:["Edit ",Object(v.jsx)("code",{children:"src/App.js"})," and save to reload."]}),Object(v.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]}),Object(v.jsx)(_,{difficulty:"MEDIUM"})]})},E=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,20)).then((function(e){var n=e.getCLS,r=e.getFID,c=e.getFCP,a=e.getLCP,i=e.getTTFB;n(t),r(t),c(t),a(t),i(t)}))};i.a.render(Object(v.jsx)(c.a.StrictMode,{children:Object(v.jsx)(x,{})}),document.getElementById("root")),E()}},[[19,1,2]]]);
//# sourceMappingURL=main.9706661b.chunk.js.map