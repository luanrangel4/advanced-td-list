import { Button } from "@material-ui/core";

export function parseStatus(status) {
  if (status == "NEW") {
    return "Cadastrada";
  } else if (status == "IN PROGRESS") {
    return "Em Andamento";
  } else if (status == "DONE") {
    return "Concluida";
  } else {
    return status;
  }
}
