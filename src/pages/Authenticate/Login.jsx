import { Button, Card, CardActions, CardContent, Container, FormControl, FormControlLabel, FormLabel, IconButton, MenuItem, Radio, RadioGroup, Select, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react'
import { LoginAdmin, LoginStudent, LoginTeacher} from '../../Requests';
import './Authenticate.css';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch } from 'react-redux';
import { setAuth, setUser } from '../../actions/auth-actions';
import { ADMIN_ROLE, STUDENT_ROLE, TEACHER_ROLE } from '../../constants';

export const Login=()=>{
    let dispatch=useDispatch();
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [isError, setisError] = useState(false);
    const [value, setValue] = useState(ADMIN_ROLE)
    var ErrorMessage=useRef();
    const handleUsernameChange=(e)=>{
        setUsername(e.target.value);
    }
    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
    }

    const handleChange = (event) => {
        setValue(event.target.value);
      };

    const invalidLogin=()=>{
        ErrorMessage.current="Invalid Login";
        setisError(true);
    }
    const login=async ()=>{
        let res={};
        try
        {   
            if(value===ADMIN_ROLE)
                res = await LoginAdmin({"email": Username,"password": Password});
            else if(value===TEACHER_ROLE)
                res = await LoginTeacher({"email": Username,"password": Password});
            else if(value===STUDENT_ROLE)
                res = await LoginStudent({"email": Username,"password": Password});
        }
        catch(e){
            invalidLogin();
            console.error(e);
        }
        PostAuthenticate(res);
    }

    const action=(<IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={()=>setisError(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>)

    const snacc=(
        <Snackbar
        open={isError}
        autoHideDuration={6000}
        onClose={()=>setisError(false)}
        message={ErrorMessage.current}
        action={action}
        />
        )
        
    const PostAuthenticate=(res)=>{
        if(res.data!=null)
            dispatch(setUser(res.data));
        else{
            invalidLogin();
            return
        }
        dispatch(setAuth(true));
    }


    const PasswordComponent=(<>
        <CardContent>
            <Typography variant="h4" color="text.secondary">
            LOGIN
            </Typography>
            <Container className="AuthBox2">
                <FormControl>
                    <FormLabel>Role</FormLabel>
                    <RadioGroup
                        value={value}
                        onChange={handleChange}
                        defaultValue={ADMIN_ROLE}
                    >
                        <FormControlLabel value={ADMIN_ROLE} control={<Radio />} label={ADMIN_ROLE.toUpperCase()} />
                        <FormControlLabel value={TEACHER_ROLE} control={<Radio />} label={TEACHER_ROLE.toUpperCase()} />
                        <FormControlLabel value={STUDENT_ROLE} control={<Radio />} label={STUDENT_ROLE.toUpperCase()} />
                    </RadioGroup>
                </FormControl>
                <TextField onChange={handleUsernameChange} placeholder="Email" />
                <TextField type="password" onChange={handlePasswordChange} placeholder="Password" />
            </Container>
            <Button id="CA" onClick={login}>Login</Button>
        </CardContent>
        {snacc}
    </>);

    return PasswordComponent;
}
