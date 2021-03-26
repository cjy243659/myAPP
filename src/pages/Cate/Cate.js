import React, { Component } from 'react'
// 引入请求
import { reqHomeCate } from '../../utils/http'
// 引入头部
import Header from '../../components/Header/Header'
// 引入样式
import './Cate.styl'

export default class Cate extends Component {
    // 初始化数据
    constructor() {
        super()
        this.state = {
            // 分类列表
            catelist: [],
            // 用来辨别所点元素的下标，实现动态类名
            n: 0
        }
    }
    // 一进来就请求
    componentDidMount() {
        // 请求分类
        reqHomeCate().then(res => {
            if (res.data.code === 200) {
                this.setState({
                    catelist: res.data.list
                })
            }
        })
    }
    // 随着下标的改变 改变n的值--动态样式
    changeActive(index) {
        this.setState({
            n: index
        })
    }

    // 点击每一个分类，都跳转到对应的列表
    toLick(name, id) {  
        //this.props.history里面包含了push/replace/go/goback等路由导航
        // console.log(this.props)
        this.props.history.push('/list/' + name + '/' + id)
    }
    render() {
        let { catelist, n } = this.state
        console.log(catelist)
        // 右边展示的商品就是左边分类名称中的children
        // 因为axios是异步的，如果数据没有请求回来就是[],如果数据回来了就展示
        let rightList = catelist[n] ? catelist[n].children : []
        console.log(rightList,'888')
        return (
            <div>
                <Header title='分类'></Header>

                <div className='cate'>
                    {/* 左边导航 */}
                    <div className='left'>
                        <ul className='list-ul'>
                            {
                                catelist.map((item, index) => {
                                    return <li key={item.id} className={index === n ? 'active' : ''} onClick={() => this.changeActive(index)}>{item.catename}</li>
                                })
                            }
                        </ul>
                    </div>

                    {/* 右边商品展示 */}
                    <div className='right'>
                        {/* 点击不同的分类名称，展示相对应不同的商品列表 */}
                        {
                            rightList.map((item) => {
                                return (
                                    <div key={item.id} className='item' onClick={() => this.toLick(item.catename, item.id)}>
                                        <div>
                                            <img src={item.img} alt="" />
                                            <p>{item.catename}</p>
                                        </div>
                                    </div>
                                )
                            })
                        } 
                    </div>
                </div>

            </div>
        )
    }
}
