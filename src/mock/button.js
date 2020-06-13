const voices = [
  {
    button_classification: '软桃',
    button_list: [
      {
        voice_id: 'c1',
        voice_name: '笨蛋',
        voice_url: 'https://www.sepeach.com/voices/c01.mp3'
      },
      {
        voice_id: 'c2',
        voice_name: '呲溜',
        voice_url: 'https://www.sepeach.com/voices/c02.aac'
      },
      {
        voice_id: 'c3',
        voice_name: '木阿',
        voice_url: 'https://www.sepeach.com/voices/c03.mp3'
      },
      {
        voice_id: 'c4',
        voice_name: '木啊',
        voice_url: 'https://www.sepeach.com/voices/c04.mp3'
      },
      {
        voice_id: 'a1',
        voice_name: '啊',
        voice_url: 'https://www.sepeach.com/voices/01-1.mp3'
      },
      {
        voice_id: 'c5',
        voice_name: 'echo要不行了',
        voice_url: 'https://www.sepeach.com/voices/c05.mp3'
      },
      {
        voice_id: 'c6',
        voice_name: '不要再打了',
        voice_url: 'https://www.sepeach.com/voices/c06.mp3'
      }
    ]
  },
  {
    button_classification: '通用',
    button_list: [
      {
        voice_id: 'd1',
        voice_name: '擦盘子耐久',
        voice_url: 'https://www.sepeach.com/voices/d01.mp3'
      },
      {
        voice_id: 'd2',
        voice_name: '出租车司机lao路',
        voice_url: 'https://www.sepeach.com/voices/d02.mp3'
      },
      {
        voice_id: 'd3',
        voice_name: '哈↑哈↑哈↑哈↑哈↑',
        voice_url: 'https://www.sepeach.com/voices/d03.mp3'
      },
      {
        voice_id: 'd4',
        voice_name: '死处男',
        voice_url: 'https://www.sepeach.com/voices/d04.mp3'
      },
      {
        voice_id: 'd5',
        voice_name: '幼不幼稚',
        voice_url: 'https://www.sepeach.com/voices/01-d05.mp3'
      },
      {
        voice_id: 'd6',
        voice_name: '挑衅超管',
        voice_url: 'https://www.sepeach.com/voices/d06.mp3'
      },
      {
        voice_id: 'd7',
        voice_name: 'hololive hololive',
        voice_url: 'https://www.sepeach.com/voices/d07.mp3'
      },
      {
        voice_id: 'a2',
        voice_name: '行行行行行行行行',
        voice_url: 'https://www.sepeach.com/voices/01-2.mp3'
      },
      {
        voice_id: 'a3',
        voice_name: '好好好',
        voice_url: 'https://www.sepeach.com/voices/01-3.mp3'
      }
    ]
  }
]

export function getOverview (config) {
  return {
    code: 0,
    message: '',
    data: voices
  }
}

export function playButton (config) {
  return {
    code: 0,
    message: '',
    data: {
      voice_url: 'https://www.baidu.com'
    }
  }
}

export function uploadButton (config) {
  // const input = JSON.parse(config.body)
  return {
    code: 0,
    message: ''
  }
}

export function removeButton (config) {
  return {
    code: 0,
    message: ''
  }
}

export function login (config) {
  return {
    code: 0,
    message: ''
  }
}
