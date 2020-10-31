import React, { createContext, useContext, useReducer } from 'react';
import reducer, {initialState} from "./reducer";

console.log("StateProvider! ");

export const UserContext = createContext({initialState});

export const StateProvider = ({ reducer, initialState, children }) => (
	<UserContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</UserContext.Provider>
);

export const useUserContext = () => useContext(UserContext);
console.log("StateProvider ended! ");

