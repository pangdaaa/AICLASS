/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)


//GET test
router.get('/demo', controllers.demo.get)
//POST test
router.post('/demo', controllers.demo.post)

// --- 个人信息录入接口 --- //
//GET test
router.get('/information', controllers.information.get)
//POST test
router.post('/information', controllers.information.post)

// --- 课程信息录入接口 --- //
//GET test
router.get('/addCurr', controllers.addCurr.get)
//POST test
router.post('/addCurr', controllers.addCurr.post)

// --- 课程信息查看接口 --- //
//GET test
router.get('/curriculum', controllers.curriculum.get)
//POST test
router.post('/curriculum', controllers.curriculum.post)

// --- 课程信息查看接口1 --- //
//GET test
router.get('/curriculum1', controllers.curriculum1.get)
//POST test
router.post('/curriculum1', controllers.curriculum1.post)

// --- 教师认证接口 --- //
//GET test
router.get('/isTeacher', controllers.isTeacher.get)
//POST test
router.post('/isTeacher', controllers.isTeacher.post)

// --- 统计详情接口 --- //
//GET test
router.get('/stat', controllers.stat.get)
//POST test
router.post('/stat', controllers.stat.post)

// --- 签到详情接口 --- //
//GET test
router.get('/signDetail', controllers.signDetail.get)
//POST test
router.post('/signDetail', controllers.signDetail.post)

// --- 教师签到接口 --- //
//GET test
router.get('/bSign', controllers.bSign.get)
//POST test
router.post('/bSign', controllers.bSign.post)

// --- 计时接口 --- //
//GET test
router.get('/timer', controllers.timer.get)
//POST test
router.post('/timer', controllers.timer.post)

// --- 学生找课接口 --- //
//GET test
router.get('/serchCurr', controllers.serchCurr.get)
//POST test
router.post('/serchCurr', controllers.serchCurr.post)

// --- 学生签到接口 --- //
//GET test
router.get('/fSign', controllers.fSign.get)
//POST test
router.post('/fSign', controllers.fSign.post)

module.exports = router
