import { Button, Card, CardActions, CardContent, Container, IconButton, MenuItem, Select, Tab, Tabs, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useRef, useState } from 'react'
import { LoginDriver,LoginDealer, SignupDealer, SignupDriver } from '../../Requests';
import CloseIcon from '@mui/icons-material/Close';
import data from '../../data/CS.json';
import './Authenticate.css';
// import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import { setAuth, setUser } from '../../actions/auth-actions';
import { isDealer } from '../../actions/user-actions';
const DRIVER="driver";
const DEALER="dealer";

export const SignUp=()=>{
    let dispatch=useDispatch();
    const form=useRef();
    const [Username, setUsername] = useState("");
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Mobile, setMobile] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [UniversityAdminEmail, setUniversityAdminEmail] = useState("");
    const [UniversityAdminName, setUniversityAdminName] = useState("");
    
    const [CPW, setCPW] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    // console.log("City",City);
    const onSubmit=(e)=>{
        if(Password===ConfirmPassword)
            {SignupDriver({
                "username": Username,
                "name": Name,
                "email": Email,
                "mobileNumber": Mobile,
                "password": Password,
                "address": address,
            })
            .then((res)=>{
                PostAuthenticate(res);
            })
            .catch((e)=>{
                if(e.response&&e.response.data){
                    let error=e.response.data[Object.keys(e.response.data)[0]];
                    setErrorMessage(error);
                    setCPW(true); 
                }
            })
        }
        else{
            setErrorMessage("Passwords Dont Match");
            setCPW(true);
        }

        console.log(e);

    }
    
    const PostAuthenticate=(res)=>{
        dispatch(setUser(res.data));
        dispatch(setAuth(true));
    }
    const action=(<IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={()=>setCPW(false)}
        >
        <CloseIcon fontSize="small" />
      </IconButton>)

    return (<>
        <CardContent>
            <Typography variant="h4" color="text.secondary">
            SIGNUP
            </Typography>
            <form ref={form} onSubmit={onSubmit}>
            <Box className="AuthBox2">
            <TextField required id="UN" variant="outlined" label="Username" placeholder='Username'
            value={Username} onChange={e => setUsername(e.target.value)}/>
            <TextField required id="NA" variant="outlined" label="Name" placeholder='Name'
            value={Name} onChange={e => setName(e.target.value)}/>
            <TextField required id="EM" variant="outlined" label="Email" placeholder='Email'
            value={Email} onChange={e => setEmail(e.target.value)}/>
            <TextField required id="MO" variant="outlined" label="Mobile" placeholder='Mobile'
            value={Mobile} onChange={e => setMobile(e.target.value)}/>
            <TextField required type="password" id="PA1" variant="outlined" label="Password" placeholder='Password'
            value={Password} onChange={e => setPassword(e.target.value)}/>
            <TextField required type="password" id="PA2" variant="outlined" label="Confirm Password" placeholder='Confirm Password'
            value={ConfirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
            <TextField required id="NM" variant="outlined" label="Address" placeholder='Address'
            value={ address} onChange={e => setAddress(e.target.value)}/>
            <TextField required id="NM" variant="outlined" label="Admin Email" placeholder='Admin Email'
            value={UniversityAdminEmail} onChange={e => setUniversityAdminEmail(e.target.value)}/>
            <TextField required id="NM" variant="outlined" label="Admin Name" placeholder='Admin Name'
            value={UniversityAdminName} onChange={e => setUniversityAdminName(e.target.value)}/>
            </Box>
            <Button onClick={onSubmit} id="CA">Sign Up</Button>
            </form>
        </CardContent>
        <Snackbar
        open={CPW}
        autoHideDuration={6000}
        onClose={()=>setCPW(false)}
        message={ErrorMessage}
        action={action}
        />
    </>);
}

export default SignUp;