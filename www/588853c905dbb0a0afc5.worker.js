!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="./",e(e.s=1)}([function(t,e,n){t.exports=n(2)},function(t,e,n){"use strict";function r(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){function r(o,i){try{var a=e[o](i),c=a.value}catch(t){return void n(t)}if(!a.done)return Promise.resolve(c).then(function(t){r("next",t)},function(t){r("throw",t)});t(c)}return r("next")})}}function o(t){var e=this;m="update";var n=t.value;return new Promise(function(){var o=r(u.a.mark(function r(o,i){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(p+"/"+n.id,{method:"put",headers:{"Content-Type":"application/json"},body:JSON.stringify(t.value)}).then(function(t){return t.json()});case 2:return n.synchroState=!0,console.log("data to change in db",n),e.next=6,Object(l.c)("functionalUnits",n);case 6:o("done");case 7:case"end":return e.stop()}},r,e)}));return function(t,e){return o.apply(this,arguments)}}())}function i(t){var e=this;m="update";var n=t.value,o=n.id;return new Promise(function(){var t=r(u.a.mark(function t(i,a){var c;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch(p,{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then(function(t){return t.json()});case 2:return c=t.sent,console.log("id generado",c),n.id=c.id,n.synchroState=!0,t.next=8,Object(l.c)("functionalUnits",n);case 8:return t.next=10,new Promise(function(t,e){indexedDB.open(f).onsuccess=function(){var n=r(u.a.mark(function n(i){var a,s,f,h,p,d;return u.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:a=this.result,s=a.transaction(["functionalUnits","forestalUnits"],"readonly"),f=s.objectStore("forestalUnits"),h=f.index("functional_unit_id"),console.log("id value to filter",o),p=IDBKeyRange.only(o),d=h.openCursor(p),d.onsuccess=function(){var e=r(u.a.mark(function e(n){var r,o;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:r=n.target.result,r?(o=r.value,o.functional_unit_id=c.id,console.log("data to update",o),Object(l.c)("forestalUnits",o),r.continue()):(console.log("last filtered data"),t("done"));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),d.onerror=function(t){e(error)};case 9:case"end":return n.stop()}},n,this)}));return function(t){return n.apply(this,arguments)}}()});case 10:return t.next=12,Object(l.a)("functionalUnits",o);case 12:i("Update functional Done");case 13:case"end":return t.stop()}},t,e)}));return function(e,n){return t.apply(this,arguments)}}())}function a(t){var e=this;m="update";var n=t.value;return new Promise(function(){var t=r(u.a.mark(function t(r,o){var i,a,c;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(l.b)("functionalUnits",n.functional_unit_id);case 2:return i=t.sent,console.log("registered fi",i),t.next=6,Object(l.b)("projects",i.project_id);case 6:a=t.sent,console.log("project",a),c=void 0,t.t0=a.phase,t.next="1"===t.t0?12:"2"===t.t0?14:"3"===t.t0?16:18;break;case 12:return c=d,t.abrupt("break",18);case 14:return c=v,t.abrupt("break",18);case 16:return c=g,t.abrupt("break",18);case 18:return t.next=20,fetch(c+"/"+n.id,{method:"put",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then(function(t){return t.json()});case 20:return n.synchroState=!0,t.next=23,Object(l.c)("forestalUnits",n);case 23:r("done");case 24:case"end":return t.stop()}},t,e)}));return function(e,n){return t.apply(this,arguments)}}())}function c(t){var e=this;m="update";var n=t.value,o=t.value.id;return new Promise(function(){var t=r(u.a.mark(function t(r,i){var a,c,s,f;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(l.b)("functionalUnits",n.functional_unit_id);case 2:return a=t.sent,console.log("registered fi",a,"original data",n),t.next=6,Object(l.b)("projects",a.project_id);case 6:c=t.sent,console.log("project",c),s=void 0,t.t0=c.phase,t.next="1"===t.t0?12:"2"===t.t0?14:"3"===t.t0?16:18;break;case 12:return s=d,t.abrupt("break",18);case 14:return s=v,t.abrupt("break",18);case 16:return s=g,t.abrupt("break",18);case 18:return t.next=20,fetch(s,{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then(function(t){return t.json()});case 20:if(f=t.sent,!f.id){t.next=28;break}return n.id=f.id,n.synchroState=!0,t.next=26,Object(l.c)("forestalUnits",n);case 26:return t.next=28,Object(l.a)("forestalUnits",o);case 28:r("done");case 29:case"end":return t.stop()}},t,e)}));return function(e,n){return t.apply(this,arguments)}}())}Object.defineProperty(e,"__esModule",{value:!0});var s=n(0),u=n.n(s),l=n(4),f="plantar",h="https://plantarfuturo.com/ws",p=h+"/api/functional-unit",d=h+"/api/forest-unit/first-phase",v=h+"/api/forest-unit",g=h+"/api/forest-unit/third-phase",y=[],m="done";self.addEventListener("message",function(t){console.log("on synchro worker");var e=indexedDB.open(f);e.onsuccess=function(){var t=r(u.a.mark(function t(e){var n,s,l,f;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=this.result,s=n.transaction(["functionalUnits","forestalUnits"],"readonly"),l=s.objectStore("functionalUnits"),f=l.openCursor(),t.next=6,new Promise(function(t,e){f.onsuccess=function(){var n=r(u.a.mark(function n(r){var a;return u.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:a=r.target.result,a?(0==a.value.synchroState&&(console.log(a.value),console.log("data to send"),Number.isInteger(a.value.id)?y.push(o(a)):(console.log("special send"),y.push(i(a)))),a.continue()):(console.log("last data"),Promise.all(y).then(function(e){console.log(e),t("done")},function(t){console.log(t),e("error in promise array")}));case 2:case"end":return n.stop()}},n,this)}));return function(t){return n.apply(this,arguments)}}(),f.onerror=function(t){console.log("error",t),e(error)}});case 6:return s=n.transaction(["functionalUnits","forestalUnits"],"readonly"),t.next=9,new Promise(function(t,e){l=s.objectStore("forestalUnits"),f=l.openCursor(),f.onsuccess=function(){var t=r(u.a.mark(function t(e){var n;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:n=e.target.result,n?(n.value.synchroState||(console.log(n.value),console.log("data to send"),Number.isInteger(n.value.id)?(console.log("update data"),y.push(a(n))):(console.log("new data"),y.push(c(n)))),n.continue()):(console.log("last data"),Promise.all(y).then(function(t){console.log(t),postMessage(m)},function(t){console.log(t),postMessage("done with errors")}));case 2:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),f.onerror=function(t){console.log("error",t),postMessage("error")}});case 9:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),e.onerror=function(t){console.log("error opening db",t),postMessage("error")}})},function(t,e,n){var r=function(){return this}()||Function("return this")(),o=r.regeneratorRuntime&&Object.getOwnPropertyNames(r).indexOf("regeneratorRuntime")>=0,i=o&&r.regeneratorRuntime;if(r.regeneratorRuntime=void 0,t.exports=n(3),o)r.regeneratorRuntime=i;else try{delete r.regeneratorRuntime}catch(t){r.regeneratorRuntime=void 0}},function(t,e){!function(e){"use strict";function n(t,e,n,r){var i=e&&e.prototype instanceof o?e:o,a=Object.create(i.prototype),c=new p(r||[]);return a._invoke=u(t,n,c),a}function r(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}function o(){}function i(){}function a(){}function c(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function s(t){function e(n,o,i,a){var c=r(t[n],t,o);if("throw"!==c.type){var s=c.arg,u=s.value;return u&&"object"===typeof u&&m.call(u,"__await")?Promise.resolve(u.__await).then(function(t){e("next",t,i,a)},function(t){e("throw",t,i,a)}):Promise.resolve(u).then(function(t){s.value=t,i(s)},a)}a(c.arg)}function n(t,n){function r(){return new Promise(function(r,o){e(t,n,r,o)})}return o=o?o.then(r,r):r()}var o;this._invoke=n}function u(t,e,n){var o=k;return function(i,a){if(o===_)throw new Error("Generator is already running");if(o===P){if("throw"===i)throw a;return v()}for(n.method=i,n.arg=a;;){var c=n.delegate;if(c){var s=l(c,n);if(s){if(s===S)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===k)throw o=P,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=_;var u=r(t,e,n);if("normal"===u.type){if(o=n.done?P:E,u.arg===S)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(o=P,n.method="throw",n.arg=u.arg)}}}function l(t,e){var n=t.iterator[e.method];if(n===g){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=g,l(t,e),"throw"===e.method))return S;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return S}var o=r(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,S;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=g),e.delegate=null,S):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,S)}function f(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function h(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function p(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(f,this),this.reset(!0)}function d(t){if(t){var e=t[b];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var n=-1,r=function e(){for(;++n<t.length;)if(m.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=g,e.done=!0,e};return r.next=r}}return{next:v}}function v(){return{value:g,done:!0}}var g,y=Object.prototype,m=y.hasOwnProperty,w="function"===typeof Symbol?Symbol:{},b=w.iterator||"@@iterator",x=w.asyncIterator||"@@asyncIterator",j=w.toStringTag||"@@toStringTag",O="object"===typeof t,L=e.regeneratorRuntime;if(L)return void(O&&(t.exports=L));L=e.regeneratorRuntime=O?t.exports:{},L.wrap=n;var k="suspendedStart",E="suspendedYield",_="executing",P="completed",S={},T={};T[b]=function(){return this};var N=Object.getPrototypeOf,U=N&&N(N(d([])));U&&U!==y&&m.call(U,b)&&(T=U);var D=a.prototype=o.prototype=Object.create(T);i.prototype=D.constructor=a,a.constructor=i,a[j]=i.displayName="GeneratorFunction",L.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===i||"GeneratorFunction"===(e.displayName||e.name))},L.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,a):(t.__proto__=a,j in t||(t[j]="GeneratorFunction")),t.prototype=Object.create(D),t},L.awrap=function(t){return{__await:t}},c(s.prototype),s.prototype[x]=function(){return this},L.AsyncIterator=s,L.async=function(t,e,r,o){var i=new s(n(t,e,r,o));return L.isGeneratorFunction(e)?i:i.next().then(function(t){return t.done?t.value:i.next()})},c(D),D[j]="Generator",D[b]=function(){return this},D.toString=function(){return"[object Generator]"},L.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},L.values=d,p.prototype={constructor:p,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=g,this.done=!1,this.delegate=null,this.method="next",this.arg=g,this.tryEntries.forEach(h),!t)for(var e in this)"t"===e.charAt(0)&&m.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=g)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){function e(e,r){return i.type="throw",i.arg=t,n.next=e,r&&(n.method="next",n.arg=g),!!r}if(this.done)throw t;for(var n=this,r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r],i=o.completion;if("root"===o.tryLoc)return e("end");if(o.tryLoc<=this.prev){var a=m.call(o,"catchLoc"),c=m.call(o,"finallyLoc");if(a&&c){if(this.prev<o.catchLoc)return e(o.catchLoc,!0);if(this.prev<o.finallyLoc)return e(o.finallyLoc)}else if(a){if(this.prev<o.catchLoc)return e(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return e(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&m.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,S):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),S},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),h(n),S}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;h(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:d(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=g),S}}}(function(){return this}()||Function("return this")())},function(t,e,n){"use strict";(function(t){function r(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){function r(o,i){try{var a=e[o](i),c=a.value}catch(t){return void n(t)}if(!a.done)return Promise.resolve(c).then(function(t){r("next",t)},function(t){r("throw",t)});t(c)}return r("next")})}}n.d(e,"b",function(){return s}),n.d(e,"c",function(){return u}),n.d(e,"a",function(){return l});var o=n(0),i=n.n(o),a=this,c="plantar",s=(function(){var t=r(i.a.mark(function t(e){var n;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=indexedDB.open(c),t.abrupt("return",new Promise(function(t,r){n.onsuccess=function(n){var o=this,i=this.result;console.log("openDb DONE");var a=i.transaction(e,"readonly"),c=a.objectStore(e),s=c.getAll();s.onsuccess=function(e){console.log("dataSet success"),i.close(),t(e.target.result)},s.onerror=function(t){console.log("dataSet error"),i.close(),r(o.error)}},n.onerror=function(t){console.log("error opening db"),r(this.error)}}));case 2:case"end":return t.stop()}},t,a)}))}(),function(t,e){var n=indexedDB.open(c);return new Promise(function(r,o){n.onsuccess=function(n){var i=this,a=this.result;console.log("openDb DONE");var c=a.transaction(t,"readonly"),s=c.objectStore(t),u=s.get(e);u.onsuccess=function(t){console.log("data success"),a.close(),r(t.target.result)},u.onerror=function(t){console.log("dataSet error"),a.close(),o(i.error)}},n.onerror=function(t){console.log("error opening db"),o(this.error)}})}),u=function(e,n){var o=indexedDB.open(c);return new Promise(function(a,c){o.onsuccess=function(){var o=r(i.a.mark(function r(o){var s,u,l,f,h=this;return i.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:s=this.result,console.log("openDb DONE"),u=s.transaction(e,"readwrite"),l=u.objectStore(e),null==n.synchroState&&(n.synchroState=!0),f=l.get(n.id),f.onsuccess=function(e){if(console.log("success request",e),h.result){var r=l.put(n);r.onsuccess=function(t){console.log("data updated",t),a("done")},r.onerror=function(t){console.log("error",t),c(this.error)},console.log("update")}else{l.add(n).onsuccess=function(t){console.log("data added",t),a("done")},t.onerror=function(t){console.log("error",t),c(this.error)},console.log("create")}},f.onerror=function(t){console.log("error request",t)};case 8:case"end":return r.stop()}},r,this)}));return function(t){return o.apply(this,arguments)}}(),o.onerror=function(t){console.log("error opening db"),c(this.error)}})},l=function(t,e){var n=indexedDB.open(c);return new Promise(function(r,o){n.onsuccess=function(n){var i=this,a=this.result;console.log("openDb DONE");var c=a.transaction(t,"readwrite"),s=c.objectStore(t),u=s.delete(e);u.onsuccess=function(t){console.log("delete success"),a.close(),r(t.target.result)},u.onerror=function(t){console.log("delete error"),a.close(),o(i.error)}},n.onerror=function(t){console.log("error opening db"),o(this.error)}})}}).call(e,n(5))},function(t,e){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(t){if(l===setTimeout)return setTimeout(t,0);if((l===n||!l)&&setTimeout)return l=setTimeout,setTimeout(t,0);try{return l(t,0)}catch(e){try{return l.call(null,t,0)}catch(e){return l.call(this,t,0)}}}function i(t){if(f===clearTimeout)return clearTimeout(t);if((f===r||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(t);try{return f(t)}catch(e){try{return f.call(null,t)}catch(e){return f.call(this,t)}}}function a(){v&&p&&(v=!1,p.length?d=p.concat(d):g=-1,d.length&&c())}function c(){if(!v){var t=o(a);v=!0;for(var e=d.length;e;){for(p=d,d=[];++g<e;)p&&p[g].run();g=-1,e=d.length}p=null,v=!1,i(t)}}function s(t,e){this.fun=t,this.array=e}function u(){}var l,f,h=t.exports={};!function(){try{l="function"===typeof setTimeout?setTimeout:n}catch(t){l=n}try{f="function"===typeof clearTimeout?clearTimeout:r}catch(t){f=r}}();var p,d=[],v=!1,g=-1;h.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];d.push(new s(t,e)),1!==d.length||v||o(c)},s.prototype.run=function(){this.fun.apply(null,this.array)},h.title="browser",h.browser=!0,h.env={},h.argv=[],h.version="",h.versions={},h.on=u,h.addListener=u,h.once=u,h.off=u,h.removeListener=u,h.removeAllListeners=u,h.emit=u,h.prependListener=u,h.prependOnceListener=u,h.listeners=function(t){return[]},h.binding=function(t){throw new Error("process.binding is not supported")},h.cwd=function(){return"/"},h.chdir=function(t){throw new Error("process.chdir is not supported")},h.umask=function(){return 0}}]);
//# sourceMappingURL=588853c905dbb0a0afc5.worker.js.map