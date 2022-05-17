import {Image, Row, Col, Button, Badge} from 'react-bootstrap'
export default function AnswerItem(props){
    return <Row className={"pt-3 border-top" + (props.answer.accepted ? " border border-success border-3" : "")}>
        <Col xs={{span:1}}>
            <Image roundedCircle={true} src={"/img/"+props.answer.publisher.photo} />
        </Col>
        <Col>
            {props.isHost ?
             props.answer.accepted ? <p className='text-primary d-flex justify-content-between'><span>{props.answer.publisher.nickname || props.answer.publisher.username}</span><Button variant='warning' onClick={()=>props.cancelAccept(props.answer.id)}>取消采纳</Button></p>
            :<p className='text-primary d-flex justify-content-between'><span>{props.answer.publisher.nickname || props.answer.publisher.username}</span><Button variant='info' onClick={()=>props.handleAccept(props.answer.id)}>采纳</Button></p>
            :props.answer.accepted ? <p className='text-primary d-flex justify-content-between'><span>{props.answer.publisher.nickname || props.answer.publisher.username}</span><Badge>题主已采纳</Badge></p>
            :<p className='text-primary'><span>{props.answer.publisher.nickname || props.answer.publisher.username}</span></p>}
            <p>{props.answer.content}</p>
            <p className='text-muted fs-6'>{new Date(props.answer.postTime).toLocaleString()}</p>
        </Col>
    </Row>
}