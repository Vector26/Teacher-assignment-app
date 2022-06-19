import { Box, Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { GetExamsByID } from '../../Requests';


export default function Quiz() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [steps, setSteps] = React.useState([]);
    const [skipped, setSkipped] = React.useState(new Set());
    const ID=window.location.href.split("/")[window.location.href.split("/").length-1]
    const [Exam, setExam] = useState({questions:[]});
    const TIMOUT=3000;
    if(ID==="Quiz" || ID==="")
        window.location.href="/dashboard";
    const getData = async ()=>{
        try{
            let res=await GetExamsByID(ID);
            setExam(res.data);
        }
        catch{
            console.warn("ERROR");
        }
    }

    useEffect(()=>{
        getData();
    },[])

  useEffect(() => {
    window.addEventListener('blur', function(){
        console.log(steps.length,"length");
        setActiveStep(steps.length);
     }, false);
  },[])



  useEffect(() => {
    // console.log("exam state",typeof(Object.values(Exam.questions)),Exam.questions[1]);
    let temp=[]
    if(Exam.questions.length!==0)
    {
        for(let i=1;i<Exam.questions.length+1;i++)
        {
            temp.push(i);
        }
        setSteps(temp);
        console.log(Exam,"Exam update");
    }
  },[Exam])

  useEffect(() => {
    console.log(activeStep,steps.length,"status");
    if(activeStep===steps.length && steps.length!==0){
        setTimeout(()=>{
            window.location.href="/dashboard";
        },3000)
    }
  }, [activeStep,Exam])
  
  
  const isStepOptional = (step) => {
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%',padding:'1em 2em'}}>
      <Stepper activeStep={activeStep} sx={{marginLeft:'-1em'}}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
            <br/>
            <br/>
            <br/>
          <Typography variant="h3" sx={{ mt: 2, mb: 1 }}>
            You have finished {`${Exam.title}`}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ mt: 2, mb: 1,backgroundColor:'#1561ad',borderRadius:'2em',margin:'1em auto',width:'50%',color:'white',padding:'2em 0'}}>
            {/* Content */}
            {Exam?.questions[activeStep] && <Typography variant='h5'>{Exam?.questions[activeStep]?.questionText}</Typography>}
            <FormControl>
            <RadioGroup>
                {console.log(Exam,"Exam")}
                {Exam?.questions[activeStep] && <>
                <FormControlLabel value={Exam?.questions[activeStep]?.optionOne} control={<Radio />} label={Exam?.questions[activeStep]?.optionOne} />
                <FormControlLabel value={Exam?.questions[activeStep]?.optionTwo} control={<Radio />} label={Exam?.questions[activeStep]?.optionTwo} />
                <FormControlLabel value={Exam?.questions[activeStep]?.optionThree} control={<Radio />} label={Exam?.questions[activeStep]?.optionThree} />
                <FormControlLabel value={Exam?.questions[activeStep]?.optionFour} control={<Radio />} label={Exam?.questions[activeStep]?.optionFour} />
                </>
                }    
            </RadioGroup>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}