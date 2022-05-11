import {useParams} from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Message from '../components/Message'
import { Badge, Row, Col, Image, Button, Form } from 'react-bootstrap'
import store from '../store'
import "quill/dist/quill.snow.css"
import { useRef } from 'react'
import AnswerItem from '../components/AnswerItem'
export default function Article(){
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
    
    const [article, setArticle] = useState(null)
    const [additionalInfo,setAdditionalInfo] = useState(null)
    const [comments,setComments] = useState(null)
    const commentInputRef = useRef();
    const {id} = useParams()
    // 请求文章附加信息
    const getAdditionalInfo = async(id)=>{
        await axios.get('/api/articleAdditionalInfo/'+id,{
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
    // 处理点赞
    const handleThumb = async()=>{
        await axios.post('/api/thumbArticle/'+article.id,{},{
            headers:{
                token:store.getState().token
            }
        }).then(res=>res.data).then(data=>{
            if(data.code === 200){
                getAdditionalInfo(article.id)
            }else{
                handleMsg('danger',data.message)
            }
        })
    }
    const handleCancelThumb = async()=>{
        await axios.delete('/api/thumbArticle/'+article.id,{
            headers:{
                token:store.getState().token
            }
        }).then(res=>res.data).then(data=>{
            if(data.code === 200){
                getAdditionalInfo(article.id)
            }else{
                handleMsg('danger',data.message)
            }
        })
    }
    // 处理收藏
    const handleCollect = async()=>{
        await axios.post('/api/collectArticle/'+article.id,{},{
            headers:{
                token:store.getState().token
            }
        }).then(res=>res.data).then(data=>{
            if(data.code === 200){
                getAdditionalInfo(article.id)
            }else{
                handleMsg('danger',data.message)
            }
        })
    }
    const handleCancelCollect = async()=>{
        await axios.delete('/api/collectArticle/'+article.id,{
            headers:{
                token:store.getState().token
            }
        }).then(res=>res.data).then(data=>{
            if(data.code === 200){
                getAdditionalInfo(article.id)
            }else{
                handleMsg('danger',data.message)
            }
        })
    }
    // 处理关注
    const handleFollow = async()=>{
        await axios.post('/api/followAuthor/'+article.publisher.id,{},{
            headers:{
                token:store.getState().token
            }
        }).then(res=>res.data).then(data=>{
            if(data.code === 200){
                getAdditionalInfo(article.id)
            }else{
                handleMsg('danger',data.message)
            }
        })
    }
    const handleCancelFollow = async()=>{
        await axios.delete('/api/followAuthor/'+article.publisher.id,{
            headers:{
                token:store.getState().token
            }
        }).then(res=>res.data).then(data=>{
            if(data.code === 200){
                getAdditionalInfo(article.id)
            }else{
                handleMsg('danger',data.message)
            }
        })
    }
    // 处理评论
    const getComments = async(id)=>{
        await axios.get("/api/comments/"+id,{
            headers:{
                token:store.getState().token
            }
        }).then(res=>res.data).then(data=>{
            if(data.code === 200){
                setComments(data.data)
            }else{
                handleMsg("error",data.message)
            }
        })
    }
    const handleComment = async()=>{
        const content = commentInputRef.current.value
        if(content.length === 0){
            handleMsg("error","评论内容不能为空")
            return
        }
        try{
            await axios.post("/api/comment",{
                userId:store.getState().userInfo.id,
                articleId:article.id,
                content
            },{
                headers:{
                    token:store.getState().token
                }
            }).then(res=>res.data).then(data=>{
                if(data.code === 200){
                    getComments(article.id)
                    commentInputRef.current.value = ""
                }else{
                    handleMsg("error",data.message)
                }
            })
        }catch(e){
            handleMsg("error","评论失败")
        }
    }
    useEffect(()=>{
        axios.get("/api/article/"+id,{
            headers:{
                token:store.getState().token
            }
        }).then(res=>res.data).then(data=>{
            if(data.code === 200){
                data.data.tags = JSON.parse(data.data.tags)
                data.data.postTime = new Date(data.data.postTime)
                setArticle(data.data)
                getAdditionalInfo(data.data.id)
            }else{
                handleMsg("error",data.message)
            }
        }).catch(()=>{
            handleMsg("error","获取文章失败")
        })
        getComments(id)
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return(
        <>
            {showMsg && <Message msg={msg}/>}
            {article && <Row>
                <Col md={{span:9}}>
                    <div className="bg-white rounded p-3 pt-4">
                        <style>
                            {`img{max-width:100%;}`}
                        </style>
                        <h1 className='text-center'>{article.headline}</h1>
                        <div className='text-center border-bottom py-2'>
                            <span>标签：{article.tags.map((tag,index)=><Badge className='mx-1' key={index}>{tag}</Badge>)}</span>
                            <span className='mx-2'>发布时间：{article.postTime.toLocaleString()}</span>
                            <span className='mx-2'>浏览量：{article.views}</span>
                        </div>
                        <div className='ql-editor'>
                            <div className='p-4 border-bottom' dangerouslySetInnerHTML={{__html:article.content}}/>
                        </div>
                        {additionalInfo ? <div className='p-4 d-flex justify-content-end'>
                            {additionalInfo.thumbed ? <Button variant='success' onClick={handleCancelThumb}><i className="bi bi-hand-thumbs-up-fill"></i><span className="mx-1">已赞</span>{additionalInfo.thumbs}</Button>
                            : <Button onClick={handleThumb}><i className="bi bi-hand-thumbs-up"></i><span className="mx-1">点赞</span>{additionalInfo.thumbs}</Button>}
                            {additionalInfo.collected ? <Button className='mx-2' variant='success' onClick={handleCancelCollect}><i className="bi bi-star"></i><span className="mx-1">已收藏</span>{additionalInfo.collections}</Button>
                            : <Button className='mx-2' onClick={handleCollect}><i className="bi bi-star"></i><span className="mx-1">收藏</span>{additionalInfo.collections}</Button>}
                            <Button onClick={()=>commentInputRef.current.focus()}><i className="bi bi-line"></i><span className="mx-1">评论</span>{comments ? comments.length : 0}</Button>
                        </div> : <div className='p-4 d-flex justify-content-end'>
                            <Button><i className="bi bi-hand-thumbs-up"></i><span className="mx-1">点赞</span>0</Button>
                            <Button className='mx-2'><i className="bi bi-star"></i><span className="mx-1">收藏</span></Button>
                            <Button onClick={()=>commentInputRef.current.focus()}><i className="bi bi-line"></i><span className="mx-1">评论</span>{comments ? comments.length : 0}</Button>
                        </div>}
                    </div>
                    <div className='bg-white rounded p-4 pt-5 mt-2'>
                        <Row className="mb-2">
                            <Col xs={{span:1}}>
                                <Image roundedCircle={true} src={"/img/"+store.getState().userInfo.photo} />
                            </Col>
                            <Col>
                                <Form.Control placeholder='分享你的想法...' ref={commentInputRef}/>
                                <div className='text-end mt-2'>
                                    <Button onClick={handleComment}>发表</Button>
                                </div>
                            </Col>
                        </Row>
                        { comments && comments.map((comment,key)=><AnswerItem answer={comment} key={key} />)}
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
                        <Image className='mx-auto d-block' style={{width:"50%"}} roundedCircle={true} src={"/img/"+article.publisher.photo} />
                        <h5 className='my-3'>{article.publisher.nickname || article.publisher.username}</h5>
                        <p><span>贡献值:{article.publisher.contribution}</span><span className="mx-2">粉丝:{additionalInfo ? additionalInfo.followers : 0}</span></p>
                        {store.getState().userInfo.id !== article.publisher.id && (additionalInfo ?  additionalInfo.followed ? <Button variant='success' onClick={handleCancelFollow}>已关注</Button>
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