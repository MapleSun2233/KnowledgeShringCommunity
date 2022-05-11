import { useState } from 'react';
import store from '../store';
import empty from '../asset/img/empty.png';
import {Image} from 'react-bootstrap'
import BackTop from '../components/BackTop';
import ArticleListItem from '../components/ArticleListItem';
import QuestionListItem from '../components/QuestionListItem';
export default function Search() {
    const [list, setList] = useState(store.getState().searchResult)
    // 监听store的变化
    store.subscribe(()=>setList(store.getState().searchResult))
    
    return(
        <>
            <div className='bg-white rounded'>
                <h3 className='pt-4' style={{textIndent:"1em"}}>检索结果：</h3>
                {list.length === 0 && <Image src={empty} className="mx-auto d-block" alt="empty" />}
                {list.length > 0 && list[0].articleId ? 
                list.map((item,index)=><ArticleListItem item={item} key={index}/>) : 
                list.map((item,index)=><QuestionListItem item={item} key={index}/>)}
            </div>
            <BackTop/>
        </>
    )
}