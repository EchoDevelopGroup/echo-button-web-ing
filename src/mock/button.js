export function getOverview (config) {
  return {
    code: 0,
    message: '',
    data: {
      button_classification: '',
      button_list: [
        {
          voice_id: 'aaa',
          voice_name: 'bbb'
        }
      ]
    }
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
