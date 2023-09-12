import React, { useState } from "react";
import { Accounts } from "meteor/accounts-base";
import { Link, useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

export const Registrar = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [Sexo, setSexo] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [photo, setPhoto] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Accounts.createUser({
      email: email,
      password: password,
      username: username,
      profile: {
        Sexo: Sexo,
        empresa: empresa,
        photo: photo,
        dataNascimento: dataNascimento
      }

  
    });
    alert('Cadastrado com sucesso!')
    navigate("/");
  };

  const submitFile = (a) => {
    const file = a.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhoto(e.target.result);
      console.log(setPhoto);
    };
    reader.readAsDataURL(file);
  };

  return (
    <React.Fragment>
      <h2>FORMULÁRIO DE REGISTRO</h2>

      <form
        onSubmit={handleSubmit}
        className="cadastro"
        
      >
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Nome Completo"
            placeholder="Nome Completo"
            required
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            fullWidth
          />
        </Stack>
        <TextField
          type="password"
          variant="outlined"
          color="secondary"
          label="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          fullWidth
          sx={{ mb: 4 }}
        />

        <TextField
          type="email"
          variant="outlined"
          color="secondary"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          fullWidth
          required
          sx={{ mb: 4 }}
        />

        <TextField
          type="date"
          variant="outlined"
          color="secondary"
          onChange={(e) => setDataNascimento(e.target.value)}
          value={dataNascimento}
          fullWidth
          required
          sx={{ mb: 4 }}
        />

        <TextField
          type="text"
          variant="outlined"
          color="secondary"
          label="Empresa"
          onChange={(e) => setEmpresa(e.target.value)}
          value={empresa}
          fullWidth
          required
          sx={{ mb: 4 }}
        />

        <TextField
          type="file"
          variant="outlined"
          color="secondary"
          label="Foto"
          onChange={submitFile}
          fullWidth
          required
          sx={{ mb: 4 }}
        />

        <TextField
          select
          onChange={(e) => setSexo(e.target.value)}
          value={Sexo}
          required
          sx={{ mb: 4 }}
        >
          <MenuItem value={"Masculino"}> Masculino</MenuItem>
          <MenuItem value={"Feminino"}> Feminino</MenuItem>
        </TextField>
        <br />

        <Button variant="outlined" color="secondary" type="submit" onClick={handleSubmit}>
          Registrar
        </Button>
      </form>
      <small>
        Já tem uma conta?<Link to="/login">Entre aqui</Link>
      </small>
    </React.Fragment>
  );
};
