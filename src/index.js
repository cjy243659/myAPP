import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// 引入路由模块  BrowserRouter--history HashRouter---hash模式
import { BrowserRouter } from 'react-router-dom'

// 引入重置样式
import './assets/css/reset.css'
import './assets/js/rem'
import 'antd-mobile/dist/antd-mobile.css'; 
// 引入公共组件
// import './components'
// 过滤器
// import './filters'
//工具
// import './utils'
// UI框架

// stylus


ReactDOM.render(
  // 严格模式
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  
  // 采用history模式
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

