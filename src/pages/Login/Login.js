import React, { Component } from 'react'
// 引入头部
import Header from '../../components/Header/Header'
// 引入样式
import '../../stylus/index.styl'
// 引入请求
import { reqLogin } from '../../utils/http'

import { successAlert } from '../../utils/alter'
export default class login extends Component {
    // 初始化数据
    constructor() {
        super()
        this.state = {
            user: {
                phone: '',
                password: ''
            }
        }
    }

    // 首先获取到输入框中的值，然后赋值给user
    changeuser(e, key) {
        this.setState({
            user: {
                ...this.state.user,
                [key]: e.target.value
            }
        })
    }
    // 点击登录按钮，向后端发送请求
    toLogin() {
        reqLogin(this.state.user).then(res => {
            if (res.data.code === 200) {
                // 弹出成功弹窗
                successAlert('登录成功')
                // 存用户信息
                sessionStorage.setItem('userInfo', JSON.stringify(res.data.list))
                // 跳转页面
                this.props.history.push('/index')
            }
        })
    }
    render() {
        return (
            // 样式在form里
            <div className='login'>
                <Header title='登录' register></Header>
                {/* 表单 */}
                <div className='login-name'>
                    <span>账号：</span><input type="text" className='inp' onChange={(e) => this.changeuser(e, 'phone')} />
                </div>
                <div className='login-name'>
                    <span>密码：</span><input type="password" className='inp' onChange={(e) => this.changeuser(e, 'password')} />
                </div>
                <div className='login-forget'>
                    <span>忘记密码</span>
                </div>
                <div className='login-btn' onClick={() => this.toLogin()}>登录</div>
            </div>
        )
    }
}
