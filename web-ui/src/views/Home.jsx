import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Row, Image, Col, ListGroup, Button, Badge } from 'react-bootstrap'
import empty from '../asset/img/empty.png'
import Message from '../components/Message'
import BackTop from '../components/BackTop'
import ArticleListItem from '../components/ArticleListItem'
import store from '../store'
export default function Home(){
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

    const [articleList, setArticleList] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [pageType, setPageType] = useState("new")
    const [pageNum, setPageNum] = useState(0)
    const [top10, setTop10] = useState([])

    const getArticleList = async () => {
        try{
            await axios.get(`/api/pageArticleList/${pageType}/${pageNum}`,{
                headers:{
                    token:store.getState().token
                }
            }).then(res=>res.data).then(data=>{
                if(data.code === 200){
                    if(data.data === null || data.data.length === 0)
                        setHasMore(false)
                    else{
                        setArticleList(articleList.concat(data.data))
                        setPageNum(pageNum+1)
                    }
                }else handleMsg("danger",data.message)
            })
        }catch(err){
            handleMsg("danger","获取文章列表失败")
        }
    }

    const handleChangePageType = (type) => {
        setPageNum(0)
        setPageType(type)
        setArticleList([])
        setHasMore(true)
        
    }

    const getTop10 = async () => {
        await axios.get("/api/contributionTop10",{
            headers:{
                token:store.getState().token
            }
        }).then(res=>res.data).then(data=>{
            if(data.code === 200){
                setTop10(data.data)
            }else handleMsg("danger",data.message)
        }).catch(()=>handleMsg("danger","获取贡献排行榜失败"))
    }
    // 没办法，解决useState更新不及时的权宜之计，不然pageNum是上次的值
    useEffect(()=>{
        getArticleList()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[pageType])
    useEffect(()=>{
        getTop10()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // 处理关注
    const handleFollow = async(id)=>{
        await axios.post('/api/followAuthor/'+id,{},{
            headers:{
                token:store.getState().token
            }
        }).then(res=>res.data).then(data=>{
            if(data.code === 200){
                getTop10()
            }else{
                handleMsg('danger',data.message)
            }
        })
    }
    return(
        <>
            <style>
                {`
                    .control-box{
                        display: flex;
                        justify-content: center;
                    }
                    .control-box span{
                        cursor:pointer;
                        border-bottom: 2px solid #fff;
                    }
                    .control-box span:hover{
                        border-bottom: 2px solid #333;
                    }
                    .control-box span.active{
                        border-bottom: 2px solid #000;
                    }
                `}
            </style>
            {showMsg && <Message msg={msg}/>}
            <Row className='bg-white rounded p-5'>
                <Col lg={{span:7}} md={{span:6}} xl={{span:8}}>
                    <div className='control-box fs-5'>
                        <span className={pageType==='new' ? 'active' : ''} onClick={()=>handleChangePageType("new")}>最新</span>
                        <span className={'mx-2 ' + (pageType==='views' ? 'active' : '')} onClick={()=>handleChangePageType("views")}>热门</span>
                        <span className={pageType==='follow' ? 'active' : ''} onClick={()=>handleChangePageType("follow")}>关注</span>
                    </div>
                    {articleList && articleList.map((item,index)=><ArticleListItem item={item} key={index}/>)
                    }
                    {!articleList.length && <Row className='border-bottom mt-4'>
                        <Col md={{span:6,offset:3}}>
                            <Image src={empty} />
                        </Col>
                    </Row>}
                    {hasMore ? <p className='text-center text-primary'>
                        <span style={{cursor:"pointer"}} onClick={getArticleList}>显示更多<i className="bi bi-caret-down"></i></span>
                    </p> : <p className='text-center'>没有更多了~</p>}
                </Col>
                <Col>
                    <style>
                        {`
                            .top{
                                position: sticky;
                                top:5em;
                            }
                        `}
                    </style>
                    <div className='top'>
                        <h5><svg t="1651625314175"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2076" width="20" height="20"><path d="M583.168 967.0656c67.2768-97.28 70.0416-177.4592 8.3968-240.4352C457.1136 597.9136 515.9936 512 515.9936 512s-142.336 69.12-169.984 197.7344c-14.848 69.12 3.3792 155.3408 94.3104 257.3312h-13.6192C256 910.2336 113.7664 797.4912 113.7664 625.7664c0-320.9216 318.1568-267.3664 341.2992-568.9344 0 0 303.8208 94.4128 236.6464 386.4576 0 0 33.5872-25.8048 67.2768-77.312 0 0 151.2448 120.2176 151.2448 291.9424 0 120.2176-100.864 223.232-302.592 309.1456h-24.4736z" fill="#d81e06" p-id="2077"></path></svg>贡献排名</h5>
                        <ListGroup as="ol" numbered>
                            {top10.map((item,index)=><ListGroup.Item as="li" key={index} className="d-flex">
                                <div className="d-flex justify-content-between" style={{width:"100%"}}>
                                    <div>
                                        <Image src={"/img/"+item.photo} roundedCircle className="mx-2" style={{width:"2em"}} />
                                        <b>{item.nickname || item.username}</b>
                                        <Badge className="mx-2">{item.contribution}</Badge>
                                    </div>
                                    {!item.followed && <Button onClick={()=>handleFollow(item.userId)}>关注</Button>}
                                </div>
                            </ListGroup.Item>)}
                        </ListGroup>
                    </div>
                </Col>
            </Row>
            <BackTop/>
        </>
    )
}