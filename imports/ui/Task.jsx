import React from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import moment from "moment";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActions, Typography } from "@mui/material";
import { ExpandMore } from "@material-ui/icons";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { parseStatus } from "../api/functions";
import { createTheme, ThemeProvider } from "@mui/material";

const mainTheme = createTheme({
  primary: {
    main: "#34bfff",
  },
  secondary: {
    main: "#afafaf",
  },
});

export const Task = ({ task, onDeleteCLick }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const user = useTracker(() => Meteor.user());
  function goToEdit(edit) {
    console.log("enviado: ", edit);

    if (edit.userId != user._id) {
      alert("Voce nao possui permissao para editar.");
      return;
    }

    if (edit?.status == "DONE") {
      alert("Tarefas concluidas não podem ser editadas.");
      return;
    }

    navigate("/editar", { state: edit });
  }
  function onDeleteCLick() {
    if (task.userId != user._id) {
      alert("voce nao possui permissao para remover.");
    }
    Meteor.call("tasks.remove", task._id);
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <div style={{padding: '20px'}} >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Card sx={{ minWidth: 275 }}>
            <div>
            <div>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {" "}
                  Create By: {task.username}
                </Typography>
                <Typography variant="h5" component="div">
                  Tarefa: {task.text}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {moment(task.date).format("DD/MM/YYYY HH:mm:ss")}
                </Typography>
                {task.status && (
                  <Typography variant="span" color="text.secondary">
                    Status: {parseStatus(task.status)}
                  </Typography>
                )}
              </CardContent>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>

              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Descrição:</Typography>
                  <Typography paragraph>{task.descricao}</Typography>
                </CardContent>
              </Collapse>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              padding: '10px',
              }}>
              <Button
                variant="contained"
                style={{marginBottom: '10px'}}
                onClick={() => onDeleteCLick(task)}
              >
                <DeleteForeverIcon />
              </Button>
              <Button 
                variant="contained"
                color={task?.status == "DONE" ? "secondary" : "primary"}
                disable={task?.status == "DONE"}
                onClick={() => goToEdit(task)}
              >
                Editar
              </Button>
            </div>
            </div>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
};
