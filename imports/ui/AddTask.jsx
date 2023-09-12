import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
 
export const AddTask = () => {

  const navigate = useNavigate();
  const user = useTracker(() => Meteor.user());
  const [text, setText] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) return;

    Meteor.call("tasks.insert", text, descricao, new Date(), user.username);
    setText("");
    setDescricao("");
    navigate('/formulario')
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h1>Cadastro de Tarefas</h1>

      <div>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            variant="outlined"
            label="Nome"
            type="text"
            placeholder="Nome da tarefa"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Stack>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            variant="outlined"
            label="Descricao"
            type="text"
            placeholder="Descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </Stack>
        <br />
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Registrar
        </Button>
      </div>
    </form>
  );
};
