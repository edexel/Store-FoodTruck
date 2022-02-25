import { Injectable } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Injectable({
  providedIn: 'root',
})
export class FadeNotificationService {
  constructor(private _service: NotificationsService) {}

  sendNotification(type:NotificationType ,message: string,timeOut:number=2000) {
    this._service.create('Success', message,type, {
      position: ['buttom', 'right'],
      timeOut: timeOut,
      animation: 'fade',
      showProressBar: true,
    });




  }
}
