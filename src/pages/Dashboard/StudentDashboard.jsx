import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Card, CardActions, CardContent, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import './Admin.css';
import { setExams } from '../../actions/user-actions';
import { GetExamsRoute } from '../../Requests';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const drawerWidth = 240;

function StudentDashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const contentMap={
    "Stats":<AddSubjects/>,
    "Quizzes":<GetExams/>,
  }
  const [content, setContent] = React.useState(Object.values(contentMap)[0])

  const renderDashboardContent =(key)=>{
    setContent(contentMap[key]);
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar/>
      <Divider />
      <List>
        {Object.keys(contentMap).map((text, index) => (
          <ListItem key={text}>
            <ListItemButton onClick={()=>renderDashboardContent(text)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex'}}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Student Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        className="content-parent"
        sx={{padding:'2em'}}
      >
        {/* Content render */}
        <Box>
          {content}
        </Box>
      </Box>
    </Box>
  );
}

const AddSubjects=()=>{
  const subject=["Hindi","English"];
  return(<Box className="content">
      <Typography variant="h4">Analysis Dashboard</Typography>
      <br/>
      <Box sx={{display:'flex',flexWrap:'wrap',justifyContent:'space-evenly',backgroundColor:'rgb(240,240,240)',padding:'1em'}}>
      {subject.map((sub)=>{
        return <Card sx={{ minWidth: '10em' ,marginRight:'1em',marginTop:'1em'}}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {sub}
                </Typography>
              </CardContent>
              <CardActions sx={{justifyContent:'center'}}>
                <Button size="small" color="error">Remove</Button>
              </CardActions>
            </Card>
        })
      }
      </Box>
    </Box>
  )
}
const GetExams=()=>{
    const Exams=useSelector((state)=>state.User.exams);
    const dispatch=useDispatch();
    const getData=async()=>{
        let data=await GetExamsRoute();
        let temp=data.data;
        dispatch(setExams(temp));
    }
    React.useEffect(()=>{
        getData();
    },[])
   
    return(
        <Box sx={{}}>
            <Typography variant='h4' align='center'>Quizzes Available</Typography>
            <Box sx={{padding:'2em',display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
            {Exams.map((sub)=>{
                return <Card sx={{ minWidth: 275 ,marginRight:'1em',marginTop:'1em'}}>
                    <CardContent>
                        <Typography variant="h4" color="text.secondary" gutterBottom>
                            {sub.title}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {sub?.subject?.name}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{justifyContent:'center'}}>
                        <Button size="small" color="error" onClick={()=>window.location.href=`/Quiz/${sub.examId}`}>Take test!</Button>
                    </CardActions>
                    </Card>
                })
            }
            </Box>
        </Box>
    )
}
const AddStudents=()=>{
  const subject=["Hindi","Englishdfsdfdsfddfdsf"];
  return(
    <Box className="content">
      <Typography variant="h4">Add Students</Typography>
      <br/>
      <Box>
        <FormControl className="add-teacher-form" sx={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
          <TextField size="small" label="Student Name"/>
          <TextField size="small" label="Student Email"/>
          {/* <TextField size="small" label="Gender"/> */}
          <TextField size="small" label="Password"/>
          <TextField size="small" label="Phone Number"/>
          <Box>
            <Typography>Gender:</Typography>
            <Select sx={{minWidth:'10em'}}
            >
              <MenuItem value="M">Male</MenuItem>
              <MenuItem value="F">Female</MenuItem>
            </Select>
          </Box>
          <Box>
            <Typography>Subjects:</Typography>
            <Select sx={{minWidth:'10em'}}>
              {
                subject.map((e)=>{
                  return(
                    <MenuItem value={e}>{e}</MenuItem>
                    )
                  })
                }
            </Select>
          </Box>
        </FormControl>
        <Button sx={{width:'5em',height:'2.5em',fontSize:'1em'}} variant='contained'>Add</Button>
      </Box>
      <br/>
      <Box sx={{display:'flex',width:'100%'}}>
        <Typography variant="h5">Registred Students</Typography>
      </Box>
      <Box sx={{display:'flex',flexWrap:'wrap',width:'100%'}}>
      {subject.map((sub)=>{
        return <Card sx={{ minWidth: 275 ,marginRight:'1em',marginTop:'1em'}}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {sub}
                </Typography>
              </CardContent>
              <CardActions sx={{justifyContent:'center'}}>
                <Button size="small" color="error">Remove</Button>
              </CardActions>
            </Card>
        })
      }
      </Box>
    </Box>
  )
}


export default StudentDashboard