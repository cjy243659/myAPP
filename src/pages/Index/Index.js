import React, { Component } from 'react'
// 引入路由出口、路由规则、重定向组件
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import './Index.styl'
// 引入子组件
import Home from '../../pages/Home/Home'
import Cate from '../../pages/Cate/Cate'
import Shop from '../../pages/Shop/Shop'
import Mine from '../../pages/Mine/Mine'
// 引入图片
import home_hig from '../../assets/img/tab_home_hig.png'
import home_nor from '../../assets/img/tab_home_nor.png'
import shopping_hig from '../../assets/img/tab_shopping_hig.png'
import shopping_nor from '../../assets/img/tab_shopping_nor.png'
import menu_hig from '../../assets/img/tab_menu_hig.png'
import menu_nor from '../../assets/img/tab_menu_nor.png'
import me_hig from '../../assets/img/tab_me_hig.png'
import me_nor from '../../assets/img/tab_me_nor.png'
export default class index extends Component {
    constructor() {
        super()
        this.state = {
            navs: [
                {
                    text: "首页",
                    selectImg: home_hig,
                    no_img: home_nor,
                    path: "/index/home"
                },
                {
                    text: "分类",
                    selectImg: menu_hig,
                    no_img: menu_nor,
                    path: "/index/cate"
                },
                {
                    text: "购物车",
                    selectImg: shopping_hig,
                    no_img: shopping_nor,
                    path: "/index/shop"
                },
                {
                    text: "我的",
                    selectImg: me_hig,
                    no_img: me_nor,
                    path: "/index/mine"
                }
            ]
        }
    }
    render() {
        return (
            <div className='fater'>
                {/* 二级路由出口 */}
                <Switch>
                    {/* 二级路由规则 */}
                    <Route path='/index/home' component={Home}></Route>
                    <Route path='/index/cate' component={Cate}></Route>
                    <Route path='/index/shop' component={Shop}></Route>
                    <Route path='/index/mine' component={Mine}></Route>
                    <Redirect to='/index/home'></Redirect>
                </Switch>

                {/* 底部导航 */}
                <footer className='navFooter'>
                    {/* 
                        NavLink 有activeClassName属性 Link没有
                    */}
                    {/* <NavLink to='/index/home' activeClassName='navFooter-style'>首页</NavLink>
                    <NavLink to='/index/cate' activeClassName='navFooter-style'>分类</NavLink>
                    <NavLink to='/index/shop' activeClassName='navFooter-style'>购物车</NavLink>
                    <NavLink to='/index/mine' activeClassName='navFooter-style'>我的</NavLink> */}

                    {
                        this.state.navs.map(item => {
                            return (
                                <NavLink key={item.path} to={item.path} activeClassName='navFooter-style'>
                                    <img src={this.props.location.pathname === item.path ? item.selectImg : item.no_img} alt="" />
                                    {/* <p>{item.text}</p> */}
                                    {item.text}
                                </NavLink>
                            )
                        })
                    }
                </footer>
            </div>
        )
    }
}
