var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')


Page({
  data: {
    pickerHidden: true,
    chosen: '',
    openId: '',
  },

  onLoad: function (options) {
    var that = this
    var appInstance = getApp()

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
    // that.setData({
    //   openId: appInstance.globalData.requestResult.openId,
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

    if (e.detail.value.currName && e.detail.value.class1) {

      wx.request({
        url: `${config.service.host}/weapp/addCurr`,

        data: {
          currName: e.detail.value.currName,
          className1: e.detail.value.class1,
          className2: e.detail.value.class2,
          className3: e.detail.value.class3,
          className4: e.detail.value.class4,
          className5: e.detail.value.class5,
          openid: this.data.openId
        },

        login: true,
        method: 'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success(result) {
          if (result.data.code === -1) { util.showSuccess('已有信息'); }
          else { util.showSuccess('提交成功') }

          //  that.setData({
          //    // requestResult: JSON.stringify(result.data)
          //    requestResult: JSON.stringify(result)
          //  })
          console.log('tijioa',result.data);
          console.log('tijioa ---- ',JSON.stringify(result.data));
        },
        fail(error) {
          util.showModel('提交失败', error);
          console.log('request fail', error);
        },
        //complete: function(res) {},
      })
    }
    else {
      wx.showToast({
        title: '至少有一个班级',
        duration: 1000
      })
      console.log('至少有一个班级');
    }

  },
  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
    //服务器交互
    // wx.request({
    //   url: '',
    // })
    //传递给上一页面
  }
})
