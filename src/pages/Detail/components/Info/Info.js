import React from 'react'
import './Info.styl'
// 引入样式
import '../../../Index/Index.styl'
import { Link } from "react-router-dom"

// 引入过滤器
import {filterPrice} from '../../../../filters/index'
export default function Info(props) {
    let { detail } = props
    return (
        <div className='detail'>
            <div className='detail-left'>
                <ul>
                    <li className='detail-title'>{detail.goodsname}</li>
                    <li className='detail-middle'>
                        <p className='detail-price'><span>&yen;</span>{filterPrice(detail.price)}</p>
                        {detail.isnew === 1 ? <p className='is'>新品</p> : null}
                        {detail.ishot === 1 ? <p className='is'>热卖</p> : null}
                    </li>
                    <del className='del-price'><span>&yen;</span>{filterPrice(detail.market_price)}</del>
                </ul>
            </div>
            <div className='detai-right'>
                <span>收藏</span>
            </div>
        </div>
    )
}
