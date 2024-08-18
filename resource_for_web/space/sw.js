/*
 * Copyright (c) 2022 Institute of Software Chinese Academy of Sciences (ISCAS)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var cacheName = 'aolaicache-20220615'
importScripts('./lib/crypto.js')
importScripts('./lib/util.js')
importScripts('./lib/dbUtil.js')
importScripts('./lib/filter.js')
// ./lib/mammoth@1.4.8.min.js','./assets/new_logo.dae927f9.png','./assets/英文登录页@2x.119b94e4.png','./assets/liebiao.efff3c30.svg','./assets/liebiaogray.70694479.svg','./assets/fangkuai.b39085bf.svg','./assets/fangkuaigray.ac1875ef.svg','./assets/wu.739aa605.png','./assets/bg@2x.17e3a9f0.png','./assets/device.c8746ca3.png','./assets/person.65abf2df.svg','./assets/persongray.ff383b7b.svg','./assets/arrow.cd63adda.svg','./assets/arrowgray.12951361.svg','./assets/arrow-right.492faba9.svg','./assets/arrowgray-right.9bbe7dc5.svg','./assets/file.2405a53a.svg','./assets/filegray.604a2915.svg','./assets/logo.7ddba080.png','./assets/logo_en.3a4ded4d.png','./assets/null.6a0f05b3.png','./assets/emptyinfo.dad646da.png','./assets/del-album.572c11d9.svg','./assets/eye.33f5846b.svg','./assets/renwu.53e82db5.svg','./assets/chuanshu_2@2x.aed2c8d5.png','./assets/xiaoxi.d06ecc1d.svg','./assets/del-center.6530b90b.svg','./assets/del-center-grey.28374fe4.svg','./assets/more-point.0576931d.svg','./assets/xuanze.6378d3d9.svg','./assets/notify-s.34a88d05.png','./assets/passwdTimes.676792c2.png','./assets/notify-e.399fe236.png','./assets/change.859e4cdf.svg','./assets/chuanshu.93ed7f50.svg','./assets/juyu-on@2x.2d5b7bd8.png','./assets/jisu_on_en.9cea55eb.png','./assets/juyu-off@2x.dff13b45.png','./assets/jisu_off_en.7a34f61a.png','./assets/s.90566789.svg','./assets/loading.06ac8680.png','./assets/error.491f97b4.png','./assets/like.e9b4e7ef.svg','./assets/likegray.e97118d8.svg','./assets/shibai.4e6ee836.svg','./assets/left.eec8e2df.svg','./assets/leftgray.66c6d192.svg','./assets/start.9720716f.svg','./assets/right.7a8c48ae.svg','./assets/rightgray.0e0c962f.svg','./assets/xiazai.7b378b6c.svg','./assets/del.edee56bc.svg','./assets/unsupport.ee188eab.svg','./assets/pic_1@2x.ff78e8c6.png','./assets/pic_2@2x.60b8cd33.png','./assets/index.0601cc40.js','./assets/lodash.51aea353.js','./assets/vue.9201f2e4.js','./assets/spark-md5.2cc5764b.js','./assets/crypto-js.53c8803a.js','./assets/element-plus.02c3c9a9.js','./assets/heic2any.04955513.js','./assets/xlsx.f5a5a084.js','./assets/index.fa73ef04.js','./assets/英文登录页@2x.8687039d.js','./assets/LoginUtils.f28bb86b.js','./assets/checkLogin.533a1db8.js','./assets/switchLogin.3f087f91.js','./assets/noscan.bc45fb78.js','./assets/touxiang.0d655065.js','./assets/IscasButton.81911eb4.js','./assets/qrLogin.9d890fa4.js','./assets/IscasInput.cc6563c7.js','./assets/del-album.a1cae891.js','./assets/mobilVideo.ba2ec02e.js','./assets/serviceworkerUtil.9d961b55.js','./assets/home.402c5032.js','./assets/loginOut.10c3f0c9.js','./assets/toast.5031a956.js','./assets/diskCommon.74a9f77c.js','./assets/index.90276144.js','./assets/fangkuaigray.da9dcb94.js','./assets/recycle.299cf1b4.js','./assets/index.4956fb85.js','./assets/noscan.e3a8d4bb.css','./assets/IscasInput.da6cf2e9.css','./assets/IscasButton.0d5e4787.css','./assets/loginOut.c794a353.css','./assets/recycle.92bef084.css','./assets/qrLogin.e68aa7c3.css','./assets/home.3a93d462.css','./assets/index.44d30419.css','./assets/index.74fe4690.css','./assets/fangkuaigray.f3ae5af2.css','./assets/index.de3556c6.css','./assets/index.a089c370.css 会被替换掉
var fileList = ['./lib/mammoth@1.4.8.min.js','./assets/new_logo.dae927f9.png','./assets/英文登录页@2x.119b94e4.png','./assets/liebiao.efff3c30.svg','./assets/liebiaogray.70694479.svg','./assets/fangkuai.b39085bf.svg','./assets/fangkuaigray.ac1875ef.svg','./assets/wu.739aa605.png','./assets/bg@2x.17e3a9f0.png','./assets/device.c8746ca3.png','./assets/person.65abf2df.svg','./assets/persongray.ff383b7b.svg','./assets/arrow.cd63adda.svg','./assets/arrowgray.12951361.svg','./assets/arrow-right.492faba9.svg','./assets/arrowgray-right.9bbe7dc5.svg','./assets/file.2405a53a.svg','./assets/filegray.604a2915.svg','./assets/logo.7ddba080.png','./assets/logo_en.3a4ded4d.png','./assets/null.6a0f05b3.png','./assets/emptyinfo.dad646da.png','./assets/del-album.572c11d9.svg','./assets/eye.33f5846b.svg','./assets/renwu.53e82db5.svg','./assets/chuanshu_2@2x.aed2c8d5.png','./assets/xiaoxi.d06ecc1d.svg','./assets/del-center.6530b90b.svg','./assets/del-center-grey.28374fe4.svg','./assets/more-point.0576931d.svg','./assets/xuanze.6378d3d9.svg','./assets/notify-s.34a88d05.png','./assets/passwdTimes.676792c2.png','./assets/notify-e.399fe236.png','./assets/change.859e4cdf.svg','./assets/chuanshu.93ed7f50.svg','./assets/juyu-on@2x.2d5b7bd8.png','./assets/jisu_on_en.9cea55eb.png','./assets/juyu-off@2x.dff13b45.png','./assets/jisu_off_en.7a34f61a.png','./assets/s.90566789.svg','./assets/loading.06ac8680.png','./assets/error.491f97b4.png','./assets/like.e9b4e7ef.svg','./assets/likegray.e97118d8.svg','./assets/shibai.4e6ee836.svg','./assets/left.eec8e2df.svg','./assets/leftgray.66c6d192.svg','./assets/start.9720716f.svg','./assets/right.7a8c48ae.svg','./assets/rightgray.0e0c962f.svg','./assets/xiazai.7b378b6c.svg','./assets/del.edee56bc.svg','./assets/unsupport.ee188eab.svg','./assets/pic_1@2x.ff78e8c6.png','./assets/pic_2@2x.60b8cd33.png','./assets/index.0601cc40.js','./assets/lodash.51aea353.js','./assets/vue.9201f2e4.js','./assets/spark-md5.2cc5764b.js','./assets/crypto-js.53c8803a.js','./assets/element-plus.02c3c9a9.js','./assets/heic2any.04955513.js','./assets/xlsx.f5a5a084.js','./assets/index.fa73ef04.js','./assets/英文登录页@2x.8687039d.js','./assets/LoginUtils.f28bb86b.js','./assets/checkLogin.533a1db8.js','./assets/switchLogin.3f087f91.js','./assets/noscan.bc45fb78.js','./assets/touxiang.0d655065.js','./assets/IscasButton.81911eb4.js','./assets/qrLogin.9d890fa4.js','./assets/IscasInput.cc6563c7.js','./assets/del-album.a1cae891.js','./assets/mobilVideo.ba2ec02e.js','./assets/serviceworkerUtil.9d961b55.js','./assets/home.402c5032.js','./assets/loginOut.10c3f0c9.js','./assets/toast.5031a956.js','./assets/diskCommon.74a9f77c.js','./assets/index.90276144.js','./assets/fangkuaigray.da9dcb94.js','./assets/recycle.299cf1b4.js','./assets/index.4956fb85.js','./assets/noscan.e3a8d4bb.css','./assets/IscasInput.da6cf2e9.css','./assets/IscasButton.0d5e4787.css','./assets/loginOut.c794a353.css','./assets/recycle.92bef084.css','./assets/qrLogin.e68aa7c3.css','./assets/home.3a93d462.css','./assets/index.44d30419.css','./assets/index.74fe4690.css','./assets/fangkuaigray.f3ae5af2.css','./assets/index.de3556c6.css','./assets/index.a089c370.css']
this.addEventListener('install', function (event) {
  console.log('install')
  event.waitUntil(
    caches
      .open(cacheName)
      .then(function (cache) {
        return cache.addAll(fileList)
      })
      .then(function () {
        self.skipWaiting()
      })
  )
})

this.addEventListener('fetch', function (event) {
  var method = event.request.method
  var url = event.request.url
  if (url.indexOf('encrypted=true') > -1) {
    event.respondWith(FilterJS.returnRangeRequest(event.request))
  } else {
    // 优先走缓存,缓存没有在走网络
    if (
      method != 'POST' &&
      url.indexOf('index.html') == -1 &&
      url.indexOf('cnzz.com') == -1 &&
      method != 'XP' &&
      url.indexOf('/space/status?not307=yes') == -1
    ) {
      event.respondWith(
        caches.match(event.request).then((res) => {
          if (res) {
            return res
          }
          var requestToCache = event.request.clone()
          return fetch(requestToCache)
            .then((response) => {
              const responeseToCache = response.clone()
              caches.open(cacheName).then((cache) => {
                cache.put(requestToCache, responeseToCache)
              })
              return response
            })
            .catch((err) => {
              console.log(err)
            })
        })
      )
    }
  }
})

self.addEventListener('message', function (event) {
  let message = event.data
  if (message.type === 'aesKeyAndIv') {
    FilterJS.setIvAndKey(message.data.cryptojsIv, message.data.key, message.data.rawIv)
  }
})
