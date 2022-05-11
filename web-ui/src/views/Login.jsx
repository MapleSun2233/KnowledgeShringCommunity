import '../asset/css/login.css';
import logo from  '../asset/img/logo.gif'
import {useState, useEffect} from 'react'
import {Form, Button,Col, Row, Container} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import Message from '../components/Message'
import axios from 'axios'
import store from '../store'
import {setUserInfo, setLoginStatus, setToken} from '../store/actions'
export default function Login(){
    const navigate = useNavigate()
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
    // 登录部分的处理
    const [loginInfo,setLoginInfo] = useState({
        username:'',
        password:'',
        rememberMe:false
    })
    const handleLogin = async()=>{
        if(loginInfo.username === '')
            handleMsg('error','账号不能为空')
        else if(loginInfo.username.length < 6)
            handleMsg('warning','账号长度不能小于6位')
        else if(loginInfo.password === '')
            handleMsg('error','密码不能为空')
        else if(loginInfo.password.length < 6)
            handleMsg('warning','密码长度不能小于6位')
        else{
            try{
                await axios.post("/api/login",{
                    username:loginInfo.username,
                    password:loginInfo.password
                },{
                    headers:{
                        token:store.getState().token
                    }
                }).then((response)=>{
                    return response.data;
                }).then(data=>{
                    if(data.code === 200) {
                        handleMsg("success","登录成功")
                        return data.data;
                    }
                    else
                    handleMsg("warning",data.message)
                    
                }).then(data=>{
                    store.dispatch(setToken(data.token))
                    store.dispatch(setUserInfo(data.data))
                    store.dispatch(setLoginStatus(true))
                    // 记住我
                    if(loginInfo.rememberMe)
                        localStorage.setItem('rememberMe',JSON.stringify(loginInfo))
                    else
                        localStorage.removeItem('rememberMe')
                    navigate('/')
                })
            }catch(e){
                handleMsg("error","网络请求异常")
            }
        }
    }
    // 登录记住的信息
    useEffect(()=>{
        if(localStorage.getItem('rememberMe'))
            setLoginInfo(JSON.parse(localStorage.getItem('rememberMe')))
    },[])

    // 注册
    const goToRegister = ()=>{
        navigate('/register')
    }
    return(
        <div id="login">
            {showMsg && <Message msg={msg}/>}
            <Container fluid="fluid">
                <Row>
                    <Col md={{span:4,offset:4}}>
                        <Form>
                            <h2>登<img src={logo} alt="" />录</h2>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>账号</Form.Label>
                                <Form.Control type="text" autoComplete='off' placeholder="请输入账号" maxLength={16} value={loginInfo.username} onChange={event=>setLoginInfo(
                                    {
                                        ...loginInfo,
                                        username:event.target.value.replace(/[^\w]/g,'')
                                    }
                                )} />
                                <Form.Text className="text-muted">
                                账号由字母、数字和下划线组成
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>密码</Form.Label>
                                <Form.Control type="password" autoComplete='off' placeholder="请输入密码" maxLength={16} value={loginInfo.password} onChange={event=>{
                                    setLoginInfo({
                                        ...loginInfo,
                                        password:event.target.value.replace(/[^\w]/g,'')
                                    })
                                }} onKeyDown={(e)=>{
                                    if(e.key === "Enter") handleLogin()
                                }}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="rememberMe">
                                <Form.Check type="checkbox" label="记住我" checked={loginInfo.rememberMe} onChange={event=>{
                                    setLoginInfo({
                                        ...loginInfo,
                                        rememberMe:event.target.checked
                                    })
                                }} />
                            </Form.Group>
                            <div id="btnBox">
                                <Button variant="primary" onClick={handleLogin}>
                                    登 录
                                </Button>
                                <Button variant="success" onClick={goToRegister}>
                                    注 册
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}