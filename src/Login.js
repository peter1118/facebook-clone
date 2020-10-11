import React, { useState } from 'react';
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
    const [open, setOpen] = useState(false);

    const handleClickOpen = (e) => {
        e.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                    {/*
			<div className="login__signIn">
			    <Button type="submit" onClick={signIn}>
				    Google 로그인
			    </Button>
			    <Button type="submit" onClick={signIn}>
				    Naver 로그인
			    </Button>
			</div>
                        */}
                    <div className='login__main__top'>
                        <input type='text' placeholder='아이디' id='login__form__id'/>
                        <input type='text' placeholder='비밀번호' id='login__form__pwd'/>
		        <Button type="submit" onClick={signIn} fullWidth={true}>
                            로그인
		        </Button>
                    </div>
                    <div className='login__main__bottom'>
		        <Button type="submit" onClick={handleClickOpen}>
                            회원 가입
		        </Button>
                    </div>
		</div>
                <SignUpDialog open={open} onClose={handleClose} />
	</div>
)
}

export default Login;
