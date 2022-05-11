import { useState } from "react"
import axios from 'axios'
import { Button, Table, Image} from 'react-bootstrap'
import { useEffect } from "react";
import empty from '../asset/img/empty.png'
import store from "../store";
export default function MyCollection(props){
    const [articleList,setCollectionList] = useState(null);
    const getCollectionList = async() => {
        try{
            await axios.get("/api/myCollectionList",{
                headers:{
                    token:store.getState().token
                }
            }).then(res => res.data).then(data => {
                if(data.code === 200){
                    if(data.data.length > 0)
                        setCollectionList(data.data);
                    else
                        setCollectionList(null);
                }else{
                    props.handleMsg("error",data.msg);
                }
            })
        }catch(e){
            props.handleMsg("error","获取文章列表失败");
        }
    }
    useEffect(()=>{
        getCollectionList()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const cancelCollection = async(id) => {
        try{
            await axios.delete("/api/collectArticle/"+id,{
                headers:{
                    token:store.getState().token
                }
            }).then(res => res.data).then(data => {
                if(data.code === 200){
                    props.handleMsg("success","取消成功");
                    getCollectionList();
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
            <h3>我的收藏</h3>
            {articleList ? <Table responsive hover bordered className="text-center align-middle">
                <thead>
                    <tr>
                        <th>标题</th>
                        <th>点赞</th>
                        <th>收藏</th>
                        <th>评论数</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {articleList.map((item,index) => <tr key={index}>
                        <td>{item.headline}</td>
                        <td>{item.thumbs}</td>
                        <td>{item.collections}</td>
                        <td>{item.comments}</td>
                        <td>
                            <Button variant="info" href={"/article/"+item.articleId}>查阅</Button>
                            <Button variant="danger" className="mx-2" onClick={()=>cancelCollection(item.articleId)}>取消收藏</Button>
                        </td>
                    </tr>)}
                </tbody>
            </Table> : <Image src={empty} fluid />}
        </>
    )
}