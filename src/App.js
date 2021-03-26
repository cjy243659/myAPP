import React, { Component } from 'react'
// react---一切皆组件
// 引入路由出口、路由规则、重定向组件
import { Switch, Route, Redirect } from 'react-router-dom'
// 引入样式
import "./App.styl"
// 引入路由
// import Login from './pages/Login/Login'
// import Register from './pages/Register/Register'
// import List from './pages/List/List'
// import Detail from './pages/Detail/Detail'
// import Index from './pages/Index/Index'

import MyRoute from "./utils/MyRoute"
import asyncCom from './utils/asyncComponent'

let Login = asyncCom(() => import("./pages/Login/Login"))
let Register = asyncCom(() => import("./pages/Register/Register"))
let Detail = asyncCom(() => import("./pages/Detail/Detail"))
let List = asyncCom(() => import("./pages/List/List"))
let Index = asyncCom(() => import("./pages/Index/Index"))

export default class App extends Component {
  render() {
    return (
      // header使用了固定定位，脱离了文档流，所以要让所有的一级路由有个margin或者padding
      <div className='app'>
        {/* 一级路由出口 */}
        <Switch>
          {/* 路由规则在路由出口中配置 */}
          {/* <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/list/:name/:id' component={List}></Route>
          <Route path='/detail' component={Detail}></Route>
          <Route path='/index' component={Index}></Route>
          <Redirect to='/login'></Redirect> */}


          {/* 动态路由 */}
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <MyRoute path="/index" component={Index}></MyRoute>
          <MyRoute path="/detail" component={Detail}></MyRoute>
          <MyRoute path="/list/:name/:id" component={List}></MyRoute>
          <Redirect to="/login"></Redirect>
        </Switch>
      </div>
    )
  }
}