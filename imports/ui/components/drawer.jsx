import { Drawer, List, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { Box, ListItemIcon, ListItemText } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Typography } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { ListItemButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Person2Icon from "@mui/icons-material/Person2";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
export const DrawerS = () => {
  const user = useTracker(() => Meteor.user());
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const logout = () => Meteor.logout()
    
  
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/Profile");
  };

  const  homeClick = () =>{
    navigate("/home")
  }

  const colortheme = createTheme({
    palette: {
      primary: { main: "#eceff1", contrastText: "#eceff1" },
    },
  });
  return (
    <>
      <Drawer open={true} variant= {smDown ? 'temporary' : 'permanent'}>
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width='100%'
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar 
           
           src={user?.profile?.photo}> 
           </Avatar>
          </Box>
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={colortheme}>
              <Typography variant="overline" color="primary">
                Bem Vindo!
              </Typography>
            </ThemeProvider>
          </Box>

          <Divider></Divider>

          <Box flex={1}>
            <List component="nav">
              <ListItemButton onClick={homeClick}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>

                <ListItemText primary="Home" color="primary">
                 
                </ListItemText>
              </ListItemButton>
            </List>
            <List component="nav">
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <Person2Icon />
                </ListItemIcon>
                <ListItemText primary="Perfil" color="primary">
                 
                </ListItemText>
              </ListItemButton>
            </List>
            <List component="nav">
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <LogoutIcon  />
                </ListItemIcon>

                <ListItemText primary="Sair" color="primary">
                 
                </ListItemText>
              </ListItemButton>
            </List>

          </Box>
        </Box>


      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        
      </Box>
    </>
  );
};
