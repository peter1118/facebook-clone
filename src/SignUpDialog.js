import React, { useState } from 'react';
import { auth, provider } from "./firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import "./SignUpDialog.css";

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

function SignUpDialog(props) {
    const [mail, setMail] = useState('');
    const [pwd, setPassWord] = useState('');
    const [name, setName] = useState('');
    const [msg, setMsg] = useState('');

    
    const { onClose, open } = props;
    const handleClose = () => {
        onClose();
    }

    const signUp = (e) => {
        e.preventDefault();

        console.log("mail :", mail);
        console.log("pwd :", pwd);

        if (mail.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (pwd.length < 4) {
            alert('Please enter a password.');
            return;
        }
        auth.createUserWithEmailAndPassword(mail, pwd).catch(
            function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                /*
                if (errorCode == 'auth/weak-password') {
                    //alert('The password is too weak.');
                    alert(errorMessage);
                } else {
                    alert(errorMessage);
                }
                console.log(error);
                */
                alert(errorMessage);
                // [END_EXCLUDE]
            }
        );
    }


    var actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be whitelisted in the Firebase Console.
        //url: 'vine-church-f82a0.firebaseapp.com',
        url: 'localhost:3000',
        // This must be true.
        handleCodeInApp: true,
        //dynamicLinkDomain: 'vine-church-f82a0.firebaseapp.com'
        dynamicLinkDomain: 'localhost:3000'
    };

    return (
            <Dialog onClose={handleClose} aria-labelledby="Sign Up" open={open} fullWidth={true} maxWidth={'xs'}>
                <div className="signUp__top">
                    <DialogTitle id="Sign Up">
                        <p>가입하기</p>
                    </DialogTitle>
                </div>
                <div className="signUp__form">
                <form>
                    <input value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder='이름' 
                        className='signUp__input' />
                    <input value={mail} 
                        onChange={(e) => setMail(e.target.value)} 
                        placeholder='이메일 주소' 
                        className='signUp__input' />
                    <input value={pwd} 
                        type="password"
                        onChange={(e) => setPassWord(e.target.value)} 
                        placeholder='비밀 번호' 
                        className='signUp__input' />
                    <textarea value={msg} 
                        onChange={(e) => setMsg(e.target.value)} 
                        placeholder='가입 요청 메시지 - 관리자 검토 후 승인' 
                        className='signUp__input' />
                    <p> 가입 승인 이후 정상적인 로그인이 가능합니다.<br /> 신청 후 관리자에게 문의해주세요. </p> 
	            <Button type="submit" onClick={signUp}>
                        가입
	            </Button>
                </form>
                </div>
            </Dialog>
    );
}

export default SignUpDialog;
