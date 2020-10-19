import React, { useState } from 'react';
import "./Login.css";
import logo from './logo.png';
import Button from '@material-ui/core/Button';
import { auth } from "./firebase";
import SignUpDialog from './SignUpDialog.js';

function Login() {
    //const [state, dispatch] = useStateValue();
    const [open, setOpen] = useState(false);
    const [mail, setMail] = useState('');
    const [pwd, setPassWord] = useState('');

    const handleClickOpen = (e) => {
        e.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /* 구글 로그인 할 때 쓴거
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
    */

    const signInWithMail = (e) => {
        e.preventDefault();
        //setMail(document.getElementById('loginMail'));
        //setPassWord(document.getElementById('loginPWD'));
        auth.signInWithEmailAndPassword(mail, pwd).catch(function(error) {
              var errorMessage = error.message;
              alert(errorMessage);
        });
        setMail("");
        setPassWord("");
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
                      <form>
                        <input value={mail} 
                            placeholder='메일 주소' 
                            onChange={(e) => setMail(e.target.value)}
                            className='login__form'
                            id='loginMail' />
                        <input value={pwd} 
                            type="password"
                            placeholder='비밀 번호'
                            onChange={(e) => setPassWord(e.target.value)}
                            className='login__form'
                            id='loginPWD' />
		        <Button type="submit" onClick={signInWithMail} 
                            fullWidth={true}>
                            로그인
		        </Button>
                      </form>
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
