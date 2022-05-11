import '../asset/css/login.css';
import logo from  '../asset/img/logo.gif'
import {useState} from 'react'
import {Form, Button,Col, Row, Container} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import Message from '../components/Message'
import axios from 'axios';
import store from '../store';
import {setUserInfo, setLoginStatus, setToken} from '../store/actions'
export default function Register(){
    const navigate = useNavigate()
    // 注册信息的管理
    const [registerInfo,setRegisterInfo] = useState({
        username:'',
        password:'',
        rePassword:''
    })
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
    // 处理注册
    const handleRegister = async()=>{    
        if(registerInfo.username === '')
            handleMsg('error','账号不能为空')
        else if(registerInfo.username.length < 6)
            handleMsg('warning','账号长度不能小于6位')
        else if(registerInfo.password === '')
            handleMsg('error','密码不能为空')
        else if(registerInfo.password.length < 6)
            handleMsg('warning','密码长度不能小于6位')
        else if(registerInfo.rePassword !== registerInfo.password)
            handleMsg('warning','密码不一致')
        else
            try{
                await axios.post("/api/register",{
                    username:registerInfo.username,
                    password:registerInfo.password
                },{
                    headers:{
                        token:store.getState().token
                    }
                }).then((response)=>{
                    return response.data;
                }).then((data)=>{
                    if(data.code === 200){
                        handleMsg("success","注册成功")
                        return data.data;
                    }else{
                        handleMsg("warning",data.message)
                    }
                }).then(data=>{
                    store.dispatch(setToken(data.token))
                    store.dispatch(setUserInfo(data.data))
                    store.dispatch(setLoginStatus(true))
                    navigate('/person')
                })
            }catch(e){
                handleMsg("error","网络请求异常")
            }
    }
    // 登录
    const goToLogin = ()=>{
        navigate('/login')
    }
    return(
        <div id="login">
            {showMsg && <Message msg={msg}/>}
            <Container fluid="fluid">
                <Row>
                    <Col md={{span:4,offset:4}}>
                        <Form>
                            <h2>注<img src={logo} alt="" />册</h2>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>账号</Form.Label>
                                <Form.Control type="text" autoComplete='off' placeholder="请输入账号" maxLength={16} value={registerInfo.username} onChange={event=>setRegisterInfo(
                                    {
                                        ...registerInfo,
                                        username:event.target.value.replace(/[^\w]/g,'')
                                    }
                                )} />
                                <Form.Text className="text-muted">
                                账号由字母、数字和下划线组成
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>密码</Form.Label>
                                <Form.Control type="password" autoComplete='off' placeholder="请输入密码" maxLength={16} value={registerInfo.password} onChange={event=>{
                                    setRegisterInfo({
                                        ...registerInfo,
                                        password:event.target.value.replace(/[^\w]/g,'')
                                    })
                                }}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="rePassword">
                                <Form.Label>重输密码</Form.Label>
                                <Form.Control type="password" autoComplete='off' placeholder="请重新输入密码" maxLength={16} value={registerInfo.rePassword} onChange={event=>{
                                    setRegisterInfo({
                                        ...registerInfo,
                                        rePassword:event.target.value.replace(/[^\w]/g,'')
                                    })
                                }} onKeyDown={e=>{
                                    if(e.key === "Enter") handleRegister()
                                }}/>
                            </Form.Group>
                            <div id="btnBox">
                                <Button variant="success" onClick={handleRegister}>
                                    注 册
                                </Button>
                                <Button variant="primary" onClick={goToLogin}>
                                    登 录
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}