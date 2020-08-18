import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

const SecretModal = (props) => {
    const initialState = {
      title: '',
      note:''
    }
    const [isOpen, setIsOpen] = useState(false);
    const [secret, setSecret] = useState({initialState})

    const toggle = () => setIsOpen(!isOpen);
    const onChange = (e) => setSecret({...secret, [e.target.name] : e.target.value.trim()});
    
    return(
        <div>
            <Button
             color="dark"
             style={{marginBottom: '5px'}}
             onClick={toggle}
            >Pen new thoughts</Button>

            <Modal
             isOpen={isOpen}
             toggle={toggle}
            >
                <ModalHeader toggle={toggle}> Notes </ModalHeader>
                <ModalBody>
                    <Form onSubmit={(e) => {e.preventDefault(); toggle(); props.onSubmit(secret.title, secret.note);}}>
                        <FormGroup>
                            <Label for="title">What topic is on your mind</Label>
                            <Input
                              type="text"
                              name="title"
                              id="title"
                              placeholder = "Topic..."
                              onChange={onChange}
                             />
                            <Label for="note">Pen your thoughts</Label>
                            <Input
                              type="textarea"
                              name="note"
                              id="note"
                              placeholder="Keep writing...it'll make sense soon"
                              onChange={onChange}
                             />
                             <Button
                              color="dark"
                              block
                              style={{marginTop:'5px'}}
                             >Save</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>      
            </Modal>
        </div>
    )
}

export default SecretModal;