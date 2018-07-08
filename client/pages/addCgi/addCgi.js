//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    requestResult: '',
    canIUseClipboard: wx.canIUse('')
  },


  testCgi: function () {
    util.showBusy('请求中...')
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/demo`,
      data: {
        data: '数据结构',
        // isTeacher: false,
        // openid:'asdfghjk'
      },
      login: true,
      //   method: 'POST',
      //  header: { "Content-Type": "application/x-www-form-urlencoded" },
      success(result) {
        util.showSuccess('请求成功完成')
        let dataTemp = JSON.stringify(result.data)
        //dataTemp = dataTemp.data[0].phone
        that.setData({
          requestResult: dataTemp
          // requestResult: dataTemp.data[0].className
          // requestResult: JSON.stringify(result)
        })

        //console.log('request userinfo--', this.data.requestResult);
      },

      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
    // console.log('request userinfo--', requestResult.phone);
  },



  copyCode: function (e) {
    // var codeId = e.target.dataset.codeId
    // wx.setClipboardData({
    //   data: code[codeId - 1],
    //   success: function () {
    //     util.showSuccess('复制成功')
    //   }
    // })
    wx.getUserInfo({
      withCredentials: true,
      lang: '',
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        console.log('request userinfo--', nickName);
        this.setData({})
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})

var code = [
  `router.get('/demo', controllers.demo)`,
  `module.exports = ctx => {
    ctx.state.data = {
        msg: 'Hello World'
    }
}`
]

// wx.getUserInfo({
//   withCredentials: true,
//   lang: '',
//   success: function(res) {
//     console.log('request userinfo--', res);
//   },
//   fail: function(res) {},
//   complete: function(res) {},
// })

// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {

//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {

//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })



// Page({
//   data: {
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   onLoad: function () {
//     // 查看是否授权
//     wx.getSetting({
//       success: function (res) {
//         if (res.authSetting['scope.userInfo']) {
//           // 已经授权，可以直接调用 getUserInfo 获取头像昵称
//           wx.getUserInfo({
//             success: function (res) {
//               console(res.userInfo)
//             }
//           })
//         }
//       }
//     })
//   },
//   bindGetUserInfo: function (e) {
//     console.log(e.detail.userInfo)
//   }
// })