import React from 'react'
import "./Banner.styl"
import { Carousel } from "antd-mobile"
export default function Banner(props) {
    let { banner } = props
    return (
        <div className="banner">
            <Carousel
                //自动播放
                autoplay={true}
                infinite//无限次
            >
                {/* 循环遍历banner */}
                {banner.map(item => (
                    <a
                        key={item.id}
                        style={{ display: 'inline-block', width: '100%', height: '100%' }}
                    >
                        <img
                            src={item.img}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                            }}
                        />
                    </a>
                ))}
            </Carousel>
        </div>
    )
}
