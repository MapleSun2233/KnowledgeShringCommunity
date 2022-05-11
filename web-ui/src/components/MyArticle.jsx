import { useState } from "react"
import axios from 'axios'
import { Button, Table, Image} from 'react-bootstrap'
import { useEffect } from "react";
import empty from '../asset/img/empty.png'
import store from "../store";
export default function MyArticle(props){
    const [articleList,setArticleList] = useState(null);
    const getArticleList = async() => {
        try{
            await axios.get("/api/myArticleList",{
                headers:{
                    token:store.getState().token
                }
            }).then(res => res.data).then(data => {
                if(data.code === 200){
                    if(data.data.length > 0)
                        setArticleList(data.data);
                    else
                        setArticleList(null);
                }else{
                    props.handleMsg("error",data.msg);
                }
            })
        }catch(e){
            props.handleMsg("error","获取文章列表失败");
        }
    }
    useEffect(()=>{
        getArticleList()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const deleteArticle = async(id) => {
        try{
            await axios.delete("/api/article/"+id,{
                headers:{
                    token:store.getState().token
                }
            }).then(res => res.data).then(data => {
                if(data.code === 200){
                    props.handleMsg("success","删除成功");
                    getArticleList();
                }else{
                    props.handleMsg("error",data.message);
                }
            })
        }catch(e){
            props.handleMsg("error","删除失败");
        }
    }
    return (
        <>
            <h3>我的文章</h3>
            {articleList ? <Table responsive hover bordered className="text-center align-middle">
                <thead>
                    <tr>
                        <th>标题</th>
                        <th>点赞</th>
                        <th>收藏</th>
                        <th>评论数</th>
                        <th>访问量</th>
                        <th>发布时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {articleList.map((item,index) => <tr key={index}>
                        <td>{item.headline}</td>
                        <td>{item.thumbs}</td>
                        <td>{item.collections}</td>
                        <td>{item.comments}</td>
                        <td>{item.views}</td>
                        <td>{new Date(item.postTime).toLocaleString()}</td>
                        <td>
                            <Button variant="info" href={"/article/"+item.articleId}>查阅</Button>
                            <Button variant="danger" className="mx-2" onClick={()=>deleteArticle(item.articleId)}>删除</Button>
                        </td>
                    </tr>)}
                </tbody>
            </Table> : <Image src={empty} fluid />}
        </>
    )
}