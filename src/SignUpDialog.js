import React, { useState } from 'react';
import { auth, provider } from "./firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import "./SignUpDialog.css";

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

function SignUpDialog() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = (e) => {
        e.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const signUp = () => {
        var email = document.getElementById('email');
        var password = document.getElementById('password');
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        auth.createUserWithEmailAndPassword(email, password).catch(
            function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
                } else {
                alert(errorMessage);
                }
                console.log(error);
                // [END_EXCLUDE]
            }
        );
    }

    return (
        <div className="signUp">
	    <Button type="submit" onClick={handleClickOpen}>
	        회원 가입
	    </Button>
            <Dialog onClose={handleClose} aria-labelledby="Sign Up" open={open} fullWidth={true} maxWidth={'xs'}>
                <div className="signUp__top">
                    <DialogTitle id="Sign Up">
                        <h3>가입하기</h3>
                    </DialogTitle>
                </div>
                <div className="signUp__form">
                    <input type='text' placeholder='이름' />
                    <input type='text' placeholder='ID' />
                    <input type='text' placeholder='PWD' />
                    <input type='text' placeholder='확인 위한 e-mail 계정 주소' />
                    <textarea placeholder='가입 요청 메시지 - 관리자 검토 후 승인' />
                </div>
                <div className="signUp__bottom">
                    <p> 가입 승인 이후 정상적인 로그인이 가능합니다. 신청 후 관리자에게 문의해주세요. </p> 
	            <Button type="submit" onClick={handleClickOpen}>
                        가입
	            </Button>
                </div>
            </Dialog>
        </div>
    );
}

export default SignUpDialog;
