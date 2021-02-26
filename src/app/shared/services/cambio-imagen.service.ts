import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CambioImagenService {

  private imagenObserver = new Subject<any>();
  public imagenDir$ = this.imagenObserver.asObservable();
  
  constructor() { }

  public changeImageDir(dir) { 
    this.imagenObserver.next(dir);
  }
}