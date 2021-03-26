import React from 'react'

import "./List.styl"
import { Link } from "react-router-dom"
// 引入过滤器
import {filterPrice} from '../../../../filters/index'

// 函数定义组件接收父组件传过来的值在形参中
export default function List(props) {
    let { goods } = props;
    return (
        <div className="list">
            {
                goods.map(item => {
                    return (
                        // search传参
                        <Link  to={'/detail?id='+item.id} key={item.id} className='list-item'>
                            <img src={item.img} className='list-img' alt="" />
                            <div className='listitem-right'>
                                <p className='list-name'>{item.goodsname}</p>
                                <p className='item-price'><span>&yen;</span>{filterPrice(item.price)}</p>
                                <div className='list-btn'>立即抢购</div>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}
