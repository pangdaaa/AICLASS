var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    currName: "- - - - - ",
    signTimesAll: 0,
    signRate_Curr: 0,
    frontRate_Curr: 0,
    //className: "- - - - - -", signRate_Class: 0, frontRate_Class: 0,
    //openId: '',
    // className: '',
    items: [
      { className: "- - - - - -", signRate_Class: 0, frontRate_Class: 0, },
      { className: "- - - - - -", signRate_Class: 0, frontRate_Class: 0, },
      { className: "- - - - - -", signRate_Class: 0, frontRate_Class: 0, },
      { className: "- - - - - -", signRate_Class: 0, frontRate_Class: 0, },
      { className: "- - - - - -", signRate_Class: 0, frontRate_Class: 0, },
    ],
  },

  onLoad: function (options) {
    var that = this

    //获取课程信息
    console.log('currname sign', wx.getStorageSync('currname'));
    console.log('signTimesAll sign', wx.getStorageSync('signTimesAll'));
    that.setData({
      currName: wx.getStorageSync('currname'),
      signTimesAll: wx.getStorageSync('signTimesAll'),
    })

    this.request_curr()
  },

  request_curr: function () {
    var that = this
    //请求班级数据
    qcloud.request({
      url: `${config.service.host}/weapp/stat`,
      data: { data: this.data.currName },
      login: true,
      success(result) {
        util.showSuccess('刷新成功')
        console.log('echo =====', result.data.data[0]);
        var classNameTmp = new Array();
        classNameTmp[0] = result.data.data[0].className1
        classNameTmp[1] = result.data.data[0].className2
        classNameTmp[2] = result.data.data[0].className3
        classNameTmp[3] = result.data.data[0].className4
        classNameTmp[4] = result.data.data[0].className5

        for (var i = 0; i < 5; i++) {
          that.data.items[i].className = classNameTmp[i]
        }
        that.setData({
          items: that.data.items
        })
      },
      fail(error) {
        console.log('request fail', error);
      },
      // complete: function () {
      //   wx.hideNavigationBarLoading() //完成停止加载
      //   wx.stopPullDownRefresh() //停止下拉刷新
      // },

    })
  },

  tapclick_h: function (options) {

    let className = options.currentTarget.dataset.classname

    wx.setStorageSync('className', className)
    console.log('className =====', className);
    // wx.request({
    //   url: ,
    // })

    wx.navigateTo({
      url: '../signDetail/signDetail'
    });

  },
});