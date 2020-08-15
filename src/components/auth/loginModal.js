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
import { login } from '../../controllers/authController';
import { returnError, clearErrors } from '../../controllers/errorController';

const LoginModal = () => {
    const initialState = {
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
      const {email, password} = credentials;

      //Creating user object
      const user = {email, password};

      const res = await login(user);    
        if(res.type === 'loginSuccess'){
          toggle();
          authDispatch(res);          
        }else {
          const {type, errorObject} = res;
          authDispatch({type});
          errorDispatch(returnError(errorObject.msg, errorObject.status, 'loginFail'))
        }
      
    }


    
    return(
        <div>
            <NavLink onClick={toggle} href='#'>
              Login
            </NavLink>

            <Modal
             isOpen={isOpen}
             toggle={toggle}
            >
                <ModalHeader toggle={toggle}> Login </ModalHeader>
                <ModalBody>
                {errorState.id === 'loginFail' ? <Alert color="danger">{errorState.msg}</Alert> : ''}
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
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
                             >Login</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>      
            </Modal>
        </div>
    );
}

export default LoginModal;