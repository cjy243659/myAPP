import React, { Component } from 'react'
import Header from '../../components/Header/Header'
// 引入请求
import { reqShopList, reqShopDel, reqShopEdit } from '../../utils/http'
// 引入样式
import './Shop.styl'
import '../Index/Index.styl'
import '../Detail/Detail.styl'
// 引入图片
// 全选
import radio_nor from "../../assets/img/radio_nor.png"
import radio_hig from "../../assets/img/radio_hig.png"
// 编辑
import editor_hig from "../../assets/img/editor_hig.png"
import editor_nor from "../../assets/img/editor_nor.png"
import store from "../../assets/img/store.png"

// 引入弹窗
import { confirmAlert, successAlert } from '../../utils/alter'
// 引入过滤器
import {filterPrice} from '../../filters/index'
export default class Shop extends Component {
    constructor() {
        super()
        this.state = {
            // 购物车列表
            shopList: [],
            // 全选状态
            isAll: false,
            //编辑状态
            isEdit: false,
        }
    }
    // 请求shopList数据
    init() {
        reqShopList(JSON.parse(sessionStorage.getItem("userInfo")).uid).then(res => {
            if (res.data.code === 200) {
                // 如果数据为空的话就展示空数组，如果有数据就展示
                let list = res.data.list ? res.data.list : []
                // 添加选中状态
                list.forEach(item => {
                    item.checked = false
                })
                // 传递给shopList
                this.setState({
                    shopList: list
                })
            }
        })
    }
    // 一进来页面就请求数据
    componentDidMount() {
        this.init()
    }
    // 点击全选按钮，所有的都勾选
    checkedAll() {
        this.setState({
            // 把全选状态改为自己原来状态的反状态
            isAll: !this.state.isAll,
            // 把shopList数据里面的状态都同步改变，重新遍历渲染到页面
            shopList: this.state.shopList.map((item) => {
                item.checked = !this.state.isAll
                return item
            })
        })
    }
    //只要有一条数据没有选中，全选按钮就不选
    checkOne(index) {
        // 取出来
        let { shopList } = this.state;
        // 改变状态
        shopList[index].checked = !shopList[index].checked;
        // 改变shopList
        this.setState({
            shopList: shopList,
            //全选：如果list的每条数据的checked都是true,那么isAll 就是true;否则就是false
            isAll: shopList.every(item => item.checked)
        })
    }
    // 点击编辑
    checkedEdit() {
        this.setState({
            isEdit: !this.state.isEdit
        })
    }
    // 点击删除
    del(id) {
        console.log(id)
        confirmAlert(() => {
            console.log(111111)
            // 发送请求
            reqShopDel(id).then(res => {
                if (res.data.code === 200) {
                    this.init()
                }
            })
        })
    }
    //购物车+ 
    add(id) {
        // 发送请求
        reqShopEdit({
            id: id,
            // 类型，必填项    1-数量自减  2-数量自增
            type: 2
        }).then(res => {
            if (res.data.code === 200) {
                this.init()
            }
        })
    }
    //购物车 - 
    sub(id, num) {
        if (num <= 1) {
            successAlert("最少一件哦！")
            return;
        }
        reqShopEdit({
            id: id,
            type: 1
            // 如果请求增加成功就刷新列表
        }).then(res => {
            if (res.data.code === 200) {
                this.init()
            }
        })
    }
    render() {
        let { shopList, isAll, isEdit } = this.state
        //计算总价
        let sum = 0;
        shopList.forEach(item => {
            if (item.checked) {
                sum += item.price * item.num
            }
        })

        return (
            <div className='bigShop'>
                <Header title='购物车'></Header>
                {
                    shopList.map((item, index) => {
                        return (
                            <div key={item.id} className='shop'>
                                <div className='shop-header'>
                                    <img src={store} alt="" />
                                    <span>店铺名称</span>
                                </div>
                                {/* 如果不是编辑状态为true的话，显示删除按钮，否则保持原有样式 */}
                                <div className={isEdit ? ' main shop-show-del' : 'main'}>
                                    {/* 选中状态图片 */}
                                    <img src={item.checked ? radio_hig : radio_nor}
                                        onClick={() => this.checkOne(index)}
                                        className='check_img' alt="" />
                                    {/* <img src={radio_hig}  className='check_img' alt=""/> */}

                                    {/* 商品图片 */}
                                    <img src={item.img} className='goods_img' alt="" />

                                    {/* 商品描述：名称、加减、总价 */}
                                    <div className='main-goods'>
                                        <p className='title'>{item.goodsname}</p>
                                        <div className='main-num'>
                                            <span onClick={() => this.sub(item.id, item.num)}>-</span>
                                            <span>{item.num}</span>
                                            <span onClick={() => this.add(item.id)}>+</span>
                                        </div>
                                        <p className='total-price'>总价：<span>&yen;</span>{filterPrice(item.price * item.num)}</p>
                                    </div>

                                    {/* 价格 */}
                                    <div className='main-price'><span>&yen;</span>{filterPrice(item.price)}</div>

                                    {/* 删除 */}
                                    <div className={isEdit ? 'shop-show-del2 main-del' : 'main-del'} onClick={() => this.del(item.id)}>删除</div>

                                </div>
                            </div>
                        )
                    })
                }

                {/* 底部全选 编辑 */}
                <div className="footer">
                    <div className="quanxuan" onClick={() => this.checkedAll()}>
                        {/* 13.使用isAll */}
                        <img src={isAll ? radio_hig : radio_nor} alt="" />
                        <div>全选</div>
                    </div>
                    <div className="edit">
                        <img src={isEdit ? editor_hig : editor_nor} alt="" onClick={() => this.checkedEdit()} />
                        <div>编辑</div>
                    </div>
                    {/* 合计 */}
                    <div className='heji'>
                        <p className='heji-price'>合计：<span>{filterPrice(sum)}</span></p>
                        <p className='text'>(不含运费)</p>
                    </div>
                    {/* 去结算按钮，引入的是detail的样式 */}
                    <p className='addShop'>去结算</p>

                </div>
            </div>
        )
    }
}
