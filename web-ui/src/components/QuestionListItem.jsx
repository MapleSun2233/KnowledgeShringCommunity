export default function QuestionListItem(props){
    return <div className="border-bottom p-3">
    <h4><a href={"/question/"+props.item.questionId} className="text-decoration-none text-dark">{props.item.headline}</a></h4>
    <div>
        <span className='mx-2 text-secondary'>{new Date(props.item.postTime).toLocaleString()}</span>
        <span className="mx-2 text-secondary"><i className="mx-1 bi bi-eye"></i>{props.item.views}</span>
        <span className="mx-2 text-secondary"><i className="mx-1 bi bi-chat-right-dots"></i>{props.item.answers}</span>
    </div>
</div>
}