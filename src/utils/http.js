import axios from 'axios'
import qs from 'qs'
import { successAlert } from "./alter"
// 请求
axios.interceptors.request.use(req=>{
    // 如果前往路径不是register或者login就携带token
    if(req.url!=="/api/register"&&req.url!=="/api/login"){
        req.headers.authorization=JSON.parse(sessionStorage.getItem("userInfo")).token
    }
    return req;
})
// 响应
axios.interceptors.response.use(res=>{
    console.log('本次请求的地址：'+res.config.url)
    console.log(res)
    //统一处理失败
    if (res.data.code !== 200) {
        successAlert(res.data.msg)
    }
    return res
})

// 注册
export const reqRegister=(user)=>{
    return axios({
        url:'/api/register',
        method:'post',
        data:qs.stringify(user)
    })
}
// 登录
export const reqLogin=(user)=>{
    return axios({
        url:'/api/login',
        method:'post',
        data:qs.stringify(user)
    })
}

// 首页商品列表数据
export const reqHomeGoods = ()=>{
    return axios({
        url:"/api/getindexgoods",
        methods:'get'
    })
}

// 获取商品详情
export const reqHomeInfo = (id)=>{
    return axios({
        url:"/api/getgoodsinfo",
        methods:'get',
        params:{
            id:id
        }
    })
}

//分类数据
export const reqHomeCate = ()=>{
    return axios({
        url:"/api/getcatetree",
        methods:'get'
    })
}

// 获取分类商品 
export const reqCateList = (id)=>{
    return axios({
        url:'/api/getgoods',
        method:'get',
        params:{
            fid:id
        }
    })
}

// 轮播图
export const reqBanner = ()=>{
    return axios({
        url:'/api/getbanner',
        method:'get',
    })
}

// 添加购物车 uid goodsid num
export const reqShopAdd=(good)=>{
    return axios({
        url:'/api/cartadd',
        method:'post',
        data:qs.stringify(good)
    })
}

//购物车列表
export const reqShopList=(id)=>{
    return axios({
        url:'/api/cartlist',
        method:'get',
        params:{
            uid:id
        }
    })
}

// 删除购物车
export const reqShopDel=(id)=>{
    return axios({
        url:'/api/cartdelete',
        method:'post',
        data:qs.stringify({
            id:id
        })
    })
}


//购物车修改 + - 
export const reqShopEdit=(user)=>{
    return axios({
        url:"/api/cartedit",
        method:"post",
        data:qs.stringify(user)
    })
}