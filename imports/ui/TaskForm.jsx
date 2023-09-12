import React from "react";
import { Meteor } from "meteor/meteor";
import { List } from "./List";
import { useTracker } from "meteor/react-meteor-data";

import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DrawerS } from "./components/drawer";
import { ThemeProvider } from "@mui/material";
import { Darktheme } from "./components/theme";


export const TaskForm = () => {
  const navigate = useNavigate();
  const submit=()=>{
    navigate('/adicionar')
  }
  
  const user = useTracker(() => Meteor.user());

  return (
    <div className="tarefas">
      <Box
       sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        
      }}>
      <h1>Lista de Tarefas</h1>
      
      <div>
        <List />
      </div>
      <div>
        <Button  type="submit"
              width = '100%'
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={submit}>Adicionar nova Tarefa</Button>
      </div>
      <ThemeProvider theme= {Darktheme}>
      <div>
      <DrawerS user = {user}/>
      </div>
      </ThemeProvider>
    </Box>

    </div>
  );
};
