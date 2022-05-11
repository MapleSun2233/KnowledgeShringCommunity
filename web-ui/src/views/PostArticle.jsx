import { useEffect, useState } from "react"
import { useQuill } from "react-quilljs"
import "quill/dist/quill.snow.css"
import {Button, Modal, ListGroup, Form, Row, Col} from "react-bootstrap"
import Message from "../components/Message"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import store from "../store"
export default function PostArticle(){
    const navigate = useNavigate()
    const { quill, quillRef } = useQuill()
    const [headline, setHeadline] = useState("")
    const [tags,setTags] = useState([])
    const [htmlText,setHtmlText] = useState("<div></div>")
    const [showModal, setShowModal] = useState(false)
    const [modelType, setModelType] = useState(false)
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
    // 模态框
    useEffect(()=>{
        setShowModal(true)
    },[])
    // Insert Image(selected by user) to quill
    const insertToEditor = (url) => {
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', "/img/"+url);
    };
    // Upload Image to Image Server
    const saveToServer = async (file) => {
        const body = new FormData();
        body.append('file', file);
        try{
            axios.post("/api/photo",body,{
                headers:{
                    "Content-Type":"multipart/form-data",
                    token:store.getState().token
                }
            }).then(res=>res.data).then(data=>{
                if(data.code===200){
                    insertToEditor(data.message)
                }else{
                    handleMsg("error",data.message)
                }
            })
        }catch(e){
            handleMsg("error","上传出错")
        }
    }   
    // Open Dialog to select Image File
    const selectLocalImage = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/jpeg,image/png,image/gif');
        input.click();

        input.onchange = () => {
        const file = input.files[0];
            saveToServer(file);
        };
    };
    useEffect(() => {
        if(quill){
            quill.on("text-change", () => setHtmlText(quill.root.innerHTML))
            quill.getModule('toolbar').addHandler('image',selectLocalImage)
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
      }, [quill])

    const handlePost = async()=>{
        if(headline.length===0){
            handleMsg("error","请输入标题")
            return
        }
        if(tags.length===0){
            handleMsg("error","至少需要一个标签")
            return
        }
        try{
            await axios.post("/api/article",{
                headline,
                tags:JSON.stringify(tags.split('|')),
                content:htmlText
            },{
                headers:{
                    token:store.getState().token
                }
            }).then(res=>res.data).then(data=>{
                if(data.code===200){
                    navigate("/article/"+data.message)
                }else{
                    handleMsg("error",data.message)
                }
            })
        }catch(e){
            handleMsg("error","发布失败")
        }
    }
    return(
        <>
            <Modal show={showModal && modelType===false} onHide={()=>{
                setShowModal(false)
                setModelType(true)
            }} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>如何写文章</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{textIndent:"2em"}}>原创的文章是自己学习和探索的结果，独立的思考会给他人更大的启发，会引导他人去发现、实现可能更加有趣的事。</p>
                    <p style={{textIndent:"2em"}}>这是你个人的文章，请认真地撰写；你的文章及他人对你文章的认可都会获得相应的贡献值。</p>
                    <Row>
                        <Col md={{span:12}} lg={{span:6}}>
                            <h3 className="text-success">社区欢迎</h3>
                            <ListGroup variant="flush">
                                <ListGroup.Item>具有原创性、对他人有启发的文章</ListGroup.Item>
                                <ListGroup.Item>认真整理的知识分享</ListGroup.Item>
                                <ListGroup.Item>逻辑严谨、排版优雅、阅读舒适</ListGroup.Item>
                            </ListGroup>
                        </Col>    
                        <Col md={{span:12}} lg={{span:6}}>
                            <h3 className="text-danger">社区不欢迎</h3>
                            <ListGroup variant="flush">
                                <ListGroup.Item>没有任何意义、对他人无帮助的内容</ListGroup.Item>
                                <ListGroup.Item>杂乱无序的内容、糟糕的排版</ListGroup.Item>
                                <ListGroup.Item>大而空洞的内容，道理大家都懂</ListGroup.Item>
                                <ListGroup.Item>可能引起他人不适的不文明辞藻</ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={()=>{
                    setShowModal(false)
                    setModelType(true)
                }}>
                    我已知晓
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModal && modelType===true} onHide={()=>setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>发布确认</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>文章标题</Form.Label>
                            <Form.Control type="text" placeholder="请输入文章标题" value={headline} onChange={(e)=>setHeadline(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>内容标签</Form.Label>
                            <Form.Control type="text" placeholder="请输入内容标签" value={tags} onChange={(e)=>setTags(e.target.value)}/>
                            <Form.Text>如有多个内容标签，请使用'|'分隔，例如：历史|拿破仑</Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handlePost}>
                    确认发布
                </Button>
                </Modal.Footer>
            </Modal>
            {showMsg && <Message msg={msg}/>}
            <div className="bg-white p-3 rounded">
                <h2>分享知识</h2>
                <div className="mt-3">
                    <div ref={quillRef} style={{ height: "60vh"}}/>
                </div>
                <div className="d-flex justify-content-end">
                    <Button variant="primary" onClick={()=>{
                        if(htmlText.length < 50)
                            handleMsg("error","文章内容过短")
                        else
                            setShowModal(true)
                    }} className="mt-2">发布</Button>
                </div>
            </div>
        </>
    )
}