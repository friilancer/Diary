export const initialErrorState = {
    msg: '',
    status: null,
    id: null    
}

export const errorReducer = (state = initialErrorState, action) => {
    switch(action.type) {
        case 'getErrors': 
            return {
                msg : action.payload.msg,
                status: action.payload.status,
                id: action.payload.id
            };
        case 'clearErrors':
            return {
                msg : '',
                status: null,
                id: null
            };
        default: 
            return state
    }
}

export const returnError =  (msg, status, id = null) => {
    return {
        type : 'getErrors',
        payload : {msg, status, id}
    }
}

export const clearErrors = () => {
    return {
        type: 'clearErrors'   
    }
}