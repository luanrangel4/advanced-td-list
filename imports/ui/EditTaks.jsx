import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { Stack } from "@mui/material";

const stats = [
  {key: 1, value: "NEW", label: "NOVO"},
  {key: 2, value: "IN PROGRESS", label: "EM ANDAMENTO"},
  {key: 3, value: "DONE", label: "CONCLUIDO"}
];

export function EditTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const location = useLocation();
  const task = location?.state;
  const navigate = useNavigate();

  function setItem() {
    setTitle(task.text);
    setDescription(task.descricao);
    setStatus(task.status)
  }

  useEffect(() => {
    setItem();
  }, []);

  function handleSubmit() {
    Meteor.call("tasks.update", task._id, title, status, description, task.username, task.date);

    alert("Salvo com sucesso");

    navigate("/formulario");
  }

  return (
    <div style={{display: "flex", flexDirection: 'column'}}>
      <h1>Editar Tarefas </h1>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
      <TextField
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      </Stack>
      <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
      <TextField
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
</Stack>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Selecione um Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Selecione um Status"
          onChange={(e) => setStatus(e.target.value)}
        >
          {stats.map((value, index) => (
            <MenuItem key={value.key} value={value.value}>{value.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
<br />
      <Button variant="outlined"  color="primary" onClick={() => handleSubmit()}>
        Salvar
      </Button>
    </div>
  );
}
