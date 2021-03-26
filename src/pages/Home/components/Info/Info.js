import React from 'react'
import './Info.styl'
// 引入图片
import logo from '../../../../assets/img/logo.jpg'
export default function Info() {
    return (
        <div className='Info'>
            <img src={logo} alt=""/>
            <input type="text" placeholder='选择商品'/>
        </div>
    )
}
