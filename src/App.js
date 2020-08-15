import React, { useEffect, useReducer, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/AppNavbar';
import Notes from './components/notes';
import { authReducer, initialAuthState, loadUser} from './controllers/authController';
import { errorReducer, initialErrorState, returnError} from './controllers/errorController'

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();
const ErrorStateContext = React.createContext();
const ErrorDispatchContext = React.createContext();

export const App = () => {
	const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
	const [errorState, errorDispatch] = useReducer(errorReducer, initialErrorState);


	
	useEffect(() => {
  		const authResponse = async () => {
  			authDispatch({type : 'userLoading'});
  			const res = await loadUser(authState.token);
  			if(res.type === 'userLoaded'){
  				authDispatch(res);
  			} else {
  				const {type, errorObject} = res;
  				authDispatch({type});
  				errorDispatch(returnError(errorObject.msg, errorObject.status))
  			}
  		}

  		authResponse();
  	}, [authState.isAuthenticated, authState.token]);


  return (
    <AuthStateContext.Provider value = { authState }>
    	<AuthDispatchContext.Provider value = { authDispatch }>
    	<ErrorStateContext.Provider value = { errorState }>
    	<ErrorDispatchContext.Provider value = { errorDispatch }>
	    	<div className="App">
	      		<AppNavbar />
	      		<Notes />
	    	</div>
	    </ErrorDispatchContext.Provider>
	    </ErrorStateContext.Provider>
	    </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

export const UseAuthDispatch = () => {
	const context = useContext(AuthDispatchContext);

	if (context === undefined) {
		throw new Error('UseAuthDispatch must be used within a Provider')
	}
	return context;
}

export const UseAuthState = () => {
	const context = useContext(AuthStateContext);

	if (context === undefined) {
		throw new Error('UseAuthState must be used within a Provider')
	}
	return context;
}

export const UseErrorDispatch = () => {
	const context = useContext(ErrorDispatchContext);

	if (context === undefined) {
		throw new Error('UseErrorDispatch must be used within a Provider')
	}
	return context;
}

export const UseErrorState = () => {
	const context = useContext(ErrorStateContext);

	if (context === undefined) {
		throw new Error('UseErrorState must be used within a Provider')
	}
	return context;
}