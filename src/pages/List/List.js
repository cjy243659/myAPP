import React, { Component } from 'react'
//引入头部
import Header from '../../components/Header/Header'

// 引入请求
import { reqCateList } from '../../utils/http'


// 引入home下的list模块组件
import List from "../Home/components/List/List"
export default class list extends Component {
    constructor() {
        super()
        this.state = {
            list: []
        }
    }
    // 一进来就发请求
    componentDidMount() {
        // 发送请求商品列表的请求
        console.log(this.props)//this.props.match.params.id就是传过来的参数id
        reqCateList(this.props.match.params.id).then(res => {
            if (res.data.code === 200) {
                this.setState({
                    list: res.data.list
                })
            }
        })
    }
    render() {
        return (
            <div className="list">
                {/* this.props.match.params.name就是参数中带过来的name */}
                <Header back title={this.props.match.params.name}></Header>
                {this.state.list ? <List goods={this.state.list}></List> : '暂无商品，敬请期待哦！'}
            </div>
        )
    }
}
