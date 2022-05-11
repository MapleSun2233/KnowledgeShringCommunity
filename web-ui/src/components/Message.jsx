/**
 * 对气泡消息的自定义组件
 */

import { useState, useEffect } from "react";

export default function Message(props){
    let bgColor = "";
    switch(props.msg.type){
        case "success":
            bgColor="#67C23A";
            break;
        case "error":
            bgColor="#F56C6C";
            break;
        case "warning":
            bgColor="#E6A23C";
            break;
        default:
    }
    const [opacity,setOpacity] = useState(1);
    const msgStyle = {
        backgroundColor:bgColor,
        position:"fixed",
        top:"10vh",
        left:"50%",
        transform:"translateX(-50%)",
        padding:"0.5em 1em",
        borderRadius:"0.5em",
        color:"#fff",
        transition: "all 0.5s",
        zIndex:"1100"
    }
    useEffect(()=>{
        setTimeout(()=>{
            setOpacity(0);
            },1000)
    },[])
    return(    
        <div style={{...msgStyle,opacity:opacity}}>
            {props.msg.content}
        </div>
    )
}