import React from 'react'
import './Nav.styl'
import img from '../../../../assets/img/1.jpg'
export default function Nav() {
    return (
        <div className='box'>
            <ul className='nav-ul'>
                <li className='li'>
                    <img src={img} alt="" className
                        ='img' />
                    <p>限时抢购</p>
                </li>
                <li className='li'>
                    <img src={img} alt="" className
                        ='img' />
                    <p>积分商城</p>
                </li>
                <li className='li'>
                    <img src={img} alt="" className
                        ='img' />
                    <p>联系我们</p>
                </li>
                <li className='li'>
                    <img src={img} alt="" className
                        ='img' />
                    <p>商品分类</p>
                </li>
            </ul>
        </div>
    )
}
