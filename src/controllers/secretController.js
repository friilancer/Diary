export const initialSecretsState = {
    secrets : [], isLoading: false
};

export const secretReducer = (state, action) => {
    switch(action.type){
        case 'getItems':
            return {...state, secrets:action.payload, isLoading:false};
        case 'addItem':
            return {secrets:[...state.secrets, action.payload], isLoading:false};
        case 'deleteItem':
            return {secrets:state.secrets.filter( x => x._id !== action.payload), isLoading:false};
        case 'loading':
            return {...state, isLoading: true};
        default: 
            return state;
    }
}

export const addSecret = async (secretTitle, secretNote, token) => {
    const config = {
        headers : {
            'Content-type': 'application/json'
        },
        method:'POST',
        body: JSON.stringify({
            title: secretTitle,
            note: secretNote
        })
    }

    //Check for token, add to config if it exists
    if(token) {
        config.headers['x-auth-token'] = token;
    }

    const response = await fetch('/api/secrets', config);
    const {_id, title, note, date} = await response.json();
    return {type:'addItem' , payload: {_id, title, note, date}}
}

export const getSecrets = async (token) => {

    const config = {
        headers : {},
    }

    //Check for token, add to config if it exists
    if(token) {
        config.headers['x-auth-token'] = token;
    }

    const response = await fetch('/api/secrets', config);
    const res = await response.json();
    return {type: 'getItems', payload:res.secrets}
}

export const deleteSecret= async (id, token) => {
    const config = {
        headers : {},
        method:'DELETE',
    }

    //Check for token, add to config if it exists
    if(token) {
        config.headers['x-auth-token'] = token;
    }    
    const response = await fetch(`/api/secrets/${id}`, config);
    const {success} = await response.json();

    if(success) return {type: 'deleteItem', payload: id};
}
