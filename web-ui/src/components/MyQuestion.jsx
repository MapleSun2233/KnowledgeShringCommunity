import { useState } from "react"
import axios from 'axios'
import { Button, Table, Image} from 'react-bootstrap'
import { useEffect } from "react";
import empty from '../asset/img/empty.png'
import store from "../store";
export default function MyQuestion(props){
    const [questionList,setQuestionList] = useState(null);
    const getQuestionList = async() => {
        try{
            await axios.get("/api/myQuestionList",{
                headers:{
                    token:store.getState().token
                }
            }).then(res => res.data).then(data => {
                if(data.code === 200){
                    if(data.data.length > 0)
                        setQuestionList(data.data);
                    else
                        setQuestionList(null);
                }else{
                    props.handleMsg("error",data.msg);
                }
            })
        }catch(e){
            props.handleMsg("error","获取文章列表失败");
        }
    }
    useEffect(()=>{
        getQuestionList()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const deleteQuestion = async(id) => {
        try{
            await axios.delete("/api/question/"+id,{
                headers:{
                    token:store.getState().token
                }
            }).then(res => res.data).then(data => {
                if(data.code === 200){
                    props.handleMsg("success","删除成功");
                    getQuestionList();
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
            <h3>我的提问</h3>
            {questionList ? <Table responsive hover bordered className="text-center align-middle">
                <thead>
                    <tr>
                        <th>标题</th>
                        <th>获得回答</th>
                        <th>访问量</th>
                        <th>发布时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {questionList.map((item,index) => <tr key={index}>
                        <td>{item.headline}</td>
                        <td>{item.answers}</td>
                        <td>{item.views}</td>
                        <td>{new Date(item.postTime).toLocaleString()}</td>
                        <td>
                            <Button variant="info" href={"/question/"+item.questionId}>查阅</Button>
                            <Button variant="danger" className="mx-2" onClick={()=>deleteQuestion(item.questionId)}>删除</Button>
                        </td>
                    </tr>)}
                </tbody>
            </Table> : <Image src={empty} fluid />}
        </>
    )
}