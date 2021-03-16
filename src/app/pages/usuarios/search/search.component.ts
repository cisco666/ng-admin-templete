import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Usuario } from 'src/app/shared/models/usuario.model';
import { IUsuariosPaginator } from 'src/app/shared/models/usuarios.paginator.model';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() isVisible;
  @Output() searchCompleted = new EventEmitter<IUsuariosPaginator>();
  
  isOkLoading = false;

  searchForm: FormGroup;

  constructor(
    protected fb: FormBuilder,
    protected usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: ['', Validators.required]
    }); 
  }

  handleOk(): void {
    this.isOkLoading = true;

    const filter = this.searchForm.get('search').value;

    this.usuariosService.search(filter).subscribe(resp => {
      this.isVisible = false;
      this.isOkLoading = false;

      let usuarios: IUsuariosPaginator;
      usuarios = resp.body;

      this.searchForm.reset();

      this.searchCompleted.emit(usuarios);
    });
  }

  handleCancel(): void {
    this.isVisible = false;
    this.searchCompleted.emit(null);
  }

}
