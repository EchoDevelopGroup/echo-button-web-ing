import request from './request'
import { objectToFormData } from './form'

/**
 * @typedef ButtonItem
 * @property {string} voice_id 语音ID
 * @property {string} voice_name 语音名称
 */

/**
 * @typedef ButtonOverview
 * @property {string} button_classification 按钮分类
 * @property {ButtonItem[]} button_list 按钮列表
 */

/**
 * 按钮总览
 * @returns {Promise<ButtonOverview[]>}
 */
export function getOverview () {
  return request({
    url: 'button/overview',
    method: 'get'
  })
}

/**
 * @typedef ButtonUrl
 * @property {string} voice_url 语言链接
 */

/**
 * 按钮播放
 * @param {string} voiceId 语音ID
 * @returns {Promise<ButtonUrl>}
 */
export function playButton (voiceId) {
  return request({
    url: 'button/play',
    method: 'post',
    data: {
      voice_id: voiceId
    }
  })
}

/**
 * 按钮上传
 * @param {File} file 语音文件
 * @param {string} voiceName 语音名称
 * @param {string} voiceDetail 语音信息
 * @param {string} voiceClassification 语音分类
 * @param {string} uploadUser 上传用户
 * @returns {Promise<void>}
 */
export function uploadButton (file, voiceName, voiceDetail, voiceClassification, uploadUser) {
  return request({
    url: 'button/upload',
    method: 'post',
    data: objectToFormData({
      file,
      voice_name: voiceName,
      voice_detail: voiceDetail,
      voice_classification: voiceClassification,
      upload_user: uploadUser
    })
  })
}

/**
 * 按钮删除
 * @param {string} voiceId 语音ID
 * @returns {Promise<void>}
 */
export function removeButton (voiceId) {
  return request({
    url: 'button/delete',
    method: 'post',
    data: {
      voice_id: voiceId
    }
  })
}

/**
 * 用户登录验证
 * @param {string} userName 用户名
 * @param {string} userPassword 密码
 */
export function login (userName, userPassword) {
  return request({
    url: 'user/authority',
    method: 'post',
    data: {
      user_name: userName,
      user_password: userPassword
    }
  })
}
