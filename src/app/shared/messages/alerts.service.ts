import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private message: NzMessageService) { }

  /*
  *
  * TYPES : success, error, warning, info
  * 
  */
  
  createMessage(type: string, msg: string, duration: number): void {
    this.message.create(type, msg, {
      nzDuration: duration
    });
  }
}
