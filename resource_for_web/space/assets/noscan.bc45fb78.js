import{_ as w,k as c,n as d,o as v,b as g,v as b,J as _,q as k,d as y,a as I,r as S}from"./index.0601cc40.js";import{i as x}from"./touxiang.0d655065.js";import{e as L,z as C}from"./\u82F1\u6587\u767B\u5F55\u9875@2x.8687039d.js";import{I as T}from"./IscasButton.81911eb4.js";import{a7 as P,f as p,h,i as o,D as A,O as a,M as O,K as u,Q as m,P as R,J as B,N,ak as F,al as D}from"./vue.9201f2e4.js";import"./crypto-js.53c8803a.js";import"./lodash.51aea353.js";import"./spark-md5.2cc5764b.js";import"./element-plus.02c3c9a9.js";const W={name:"Login",components:{IscasButton:T},data(){let e=localStorage.getItem(c.__getPersonal__),t=localStorage.getItem(c.serviceConfig),n=!1;if(e)try{e=JSON.parse(e).results[0]}catch{window.location.href=`${d()}#/login`,e=null}else window.location.href=`${d()}#/login`;if(t)try{t=JSON.parse(t),n=t.enableInternetAccess}catch{t=null}const l=window.location.origin;return{status:1,origin:l,userInfo:e||{},imgsrc:x,enLogo:L,zhLogo:C,showLoading:!1,enableInternetAccess:n}},beforeUnmount(){this.timeOut&&clearTimeout(this.timeOut)},mounted(){v(c.personHeaderImage).then(e=>{e&&(this.imgsrc=window.URL.createObjectURL(e))})},methods:{go(e,t){const n=g(e,t);window.open(n,"_blank")},goAoLogin(){window.location.href=`${d()}#/login`},genParams(){const t=b().replace(/\-/g,"").slice(0,16);localStorage.setItem(c.tmpSecret,t);const n=new _({}),l=localStorage.getItem("serPubkey");n.setPublicKey(l);const s=n.encrypt(t);return{refreshToken:localStorage.getItem("refreshToken"),tmpEncryptedSecret:s}},goSpace(){this.showLoading=!0,k(this.genParams()).then(e=>{this.dealResult(e,()=>{this.waitResult()})}).catch(e=>{this.showLoading=!1})},cancelLogin(){this.status=1,this.showLoading=!1,this.timeOut&&clearTimeout(this.timeOut),this.showStautsTwo&&clearTimeout(this.showStautsTwo)},async gw200Fn(e){const t=localStorage.getItem(c.tmpSecret),{encryptedSecret:n,algorithmConfig:l}=e,[s]=await Promise.all([y(n,t,l)]);I(e,s),window.location.href=window.location.origin+window.location.pathname},gw4045Fn(){this.goAoLogin()},waitResult(){this.timeOut=setTimeout(()=>{this.dealPoll(()=>{this.waitResult()})},1e3)},dealPoll(e){S(this.genParams()).then(t=>{this.dealResult(t,e)})},dealResult(e,t){if(e.code==="GW-4044"){const n=setTimeout(()=>{this.status=2},1e3);this.showStautsTwo=n,typeof t=="function"&&t()}else e.code==="GW-200"?this.gw200Fn(e.results):(e.code==="GW-4045"||e.code==="GW-4046")&&this.goAoLogin()},choose(e,t){return g(e,t)}}},z=e=>(F("data-v-601d8ef3"),e=e(),D(),e),J={class:"flex y-center w-100 h-100 login-container"},G=["src"],U={class:"right-content"},V=["src"],j={class:"mb-20 black-22 fw-b"},E={key:0,class:"black-14"},K={class:"mt-32 tc"},M={class:"wait tac mt-32"},q={class:"black-20"},H={class:"font14 color-1 div-one"},Q={class:"mb10 tac"},X=z(()=>o("span",{class:"ml19 mr-19"},"|",-1));function Y(e,t,n,l,s,i){const f=P("IscasButton");return p(),h("div",J,[o("img",{class:A([i.choose("logo","logo-en"),"pointer"]),src:i.choose(s.zhLogo,s.enLogo),onClick:t[0]||(t[0]=r=>i.go("https://ao.space/","https://ao.space/en/"))},null,10,G),o("div",U,[o("img",{src:s.imgsrc,class:"headImg"},null,8,V),o("div",j,[o("span",null,a(s.userInfo.personalName),1),o("span",null,a(e.$t("login.auto")),1)]),s.userInfo.userDomain&&s.enableInternetAccess?(p(),h("span",E,a("https://"+s.userInfo.userDomain),1)):O("",!0),u(o("div",K,[R(f,{loading:s.showLoading,class:"button-blue",onClick:i.goSpace},{default:B(()=>[N(a(e.$t("login.enter")),1)]),_:1},8,["loading","onClick"]),o("div",{class:"blue-14 fw-b mt-20 pointer",onClick:t[1]||(t[1]=(...r)=>i.goAoLogin&&i.goAoLogin(...r))},a(e.$t("login.more")),1)],512),[[m,s.status===1]]),u(o("div",M,[o("div",q,a(e.$t("login.confirm")),1),o("div",{class:"mt-32 pointer blue-14 fw-b",onClick:t[2]||(t[2]=(...r)=>i.cancelLogin&&i.cancelLogin(...r))},a(e.$t("login.cancel")),1)],512),[[m,s.status===2]])]),o("div",H,[o("div",Q,[o("span",{class:"pointer",onClick:t[3]||(t[3]=r=>i.go("https://ao.space/opensource/privacy","https://ao.space/en/opensource/privacy"))},a(e.$t("login.privacy")),1),X,o("span",{class:"pointer",onClick:t[4]||(t[4]=r=>i.go("https://ao.space/opensource/agreement","https://ao.space/en/opensource/agreement"))},a(e.$t("login.user")),1)]),o("div",null,a(e.$t("login.copyright")),1)])])}var le=w(W,[["render",Y],["__scopeId","data-v-601d8ef3"]]);export{le as default};
