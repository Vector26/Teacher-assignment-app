import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./Admin.css";
import {
  AddStudent,
  AddSubject,
  AddTeacher,
  GetAllSubjects,
} from "../../Requests";
import { useDispatch, useSelector } from "react-redux";
import { setSubjects } from "../../actions/user-actions";
import { LIGHT_PRIMARY } from "../../Colors";

const drawerWidth = 240;

const AdminDashboard = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const contentMap = {
    "Add Subjects": <AddSubjects />,
    "Add Teachers": <AddTeachers />,
    "Add Students": <AddStudents />,
  };
  const [content, setContent] = useState(Object.values(contentMap)[0]);

  const renderDashboardContent = async (key) => {
    // console. ("data",);
    setContent(contentMap[key]);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {Object.keys(contentMap).map((text, index) => (
          <ListItem key={text}>
            <ListItemButton onClick={() => renderDashboardContent(text)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
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
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ minWidth: "65vw", padding: "2em" }}>
        {/* Content render */}
        <Box>{content}</Box>
      </Box>
    </Box>
  );
};
const AddSubjects = () => {
  const [Subject, setSubject] = useState("");
  const [code, setCode] = useState("");
  const subject = useSelector((state) => state.User.subjects);
  const dispatch = useDispatch();
  const getData = async () => {
    let data = await GetAllSubjects();
    let temp = data.data;
    dispatch(setSubjects(temp));
  };
  useEffect(() => {
    getData();
  }, []);

  const handleAdd = async () => {
    try {
      let res = await AddSubject({ name: Subject, subjectCode: code });
      getData();
    } catch {
      console.log("error");
    }
  };
  return (
    <Box className="content">
      <Typography variant="h4">Add Subjects</Typography>
      <br />
      <Box sx={{ display: "flex" }}>
        <div>
          <TextField
            value={Subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            size="small"
            sx={{ width: "100%", marginBottom: "1em" }}
            label="Add subject"
          />
          <TextField
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
            size="small"
            sx={{ width: "100%" }}
            label="Add Code"
          />
        </div>
        <Button
          sx={{
            width: "5em",
            height: "2.5em",
            fontSize: "1em",
            marginLeft: "1em",
          }}
          variant="contained"
          onClick={handleAdd}
        >
          Add
        </Button>
      </Box>
      <br />
      <Box sx={{ display: "flex", width: "100%" }}>
        <Typography variant="h5">Subjects</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          backgroundColor: "rgb(240,240,240)",
          padding: "1em",
        }}
      >
        {subject?.map((sub) => {
          return (
            <Card
              sx={{ minWidth: "25em", marginRight: "1em", marginTop: "1em" }}
            >
              <CardContent>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  {sub.name.toUpperCase()}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button size="small" color="error">
                  Remove
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};
const AddTeachers = () => {
  const subject = useSelector((state) => state.User.subjects);
  console.log("subs22", Object.values(subject));
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [subjects, setSubjects] = useState("");

  const handleSubmit = async () => {
    const payload = {
      name: teacherName,
      email: teacherEmail,
      gender: gender,
      password: password,
      phoneNumber: phone,
      subjects: Object.values(subjects),
    };
    try {
      let res = await AddTeacher(payload);
      console.log(res, "teacher Added");
      setGender("");
      setTeacherEmail("");
      setTeacherName("");
      setSubjects([]);
      setPhone("");
      setPassword("");
    } catch {
      console.log("ERROR");
    }
  };

  return (
    <Box className="content">
      <Typography variant="h4">Add Teachers</Typography>
      <br />
      <Box>
        <FormControl
          className="add-teacher-form"
          sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}
        >
          <TextField
            size="small"
            label="Teacher Name"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
          />
          <TextField
            size="small"
            label="Teacher Email"
            value={teacherEmail}
            onChange={(e) => setTeacherEmail(e.target.value)}
          />
          {/* <TextField size="small" label="Gender"/> */}
          <TextField
            size="small"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            size="small"
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Box>
            <Typography>Gender:</Typography>
            <Select
              sx={{ minWidth: "10em" }}
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
            </Select>
          </Box>
          <Box>
            <Typography sx={{ marginLeft: "-6em" }}>Subjects:</Typography>
            <Box sx={{}}>
              <Select
                size="small"
                sx={{ minWidth: "10em", height: "2.5em" }}
                onChange={(e) => {
                  setSubjects([...subjects, e.target.value]);
                  console.log(subjects);
                }}
              >
                {Object.values(subject).map((e) => {
                  let name = e.name;
                  let id = e.subjectId;

                  return (
                    <MenuItem value={e}>
                      <p>{name.toUpperCase()}</p>
                    </MenuItem>
                  );
                })}
              </Select>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                {Object.values(subjects).map((e) => {
                  return (
                    <Typography
                      variant="h6"
                      sx={{
                        maxWidth: "5em",
                        backgroundColor: "#6200EE",
                        borderRadius: "0.5em",
                        padding: "0.25em 0.5em",
                        margin: "1em 0",
                        marginLeft: "1em",
                        color: "white",
                      }}
                    >
                      {e.name}
                    </Typography>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </FormControl>
        <Button
          sx={{ width: "5em", height: "2.5em", fontSize: "1em" }}
          onClick={handleSubmit}
          variant="contained"
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};
const AddStudents = () => {
  const subject = useSelector((state) => state.User.subjects);
  const [studentName, setstudentName] = useState("");
  const [studentEmail, setstudentEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [subjects, setSubjects] = useState([]);

  const handleSubmit = async () => {
    const payload = {
      name: studentName,
      email: studentEmail,
      gender: gender,
      password: password,
      phoneNumber: phone,
      subjects: Object.values(subjects),
    };
    try {
      let res = await AddStudent(payload);
      console.log(res, "teacher Added");
      setGender("");
      setstudentEmail("");
      setstudentName("");
      setSubjects([]);
      setPassword("");
      setPhone("");
    } catch {
      console.log("ERROR");
    }
  };

  return (
    <Box className="content">
      <Typography variant="h4">Add Students</Typography>
      <br />
      <Box>
        <FormControl
          className="add-teacher-form"
          sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}
        >
          <TextField
            size="small"
            label="Student Name"
            value={studentName}
            onChange={(e) => setstudentName(e.target.value)}
          />
          <TextField
            size="small"
            label="Student Email"
            value={studentEmail}
            onChange={(e) => setstudentEmail(e.target.value)}
          />
          {/* <TextField size="small" label="Gender"/> */}
          {/* <TextField
            size="small"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} */}
          {/* /> */}
          <TextField
            size="small"
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Box>
            <Typography>Gender:</Typography>
            <Select
              sx={{ minWidth: "10em" }}
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
            </Select>
          </Box>
          <Box>
            <Typography sx={{ marginLeft: "-6em" }}>Subjects:</Typography>
            <Box sx={{}}>
              <Select
                size="small"
                sx={{ minWidth: "10em", height: "2.5em" }}
                onChange={(e) => {
                  setSubjects([...subjects, e.target.value]);
                  console.log(subjects);
                }}
              >
                {Object.values(subject).map((e) => {
                  let name = e.name;
                  let id = e.subjectId;

                  return (
                    <MenuItem value={e}>
                      <p>{name.toUpperCase()}</p>
                    </MenuItem>
                  );
                })}
              </Select>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                {Object.values(subjects).map((e) => {
                  return (
                    <Typography
                      variant="h6"
                      sx={{
                        maxWidth: "5em",
                        backgroundColor: "#6200EE",
                        borderRadius: "0.5em",
                        padding: "0.25em 0.5em",
                        margin: "1em 0",
                        marginLeft: "1em",
                        color: "white",
                      }}
                    >
                      {e.name}
                    </Typography>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </FormControl>
        <Button
          sx={{ width: "5em", height: "2.5em", fontSize: "1em" }}
          onClick={handleSubmit}
          variant="contained"
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
