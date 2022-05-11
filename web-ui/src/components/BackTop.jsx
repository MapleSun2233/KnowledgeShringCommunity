import { Button } from "react-bootstrap"
export default function BackTop(){
    return (
        <>
            <style>
                {`
                    .back-top{
                        position:fixed;
                        bottom:20px;
                        right:20px;
                    }
                `}
            </style>
            <div className='back-top'>
                <Button variant='outline-primary' size='lg' onClick={()=>window.scrollTo(0,0)}><i className="bi bi-arrow-up-circle"></i></Button>
            </div>
        </>
    )
}