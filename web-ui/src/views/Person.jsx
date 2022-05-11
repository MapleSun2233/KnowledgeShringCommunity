import { Col, ListGroup, Row, Spinner } from "react-bootstrap";
import {lazy, Suspense, useState} from 'react';
import Message from "../components/Message"
export default function Person(){
    const Personal = lazy(() => import('../components/Personal'))
    const MyArticle = lazy(() => import('../components/MyArticle'))
    const MyQuestioin = lazy(() => import('../components/MyQuestion'))
    const MyCollection = lazy(() => import('../components/MyCollection'))
    const MyTarget = lazy(() => import('../components/MyTarget'))
    const MyFollower = lazy(() => import('../components/MyFollower'))

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
    // 实现动态组件
    const [CurrentComponent, setCurrentComponent] = useState(Personal);
    
    return(
        <>
            {showMsg && <Message msg={msg}/>}
            <Row style={{marginTop:"2em"}}>
                <Col md={{span:3}}>
                    <ListGroup style={{cursor:"pointer",textAlign:"center"}}>
                        <ListGroup.Item onClick={()=>setCurrentComponent(Personal)}>个人资料</ListGroup.Item>
                        <ListGroup.Item onClick={()=>setCurrentComponent(MyArticle)}>我的文章</ListGroup.Item>
                        <ListGroup.Item onClick={()=>setCurrentComponent(MyQuestioin)}>我的提问</ListGroup.Item>
                        <ListGroup.Item onClick={()=>setCurrentComponent(MyCollection)}>我的收藏</ListGroup.Item>
                        <ListGroup.Item onClick={()=>setCurrentComponent(MyTarget)}>我的关注</ListGroup.Item>
                        <ListGroup.Item onClick={()=>setCurrentComponent(MyFollower)}>我的粉丝</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={{span:9}} className="bg-white p-4 rounded">
                    <Suspense fallback={<Spinner animation="border" variant="primary" />}>
                        <CurrentComponent handleMsg={handleMsg} />
                    </Suspense>
                </Col>
            </Row>
        </>
    )
}