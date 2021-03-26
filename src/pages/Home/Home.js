import React, { Component } from 'react'
// 引入子组件
import Info from './components/Info/Info'
import List from './components/List/List'
import Nav from './components/Nav/Nav'
import Banner from './components/Banner/Banner'

// 引入请求
import { reqHomeGoods,reqBanner } from '../../utils/http'
export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            // List列表数据
            goods: [],
            // 轮播图
            banner:[]
        }
    }
    // 渲染完成，一进入页面就发请求
    componentDidMount() {
        // 请求列表
        reqHomeGoods().then((res) => {
            this.setState({
                goods: res.data.list[0].content
            })
        })
        // 请轮播
        reqBanner().then(res=>{
            if(res.data.code===200){
                this.setState({
                    banner:res.data.list
                })
            }
        })
    }
    render() {
        let {goods,banner}=this.state
        return (
            <div>
                {/* 头部信息 */}
                <Info></Info>

                {/* 轮播图 */}
                {/* 传给banner模块 */}
                <Banner banner={banner}></Banner>

                {/* 导航 */}
                <Nav></Nav>

                {/* 列表 */}
                {/* 把请求回来的数据传递给列表页 */}
                <List goods={goods}></List>
            </div>
        )
    }
}
