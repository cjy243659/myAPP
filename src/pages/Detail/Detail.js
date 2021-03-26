import React, { Component } from 'react'
// 引入头部
import Header from '../../components/Header/Header'
// 引入search传参转换形式的插件
import querystring from "querystring"
// 引入请求
import { reqHomeInfo } from '../../utils/http'
// 引入样式
import './components/Info/Info.styl'
import '../Index/Index.styl'
import './Detail.styl'
// 引入子组件
import Info from './components/Info/Info'
import Picker from './components/Picker/Picker'


export default class detail extends Component {
    constructor() {
        super()
        this.state = {
            detail: {},
            // 弹窗状态
            isshow: false
        }
        // 创建Refs并通过ref属性联系到React组件
        this.des = React.createRef()
    }
    // 一进入页面就请求
    componentDidMount() {
        // console.log(this.props.history.location.search)//?id=9
        let str = this.props.history.location.search
        let result = querystring.parse(str.slice(1))
        // console.log(result)
        // 发送获取详情的请求
        reqHomeInfo(result.id).then(res => {
            let list = res.data.list[0]
            // console.log(list)
            // 请求到的数据是字符串数组 转换为数组
            // list.specsattr = JSON.parse(list.specsattr)
            list.specsattr = list.specsattr.split(",")
            // console.log(list)
            // console.log(typeof(list.specsattr))
            if (res.data.code === 200) {
                this.setState({
                    detail: list
                }, () => {
                    // description 是一个html标签 要展示到页面中
                    console.log(this.state.detail);
                    this.des.current.innerHTML = this.state.detail.description
                })
            }
        })
    }
    // 弹窗状态
    //点击加入购物车，弹框出现
    show() {
        this.setState({
            isshow: true
        })
    }
    //点击弹窗中的购物车--弹框消失
    hide() {
        this.setState({
            isshow: false
        })
    }
    render() {
        let { detail ,isshow} = this.state
        return (
            <div className='detail-bottom'>
                <Header title='商品详情' back></Header>
                {/* 图片 */}
                <img src={detail.img} alt="" />

                {/* 商品信息 */}
                {detail.goodsname ? <Info detail={detail}></Info> : null}

                {/* 商品描述 */}
                <div ref={this.des}></div>

                {/* 底部导航 */}
                <footer className='navFooter'>
                    {/* 
                        NavLink 有activeClassName属性 Link没有
                    */}
                    <p className='addShop' onClick={()=>this.show()}>加入购物车</p>
                </footer>

                {/* 弹窗 */}
                {/* 把hide方法传过去、detail */}
                {/* 当详情有数据的时候再显示这个弹窗 */}
                {detail.goodsname && isshow ? <Picker detail={detail} hide={() => this.hide()}></Picker> : null}
            </div>
        )
    }
}
