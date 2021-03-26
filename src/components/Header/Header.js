import React, { Component } from 'react'
import './Header.styl'
// 引入
// 非路由组件(eg:home里面的一个小模块要实现跳转)使用withRouter
import {Link,withRouter} from "react-router-dom"
class Header extends Component {
    // 点击了返回要后退一步
    back() {
        this.props.history.go(-1)
    }
    render() {
        let { back, title, register } = this.props
        // console.log(back)//true
        return (
            <div className='Header'>
                {/* 登录页没有返回，所以做一个判断，如果页面传进来了一个back就显示没有传就不显示 */}
                {back ? <span className='Header-back' onClick={()=>this.back()}>返回</span> : null}
                {/* 到了不同的页面要显示不同的title，所以页面使用的时候还要传一个title字段 */}
                <div className='Header-title'>{title}</div>
                {/* 如果当前是注册页就不需要显示注册了 */}
                {register ? <Link to='/register' className='Header-register'>注册</Link> : null}
            </div>
        )
    }
}
export default withRouter(Header)