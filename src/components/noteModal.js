import  React , { useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Card,
    CardText,
    CardBody,
    CardFooter,
    CardHeader 
} from 'reactstrap';
import '../App.css'

const NoteModal = ({title, note, date, onDel}) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	const arrayOfColors=["#ff3333", "#ff3385", "#d279a6", "#66ffff", "#4dffb8", "#4dff4d", "#ffd24d", "#ff9933", "#4d4dff", "#4d4dff", "#a6a6a6"];
	const [cardColor] = useState(Math.floor(Math.random() * 12));

	return(
        <div>
			<Card style = {{backgroundColor : arrayOfColors[cardColor]}} className='note' onClick={toggle} body >
              <CardHeader className="text-center">{title}</CardHeader>
              <CardBody className="text-center">
              <CardText>{ `${note.split('').splice(0, 100).join('')}....` }</CardText>
              </CardBody>
              <CardFooter>
                <CardText
                  className="float-left"
                >
                { new Date(date).toDateString() }
                </CardText>              
  	          </CardFooter>
            </Card>
            <Modal
             isOpen={isOpen}
             toggle={toggle}
            >
                <ModalHeader toggle={toggle}> {title} </ModalHeader>
                <ModalBody>
                <div>{note}</div>
                </ModalBody>
                <ModalFooter>
                <Button
                color = "danger"
                size="sm"
                onClick = {() => {toggle(); onDel();}}                        
                >
                Delete
               </Button>
                </ModalFooter>      
            </Modal>
        </div>
    );
}

export default NoteModal;