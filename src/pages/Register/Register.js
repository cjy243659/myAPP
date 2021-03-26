import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import '../../stylus/index.styl'
// 引入请求
import { reqRegister } from '../../utils/http'
// 引入成功弹窗
import {successAlert} from '../../utils/alter'
export default class register extends Component {
    // 初始化数据
    constructor() {
        super()
        this.state = {
            user: {
                phone: '',
                nickname: '',
                password: ''
            }
        }
    }
    // 获取输入框的值
    changeN(e, key) {
        this.setState({
            user: {
                ...this.state.user,
                [key]: e.target.value
            }
        })
    }
    // 点击注册
    submit(){
        // console.log(this.state.user)
        reqRegister(this.state.user).then(res=>{
            if(res.data.code===200){
                // 弹出成功弹窗
                successAlert('注册成功')
                // 跳转到login页
                this.props.history.push('/login')
            }
        })
    }
    render() {
        return (
            <div className='login'>
                <Header title='注册' back></Header>
                {/* 表单 */}
                <div className='login-name'>
                    <span>手机号：</span><input type="text" className='inp' onChange={(e) => this.changeN(e, 'phone')} />
                </div>
                <div className='login-name'>
                    <span>昵称：</span><input type="text" className='inp' onChange={(e) => this.changeN(e, 'nickname')} />
                </div>
                <div className='login-name'>
                    <span>密码：</span><input type="password" className='inp' onChange={(e) => this.changeN(e, 'password')} />
                </div>
                <div className='login-btn btn' onClick={() => this.submit()}>注册</div>
            </div>
        )
    }
}
