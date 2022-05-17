import {useParams} from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Message from '../components/Message'
import { Badge, Row, Col, Image, Button, Form } from 'react-bootstrap'
import store from '../store'
import "quill/dist/quill.snow.css"
import { useRef } from 'react'
import AnswerItem from '../components/AnswerItem'
export default function Question(){
    // 气泡的动画控制
    const [showMsg,setShowMsg] = useState(false)
    const [msg,setMsg] = useState()
    const handleMsg = (type,content)=>{
        setMsg({type,content})
        setShowMsg(true)
        setTimeout(()=>{
            setShowMsg(false)
        },2000)
    }
    
    const [question, setQuestion] = useState(null)
    const [additionalInfo,setAdditionalInfo] = useState(null)
    const [answers,setAnswers] = useState(null)
    const answerInputRef = useRef();
    const {id} = useParams()
    // 请求文章附加信息
    const getAdditionalInfo = async(id)=>{
        await axios.get('/api/questionAdditionalInfo/'+id,{
            headers:{
                token:store.getState().token
            }
        }).then(res=>res.data).then(data=>{
            if(data.code === 200){
                setAdditionalInfo(data.data)
            }else{
                handleMsg('danger',data.message)
            }
        })
    }
    // 处理关注
    const handleFollow = async()=>{
        await axios.post('/api/followAuthor/'+question.publisher.id,{},{
            headers:{
                token:store.getState().token
            }
        }).then(res=>res.data).then(data=>{
            if(data.code === 200){
                getAdditionalInfo(question.id)
            }else{
                handleMsg('danger',data.message)
            }
        })
    }
    const handleCancelFollow = async()=>{
        await axios.delete('/api/followAuthor/'+question.publisher.id,{
            headers:{
                token:store.getState().token
            }
        }).then(res=>res.data).then(data=>{
            if(data.code === 200){
                getAdditionalInfo(question.id)
            }else{
                handleMsg('danger',data.message)
            }
        })
    }
    // 处理回答
    const getAnswers = async(id)=>{
        await axios.get("/api/answers/"+id,{
            headers:{
                token:store.getState().token
            }
        }).then(res=>res.data).then(data=>{
            if(data.code === 200){
                setAnswers(data.data)
            }else{
                handleMsg("error",data.message)
            }
        })
    }
    const handleAnswer = async()=>{
        const content = answerInputRef.current.value
        if(content.length === 0){
            handleMsg("error","回答内容不能为空")
            return
        }
        try{
            await axios.post("/api/answer",{
                userId:store.getState().userInfo.id,
                questionId:question.id,
                content
            },{
                headers:{
                    token:store.getState().token
                }
            }).then(res=>res.data).then(data=>{
                if(data.code === 200){
                    getAnswers(question.id)
                    answerInputRef.current.value = ""
                }else{
                    handleMsg("error",data.message)
                }
            })
        }catch(e){
            handleMsg("error","回答失败")
        }
    }
    // 处理采纳
    const handleAccept = async(answerId)=>{
        try{
            await axios.post("/api/acceptAnswer",{
                questionId:question.id,
                answerId:answerId
            },{
                headers:{
                    token:store.getState().token
                }
            }).then(res=>res.data).then(data=>{
                if(data.code === 200){
                    getAnswers(question.id)
                }else{
                    handleMsg("error",data.message)
                }
            })
        }catch(e){
            handleMsg("error","采纳失败")
        }
    }
    const cancelAccept = async(answerId)=>{
        try{
            await axios.delete("/api/acceptAnswer",{
                data:{
                    questionId:question.id,
                    answerId:answerId
                },
                headers:{
                    token:store.getState().token
                }
            }).then(res=>res.data).then(data=>{
                if(data.code === 200){
                    getAnswers(question.id)
                }else{
                    handleMsg("error",data.message)
                }
            })
        }catch(e){
            handleMsg("error","取消采纳失败")
        }
    }
    useEffect(()=>{
        axios.get("/api/question/"+id,{
            headers:{
                token:store.getState().token
            }
        }).then(res=>res.data).then(data=>{
            if(data.code === 200){
                data.data.tags = JSON.parse(data.data.tags)
                data.data.postTime = new Date(data.data.postTime)
                setQuestion(data.data)
                getAdditionalInfo(data.data.id)
            }else{
                handleMsg("error",data.message)
            }
        }).catch(()=>{
            handleMsg("error","获取文章失败")
        })
        getAnswers(id)
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return(
        <>
            {showMsg && <Message msg={msg}/>}
            {question && <Row>
                <Col md={{span:9}}>
                    <div className="bg-white rounded p-3 pt-4">
                        <style>
                            {`img{max-width:100%;}`}
                        </style>
                        <h1 className='text-center'>{question.headline}</h1>
                        <div className='text-center border-bottom py-2'>
                            <span>标签：{question.tags.map((tag,index)=><Badge className='mx-1' key={index}>{tag}</Badge>)}</span>
                            <span className='mx-2'>发布时间：{question.postTime.toLocaleString()}</span>
                            <span className='mx-2'>浏览量：{question.views}</span>
                        </div>
                        <div className='ql-editor'>
                            <div className='p-4 border-bottom' dangerouslySetInnerHTML={{__html:question.content}}/>
                        </div>
                        <div className='p-4 d-flex justify-content-end'>
                            <Button onClick={()=>answerInputRef.current.focus()}><i className="bi bi-line"></i><span className="mx-1">回答</span>{answers ? answers.length : 0}</Button>
                        </div>
                    </div>
                    <div className='bg-white rounded p-4 pt-5 mt-2'>
                        <Row className="mb-2">
                            <Col xs={{span:1}}>
                                <Image roundedCircle={true} src={"/img/"+store.getState().userInfo.photo} />
                            </Col>
                            <Col>
                                <Form.Control placeholder='分享你的答案...' ref={answerInputRef}/>
                                <div className='text-end mt-2'>
                                    <Button onClick={handleAnswer}>发表</Button>
                                </div>
                            </Col>
                        </Row>
                        { answers && answers.map((answer,key)=><AnswerItem isHost={store.getState().userInfo.id === question.publisher.id} answer={answer} key={key} handleAccept={handleAccept} cancelAccept={cancelAccept} />)}
                    </div>
                </Col>
                <Col md={{span:3}}>
                    <style>
                        {`
                            .user-info{
                                position: sticky;
                                top:5em;
                            }
                        `}
                    </style>
                    <div className='bg-white rounded pt-4 pb-4 text-center user-info'>
                        <Image className='mx-auto d-block' style={{width:"50%"}} roundedCircle={true} src={"/img/"+question.publisher.photo} />
                        <h5 className='my-3'>{question.publisher.nickname || question.publisher.username}</h5>
                        {additionalInfo && <p>
                            <span>提问:{additionalInfo.questions}</span>
                            <span className="mx-2">回答:{additionalInfo.answers}</span>
                            <span>粉丝:{additionalInfo.followers}</span>
                        </p>}
                        {store.getState().userInfo.id !== question.publisher.id && (additionalInfo ?  additionalInfo.followed ? <Button variant='success' onClick={handleCancelFollow}>已关注</Button>
                        : <Button onClick={handleFollow}>关注</Button> 
                        : <Button>关注</Button>)}
                    </div>
                </Col>  
            </Row>}
            <style>
                {`
                    .back-top{
                        position:fixed;
                        bottom:20px;
                        right:20px;
                    }
                `}
            </style>
            <div className='back-top'>
                <Button variant='outline-primary' size='lg' onClick={()=>window.scrollTo(0,0)}><i className="bi bi-arrow-up-circle"></i></Button>
            </div>
        </>
    )
}