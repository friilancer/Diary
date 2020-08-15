 import React, {useReducer, useEffect } from 'react';
 import {Container, CardColumns} from 'reactstrap';
 import SecretModal from './secretModal';
 import NoteModal from './noteModal';
 import {secretReducer, initialSecretsState, addSecret, getSecrets, deleteSecret} from '../controllers/secretController';
 import { UseAuthState } from '../App';
 import '../App.css'
 

 const Notes =  () => {    
     
     const [state, dispatch] = useReducer(secretReducer, initialSecretsState);
     const authState =  UseAuthState();
     const { token, isAuthenticated } = authState;

     const onSubmit = async (title, note) => {
        dispatch({type : 'loading'});
        const {type, payload} = await addSecret(title, note, token);
        dispatch({type, payload});
     }

     const onDelete = async (id) => {
        dispatch({type : 'loading'});
        const {type, payload} = await deleteSecret(id, token);
        dispatch({type, payload});
     }

     useEffect(() => {
        const fetchdata = async () => {
            if(isAuthenticated){
              dispatch({type : 'loading'});
              const {type, payload} =  await getSecrets(token);
              dispatch({type, payload});  
            }    
        }
        fetchdata();
     },[token, isAuthenticated]);

    
     return (
         <Container>
             
              {state.isLoading && <h3>Loading...</h3>}
              {isAuthenticated ? <SecretModal onSubmit = {(title, note) => onSubmit(title, note)}/> : <h3> The easiest way to understand a feeling...is to write it out </h3>  }
                           
              <CardColumns>
                {isAuthenticated && 
                
                  state.secrets.map(({_id, title, note, date}) => (
                      <NoteModal key={_id} title = {title} note={note} date={date} onDel = {() => onDelete(_id)}  />
                  ))}
              </CardColumns>
         </Container>
     );
 }


 export default Notes
 