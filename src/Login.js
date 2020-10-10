import React from 'react';
import "./Login.css";
import logo from './logo.png';
import Button from '@material-ui/core/Button';
import { auth, provider } from "./firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import SignUpDialog from './SignUpDialog.js';

function Login() {
    const [state, dispatch] = useStateValue();
    const signIn = () => {
        // sign in...
        auth.signInWithPopup(provider).then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
	    })
        })
        .catch((error)=>alert(error.message));
    }

return (
	<div className='login'>
		<div className="login__logo">
			<img src={ logo } alt="" />
		</div>
		<div className="login__main">
			<div className="login__signIn">
				<Button type="submit" onClick={signIn}>
					Google 로그인
				</Button>
				<Button type="submit" onClick={signIn}>
					Naver 로그인
				</Button>
			</div>
                        <SignUpDialog />
		</div>
	</div>
)
}

export default Login;
