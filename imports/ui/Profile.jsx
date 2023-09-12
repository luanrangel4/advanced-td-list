import React from "react";
import { Meteor } from "meteor/meteor";
import { Box, List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { DrawerS } from "./components/drawer";
import { useTracker } from "meteor/react-meteor-data";
import { Avatar, ThemeProvider } from "@mui/material";
import { Darktheme } from "./components/theme";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";

export const Profile = () => {
  const user = useTracker(() => Meteor.user());
  return (
    <div className="user-profile">
      <Box noValidate autoComplete="off">
        <Grid container justifyContent="center">
          <Grid item>
            <Box
              component="main"
              sx={{
                display: "flex",
                flexDirection: "colum",
                height: "100vh",
              }}
            >
              <Toolbar />

              <List>
                <ListItem>
                  <Avatar src={user.profile.photo}></Avatar>
                </ListItem>

                <ListItem>
                  <Typography>Nome: {user.username}</Typography>
                </ListItem>

                <ListItem>
                  <Typography>Email: {user.emails[0].address}</Typography>
                </ListItem>

                <ListItem>
                  <Typography>
                    Data de Nascimento: {user.profile.dataNascimento}
                  </Typography>
                </ListItem>

                <ListItem>
                  <Typography>Sexo: {user.profile.Sexo}</Typography>
                </ListItem>

                <ListItem>
                  <Typography>Empresa: {user.profile.empresa}</Typography>
                </ListItem>
              </List>
              <ThemeProvider theme={Darktheme}>
                <DrawerS />
              </ThemeProvider>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
