import {
  getUser,
} from '../service/getData'

import {
  RECORD_USERINFO,
} from './mutation-types.js'

export default {
  async getUserInfo({commit, state}) {
    let res = await getUser();
    //存储数据
    commit(RECORD_USERINFO, res)
  }
}
