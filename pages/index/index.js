//index.js
//获取应用实例
const app = getApp()

const naviBgColormap = {
    'sunny': '#cbeefd',
    'cloudy': '#deeef6',
    'overcast': '#c6ced2',
    'lightrain': '#bdd5e1',
    'heavyrain': '#c5ccd0',
    'snow': '#aae1fc'
}

Page({
    data: {
        temp: 0,
        weather: '',
        nowWeatherBackground: "",
        navibarBgColor: ""
    },
    onPullDownRefresh() {
        this.getNow(() => {
            wx.stopPullDownRefresh()
        })
    },
    onLoad() {
        console.log('onLoad')
        this.getNow()
    },
    onShow() {
        console.log('onShow')
    },
    onReady() {
        console.log('onReady')
    },
    onHide() {
        console.log('onHide')
    },
    onUnload() {
        console.log('onUnload')
    },
    getNow(callback) {
        wx.request({
            url: 'https://test-miniprogram.com/api/weather/now',
            data: {
                city: 'beijing'
            },
            header: {
                'content-type': 'application/json'
            },
            success: res => {
                let result = res.data.result

                this.setData({
                    temp: result.now.temp,
                    weather: result.now.weather,
                    nowWeatherBackground: '/images/' + result.now.weather + '-bg.png'
                })
                wx.setNavigationBarColor({
                    frontColor: "#000000",
                    backgroundColor: naviBgColormap[result.now.weather]
                })
            },
            complete: () => {
                callback && callback()
            }
        })
    }
})