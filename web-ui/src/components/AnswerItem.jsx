import {Image, Row, Col} from 'react-bootstrap'
export default function AnswerItem(props){
    return <Row className="pt-3 border-top">
        <Col xs={{span:1}}>
            <Image roundedCircle={true} src={"/img/"+props.answer.publisher.photo} />
        </Col>
        <Col>
            <p className='text-primary'>{props.answer.publisher.nickname || props.answer.publisher.username}</p>
            <p>{props.answer.content}</p>
            <p className='text-muted fs-6'>{new Date(props.answer.postTime).toLocaleString()}</p>
        </Col>
    </Row>
}