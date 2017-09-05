import axios from 'axios'
import qs from 'qs';

let baseUrl = 'https://cnodejs.org/api/v1';

export function fetch(url,type, params) {
  return new Promise((resolve, reject) => {
    if(type == 'get'){
      axios.get( baseUrl + url, { params:params})
        .then(response => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error)
        })
    }else{
      axios.post(baseUrl + url,qs.stringify(params))
        .then( response=> {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error)
        })
    }
  });
}

//获取主题列表
export const getList = (tabType,page) => fetch('/topics','get',{ tab: tabType, page: page });

//获取主题详情
export const getTopicDetails = (id) => fetch('/topic/'+id,'get');

export const getUser =() => fetch('/accesstoken','post',{accesstoken:'5ebef576-fd24-4bc5-b488-d4518e485ee8'});
