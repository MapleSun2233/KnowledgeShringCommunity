import { useState } from "react"
import axios from 'axios'
import { Button, Table, Image} from 'react-bootstrap'
import { useEffect } from "react";
import empty from '../asset/img/empty.png'
import store from "../store";
export default function MyTarget(props){
    const [targetList,setTargetList] = useState(null);
    const getTargetList = async() => {
        try{
            await axios.get("/api/targetList",{
                headers:{
                    token:store.getState().token
                }
            }).then(res => res.data).then(data => {
                if(data.code === 200){
                    if(data.data.length > 0)
                        setTargetList(data.data);
                    else
                        setTargetList(null);
                }else{
                    props.handleMsg("error",data.msg);
                }
            })
        }catch(e){
            props.handleMsg("error","获取关注列表失败");
        }
    }
    useEffect(()=>{
        getTargetList()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const cancelTarget = async(id) => {
        try{
            await axios.delete("/api/followAuthor/"+id,{
                headers:{
                    token:store.getState().token
                }
            }).then(res => res.data).then(data => {
                if(data.code === 200){
                    props.handleMsg("success","取消成功");
                    getTargetList();
                }else{
                    props.handleMsg("error",data.message);
                }
            })
        }catch(e){
            props.handleMsg("error","取消失败");
        }
    }
    return (
        <>
            <h3>我的关注</h3>
            {targetList ? <Table responsive hover bordered className="text-center align-middle">
                <thead>
                    <tr>
                        <th></th>
                        <th>昵称</th>
                        <th>发表文章</th>
                        <th>粉丝</th>
                        <th>贡献值</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {targetList.map((item,index) => <tr key={index}>
                        <th><Image rounded style={{maxWidth:"5em"}} src={"/img/"+item.photo} fluid /></th>
                        <th>{item.nickname || item.username}</th>
                        <th>{item.articles}</th>
                        <th>{item.followers}</th>
                        <th>{item.contribution}</th>
                        <th>
                            <Button variant="danger" className="mx-2" onClick={()=>cancelTarget(item.userId)}>取消关注</Button>
                        </th>
                    </tr>)}
                </tbody>
            </Table> 
            : <Image src={empty} fluid />}
        </>
    )
}