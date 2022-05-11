import store from '../store'
import {Outlet, Navigate, useNavigate} from 'react-router-dom';
import { Suspense } from 'react';
import axios from 'axios';
import { Container, Navbar, Nav, FormControl, Button, Form, NavDropdown, ButtonGroup, Spinner, Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import logo from  '../asset/img/logo.gif'
import { useEffect } from 'react';
import { setSearchType, setSearchKeyword, setSearchResult, setToken } from '../store/actions';
import { useState } from 'react';
import Message from '../components/Message';

export default function App(){
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
    
    const navigate = useNavigate()

    const [searchText, setSearchText] = useState(store.getState().searchType === "Article" ? "知识" : "问答")

    useEffect(()=>{
        // 检查登录状态，防止session已经过期
        console.log("check login status",store.getState().token)
        axios.get("/api/checkLogin",{
            headers:{
                token:store.getState().token
            }
        }).then((response)=>response.data).then((data)=>{
            if(data.code !==200)
                navigate("/login")
        }).catch(()=>navigate("/login"))
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    // 处理登出
    const handleLogout = async()=>{
        await axios.post('/api/logout',{},{
            headers:{
                token:store.getState().token
            }
        }).then(()=>{
            store.dispatch(setToken(""))
            navigate('/login')
        })
    }

    // 处理检索
    const handleSearch = async()=>{
        if(store.getState().searchKeyword === ""){
            handleMsg("warning","检索内容不能为空")
            return
        }
        await axios.get(`/api/search${store.getState().searchType}/${store.getState().searchKeyword}`,{
            headers:{
                token:store.getState().token
            }
        }).then(res=>res.data).then(data=>{
            if(data.code === 200)
                store.dispatch(setSearchResult(data.data))
            else handleMsg("danger",data.message)
        }).catch(()=>{
            handleMsg("danger","获取搜索结果失败")
        })
        navigate("/search")
    }

    // 监听store的变化，并且写入到localStorage中
    store.subscribe(()=>{
        setSearchText(store.getState().searchType === "Article" ? "知识" : "问答")
        window.localStorage.setItem("state",JSON.stringify(store.getState()))
    })
    
    // 导航栏，每个页面的公共部分
    return(
        <>
            {showMsg && <Message msg={msg}/>}
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed='top'>
            <Container>
            <Navbar.Brand href="/">
            <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                />{' '}
                知识分享社区
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">知识广场</Nav.Link>
                    <Nav.Link href="/answer">问答广场</Nav.Link>
                    <Nav.Link href="/meeting">华山论剑</Nav.Link>
                </Nav>
                <Nav>
                    <Form className="d-flex">
                        <InputGroup>
                            <DropdownButton
                            variant="outline-secondary"
                            title={searchText}
                            id="input-group-dropdown-1"
                            >
                                <Dropdown.Item onClick={()=>store.dispatch(setSearchType("Article"))}>知识</Dropdown.Item>
                                <Dropdown.Item onClick={()=>store.dispatch(setSearchType("Question"))}>问答</Dropdown.Item>
                            </DropdownButton>
                            <FormControl
                                type="search"
                                placeholder="根据关键字检索"
                                className="me-2"
                                aria-label="Text input with dropdown button search"
                                onChange={(e)=>store.dispatch(setSearchKeyword(e.target.value.trim()))}
                                defaultValue={store.getState().searchKeyword}
                            />
                            <Button variant="outline-success" onClick={handleSearch}>Go</Button>
                        </InputGroup>
                    </Form>
                    <ButtonGroup style={{marginLeft:"1em"}}>
                        <DropdownButton as={ButtonGroup} title="撰写" id="bg-vertical-dropdown-1">
                            <Dropdown.Item href='/postarticle'>发表文章</Dropdown.Item>
                            <Dropdown.Item href='/postquestion'>提出问题</Dropdown.Item>
                        </DropdownButton>
                    </ButtonGroup>
                    <Navbar.Brand href="/person">
                        <img
                            alt=""
                            src={"/img/"+store.getState().userInfo.photo}
                            width="30"
                            height="30"
                            className="rounded d-inline-block align-top"
                            style={{marginLeft:"1em"}}
                            />
                    </Navbar.Brand>
                    <NavDropdown title={store.getState().userInfo.username || store.getState().userInfo.nickname} id="navbarScrollingDropdown">
                        <NavDropdown.Item href="/person">个人中心</NavDropdown.Item>
                        <NavDropdown.Item onClick={handleLogout}>退出登录</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>   

            <Container style={{marginTop:"5em"}}>
                {store.getState().isLogined ? (
                    <Suspense fallback={<Spinner animation="border" variant="primary" />}>
                        <Outlet/>
                    </Suspense>
                ) : <Navigate to="/login"/>}
            </Container>
        </>
    )
}