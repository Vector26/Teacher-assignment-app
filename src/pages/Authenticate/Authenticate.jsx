import { Button, Card, CardActions, CardContent, Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { CONTRAST_TEXT,LIGHT_PRIMARY} from '../../Colors'
import './Authenticate.css';
import { Login } from './Login';
const Authenticate = () => {
    return (
      <>
        <Box className="WorkBox">
        <Card className="AuthBox" sx={{maxWidth:350,backgroundColor:CONTRAST_TEXT}}>
            <Login/>
        </Card>
    </Box>
    </>
  )
}

export default Authenticate 