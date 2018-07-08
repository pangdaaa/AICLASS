// pages/bSign/bSign.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

//获取应用实例
var app = getApp()

Page({
  data: {
    // scale: 18,
    latitude: 0,
    longitude: 0,
    // sliderValue: 50,
    // hasScale: false,//解决方案  
    range: 50, //范围
    timeBucket: 1,// 时限
    currName: '',
    QR_CODE: '',
  //  isTeacher:false,
  //  updated_at: null,
    items: [
      { value: '', name: '暂无课程', checked: 'true' },
      { value: '', name: '暂无课程' },
      { value: '', name: '暂无课程' },
      { value: '', name: '暂无课程' },
      { value: '', name: '暂无课程' },
      { value: '', name: '暂无课程' }
    ]
  },
  //下拉刷新页面
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.request_curr_t()
  },


  // 页面加载
  onLoad: function (options) {
    var that = this
    var appInstance = getApp()

//获取全局变量
//     if (!(appInstance.globalData.requestResult === null)){
//       that.setData({
//         isTeacher: appInstance.globalData.isTeacher,
//         openId: appInstance.globalData.requestResult.openId,
//         // className: appInstance.globalData.className,
//       })
// }


    if (appInstance.globalData.requestResult === null) {
      console.log('hahahahahha')
      that.setData({
        openId: wx.getStorageSync('openIdStor'),
        isTeacher: wx.getStorageSync('isTeacherStor'),
      })
    } else {
     
      that.setData({
        isTeacher: appInstance.globalData.isTeacher,
        openId: appInstance.globalData.requestResult.openId,
        // className: appInstance.globalData.className,
      })
    }
    // that.setData({
    //   isTeacher: appInstance.globalData.isTeacher,
    //   openId: appInstance.globalData.requestResult.openId,
    //   // className: appInstance.globalData.className,
    // })

    // console.log('globalData isTeacher', appInstance.globalData.isTeacher);
    // console.log('globalData openId', appInstance.globalData.requestResult.openId);
    // console.log('globalData className', appInstance.globalData.className);

    //设置签到时限到缓存
    wx.setStorageSync('timeBucket', this.data.timeBucket)

   // console.log('globalData', appInstance.globalData);

    // // 1.获取定时器，用于判断是否已经在计费
    // this.timer = options.timer;

    // 2.获取并设置当前位置经纬度
    wx.getLocation({
      type: "gcj02",

      success: (res) => {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude,
        })
      }
    });
    this.request_curr_t()
// //请求课程数据
//     if (this.data.isTeacher === true) {
//       var that = this
//       //老师
//       console.log('Teacher request', this.data.openId);

//       //请求课程数据
//       qcloud.request({
//         url: `${config.service.host}/weapp/curriculum`,
//         data: { data: this.data.openId },
//         login: true,
//         success(result) {
//           console.log('请求课程数据 =====', result.data);

//           for (var i = 0; i < result.data.data.length; i++) {
//             that.data.items[i].value = result.data.data[i].currName
//             that.data.items[i].name = result.data.data[i].currName
//           }
//           that.setData({
//             items: that.data.items
//           })


//         },
//         fail(error) {
//           console.log('request fail', error);
//         },
//         complete: function () {
//           wx.hideNavigationBarLoading() //完成停止加载
//           wx.stopPullDownRefresh() //停止下拉刷新
//         },
//       })

//     }
  
  },

  request_curr_t:function(){
    //请求课程数据
    console.log('Teacher ？？？', this.data.isTeacher);
    console.log('Teacher request', this.data.openId);
    if (this.data.isTeacher === true || this.data.isTeacher === "true") {
      var that = this
      //老师
      console.log('Teacher request 0000000');

      //请求课程数据
      qcloud.request({
        url: `${config.service.host}/weapp/curriculum`,
        data: { data: this.data.openId },
        login: true,
        success(result) {
          console.log('请求课程数据 =====', result.data);

          for (var i = 0; i < result.data.data.length; i++) {
            that.data.items[i].value = result.data.data[i].currName
            that.data.items[i].name = result.data.data[i].currName
          }
          that.setData({
            items: that.data.items
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

    }
  },

  // 页面显示
  onShow: function () {
    
  },


  tapclick: function () {
    if (this.data.isTeacher === true || this.data.isTeacher === "true") {
      let currname = this.data.currName
      if (!(currname === '')) {
        console.log('currname currname currname ', currname);
        wx.setStorageSync('currname', currname)

        wx.scanCode({
          onlyFromCamera: true,
          success: (res) => {
            wx.showLoading({
              title: '发起签到',
              mask: true
            })
            //QR_CODE value
            console.log(res.result.length)
            //var QR_CODE = res.result
            this.setData({
              QR_CODE: res.result
            })

            if (this.data.QR_CODE.length === 15) {
              console.log('res.result.length')
              this.request_sign()

              // // 请求密码成功隐藏等待框
              // wx.hideLoading();
              // // 转到信息展示页
              // wx.navigateTo({
              //   url: '../stat/stat',
              //   success: function (res) {
              //     wx.showToast({
              //       title: '正在签到',
              //       duration: 1000
              //     })
              //   }
              // })
            } else {
              wx.showToast({
                title: '无效码',
                duration: 1000
              })
            }
            //console.log(res)
          }
        })
      } else {
        console.log('currname null  currname null currname ');
        wx.showToast({
          title: '未选课程',
          duration: 1000
        })
      }

    } else {
      wx.showToast({
        title: '没有权限',
        duration: 1000
      })
    }


  },

  //发起签到请求
  request_sign: function () {
    var that = this

    qcloud.request({
      url: `${config.service.host}/weapp/bSign`,
      data: {
        QR_CODE: this.data.QR_CODE,
        range: this.data.range, //范围
        timeBucket: this.data.timeBucket, // 时限
        currName: this.data.currName,
        longitude: this.data.longitude,
        latitude: this.data.latitude,
        //update_time: new Date(),
      },
      login: true,
      success(result) {
        console.log('result =====', result.data);
        // var tmpdate = result.data.data[0].update_time
        // tmpdate = tmpdate.replace("Z", " UTC")
        // var format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS Z");//注意格式化的表达式
        // var d = format.parse(date);
        // console.log('result.data.data[0].update_time', tmpdate);
      },
      fail(error) {
        console.log('request fail', error);
      }
    })

    // 请求密码成功隐藏等待框
    wx.hideLoading();
    // 转到信息展示页
    wx.navigateTo({
      url: '../stat/stat',
      success: function (res) {
        wx.showToast({
          title: '正在签到',
          duration: 1000
        })
      }
    })


  },

  // 定位函数，移动位置到地图中心
  movetoPosition: function () {
    this.mapCtx.moveToLocation();
  },


  /* 获取滑动后的值 */
  // 设置范围
  changeCircles: function (e) {
    // this.data.sliderValue = e.detail.value
    // this.setData(this.data);
    this.setData({
      range: e.detail.value
    });
    console.log("range === " + this.data.range)
  },

//设置时限
  changeTime: function (e) {
    // this.data.sliderValue = e.detail.value
    // this.setData(this.data);
    this.setData({
      timeBucket: e.detail.value
    });
    wx.setStorageSync('timeBucket', this.data.timeBucket)
    console.log("timeBucket === " + this.data.timeBucket)
  },

//选择课程
  radioChange: function (e) {

    this.setData({
      currName: e.detail.value
    });

    console.log('currName === ', this.data.currName)
    var items = this.data.items;
    for (var i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value == e.detail.value
    }

    this.setData({
      items: items
    });
  }
})
