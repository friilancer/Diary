export const initialAuthState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
};

export const authReducer = (state, action) => {
    switch(action.type){
        case 'userLoading':
            return  {
                ...state,
                isLoading: true
            };
        case 'userLoaded':
            return { 
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case 'loginSuccess':
        case 'registerSuccess':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            }
        case 'registerFail':
        case 'loginFail':
        case 'authError':
        case 'logoutSuccess':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        default:
            return state;
    }
}

//Function to handle response
const handleResponse = async (response, successType, errorType) => {
    const data = await response.json();
    if(!response.ok){
        const errorObject = {
            msg : data.msg,
            status: response.status
        }
        return {type:errorType, errorObject}
    }
    else{
        return {type:successType, payload:data}
    }
}

//Check token and load user
export const loadUser = async (token) => {
    const config = {
        headers : {
            'Content-type': 'application/json'
        }
    }

    if(token) {
        config.headers['x-auth-token'] = token;
    }

    try {
        const response = await fetch('/api/auth/user', config);
        const obj = await handleResponse(response, 'userLoaded', 'authError');
        return {...obj};
    }catch (error){
        return error;
    }
}

//Register User
export const register = async ({ name, email, password }) => {

    //Request options
    const config = {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({name, email, password})
    }

    try{
        const response = await fetch('/api/users', config);
        const obj = await handleResponse(response, 'registerSuccess', 'registerFail');
        return {...obj}
    } catch (error){
        return error;
    }
}

//Log in user
export const login = async ({email, password }) => {

    //Request options
    const config = {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({email, password})
    }

    try{
        const response = await fetch('/api/auth', config);
        const obj = await handleResponse(response, 'loginSuccess', 'loginFail');
        return {...obj};
    } catch (error){
        return error;
    }
}

export const logout = () => {
    return {
        type: 'logoutSuccess'
    }
}