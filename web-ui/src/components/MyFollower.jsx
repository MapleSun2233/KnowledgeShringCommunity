import { useState } from "react"
import axios from 'axios'
import { Table, Image} from 'react-bootstrap'
import { useEffect } from "react";
import empty from '../asset/img/empty.png'
import store from "../store";
export default function MyFollower(props){
    const [followerList,setFollowerList] = useState(null);
    const getFollowerList = async() => {
        try{
            await axios.get("/api/followerList",{
                headers:{
                    token:store.getState().token
                }
            }).then(res => res.data).then(data => {
                if(data.code === 200){
                    if(data.data.length > 0)
                        setFollowerList(data.data);
                    else
                        setFollowerList(null);
                }else{
                    props.handleMsg("error",data.msg);
                }
            })
        }catch(e){
            props.handleMsg("error","获取粉丝列表失败");
        }
    }
    useEffect(()=>{
        getFollowerList()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return (
        <>
            <h3>我的关注</h3>
            {followerList ? <Table responsive hover bordered className="text-center align-middle">
                <thead>
                    <tr>
                        <th></th>
                        <th>昵称</th>
                        <th>发表文章</th>
                        <th>粉丝</th>
                        <th>贡献值</th>
                    </tr>
                </thead>
                <tbody>
                    {followerList.map((item,index) => <tr key={index}>
                        <th><Image rounded style={{maxWidth:"5em"}} src={"/img/"+item.photo} fluid /></th>
                        <th>{item.nickname || item.username}</th>
                        <th>{item.articles}</th>
                        <th>{item.followers}</th>
                        <th>{item.contribution}</th>
                    </tr>)}
                </tbody>
            </Table> 
            : <Image src={empty} fluid />}
        </>
    )
}