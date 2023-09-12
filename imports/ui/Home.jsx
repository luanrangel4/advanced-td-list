import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/TasksCollection";
import { Box, ThemeProvider } from "@mui/material";
import { DrawerS } from "./components/drawer";
import { Darktheme } from "./components/theme";
import { Meteor } from "meteor/meteor";
import { LoginForm } from "./LoginForm";
import CardList from "./components/card";
import { Layout } from "./components/Layout";

export const Home = () => {

  const user = useTracker(() => Meteor.user());

  const { tasks } = useTracker(() => {
    const tasks = TasksCollection.find().fetch();
    return { tasks };
  });

  return (
    <div>
      {user ? (
        <>
          <ThemeProvider theme={Darktheme}>
            <div className="layout">
              <Box display="flex" >
                <Layout titulo="Pagina Inicial"></Layout>
                
              </Box>
            </div>
            <Box>
           <CardList/>
           </Box>
            <Box>
              <Box>
                <DrawerS user = {user}/>
              
              </Box>
             
            </Box>
          </ThemeProvider>
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};
