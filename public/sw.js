if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let i={};const r=e=>a(e,t),o={module:{uri:t},exports:i,require:r};s[t]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(c(...e),i)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/504-6dadd3154b8d8e9d.js",revision:"6dadd3154b8d8e9d"},{url:"/_next/static/chunks/691-875120df9324019b.js",revision:"875120df9324019b"},{url:"/_next/static/chunks/716-4515f675eb44e987.js",revision:"4515f675eb44e987"},{url:"/_next/static/chunks/735-795d374dc6fca68b.js",revision:"795d374dc6fca68b"},{url:"/_next/static/chunks/809-cb9731bb907aae81.js",revision:"cb9731bb907aae81"},{url:"/_next/static/chunks/886-b44c07fa3e6f5845.js",revision:"b44c07fa3e6f5845"},{url:"/_next/static/chunks/903-b9c7a59fbf7a54c3.js",revision:"b9c7a59fbf7a54c3"},{url:"/_next/static/chunks/framework-2c79e2a64abdb08b.js",revision:"2c79e2a64abdb08b"},{url:"/_next/static/chunks/main-7758ec33a7a49663.js",revision:"7758ec33a7a49663"},{url:"/_next/static/chunks/pages/_app-909e86d380e0c084.js",revision:"909e86d380e0c084"},{url:"/_next/static/chunks/pages/_error-8353112a01355ec2.js",revision:"8353112a01355ec2"},{url:"/_next/static/chunks/pages/about-4ff716fd54b365df.js",revision:"4ff716fd54b365df"},{url:"/_next/static/chunks/pages/add/account-90625124ee1fa5ba.js",revision:"90625124ee1fa5ba"},{url:"/_next/static/chunks/pages/add/category-ca42bc793a3e25cc.js",revision:"ca42bc793a3e25cc"},{url:"/_next/static/chunks/pages/add/correction-3cfdbeb16dcc3f3d.js",revision:"3cfdbeb16dcc3f3d"},{url:"/_next/static/chunks/pages/add/paymentmethod-6c33b3a0461de28e.js",revision:"6c33b3a0461de28e"},{url:"/_next/static/chunks/pages/add/project-1f3b3b3692e0d0c5.js",revision:"1f3b3b3692e0d0c5"},{url:"/_next/static/chunks/pages/add/transaction-a10f47046aab3efe.js",revision:"a10f47046aab3efe"},{url:"/_next/static/chunks/pages/add/transactiontype-f4013906b57149d0.js",revision:"f4013906b57149d0"},{url:"/_next/static/chunks/pages/add/transfer-2296780d43dbdc79.js",revision:"2296780d43dbdc79"},{url:"/_next/static/chunks/pages/index-b4fc92c5eaf7a777.js",revision:"b4fc92c5eaf7a777"},{url:"/_next/static/chunks/pages/transactions-679e50c7b3ed6e2b.js",revision:"679e50c7b3ed6e2b"},{url:"/_next/static/chunks/pages/user/create-16f0e433192e5eb3.js",revision:"16f0e433192e5eb3"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-c4acd79e87956a0e.js",revision:"c4acd79e87956a0e"},{url:"/_next/static/css/876d048b5dab7c28.css",revision:"876d048b5dab7c28"},{url:"/_next/static/hNzskUvDaY_m7w6HiEa9v/_buildManifest.js",revision:"37a0d368e4db7820d0165837056f4b4b"},{url:"/_next/static/hNzskUvDaY_m7w6HiEa9v/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/images/logo-192x192.png",revision:"d737f5cdcc01bb7af815a12b99881b92"},{url:"/images/logo-256x256.png",revision:"f1fd5bf03d1130b92bc5909386e395f5"},{url:"/images/logo-384x384.png",revision:"368900a6174bdc2460e8f9b1fa2dd4a0"},{url:"/images/logo-512x512.png",revision:"6e424838e351a31854e0b499cbbc7edc"},{url:"/manifest.json",revision:"1bdafcd6677eab0077a04c0acc46cd8a"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/thirteen.svg",revision:"53f96b8290673ef9d2895908e69b2f92"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
