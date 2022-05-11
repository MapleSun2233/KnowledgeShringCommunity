import axios from 'axios';
import {useState, useRef} from 'react'
import { Row, Form, Col, Button, Offcanvas } from "react-bootstrap";
import store from "../store";
import { setUserInfo } from '../store/actions';

export default function UserInfo(props){
    const [nickname,setNickname] = useState(store.getState().userInfo.nickname||"")
    const [photoName,setPhotoName] = useState(store.getState().userInfo.photo)
    const [photoLibShowStatus,setPhotoLibShowStatus] = useState(false)
    const [photoList,setPhotoList] = useState([])
    const fileRef = useRef(null)

    // 处理头像上传
    const handlePhotoUpload = async()=>{
        if(fileRef.current.files[0].size >= 1048576){
            props.handleMsg("error","文件大小不能超过1M")
            return
        }
        const formData = new FormData()
        formData.append("file", fileRef.current.files[0])
        try{
            await axios.post("/api/avatar",formData,{
                headers:{
                    "Content-Type":"multipart/form-data",
                    token:store.getState().token
                }
            }).then(res=>res.data).then(data=>{
                if(data.code===200){
                    setPhotoName(data.message)
                    props.handleMsg("success","上传成功")
                }else{
                    props.handleMsg("error",data.message)
                }
            })
        }catch(e){
            props.handleMsg("error","上传出错")
        }
    }
    // 处理头像仓库
    const openAvatorLib = async()=>{
        try{
            await axios.get("/api/avatarList",{
                headers:{
                    token:store.getState().token
                }
            }).then(res=>res.data).then(data=>{
                if(data.code===200){
                    setPhotoList(data.data)
                }else{
                    props.handleMsg("error",data.message)
                }
            })
        }catch(e){
            props.handleMsg("error","获取头像仓库出错")
        }
        setPhotoLibShowStatus(true)
    }
    // 更新信息
    const handleUpdate = async()=>{
        try{
            await axios.put("/api/user",{
                id:store.getState().userInfo.id,
                nickname,
                photo:photoName
            },{
                headers:{
                    token:store.getState().token
                }
            }).then(res=>res.data).then(data=>{
                if(data.code===200){
                    store.dispatch(setUserInfo(data.data))
                    props.handleMsg("success",data.message)
                }else{
                    props.handleMsg("error",data.message)
                }
            })
        }catch(e){
            props.handleMsg("error","更新出错")
        }
    }
    return (
        <>
            <Offcanvas show={photoLibShowStatus} onHide={()=>setPhotoLibShowStatus(false)}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>AVATOR</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>
                        {photoList.map((item,index)=>
                            <Col md={{span:4}} className="mt-2" key={index} >
                                <img style={{cursor:"pointer"}} className="img-thumbnail" src={"/img/"+item} alt="头像" onClick={()=>{
                                    setPhotoName(item)
                                    setPhotoLibShowStatus(false)
                                }} />
                            </Col>
                        )} 
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
            <h3>个人资料</h3>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>账号：</Form.Label>
                    <Form.Control type="text" value={store.getState().userInfo.username} readOnly/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>昵称：</Form.Label>
                    <Form.Control type="text" value={nickname} onChange={(e)=>setNickname(e.target.value)} maxLength="10" placeholder='请输入长度10以内的昵称'/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>头像：</Form.Label>
                    <Row>
                        <Col md={{span:3}}>
                            <img className="img-thumbnail" src={"/img/"+photoName} alt="头像" />
                        </Col>
                        <Col md={{span:5}}>
                            <p className="text-secondary">
                            支持 jpg/jpeg/png 格式，大小不要超过 1MB 图片尺寸 1:1，推荐分辨率：256*256px
                            </p>
                            <input onChange={handlePhotoUpload} ref={fileRef} type="file" name='file' accept='image/jpeg,image/png,image/gif' hidden/>
                            <Button onClick={()=>fileRef.current.click()}>上传头像</Button>
                            <Button className='mx-2' variant='success' onClick={openAvatorLib}>头像库</Button>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>贡献值：</Form.Label>
                    <Form.Control type="text" value={store.getState().userInfo.contribution} readOnly/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>加入时间：</Form.Label>
                    <Form.Control type="text" value={store.getState().userInfo.joinTime.substring(0,10)} readOnly/>
                </Form.Group>
                <Button variant='warning' onClick={handleUpdate}>更新资料</Button>
            </Form>
        </>
    )
}