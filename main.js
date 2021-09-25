(()=>{var e,t,n,r,o,a={4785:function(e,t){var n,r;void 0===(r="function"==typeof(n=function(){return function e(t,n,r){var o,a,i=window,s="application/octet-stream",l=r||s,c=t,u=!n&&!r&&c,d=document.createElement("a"),f=function(e){return String(e)},h=i.Blob||i.MozBlob||i.WebKitBlob||f,p=n||"download";if(h=h.call?h.bind(i):Blob,"true"===String(this)&&(l=(c=[c,l])[0],c=c[1]),u&&u.length<2048&&(p=u.split("/").pop().split("?")[0],d.href=u,-1!==d.href.indexOf(u))){var m=new XMLHttpRequest;return m.open("GET",u,!0),m.responseType="blob",m.onload=function(t){e(t.target.response,p,s)},setTimeout((function(){m.send()}),0),m}if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(c)){if(!(c.length>2096103.424&&h!==f))return navigator.msSaveBlob?navigator.msSaveBlob(y(c),p):w(c);l=(c=y(c)).type||s}else if(/([\x80-\xff])/.test(c)){for(var g=0,v=new Uint8Array(c.length),b=v.length;g<b;++g)v[g]=c.charCodeAt(g);c=new h([v],{type:l})}function y(e){for(var t=e.split(/[:;,]/),n=t[1],r=("base64"==t[2]?atob:decodeURIComponent)(t.pop()),o=r.length,a=0,i=new Uint8Array(o);a<o;++a)i[a]=r.charCodeAt(a);return new h([i],{type:n})}function w(e,t){if("download"in d)return d.href=e,d.setAttribute("download",p),d.className="download-js-link",d.innerHTML="downloading...",d.style.display="none",document.body.appendChild(d),setTimeout((function(){d.click(),document.body.removeChild(d),!0===t&&setTimeout((function(){i.URL.revokeObjectURL(d.href)}),250)}),66),!0;if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent))return/^data:/.test(e)&&(e="data:"+e.replace(/^data:([\w\/\-\+]+)/,s)),window.open(e)||confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")&&(location.href=e),!0;var n=document.createElement("iframe");document.body.appendChild(n),!t&&/^data:/.test(e)&&(e="data:"+e.replace(/^data:([\w\/\-\+]+)/,s)),n.src=e,setTimeout((function(){document.body.removeChild(n)}),333)}if(o=c instanceof h?c:new h([c],{type:l}),navigator.msSaveBlob)return navigator.msSaveBlob(o,p);if(i.URL)w(i.URL.createObjectURL(o),!0);else{if("string"==typeof o||o.constructor===f)try{return w("data:"+l+";base64,"+i.btoa(o))}catch(e){return w("data:"+l+","+encodeURIComponent(o))}(a=new FileReader).onload=function(e){w(this.result)},a.readAsDataURL(o)}return!0}})?n.apply(t,[]):n)||(e.exports=r)}},i={};function s(e){var t=i[e];if(void 0!==t)return t.exports;var n=i[e]={id:e,loaded:!1,exports:{}};return a[e].call(n.exports,n,n.exports,s),n.loaded=!0,n.exports}s.m=a,e=[],s.O=(t,n,r,o)=>{if(!n){var a=1/0;for(u=0;u<e.length;u++){for(var[n,r,o]=e[u],i=!0,l=0;l<n.length;l++)(!1&o||a>=o)&&Object.keys(s.O).every((e=>s.O[e](n[l])))?n.splice(l--,1):(i=!1,o<a&&(a=o));if(i){e.splice(u--,1);var c=r();void 0!==c&&(t=c)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[n,r,o]},s.F={},s.E=e=>{Object.keys(s.F).map((t=>{s.F[t](e)}))},s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},n=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,s.t=function(e,r){if(1&r&&(e=this(e)),8&r)return e;if("object"==typeof e&&e){if(4&r&&e.__esModule)return e;if(16&r&&"function"==typeof e.then)return e}var o=Object.create(null);s.r(o);var a={};t=t||[null,n({}),n([]),n(n)];for(var i=2&r&&e;"object"==typeof i&&!~t.indexOf(i);i=n(i))Object.getOwnPropertyNames(i).forEach((t=>a[t]=()=>e[t]));return a.default=()=>e,s.d(o,a),o},s.d=(e,t)=>{for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},s.f={},s.e=e=>Promise.all(Object.keys(s.f).reduce(((t,n)=>(s.f[n](e,t),t)),[])),s.u=e=>e+".main.js",s.miniCssF=e=>"main.css",s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r={},o="hfy-epub:",s.l=(e,t,n,a)=>{if(r[e])r[e].push(t);else{var i,l;if(void 0!==n)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var d=c[u];if(d.getAttribute("src")==e||d.getAttribute("data-webpack")==o+n){i=d;break}}i||(l=!0,(i=document.createElement("script")).charset="utf-8",i.timeout=120,s.nc&&i.setAttribute("nonce",s.nc),i.setAttribute("data-webpack",o+n),i.src=e),r[e]=[t];var f=(t,n)=>{i.onerror=i.onload=null,clearTimeout(h);var o=r[e];if(delete r[e],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach((e=>e(n))),t)return t(n)},h=setTimeout(f.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=f.bind(null,i.onerror),i.onload=f.bind(null,i.onload),l&&document.head.appendChild(i)}},s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e;s.g.importScripts&&(e=s.g.location+"");var t=s.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),s.p=e})(),(()=>{var e={179:0};s.f.j=(t,n)=>{var r=s.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else{var o=new Promise(((n,o)=>r=e[t]=[n,o]));n.push(r[2]=o);var a=s.p+s.u(t),i=new Error;s.l(a,(n=>{if(s.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var o=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;i.message="Loading chunk "+t+" failed.\n("+o+": "+a+")",i.name="ChunkLoadError",i.type=o,i.request=a,r[1](i)}}),"chunk-"+t,t)}},s.F.j=t=>{if(!s.o(e,t)||void 0===e[t]){e[t]=null;var n=document.createElement("link");s.nc&&n.setAttribute("nonce",s.nc),n.rel="prefetch",n.as="script",n.href=s.p+s.u(t),document.head.appendChild(n)}},s.O.j=t=>0===e[t];var t=(t,n)=>{var r,o,[a,i,l]=n,c=0;if(a.some((t=>0!==e[t]))){for(r in i)s.o(i,r)&&(s.m[r]=i[r]);if(l)var u=l(s)}for(t&&t(n);c<a.length;c++)o=a[c],s.o(e,o)&&e[o]&&e[o][0](),e[a[c]]=0;return s.O(u)},n=self.webpackChunkhfy_epub=self.webpackChunkhfy_epub||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})(),s.O(0,[179],(()=>{s.E(752),s.E(483)}),5);var l={};(()=>{"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function r(e){e.forEach(t)}function o(e){return"function"==typeof e}function a(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function i(e){return 0===Object.keys(e).length}new Set;let l,c=!1;function u(e,t){e.appendChild(t)}function d(e,t,n){e.insertBefore(t,n||null)}function f(e){e.parentNode.removeChild(e)}function h(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function p(e){return document.createElement(e)}function m(e){return document.createTextNode(e)}function g(){return m(" ")}function v(){return m("")}function b(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function y(e){return function(t){return t.preventDefault(),e.call(this,t)}}function w(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function $(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function x(e,t){e.value=null==t?"":t}function E(e){l=e}new Set;const k=[],N=[],T=[],R=[],O=Promise.resolve();let C=!1;function S(e){T.push(e)}let A=!1;const L=new Set;function _(){if(!A){A=!0;do{for(let e=0;e<k.length;e+=1){const t=k[e];E(t),P(t.$$)}for(E(null),k.length=0;N.length;)N.pop()();for(let e=0;e<T.length;e+=1){const t=T[e];L.has(t)||(L.add(t),t())}T.length=0}while(k.length);for(;R.length;)R.pop()();C=!1,A=!1,L.clear()}}function P(e){if(null!==e.fragment){e.update(),r(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(S)}}const j=new Set;let G,I;function U(e,t){e&&e.i&&(j.delete(e),e.i(t))}function D(e,t,n,r){if(e&&e.o){if(j.has(e))return;j.add(e),G.c.push((()=>{j.delete(e),r&&(n&&e.d(1),r())})),e.o(t)}}function H(e){e&&e.c()}function F(e,n,a,i){const{fragment:s,on_mount:l,on_destroy:c,after_update:u}=e.$$;s&&s.m(n,a),i||S((()=>{const n=l.map(t).filter(o);c?c.push(...n):r(n),e.$$.on_mount=[]})),u.forEach(S)}function M(e,t){const n=e.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function B(t,o,a,i,s,u,d,h=[-1]){const p=l;E(t);const m=t.$$={fragment:null,ctx:null,props:u,update:e,not_equal:s,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(p?p.$$.context:o.context||[]),callbacks:n(),dirty:h,skip_bound:!1,root:o.target||p.$$.root};d&&d(m.root);let g=!1;if(m.ctx=a?a(t,o.props||{},((e,n,...r)=>{const o=r.length?r[0]:n;return m.ctx&&s(m.ctx[e],m.ctx[e]=o)&&(!m.skip_bound&&m.bound[e]&&m.bound[e](o),g&&function(e,t){-1===e.$$.dirty[0]&&(k.push(e),C||(C=!0,O.then(_)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}(t,e)),n})):[],m.update(),g=!0,r(m.before_update),m.fragment=!!i&&i(m.ctx),o.target){if(o.hydrate){c=!0;const e=(v=o.target,Array.from(v.childNodes));m.fragment&&m.fragment.l(e),e.forEach(f)}else m.fragment&&m.fragment.c();o.intro&&U(t.$$.fragment),F(t,o.target,o.anchor,o.customElement),c=!1,_()}var v;E(p)}"undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global,new Set(["allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","hidden","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"]),"function"==typeof HTMLElement&&(I=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const{on_mount:e}=this.$$;this.$$.on_disconnect=e.map(t).filter(o);for(const e in this.$$.slotted)this.appendChild(this.$$.slotted[e])}attributeChangedCallback(e,t,n){this[e]=n}disconnectedCallback(){r(this.$$.on_disconnect)}$destroy(){M(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){this.$$set&&!i(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}});class W{$destroy(){M(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){this.$$set&&!i(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function q(e){let t;return{c(){t=p("p"),t.innerHTML='This website (<a href="https://cpiber.github.io/hfy-epub" target="_blank" class="svelte-agc9w7">https://cpiber.github.io/hfy-epub</a>) does not, and will not, collect any data from its users.\n      Any actions taken on this page are purely in the user&#39;s browser; there is no server-side component.\n      No data is ever sent away.\n      For collecting the chapter data, this site contacts <code class="svelte-agc9w7">https://api.reddit.com</code> only. The book is generated in the browser.',w(t,"class","small svelte-agc9w7")},m(e,n){d(e,t,n)},d(e){e&&f(t)}}}function K(t){let n,r,o,a,i,s,l,c,h,v,$,x,E,k,N=t[0]&&q();return{c(){n=p("footer"),r=p("p"),o=m("Made by "),a=p("a"),a.textContent="@cpiber",i=m(". Source Code: "),s=p("a"),s.textContent="cpiber/hfy-epub",l=m(". Version "),c=m("0.1.2"),h=m(". "),v=p("a"),v.textContent="Privacy",$=m("."),x=g(),N&&N.c(),w(a,"href","https://github.com/cpiber"),w(a,"target","_blank"),w(a,"class","svelte-agc9w7"),w(s,"href","https://github.com/cpiber/hfy-epub"),w(s,"target","_blank"),w(s,"class","svelte-agc9w7"),w(v,"href","#?"),w(v,"class","svelte-agc9w7"),w(r,"class","small svelte-agc9w7"),w(n,"class","svelte-agc9w7")},m(e,f){d(e,n,f),u(n,r),u(r,o),u(r,a),u(r,i),u(r,s),u(r,l),u(r,c),u(r,h),u(r,v),u(r,$),u(n,x),N&&N.m(n,null),E||(k=b(v,"click",y(t[1])),E=!0)},p(e,[t]){e[0]?N||(N=q(),N.c(),N.m(n,null)):N&&(N.d(1),N=null)},i:e,o:e,d(e){e&&f(n),N&&N.d(),E=!1,k()}}}function Y(e,t,n){let r=!1;return[r,()=>n(0,r=!r)]}const z=class extends W{constructor(e){super(),B(this,e,Y,K,a,{})}};function V(t){let n;return{c(){n=p("header"),n.innerHTML='<h1 class="svelte-10isbm1">r/HFY epub generator</h1>',w(n,"class","svelte-10isbm1")},m(e,t){d(e,n,t)},p:e,i:e,o:e,d(e){e&&f(n)}}}const X=class extends W{constructor(e){super(),B(this,e,null,V,a,{})}};function J(e){let t;return{c(){t=p("p"),t.textContent="Please enter a search string",w(t,"class","small error svelte-1uob44x")},m(e,n){d(e,t,n)},d(e){e&&f(t)}}}function Q(t){let n,o,a,i,s,l,c,h,m,y,$,E,k,N=!t[0].trim().length,T=N&&J();return{c(){n=p("h2"),n.textContent="Please enter your search terms below:",o=g(),a=p("p"),a.innerHTML='For now, we only support <a href="https://reddit.com/r/HFY" target="_blank">r/HFY</a>: series titles and urls to wiki pages',i=g(),s=p("form"),l=p("input"),c=g(),h=p("input"),y=g(),T&&T.c(),$=v(),w(n,"class","heading svelte-1uob44x"),w(l,"class","search svelte-1uob44x"),w(l,"placeholder","Search..."),w(h,"type","submit"),h.value="Go",w(h,"class","submit svelte-1uob44x"),h.disabled=m=!t[0].trim().length,w(h,"name","search"),w(s,"class","form svelte-1uob44x")},m(e,r){var f;d(e,n,r),d(e,o,r),d(e,a,r),d(e,i,r),d(e,s,r),u(s,l),x(l,t[0]),u(s,c),u(s,h),d(e,y,r),T&&T.m(e,r),d(e,$,r),E||(k=[b(l,"input",t[2]),b(s,"submit",(f=t[3],function(e){return e.stopPropagation(),f.call(this,e)}))],E=!0)},p(e,[t]){1&t&&l.value!==e[0]&&x(l,e[0]),1&t&&m!==(m=!e[0].trim().length)&&(h.disabled=m),1&t&&(N=!e[0].trim().length),N?T||(T=J(),T.c(),T.m($.parentNode,$)):T&&(T.d(1),T=null)},i:e,o:e,d(e){e&&f(n),e&&f(o),e&&f(a),e&&f(i),e&&f(s),e&&f(y),T&&T.d(e),e&&f($),E=!1,r(k)}}}function Z(e,t,n){let{search:r=""}=t,{goNext:o}=t;return e.$$set=e=>{"search"in e&&n(0,r=e.search),"goNext"in e&&n(1,o=e.goNext)},[r,o,function(){r=this.value,n(0,r)},()=>o(r)]}const ee=class extends W{constructor(e){super(),B(this,e,Z,Q,a,{search:0,goNext:1})}};var te,ne=s(4785),re=s.n(ne),oe=function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{l(r.next(e))}catch(e){a(e)}}function s(e){try{l(r.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,s)}l((r=r.apply(e,t||[])).next())}))},ae=function(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}},ie=function(e,t){return oe(void 0,void 0,void 0,(function(){var n,r;return ae(this,(function(o){switch(o.label){case 0:n="undefined"!=typeof AbortController?new AbortController:{},r=setTimeout((function(){return n.abort&&n.abort()}),t),o.label=1;case 1:return o.trys.push([1,,3,4]),[4,fetch(e,{signal:n.signal})];case 2:return[2,o.sent()];case 3:return clearTimeout(r),[7];case 4:return[2]}}))}))},se=function(e,t,n){return void 0===t&&(t=1e4),void 0===n&&(n=3),oe(void 0,void 0,void 0,(function(){var r;return ae(this,(function(o){switch(o.label){case 0:r=0,o.label=1;case 1:if(!(r<n-1))return[3,6];o.label=2;case 2:return o.trys.push([2,4,,5]),[4,ie(e,t)];case 3:return[2,o.sent()];case 4:return o.sent(),console.log("Failed to fetch `"+e+"` "+(r+1)+" "+(0===r?"time":"times")+". Retrying..."),[3,5];case 5:return r++,[3,1];case 6:return[2,ie(e,t)]}}))}))},le=function(e){return e.hostname="api.reddit.com",e.pathname.endsWith("/")?e.pathname=e.pathname.slice(0,e.pathname.length-1)+".json":e.pathname.endsWith(".json")||(e.pathname+=".json"),e.protocol="https",e.toString()},ce=function(e){return e.slice(0,-5).replace("https://api","https://www")},ue=(te=new DOMParser,function(e){return te.parseFromString(e,"text/html").documentElement.textContent});function de(e,t,n){const r=e.slice();return r[14]=t[n],r}function fe(e){let t,n,r,o,a,i,s,l,c=e[5]?": ":"";return{c(){t=p("p"),n=m("Sorry, there was an error"),r=m(c),o=m(e[5]),a=g(),i=p("button"),i.textContent="Retry",w(t,"class","error svelte-ggvisn")},m(c,f){d(c,t,f),u(t,n),u(t,r),u(t,o),d(c,a,f),d(c,i,f),s||(l=b(i,"click",e[8]),s=!0)},p(e,t){32&t&&c!==(c=e[5]?": ":"")&&$(r,c),32&t&&$(o,e[5])},d(e){e&&f(t),e&&f(a),e&&f(i),s=!1,l()}}}function he(t){let n,r,o,a,i;return{c(){n=p("h3"),n.textContent="Your ebook is ready!",r=g(),o=p("button"),o.textContent="Download",w(n,"class","valid svelte-ggvisn")},m(e,s){d(e,n,s),d(e,r,s),d(e,o,s),a||(i=b(o,"click",t[10]),a=!0)},p:e,d(e){e&&f(n),e&&f(r),e&&f(o),a=!1,i()}}}function pe(t){let n;return{c(){n=p("div"),n.innerHTML='<div class="loading-slider-container svelte-ggvisn"><span class="loading-slider svelte-ggvisn">•</span></div> \n    <p class="loading svelte-ggvisn">Please wait, generating ebook...</p>',w(n,"class","loading-container svelte-ggvisn")},m(e,t){d(e,n,t)},p:e,d(e){e&&f(n)}}}function me(e){let t,n,r,o=e[6],a=[];for(let t=0;t<o.length;t+=1)a[t]=ye(de(e,o,t));return{c(){t=p("div"),t.innerHTML='<div class="loading-slider-container svelte-ggvisn"><span class="loading-slider svelte-ggvisn">•</span></div> \n    <p class="loading svelte-ggvisn">Please wait, fetching chapters...</p>',n=g(),r=p("div");for(let e=0;e<a.length;e+=1)a[e].c();w(t,"class","loading-container svelte-ggvisn"),w(r,"class","chapters svelte-ggvisn")},m(e,o){d(e,t,o),d(e,n,o),d(e,r,o);for(let e=0;e<a.length;e+=1)a[e].m(r,null)},p(e,t){if(64&t){let n;for(o=e[6],n=0;n<o.length;n+=1){const i=de(e,o,n);a[n]?a[n].p(i,t):(a[n]=ye(i),a[n].c(),a[n].m(r,null))}for(;n<a.length;n+=1)a[n].d(1);a.length=o.length}},d(e){e&&f(t),e&&f(n),e&&f(r),h(a,e)}}}function ge(e){let t,n,r,o,a,i,s,l,c,h,v,y,x,E,k,N,T,R,O,C,S,A,L,_=e[4].title+"",P=e[4].author+"",j=e[4].chapters.length+"";return{c(){t=m("Got the following series:\n\n  "),n=p("div"),r=p("h3"),r.textContent="Title",o=g(),a=p("p"),i=p("a"),s=m(_),c=g(),h=p("h3"),h.textContent="Author",v=g(),y=p("p"),x=m(P),E=g(),k=p("h3"),k.textContent="Chapters",N=g(),T=p("p"),R=m("Found "),O=m(j),C=g(),S=p("button"),S.textContent="Fetch chapters and generate EPUB",w(i,"href",l=ce(e[1])),w(i,"target","_blank"),w(n,"class","series-card svelte-ggvisn")},m(l,f){d(l,t,f),d(l,n,f),u(n,r),u(n,o),u(n,a),u(a,i),u(i,s),u(n,c),u(n,h),u(n,v),u(n,y),u(y,x),u(n,E),u(n,k),u(n,N),u(n,T),u(T,R),u(T,O),d(l,C,f),d(l,S,f),A||(L=b(S,"click",e[9]),A=!0)},p(e,t){16&t&&_!==(_=e[4].title+"")&&$(s,_),2&t&&l!==(l=ce(e[1]))&&w(i,"href",l),16&t&&P!==(P=e[4].author+"")&&$(x,P),16&t&&j!==(j=e[4].chapters.length+"")&&$(O,j)},d(e){e&&f(t),e&&f(n),e&&f(C),e&&f(S),A=!1,L()}}}function ve(t){let n;return{c(){n=p("div"),n.innerHTML='<div class="loading-slider-container svelte-ggvisn"><span class="loading-slider svelte-ggvisn">•</span></div> \n    <p class="loading svelte-ggvisn">Please wait, fetching data...</p>',w(n,"class","loading-container svelte-ggvisn")},m(e,t){d(e,n,t)},p:e,d(e){e&&f(n)}}}function be(e){let t,n,r=e[14].title+"";return{c(){t=p("p"),n=m(r),w(t,"class","valid small svelte-ggvisn")},m(e,r){d(e,t,r),u(t,n)},p(e,t){64&t&&r!==(r=e[14].title+"")&&$(n,r)},d(e){e&&f(t)}}}function ye(e){let t,n=e[14]&&be(e);return{c(){n&&n.c(),t=v()},m(e,r){n&&n.m(e,r),d(e,t,r)},p(e,r){e[14]?n?n.p(e,r):(n=be(e),n.c(),n.m(t.parentNode,t)):n&&(n.d(1),n=null)},d(e){n&&n.d(e),e&&f(t)}}}function we(e){let t,n,r;return{c(){t=p("a"),t.textContent="Back to Search",w(t,"href","#?"),w(t,"class","small")},m(a,i){d(a,t,i),n||(r=b(t,"click",y((function(){o(e[0])&&e[0].apply(this,arguments)}))),n=!0)},p(t,n){e=t},d(e){e&&f(t),n=!1,r()}}}function $e(t){let n,r;function o(e,t){return e[3]===e[2].LOADING?ve:e[3]===e[2].PRESENT?ge:e[3]===e[2].FETCHING?me:e[3]===e[2].GENERATING?pe:e[3]===e[2].DOWNLOAD?he:e[3]===e[2].ERROR?fe:void 0}let a=o(t),i=a&&a(t),s=t[0]&&t[3]!==t[2].LOADING&&t[3]!==t[2].FETCHING&&we(t);return{c(){i&&i.c(),n=g(),s&&s.c(),r=v()},m(e,t){i&&i.m(e,t),d(e,n,t),s&&s.m(e,t),d(e,r,t)},p(e,[t]){a===(a=o(e))&&i?i.p(e,t):(i&&i.d(1),i=a&&a(e),i&&(i.c(),i.m(n.parentNode,n))),e[0]&&e[3]!==e[2].LOADING&&e[3]!==e[2].FETCHING?s?s.p(e,t):(s=we(e),s.c(),s.m(r.parentNode,r)):s&&(s.d(1),s=null)},i:e,o:e,d(e){i&&i.d(e),e&&f(n),s&&s.d(e),e&&f(r)}}}function xe(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{l(r.next(e))}catch(e){a(e)}}function s(e){try{l(r.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,s)}l((r=r.apply(e,t||[])).next())}))};let{backToSearch:o}=t,{series:a}=t;const i=Promise.all([s.e(752),s.e(483)]).then(s.t.bind(s,5752,23));var l;!function(e){e[e.LOADING=0]="LOADING",e[e.PRESENT=1]="PRESENT",e[e.FETCHING=2]="FETCHING",e[e.GENERATING=3]="GENERATING",e[e.DOWNLOAD=4]="DOWNLOAD",e[e.ERROR=5]="ERROR"}(l||(l={}));let c,u,d,f=l.LOADING,h=[];const p=()=>r(void 0,void 0,void 0,(function*(){var e;n(3,f=l.LOADING);try{const t=yield fetch(a),r=yield t.json();if(!t.ok)throw r.message;const o=r.data.content_md,i={author:o.match(/\[\*\*([^*\]]+)\*\*\]|A Story By \[(?:\*\*)?([^\]]+?)(?:\*\*)?\]/i).slice(1).find(Boolean),title:null===(e=o.match(/##?\s*\*\*(.+)\*\*/))||void 0===e?void 0:e[1],chapters:[...o.matchAll(/\[([^\]]+)\]\s*\(((?:https?:\/\/(?:[^.]+\.)?reddit\.com)?\/r\/hfy\/comments\/[^)]+)\)/gim)].map((e=>({title:e[1],url:le(new URL(e[2].startsWith("http")?e[2]:`https://api.reddit.com${e[2]}`))})))};n(4,c=i),n(3,f=i.chapters.length?l.PRESENT:l.ERROR),n(5,u="No chapters found")}catch(e){n(3,f=l.ERROR),n(5,u=`${e.message||e}`)}}));return p(),e.$$set=e=>{"backToSearch"in e&&n(0,o=e.backToSearch),"series"in e&&n(1,a=e.series)},[o,a,l,f,c,u,h,d,p,()=>r(void 0,void 0,void 0,(function*(){n(3,f=l.FETCHING),n(6,h=new Array(c.chapters.length));try{for(let e=0;e<c.chapters.length;e+=100)yield Promise.all(c.chapters.slice(e,e+100).map(((t,r)=>se(t.url).then((e=>e.json())).then((t=>{const{selftext_html:o,title:a,url:i}=t[0].data.children[0].data;h.splice(r+e,1,{title:a,content:ue(o),url:i}),n(6,h)})))))}catch(e){n(3,f=l.ERROR),n(5,u=`${e.message||e}`)}r(void 0,void 0,void 0,(function*(){n(3,f=l.GENERATING);const{default:e}=yield i;n(7,d=yield e({title:c.title,author:c.author,verbose:!0},h)),n(3,f=l.DOWNLOAD)}))})),()=>re()(d,`${c.title}.epub`,"application/epub+zip")]}const Ee=class extends W{constructor(e){super(),B(this,e,xe,$e,a,{backToSearch:0,series:1})}};function ke(e,t,n){const r=e.slice();return r[9]=t[n],r}function Ne(e){let t,n,r,o,a,i,s,l,c=e[6],v=[];for(let t=0;t<c.length;t+=1)v[t]=Se(ke(e,c,t));return{c(){t=p("p"),n=m("The search for '"),r=m(e[0]),o=m("' returned these results:"),a=g(),i=p("ul");for(let e=0;e<v.length;e+=1)v[e].c();s=g(),l=p("p"),l.textContent="Please select one.",w(l,"class","small")},m(e,c){d(e,t,c),u(t,n),u(t,r),u(t,o),d(e,a,c),d(e,i,c);for(let e=0;e<v.length;e+=1)v[e].m(i,null);d(e,s,c),d(e,l,c)},p(e,t){if(1&t&&$(r,e[0]),66&t){let n;for(c=e[6],n=0;n<c.length;n+=1){const r=ke(e,c,n);v[n]?v[n].p(r,t):(v[n]=Se(r),v[n].c(),v[n].m(i,null))}for(;n<v.length;n+=1)v[n].d(1);v.length=c.length}},d(e){e&&f(t),e&&f(a),e&&f(i),h(v,e),e&&f(s),e&&f(l)}}}function Te(t){let n,r,o,a,i;return{c(){n=p("p"),r=m("That's a valid series url, "),o=p("a"),o.textContent="go on ahead",w(o,"href","#?"),w(n,"class","valid svelte-158maml")},m(e,s){d(e,n,s),u(n,r),u(n,o),a||(i=b(o,"click",y(t[7])),a=!0)},p:e,d(e){e&&f(n),a=!1,i()}}}function Re(e){let t,n,r,o,a=e[5]?": ":"";return{c(){t=p("p"),n=m("Sorry, can't process that"),r=m(a),o=m(e[5]),w(t,"class","error svelte-158maml")},m(e,a){d(e,t,a),u(t,n),u(t,r),u(t,o)},p(e,t){32&t&&a!==(a=e[5]?": ":"")&&$(r,a),32&t&&$(o,e[5])},d(e){e&&f(t)}}}function Oe(t){let n;return{c(){n=p("div"),n.innerHTML='<div class="loading-slider-container svelte-158maml"><span class="loading-slider svelte-158maml">•</span></div> \n    <p class="loading svelte-158maml">Please wait, fetching results...</p>',w(n,"class","loading-container svelte-158maml")},m(e,t){d(e,n,t)},p:e,d(e){e&&f(n)}}}function Ce(e){let t,n,r,o,a=e[9].author+"";return{c(){t=m("["),n=p("i"),r=m(a),o=m("]")},m(e,a){d(e,t,a),d(e,n,a),u(n,r),d(e,o,a)},p(e,t){64&t&&a!==(a=e[9].author+"")&&$(r,a)},d(e){e&&f(t),e&&f(n),e&&f(o)}}}function Se(e){let t,n,r,o,a,i,s,l,c=e[9].title+"";function h(){return e[8](e[9])}let v=e[9].author&&Ce(e);return{c(){t=p("li"),n=p("a"),r=m(c),a=g(),v&&v.c(),i=g(),w(n,"href",o=ce(e[9].url))},m(e,o){d(e,t,o),u(t,n),u(n,r),u(t,a),v&&v.m(t,null),u(t,i),s||(l=b(n,"click",y(h)),s=!0)},p(a,s){e=a,64&s&&c!==(c=e[9].title+"")&&$(r,c),64&s&&o!==(o=ce(e[9].url))&&w(n,"href",o),e[9].author?v?v.p(e,s):(v=Ce(e),v.c(),v.m(t,i)):v&&(v.d(1),v=null)},d(e){e&&f(t),v&&v.d(),s=!1,l()}}}function Ae(t){let n;function r(e,t){return e[4]===e[3].LOADING?Oe:e[4]===e[3].ERROR?Re:e[4]===e[3].OK?Te:e[4]===e[3].RESULTS?Ne:void 0}let o=r(t),a=o&&o(t);return{c(){a&&a.c(),n=v()},m(e,t){a&&a.m(e,t),d(e,n,t)},p(e,[t]){o===(o=r(e))&&a?a.p(e,t):(a&&a.d(1),a=o&&o(e),a&&(a.c(),a.m(n.parentNode,n)))},i:e,o:e,d(e){a&&a.d(e),e&&f(n)}}}function Le(e,t,n){let r,{search:o}=t,{goNext:a}=t;var i;!function(e){e[e.LOADING=0]="LOADING",e[e.OK=1]="OK",e[e.RESULTS=2]="RESULTS",e[e.ERROR=3]="ERROR"}(i||(i={}));let s=i.LOADING,l="",c=[];try{if(!o.match(/^https?:\/\/(?:[^.]+\.)?reddit\.com\/r\/hfy\/wiki\/series\//i))throw new Error;r=le(new URL(o)),a(r,!1)}catch(e){const t=o.toLowerCase();fetch("https://api.reddit.com/r/hfy/wiki/series.json").then((e=>e.json())).then((e=>e.data.content_md)).then((e=>[...e.matchAll(/\[([^\]]+)\]\s*\(((?:https?:\/\/(?:[^.]+\.)?reddit\.com)?\/r\/hfy\/wiki\/series\/[^)]+)\)\s*(?:\[\*([^\]]+)\*\])?/gim)].map((e=>({title:e[1],author:e[3],url:le(new URL(e[2].startsWith("http")?e[2]:`https://api.reddit.com${e[2]}`))}))))).then((e=>n(6,c=e.filter((e=>-1!==e.title.toLowerCase().indexOf(t)))))).then((e=>{n(4,s=e.length?i.RESULTS:i.ERROR),n(5,l=`No series matched input \`${o}\``)})).catch((e=>{n(4,s=i.ERROR),n(5,l=`${e.message||e}`)}))}return e.$$set=e=>{"search"in e&&n(0,o=e.search),"goNext"in e&&n(1,a=e.goNext)},[o,a,r,i,s,l,c,()=>a(r,!1),e=>a(e.url,!0)]}const _e=class extends W{constructor(e){super(),B(this,e,Le,Ae,a,{search:0,goNext:1})}};function Pe(t){let n,r,o;return{c(){n=m(t[3]),r=g(),o=m(t[4])},m(e,t){d(e,n,t),d(e,r,t),d(e,o,t)},p(e,t){8&t&&$(n,e[3]),16&t&&$(o,e[4])},i:e,o:e,d(e){e&&f(n),e&&f(r),e&&f(o)}}}function je(e){let t,n;return t=new Ee({props:{series:e[4],backToSearch:e[5]}}),{c(){H(t.$$.fragment)},m(e,r){F(t,e,r),n=!0},p(e,n){const r={};16&n&&(r.series=e[4]),32&n&&(r.backToSearch=e[5]),t.$set(r)},i(e){n||(U(t.$$.fragment,e),n=!0)},o(e){D(t.$$.fragment,e),n=!1},d(e){M(t,e)}}}function Ge(e){let t,n;return t=new _e({props:{goNext:e[8],search:e[3]}}),{c(){H(t.$$.fragment)},m(e,r){F(t,e,r),n=!0},p(e,n){const r={};18&n&&(r.goNext=e[8]),8&n&&(r.search=e[3]),t.$set(r)},i(e){n||(U(t.$$.fragment,e),n=!0)},o(e){D(t.$$.fragment,e),n=!1},d(e){M(t,e)}}}function Ie(e){let t,n;return t=new ee({props:{goNext:e[7],search:e[3]}}),{c(){H(t.$$.fragment)},m(e,r){F(t,e,r),n=!0},p(e,n){const r={};8&n&&(r.goNext=e[7]),8&n&&(r.search=e[3]),t.$set(r)},i(e){n||(U(t.$$.fragment,e),n=!0)},o(e){D(t.$$.fragment,e),n=!1},d(e){M(t,e)}}}function Ue(t){let n,r,o;return{c(){n=p("a"),n.textContent="Go back home",w(n,"href","#?"),w(n,"class","homelink svelte-11l2vao")},m(e,a){d(e,n,a),r||(o=b(n,"click",y(t[9])),r=!0)},p:e,d(e){e&&f(n),r=!1,o()}}}function De(e){let t,n,o,a,i,s,l,c,h,m;n=new X({});const v=[Ie,Ge,je,Pe],b=[];function y(e,t){return e[2]===e[0].INPUT?0:e[2]===e[0].SEARCH?1:e[2]===e[0].RESULT?2:3}i=y(e),s=b[i]=v[i](e);let $=e[2]!==e[0].INPUT&&Ue(e);return h=new z({}),{c(){t=p("div"),H(n.$$.fragment),o=g(),a=p("main"),s.c(),l=g(),$&&$.c(),c=g(),H(h.$$.fragment),w(a,"class","App-main"),w(t,"class","App svelte-11l2vao")},m(e,r){d(e,t,r),F(n,t,null),u(t,o),u(t,a),b[i].m(a,null),u(a,l),$&&$.m(a,null),u(t,c),F(h,t,null),m=!0},p(e,[t]){let n=i;i=y(e),i===n?b[i].p(e,t):(G={r:0,c:[],p:G},D(b[n],1,1,(()=>{b[n]=null})),G.r||r(G.c),G=G.p,s=b[i],s?s.p(e,t):(s=b[i]=v[i](e),s.c()),U(s,1),s.m(a,l)),e[2]!==e[0].INPUT?$?$.p(e,t):($=Ue(e),$.c(),$.m(a,null)):$&&($.d(1),$=null)},i(e){m||(U(n.$$.fragment,e),U(s),U(h.$$.fragment,e),m=!0)},o(e){D(n.$$.fragment,e),D(s),D(h.$$.fragment,e),m=!1},d(e){e&&f(t),M(n),b[i].d(),$&&$.d(),M(h)}}}function He(e,t,n){var r;!function(e){e[e.INPUT=0]="INPUT",e[e.SEARCH=1]="SEARCH",e[e.RESULT=2]="RESULT"}(r||(r={}));let o,a,i=r.INPUT,s=!1;const l=()=>n(2,i=Math.min(i+1,r.RESULT));let c;return e.$$.update=()=>{3&e.$$.dirty&&n(5,c=s?()=>n(2,i=r.SEARCH):void 0)},[r,s,i,o,a,c,l,e=>(n(3,o=e.trim()),l()),(e,t)=>(n(4,a=e),n(1,s=t),l()),()=>n(2,i=0)]}const Fe=class extends W{constructor(e){super(),B(this,e,He,De,a,{})}};let Me;try{Me=new Fe({target:document.body})}catch(e){const t=document.createElement("div");t.className="fatal-error",t.ariaLabel="error",t.appendChild(document.createElement("h1")).textContent="Something went wrong:",t.appendChild(document.createElement("code")).textContent=e,document.body.appendChild(t)}})(),l=s.O(l)})();