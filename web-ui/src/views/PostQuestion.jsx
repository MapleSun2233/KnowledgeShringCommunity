import { useEffect, useState } from "react"
import { useQuill } from "react-quilljs"
import "quill/dist/quill.snow.css"
import {Button, Modal, ListGroup, Form, Row, Col} from "react-bootstrap"
import Message from "../components/Message"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import store from "../store"
export default function PostQuestion(){
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
            await axios.post("/api/question",{
                headline,
                tags:JSON.stringify(tags.split('|')),
                content:htmlText
            },{
                headers:{
                    token:store.getState().token
                }
            }).then(res=>res.data).then(data=>{
                if(data.code===200){
                    navigate("/question/"+data.message)
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
                    <Modal.Title>如何提问题</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>先搜索，再提问</h3>
                    <p style={{textIndent:"2em"}}>提问前先在 Google、百度或者社区先行搜索。这样能更快地帮你找到答案。即使没找到，在看了相关或类似的问题之后，你的提问会更准确。</p>
                    <Row>
                        <Col lg={{span:6}} md={{span:12}}>
                            <h3 className="text-success">提问要求</h3>
                            <ListGroup variant="flush">
                                <ListGroup.Item>标题清晰，不笼统，不做标题党</ListGroup.Item>
                                <ListGroup.Item>内容包含问题的诉求，问题明确</ListGroup.Item>
                                <ListGroup.Item>逻辑严谨、排版优雅、阅读舒适</ListGroup.Item>
                                <ListGroup.Item>多个问题请分别提问</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={{span:6}} sm={{span:12}}>
                            <h3 className="text-danger">不该问的</h3>
                            <ListGroup variant="flush">
                                <ListGroup.Item>别人已经问过的重复问题</ListGroup.Item>
                                <ListGroup.Item>没有尝试找过寻找答案，直接就问</ListGroup.Item>
                                <ListGroup.Item>没有结论的观点讨论</ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    <h3 className="text-info">寄语</h3>
                    <p style={{textIndent:"2em"}}>
                        或许最后得到的答案并不是你最想要的，但深思熟虑过的问题依旧可能会让你有其他方面的收获。每个人的成长都是一步步来的，所以，Keep an open mind。
                    </p>
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
                            <Form.Label>问题标题</Form.Label>
                            <Form.Control type="text" placeholder="请输入问题标题" value={headline} onChange={(e)=>setHeadline(e.target.value)} />
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
                <h2>提出问题</h2>
                <div className="mt-3">
                    <div ref={quillRef} style={{ height: "60vh"}}/>
                </div>
                <div className="d-flex justify-content-end">
                    <Button variant="primary" onClick={()=>{
                        if(htmlText.length < 20)
                            handleMsg("error","问题描述过短")
                        else
                            setShowModal(true)
                    }} className="mt-2">发布</Button>
                </div>
            </div>
        </>
    )
}