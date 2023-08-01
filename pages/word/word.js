const list = require('../../data/word-list.js')
const vocList = require('../../data/vocabulary.js')
const innerAudioContext = wx.createInnerAudioContext()

Page({
  data: {
    content: null,
    pron: null,
    definition: null,
    audioUrl: null,
    worldListMax: 1000,
    vocListMax: 12346
  },

  onReady(){
    //从本地缓存单词表选取第一个单词
    const { worldListMax } = this.data;
    var idx = Math.floor(Math.random() * worldListMax) + 1;
    console.log(list.wordList.length, vocList.wordList.length)
    var word = list.wordList[idx]
    console.log('word', word)
    this.setData({
      content: word.content,
      pron: word.pron,
      definition: word.definition,
      audioUrl: null
    })
  },

  show() {
    this.setData({
      showNot: true
    })
  },

  next() {
    this.setData({
      showNot: false
    })

    const { vocListMax, content, audioUrl } = this.data

    // 从vocabulary.js中选取下一个单词
    let idx = Math.floor(Math.random() * vocListMax) + 1;
    const word = vocList.wordList[idx];
    this.setData({
      content: word
    })

    wx.request({
      url: `https://apiv3.shanbay.com/bdc/search/?word=${content}`,
      data: {},
      method: 'GET',
      success: res => {

        const data = res.data.data
        if(data){
          this.setData({
            content: data.content,
            audioUrl: data.us_audio,
            pron: data.pron,
            definition: data.definition
          })
        }
        innerAudioContext.src = audioUrl
      }
    })
  },

  read() {
    if (this.data.audioUrl) {
      innerAudioContext.play()
    }
  }
})
