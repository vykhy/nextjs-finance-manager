if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let i={};const r=e=>a(e,t),o={module:{uri:t},exports:i,require:r};s[t]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(c(...e),i)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/8v0MAN3Pj2ZCHW00zz6dJ/_buildManifest.js",revision:"4a7ce7af740fa4f2f85b9573f9ec5032"},{url:"/_next/static/8v0MAN3Pj2ZCHW00zz6dJ/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/294-db3f78a44db92eeb.js",revision:"db3f78a44db92eeb"},{url:"/_next/static/chunks/468-1ba94851baeedac0.js",revision:"1ba94851baeedac0"},{url:"/_next/static/chunks/513-127f856ac9b54322.js",revision:"127f856ac9b54322"},{url:"/_next/static/chunks/691-875120df9324019b.js",revision:"875120df9324019b"},{url:"/_next/static/chunks/699-83045e196245dc83.js",revision:"83045e196245dc83"},{url:"/_next/static/chunks/734-0afc4d456339cb81.js",revision:"0afc4d456339cb81"},{url:"/_next/static/chunks/756-076beb94109b2710.js",revision:"076beb94109b2710"},{url:"/_next/static/chunks/758-eea33537c7e51978.js",revision:"eea33537c7e51978"},{url:"/_next/static/chunks/809-736002d3121dd83c.js",revision:"736002d3121dd83c"},{url:"/_next/static/chunks/886-b44c07fa3e6f5845.js",revision:"b44c07fa3e6f5845"},{url:"/_next/static/chunks/framework-2c79e2a64abdb08b.js",revision:"2c79e2a64abdb08b"},{url:"/_next/static/chunks/main-7758ec33a7a49663.js",revision:"7758ec33a7a49663"},{url:"/_next/static/chunks/pages/_app-3af31a9ec19f980c.js",revision:"3af31a9ec19f980c"},{url:"/_next/static/chunks/pages/_error-8353112a01355ec2.js",revision:"8353112a01355ec2"},{url:"/_next/static/chunks/pages/about-4ff716fd54b365df.js",revision:"4ff716fd54b365df"},{url:"/_next/static/chunks/pages/add/account-5791e23184851e70.js",revision:"5791e23184851e70"},{url:"/_next/static/chunks/pages/add/category-be522769422c51df.js",revision:"be522769422c51df"},{url:"/_next/static/chunks/pages/add/correction-b8b099160b45db3c.js",revision:"b8b099160b45db3c"},{url:"/_next/static/chunks/pages/add/paymentmethod-9681907fee821ad7.js",revision:"9681907fee821ad7"},{url:"/_next/static/chunks/pages/add/project-848eee4fcfa9816b.js",revision:"848eee4fcfa9816b"},{url:"/_next/static/chunks/pages/add/transaction-6c04d73b189bf179.js",revision:"6c04d73b189bf179"},{url:"/_next/static/chunks/pages/add/transactiontype-4d63898ec1a8211d.js",revision:"4d63898ec1a8211d"},{url:"/_next/static/chunks/pages/add/transfer-0f74749bcdbf04d9.js",revision:"0f74749bcdbf04d9"},{url:"/_next/static/chunks/pages/index-6b351ca796d6b78a.js",revision:"6b351ca796d6b78a"},{url:"/_next/static/chunks/pages/test/colorpicker-eb4a058563509147.js",revision:"eb4a058563509147"},{url:"/_next/static/chunks/pages/transactions-bbc1790a413a911b.js",revision:"bbc1790a413a911b"},{url:"/_next/static/chunks/pages/user/create-86c2dd4f2fe299d6.js",revision:"86c2dd4f2fe299d6"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-c4acd79e87956a0e.js",revision:"c4acd79e87956a0e"},{url:"/_next/static/css/876d048b5dab7c28.css",revision:"876d048b5dab7c28"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/images/logo-192x192.png",revision:"d737f5cdcc01bb7af815a12b99881b92"},{url:"/images/logo-256x256.png",revision:"f1fd5bf03d1130b92bc5909386e395f5"},{url:"/images/logo-384x384.png",revision:"368900a6174bdc2460e8f9b1fa2dd4a0"},{url:"/images/logo-512x512.png",revision:"6e424838e351a31854e0b499cbbc7edc"},{url:"/manifest.json",revision:"1bdafcd6677eab0077a04c0acc46cd8a"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/thirteen.svg",revision:"53f96b8290673ef9d2895908e69b2f92"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
