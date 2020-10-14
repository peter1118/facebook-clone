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
    const [mail, setMail] = useState('');
    const [pwd, setPassWord] = useState('');

    var user = auth.currentUser;
    var name, email, photoUrl, uid, emailVerified;

    auth.onAuthStateChanged(function(user) {
        if (user) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            uid = user.uid;  
            dispatch({
                type: actionTypes.SET_USER,
                user: user,
            });
//            return;
            /*
            auth.signOut().then(function() {
            // Sign-out successful.
            }).catch(function(error) {  
            // An error happened.
            });
            */
        } else {
            // No user is signed in.
        }
    });

    if (user != null) {
    }

    const handleClickOpen = (e) => {
        e.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /*
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

        auth.signInWithEmailAndPassword(mail, pwd).catch(function(error) {
              var errorCode = error.code;
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
                            onChange={(e) => setMail(e.target.value)} 
                            placeholder='메일 주소' 
                            className='login__form' />
                        <input value={pwd} 
                            type="password"
                            onChange={(e) => setPassWord(e.target.value)} 
                            placeholder='비밀 번호'
                            className='login__form' />
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
