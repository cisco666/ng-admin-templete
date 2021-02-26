import { Usuario } from "./usuario.model";

export interface ILogin {
  code?: number;
  usuario?: Usuario;
  token?: string;
}

export class Login implements ILogin {
  constructor(
    public code?: number,
    public usuario?: Usuario,
    public token?: string
  ) { }
}