//client

var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')


Page({
  data: {
    pickerHidden: true,
    chosen: '',
    userInfo: '',
    nickName: '',
    openId: '',
    // created_at: null,
    // updated_at: null,
    isTeacher: false, //教师判断
  },

  onLoad: function (options) {
    var that = this
    var appInstance = getApp()
    console.log('openId 0000000', appInstance.globalData);

    if (appInstance.globalData.requestResult === null) {
      console.log('hahahahahha')
      that.setData({
        openId: wx.getStorageSync('openIdStor'),
      })
    } else {
      console.log('openId 0000000', appInstance.globalData.requestResult.openId);
      // console.log('openId 0000000', appInstance.globalData.isTeacher);
      that.setData({
        openId: appInstance.globalData.requestResult.openId,
      })
    }






    // wx.getUserInfo({
    //   withCredentials: true,
    //   lang: '',
    //   success: function (res) {
    //     var userInfo = res.userInfo
    //     var nickName = userInfo.nickName
    //     that.setData({
    //       nickName: userInfo.nickName
    //     })
    //     console.log('request userinfo--', nickName);
    //   },
    //   // fail: function (res) { },
    //   // complete: function (res) { },
    // })
  },


  pickerConfirm: function (e) {
    this.setData({
      pickerHidden: true
    })
    this.setData({
      chosen: e.detail.value
    })
  },
  pickerCancel: function (e) {
    this.setData({
      pickerHidden: true
    })
  },
  pickerShow: function (e) {
    this.setData({
      pickerHidden: false
    })
  },

  formSubmit: function (e) {

    console.log('form发生了submit事件，携带数据为：', e.detail.value)

    // wx.getUserInfo({
    //   withCredentials: true,
    //   lang: '',
    //   success: function (res) {
    //     var userInfo = res.userInfo
    //     var nickName = userInfo.nickName
    //     that.setData({
    //       nickName: userInfo.nickName
    //     })
    //     console.log('request userinfo--', nickName);
    //   },
    //   // fail: function (res) { },
    //   // complete: function (res) { },
    // })

    if (e.detail.value.className && e.detail.value.name && e.detail.value.stuNum && e.detail.value.phone) {

      //验证是否为有效教师码
      if (e.detail.value.isTeacher === '123456')
        this.setData({
          isTeacher: true
        })

      wx.request({
        url: `${config.service.host}/weapp/information`,

        data: {
          className: e.detail.value.className,
          name: e.detail.value.name,
          stuNum: e.detail.value.stuNum,
          phone: e.detail.value.phone,
          isTeacher: this.data.isTeacher,
          openid: this.data.openId,
          // created_at: new Date(),
          // updated_at: this.data.created_at,
        },

        login: true,
        method: 'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success(result) {
          if (result.data.code === -1) { util.showSuccess('已有信息'); }
          else {
            util.showSuccess('提交成功')
            wx.showToast({
              title: '返回刷新',
              duration: 2000
            })
          }

          //  that.setData({
          //    // requestResult: JSON.stringify(result.data)
          //    requestResult: JSON.stringify(result)
          //  })
          console.log(result.data);
        },
        fail(error) {
          util.showModel('提交失败', error);
          console.log('request fail', error);
        },
        // complete: function() {

        // },
      })
    }
    else {
      wx.showToast({
        title: '信息不全',
        duration: 1000
      })
      console.log('信息不全');
    }



  },

  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })

  },

})





