import{_ as c,g as t,w as u,x as v}from"./index.0601cc40.js";import{s as f}from"./serviceworkerUtil.9d961b55.js";import{f as m,h as y,i as p,D as h}from"./vue.9201f2e4.js";import"./crypto-js.53c8803a.js";import"./lodash.51aea353.js";import"./spark-md5.2cc5764b.js";import"./element-plus.02c3c9a9.js";const _={data(){return{src:"",videoStyle:"w-100"}},mounted:function(){let s=t("baseUrl"),o=t("eluoxaccessToken"),i=t("uuid"),d=t("eluoxaeskey"),e=t("initializationVector"),a=u(e),r=v(a);f({cryptojsIv:r,key:d,rawIv:e});let l=!1;/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&(l=!0);let n=s+"/space/v1/api/gateway/mf/"+o+"/uuid%3A"+i+"?encrypted=true";l&&(n+="&isSafari=true"),this.src=n},methods:{videoMetadata(){this.$refs.video.videoHeight>this.$refs.video.videoWidth&&(this.videoStyle="y-100")}}},x={class:"h-100 xy-center"},g=["src"];function k(s,o,i,d,e,a){return m(),y("div",x,[p("video",{ref:"video",class:h(e.videoStyle),onLoadedmetadata:o[0]||(o[0]=(...r)=>a.videoMetadata&&a.videoMetadata(...r)),style:{"object-fit":"contain"},src:e.src,controls:"controls",autoplay:"",muted:""},null,42,g)])}var U=c(_,[["render",k]]);export{U as default};
