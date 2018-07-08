// pages/stat/stat.js

var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{ className: "- - - -", peopleNum_Class: 0, signRate_Class: 0, frontRate_Class: 0, },
    { className: "- - - -", peopleNum_Class: 0, signRate_Class: 0, frontRate_Class: 0, },
    { className: "- - - -", peopleNum_Class: 0, signRate_Class: 0, frontRate_Class: 0, },
    { className: "- - - -", peopleNum_Class: 0, signRate_Class: 0, frontRate_Class: 0, },
    { className: "- - - -", peopleNum_Class: 0, signRate_Class: 0, frontRate_Class: 0, },
    ],
    currName: "- - - -",//课程名
    classRoom: "- - -",//教室
    classNum: 0,//班级数
    peopleNum_Curr: 0,
    peopleNumAll_Curr: 0,
    signRate_Curr: 0,
    // className: "- - - - - -",//班级
    // peopleNum_Class:0,
    // signRate_Class:0,
    // frontRate_Class:0,
  },
  //下拉刷新页面
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.request_curr()
  },
  // stopPullDownRefresh() {
  //   wx.stopPullDownRefresh()
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    //获取课程信息
    console.log('currname sign', wx.getStorageSync('currname'));
    console.log('timeBucket sign////', wx.getStorageSync('timeBucket') * 60 * 1000);
    that.setData({
      currName: wx.getStorageSync('currname'),
      timeBucket: wx.getStorageSync('timeBucket'),
    })

    //请求班级数据
    this.request_curr()

    //设置 定时器
    setTimeout(function () {
      //var that = this
      //请求班级数据
      qcloud.request({
        url: `${config.service.host}/weapp/timer`,
        data: { currName: wx.getStorageSync('currname') },
        login: true,
        success(result) {
          console.log('result55555 ', result.data);
        },
        fail(error) {
          console.log('request fail', error);
        },
      })

      wx.showModal({
        title: '提示',
        content: '签到结束',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
           else {
            console.log('用户点击取消')
          }

        }
      })

    }, wx.getStorageSync('timeBucket') * 60 * 1000);

  },

  request_curr: function () {
    var that = this
    //请求班级数据
    qcloud.request({
      url: `${config.service.host}/weapp/stat`,
      data: { data: this.data.currName },
      login: true,
      success(result) {
        
        console.log('echo =====', result.data.data[0]);
        //保存发起签到数据
        wx.setStorageSync('signTimesAll', result.data.data[0].signTimesAll)

        //获取班级名
        var classNameTmp = new Array();
        classNameTmp[0] = result.data.data[0].className1
        classNameTmp[1] = result.data.data[0].className2
        classNameTmp[2] = result.data.data[0].className3
        classNameTmp[3] = result.data.data[0].className4
        classNameTmp[4] = result.data.data[0].className5

        var k = 0;
        for (var i = 0; i < 5; i++) {
          that.data.items[i].className = classNameTmp[i]
          if (!(classNameTmp[i] === '')) {
            k++;
          }
        }
        console.log('班级数', k);
        that.setData({
          items: that.data.items,
          classRoom: (result.data.data[0].QR_CODE).substring(5, 11),
           classNum:k,
        })
       // util.showSuccess('刷新成功')
        wx.showToast({
          title: '请勿关闭程序',
          duration: 3000
        })
      },
      fail(error) {
        console.log('request fail', error);
      },
      complete: function () {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },

    })
  },

  //获取点击值
  tapclick_h: function (options) {

    let className = options.currentTarget.dataset.classname

    wx.setStorageSync('className', className)
    console.log('className =====', className);

    wx.navigateTo({
      url: '../signDetail/signDetail'
    });

  },

  tapclick_signDetail: function () {

    // wx.request({
    //   url: ,
    // })

    wx.navigateTo({
      url: '../currDetail/currDetail'
    });

  },


})