import { Box, Button, Card, CardActions, CardContent, Checkbox, Dialog, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { AddExam, AddQuestion, GetAllSubjects } from '../../Requests';
import './formgen.css';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { setSubjects } from '../../actions/user-actions';
import { useDispatch } from 'react-redux';


const FormGen = ()=> {
    const OPTION_1="OPTION_1"
    const OPTION_2="OPTION_2"
    const OPTION_3="OPTION_3"
    const OPTION_4="OPTION_4"
    const [questions, setQuestions] = useState([]);
    const [question,setQuestion]=useState("");
    const subjects=useSelector((state)=>state.User.subjects);
    const [subject,setSubject]=useState("");
    const [quizTitle,setQuizTitle]=useState("");
    const [option1,setOption1]=useState("");
    const [option2,setOption2]=useState("");
    const [option3,setOption3]=useState("");
    const [option4,setOption4]=useState("");
    const [marks,setMarks]=useState(0);
    const [answer,setAnswer]=useState("");
    const [value,setValue]=useState(moment(new Date()).unix()*1000);
    const [endValue,setEndValue]=useState(moment(value+3600000).unix()*1000);
    const [dialogState, setDialogState] = useState(true);
    const [error, setError] = useState("");
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

    const dispatch=useDispatch();
    const getData=async()=>{
      let data=await GetAllSubjects();
      let temp=data.data;
      dispatch(setSubjects(temp));
    }
    useEffect(()=>{
      getData();
    },[])

    const handleClose = ()=>{
        if(subject==="" || quizTitle==="")
            setError("Please select a subject and Set a Name for Quiz");
        else{
            setError("");
            setDialogState(false);
        }
    }

    const handleAdd = async()=>{
        
        let temp={
            "questionText": question,
            "marks":marks,
            "optionOne":    option1,
            "optionTwo":    option2,
            "optionThree":  option3,
            "optionFour":   option4,
            "answer":       answer
        }
        try{
           temp = await AddQuestion(temp);
        }
        catch{
            console.warn("error");
        }

        // const uploadFile = (url, file) => {
        //     let formData = new FormData();
        //     formData.append("file", file);
        //     axios.post(url, formData, {
        //         headers: {
        //           "Content-Type": "multipart/form-data",
        //         },
        //       }).then((response) => {
        //         fnSuccess(response);
        //       }).catch((error) => {
        //         fnFail(error);
        //       });
        //   };
        //   const fnSuccess = (response) => {
        //     //Add success handling
        //   };
          
        //   const fnFail = (error) => {
        //     //Add failed handling
        //   };

        // if(isFilePicked){

        // }

        setQuestions([...questions,temp.data]);
        setQuestion("");
        setOption1("");
        setOption2("");
        setOption3("");
        setOption4("");
        setAnswer("");
        setMarks(0);
        setSelectedFile();
        setIsFilePicked(false);
    }

   const handleSubmit = ()=>{
    let tempQues=Object.values(questions).map((e)=>{
        console.log(e,"dataE");
        return e.questionId;
    });
    AddExam({
        "title": quizTitle,
        "subject": subject.subjectId,
        "startTime": value,
        "endTime": endValue,
        "questions": tempQues
    })
   }

   useEffect(() => {
    console.log(value,moment(value).unix(),"data2");
   },[value])
   

    const handleFile = (e)=>{
        setSelectedFile(e.target.files[0]);
        setIsFilePicked(true);
        console.log("filed picked");
    }
    return (
        <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
            <Dialog onClose={handleClose} open={dialogState}>
                <Box sx={{padding:'2.5em',display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <Typography variant="h5" align='center'>Quiz Details</Typography>
                    <br/>
                    <TextField error={error} value={quizTitle} label="Quiz Title" onChange={(e)=>{setQuizTitle(e.target.value)}}></TextField>
                    <br/>
                    <br/>
                    <FormControl>
                        <InputLabel id='test-select-label'>Choose A Subject</InputLabel>
                        <Select
                        error={error}
                        onChange={(e)=>{setSubject(e.target.value)}}
                        value={subject}
                        sx={{width:'15em'}}
                        labelId='test-select-label'
                        label="Choose Answer">
                            {
                                Object.values(subjects).map((e)=>{
                                    return(
                                        <MenuItem value={e}>{e.name}</MenuItem>
                                        )
                                    })
                                }
                        </Select>
                    </FormControl>
                    <br/>
                    <br/>
                    <Typography variant="h5">Start Time</Typography>
                    <br/>
                    <LocalizationProvider dateAdapter={AdapterMoment}>

                    <DateTimePicker
                        label="Date&Time picker"
                        value={value}
                        onChange={(e)=>{setValue(moment(e).unix()*1000);console.log(e,"data");}}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <br/>
                    <Typography variant="h5">End Time</Typography>
                    <br/>
                    <LocalizationProvider dateAdapter={AdapterMoment}>

                    <DateTimePicker
                        label="Date&Time picker"
                        value={endValue}
                        onChange={(e)=>{setEndValue(moment(e).unix()*1000);console.log(e,"data");}}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <br/>
                    <Button onClick={handleClose}>Start Creating!</Button>
                </Box>
            </Dialog>
            <Typography variant="h3">
                {`${quizTitle.toUpperCase()} Quiz`}
            </Typography>
            <br/>
            <br/>
                <TextField label="Subject" disabled value={subject.name}/>
            <br/>
            <Box className='container'>
                <TextField  value={question} label={`Question ${questions.length+1}`} onChange={(e)=>{setQuestion(e.target.value)}} sx={{minWidth:'calc(80vw - 15em)',margin:'1em 0'}}></TextField>
                <br/>
                <Box>
                    <input type="file" id="actual-btn" hidden onChange={handleFile}/>
                    <label for="actual-btn" id="file-upload">Attach File (Optional)</label>
                </Box>
                <br/>
                <Box className="options">
                    <TextField value={option1} label={`Option ${1}`} onChange={(e)=>{setOption1(e.target.value)}}></TextField>
                    <TextField value={option2} label={`Option ${2}`} onChange={(e)=>{setOption2(e.target.value)}}></TextField>
                    <TextField value={option3} label={`Option ${3}`} onChange={(e)=>{setOption3(e.target.value)}}></TextField>
                    <TextField value={option4} label={`Option ${4}`} onChange={(e)=>{setOption4(e.target.value)}}></TextField>
                </Box>
                <FormControl>
                    <InputLabel id='test-select-label'>Choose Answer</InputLabel>
                    <Select
                    onChange={(e)=>{setAnswer(e.target.value)}}
                    value={answer}
                    sx={{width:'15em'}}
                    labelId='test-select-label'
                    label="Choose Answer">
                        <MenuItem value={OPTION_1}>Option 1</MenuItem>
                        <MenuItem value={OPTION_2}>Option 2</MenuItem>
                        <MenuItem value={OPTION_3}>Option 3</MenuItem>
                        <MenuItem value={OPTION_4}>Option 4</MenuItem>
                    </Select>
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel id='test-select-label'>Marks for This Question</InputLabel>
                    <Select
                    onChange={(e)=>{setMarks(e.target.value)}}
                    value={marks}
                    sx={{width:'15em'}}
                    labelId='test-select-label'
                    label="Marks for This Question">
                        {
                            [1,2,3,4,5,6,7,8,9,10].map((i)=>{return(<MenuItem value={i}>{i}</MenuItem>)})
                        }
                    </Select>
                </FormControl>
                <br/>
                <Button sx={{width:'15em',height:'2.5em',fontSize:'1em'}} onClick={handleAdd} variant='contained'>Add a Question</Button>
            </Box>
            <Box className='questions-container'>
            {questions.map((question,index)=>{
                return <Card sx={{minWidth:"20em",marginRight:'1em',marginTop:'1em'}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {`Question ${index+1}: `}{question.questionText}
                            <span style={{color:'rgb(60,150,200)',border:'rgb(60,150,200) 1px solid',padding:'0.5em',borderRadius:'1em',marginLeft:'1em'}}>{question.marks} Marks</span>
                        </Typography>
                        <List>
                            <ListItem>
                                <Checkbox
                                edge="start"
                                checked={OPTION_1===question.answer}
                                disableRipple
                                />
                                <ListItemText>
                                {question.optionOne}
                                </ListItemText>
                            </ListItem>
                            <ListItem>  
                                <Checkbox
                                edge="start"
                                checked={OPTION_2===question.answer}
                                disableRipple
                                />
                                <ListItemText>
                                {question.optionTwo}
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <Checkbox
                                edge="start"
                                checked={OPTION_3===question.answer}
                                disableRipple
                                />
                                <ListItemText>
                                {question.optionThree}
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <Checkbox
                                edge="start"
                                checked={OPTION_4===question.answer}
                                disableRipple
                                />
                                <ListItemText>
                                {question.optionFour}
                                </ListItemText>
                            </ListItem>
                        </List>
                    </CardContent>
                    <CardActions sx={{justifyContent:'center'}}>
                        <Button size="small" color="error">Remove</Button>
                    </CardActions>
                    </Card>
                })
            }
            </Box>
            <Box sx={{marginBottom:'5em'}}>
                <Button sx={{width:'10em',height:'2.5em',fontSize:'1em'}} onClick={handleSubmit} variant='contained'>Submit Quiz</Button>
            </Box>
        </Box>
    )
}

export default FormGen