import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink, 
    Alert
} from 'reactstrap';

import { UseAuthDispatch, UseErrorState, UseErrorDispatch } from '../../App';
import { register } from '../../controllers/authController';
import { returnError, clearErrors } from '../../controllers/errorController';

const RegisterModal = () => {
    const initialState = {
        name: '',
        email: '',
        password: ''
    }
    const [isOpen, setIsOpen] = useState(false);
    const [credentials, setCredentials] = useState(initialState);
    const authDispatch = UseAuthDispatch();
    const errorState = UseErrorState();
    const errorDispatch = UseErrorDispatch();

    const toggle = () => {
      errorDispatch(clearErrors());
      setIsOpen(!isOpen);
    };
    const onChange = (e) => setCredentials({...credentials, [e.target.name]: e.target.value.trim()});
    const onSubmit = async (e) => {
      //retrieving submmitted details from state
      e.preventDefault();
      const {name, email, password} = credentials;
      //Creating a newUser object
      const newUser = {name, email, password};

      const res = await register(newUser);    
        if(res.type === 'registerSuccess'){
          toggle();
          authDispatch(res);
        }else {
          const {type, errorObject} = res;
          authDispatch({type});
          errorDispatch(returnError(errorObject.msg, errorObject.status, 'registerFail'))
        }
      
    }


    
    return(
        <div>
            <NavLink onClick={toggle} href='#'>
              Register
            </NavLink>

            <Modal
             isOpen={isOpen}
             toggle={toggle}
            >
                <ModalHeader toggle={toggle}> Register </ModalHeader>
                <ModalBody>
                {errorState.id === 'registerFail' ? <Alert color="danger">{errorState.msg}</Alert> : ''}
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                              type="text"
                              name="name"
                              id="name"
                              className="mb-2"
                              placeholder="name"
                              onChange={onChange}
                              value={credentials.name}                              
                             />
                             <Label for="email">Email</Label>
                            <Input
                              type="email"
                              name="email"
                              id="Email"
                              className="mb-2"
                              placeholder="Email"
                              onChange={onChange}
                              value={credentials.email}                               
                             />
                             <Label for="password">Password</Label>
                            <Input
                              type="password"
                              name="password"
                              id="password"
                              className="mb-2"
                              placeholder="Password"
                              onChange={onChange}
                              value={credentials.password}    
                             />
                             <Button
                              color="dark"
                              block
                              style={{marginTop:'5px'}}
                             >Register</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>      
            </Modal>
        </div>
    );
}

export default RegisterModal;