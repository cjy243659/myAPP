import React, { Component } from "react"
function asyncCom(fn) {
    
    class MyComponent extends Component{
        constructor(){
            super()
            this.state={
                C:null
            }
        }
        componentDidMount(){
            fn().then(res=>{
                this.setState({
                    C:res.default
                })
            })
        }
        render(){
            let {C}=this.state
            return (
                <div>
                    {C?<C {...this.props}></C>:null}
                </div>
            )
        }
    }
    return MyComponent
}

export default asyncCom