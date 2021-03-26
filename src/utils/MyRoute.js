import React, { Component } from 'react'
import {Route,Redirect} from "react-router-dom"
export default class MyRoute extends Component {
    render() {
        console.log(this.props)
        // 取出本地存储里面的userInfo
        let isLogin=sessionStorage.getItem("userInfo");//有，就会取到字符串，没有，就会取到null
        return (
            <div>
                {/* 如果判断用户登录了就把整个props传给route，如果没有就跳转到登录页 */}
                { isLogin?<Route {...this.props}></Route>:<Redirect to="/login"></Redirect>}
            </div>
        )
    }
}
