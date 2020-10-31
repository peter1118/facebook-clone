import {auth, db} from "./firebase";
import {useUserContext} from "./StateProvider";

auth.onAuthStateChanged(function(user) {
    if(user) {
        console.log("on auth changed...yes user");
        /*
        dispatch({
            type: actionTypes.SET_USER,
            user: user,
        })
        */
  //      initialState = user;
    }
    else {
        console.log("on auth changed...no user");
        /*
        dispatch({
            type: actionTypes.SET_USER,
            user: null,
        })
        */
   //     initialState = null;
    }
});

export const initialState = {
	user: null,
};

export const actionTypes = {
	SET_USER: "SET_USER",
};

//reducer function, used to Set users
const reducer = (state, action) => {
	switch (action.type) {
		case actionTypes.SET_USER:
			return {
				...state,
				user: action.user,
			};
		default:
			return state;
	}
};

export default reducer;
