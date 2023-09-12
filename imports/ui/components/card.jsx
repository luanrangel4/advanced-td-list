import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import React, {useState, useEffect} from "react";
import Button from '@mui/material/Button';
import { TasksCollection } from "/imports/api/TasksCollection";
import {Meteor} from 'meteor/meteor';

import { useNavigate } from "react-router-dom";

export default function CardList() {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [totalDone, setTotalDone] = useState(0);
  const [totalInProg, setTotalInProg] = useState(0);
  
  const submit = () => {
    navigate("/formulario");
  };
  

  async function loadCount(){
    await Meteor.call("tasks.count", null, (err, result) => {
      if(err){
        console.log(err);
        return;
      }

      console.log("resultado2: ", result);

      setTotal(result.total);
      setTotalDone(result.totalConcluidos);
      setTotalInProg(result.totalEmAndamento);
    });
    
  }


  useEffect(() => {
    loadCount();
  }, []);

  
  return (
    <div className="cards">
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          maxWidth: 345,
          alignItems: "center",
          position: "revert-layer",
        }}
      >
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Tarefas Cadastradas
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {total}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ display: "flex", justifyContent: "center", maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Tarefas em Progresso
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {totalInProg}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ display: "flex", justifyContent: "center", maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Tarefas Completas
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {totalDone}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ display: "flex", justifyContent: "center", maxWidth: 345 }}>
        <CardActionArea onClick={submit}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Visualizar Tarefas
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
