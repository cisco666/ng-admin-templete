import { Moment } from "moment";

export interface IImagenUsuario { 
  usuario_id?: number;
  nombre?: string;
  dir?: string;
  mime?: string;
  size?: number;
  created?: Moment;
  modified?: Moment;
  file?: any
}

export class ImagenUsuario implements IImagenUsuario { 
  constructor(
    public usuario_id?: number,
    public nombre?: string,
    public dir?: string,
    public mime?: string,
    public size?: number,
    public created?: Moment,
    public modified?: Moment,
    public file?: any
  ) { }
}