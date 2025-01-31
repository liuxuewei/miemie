Page({
  data: {
  },

  search: e => {
    let content = e.detail.value
    wx.request({
      url: `https://apiv3.shanbay.com/wordsapp/words/vocab?word=${content}`,
      data: {},
      method: 'GET',
      success: res => {
        const { msg } = res.data
        if (msg == "SUCCESS") {
          wx.navigateTo({
            url: `./detail/detail?content=${content}`
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '对不起，查询不到该词信息',
            showCancel: false
          })
        }
      },
    })
  },

  help: () => {
    wx.showModal({
      title: '提示',
      content: '输入单词后点击回车键即可查询',
      showCancel: false
    })
  }
})
