import React from "react";
import { Home } from "./Home";
import { LoginForm } from "./LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Registrar } from "./Cadastrar";
import { TaskForm } from "./TaskForm";
import ErrorPage from "./pages/erroPage";
import { Profile } from "./Profile";
import { AddTask } from "./AddTask";
import { EditTask } from "./EditTaks";
export const AppRoutes = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/home"
          element={<Home user={user} />}
          errorElement={<ErrorPage />}
        />
        <Route path="/Login" element={<LoginForm />}></Route>
        <Route path="/Cadastro" element={<Registrar />}></Route>
        <Route path="/formulario" element={<TaskForm user={user} />}></Route>
        <Route path="/editar" element={<EditTask user={user} />}></Route>
        <Route path="/profile" element={<Profile user={user} />}></Route>
        <Route path="/*" errorElement={<ErrorPage />}></Route>
        <Route path="/adicionar" element={<AddTask user={user} />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
