import { Moment } from 'moment';
import { ImagenUsuario } from './imagen-usuario.model';

export interface IUsuario {
    id?: number;
    email?: string;
    password?: string;
    rol?: string;
    active?: boolean;
    imagenUsuario?: ImagenUsuario;
    created?: Moment;
    modified?: Moment;
}

export class Usuario implements IUsuario {
    constructor(
        public id?: number,
        public email?: string,
        public password?: string,
        public rol?: string,
        public active?: boolean,
        public imagenUsuario?: ImagenUsuario,
        public created?: Moment,
        public modified?: Moment
    ) {}
}