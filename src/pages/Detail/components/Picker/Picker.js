import React, { Component } from 'react'
import './Picker.styl'
// 引入请求
import { reqShopAdd } from "../../../../utils/http"
// 引入弹窗
import { successAlert } from "../../../../utils/alter"
export default class Picker extends Component {
    // 初始化数据
    constructor() {
        super()
        this.state = {
            n: 0
        }
    }
    // //点了这个弹窗
    hide(e) {
        // 如果所点元素的类名为picker那么就接收到父组件传过来的hide方法调用
        e.target.className === "picker" && this.props.hide()
    }
    // 改变n
    changeN(index) {
        this.setState({
            n: index
        })
        // console.log(index)
    }
    //添加到购物车
    add() {
        // 发送添加购物车请求  uid goodsid num
        /*
            uid--用户编号 取出存储在sessStorage里面的userInfo里面的用户uid
            goodsis--上级目录id
            num--数量
        */
        reqShopAdd({
            uid: JSON.parse(sessionStorage.getItem("userInfo")).uid,
            goodsid: this.props.detail.id,
            num: 1
        }).then(res => {
            if (res.data.code === 200) {
                successAlert(res.data.msg)
                this.props.hide()
            }
        })
    }
    render() {
        let { detail } = this.props
        // console.log(this.state.n)
        console.log(detail.specsattr)
        let { n } = this.state
        return (
            <div className='picker' onClick={(e) => this.hide(e)}>
                <div className='picker-img'>
                    <img src={detail.img} alt="" />
                    <p className='goods-title'>{detail.goodsname}</p>
                </div>
                <div className='specs-title'>{detail.specsname}</div>
                <div className='picker-specs'>
                    {
                        detail.specsattr.map((item, index) => {
                            return (
                                <div
                                    onClick={() => this.changeN(index)}
                                    className={index === n ? 'attractive' : ''}
                                    key={item}>{item}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="pinker-btn" onClick={() => this.add()}>加入购物车</div>
            </div>
        )
    }
}
