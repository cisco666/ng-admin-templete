import { Paginator } from "./paginator.model";
import { Usuario } from "./usuario.model";

export interface IUsuariosPaginator {
  usuarios?: Usuario[];
  paginator?: Paginator;
}

export class UsuariosPaginator implements IUsuariosPaginator {
  constructor(
    public usuarios?: Usuario[],
    public paginator?: Paginator
  ) {}
}