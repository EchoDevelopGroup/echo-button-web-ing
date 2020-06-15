import Mock from 'mockjs'
import * as button from './button'

/**
 * 启动前端MOCK
 */
export function startMock() {
  Mock.mock(/\/echo\/project\/echo\/button\/overview/, 'get', button.getOverview)
  Mock.mock(/\/echo\/project\/echo\/button\/play/, 'get', button.playButton)
  Mock.mock(/\/echo\/project\/echo\/button\/upload/, 'get', button.uploadButton)
  Mock.mock(/\/echo\/project\/echo\/button\/delete/, 'get', button.removeButton)
  Mock.mock(/\/echo\/project\/echo\/user\/authority/, 'get', button.login)
}
