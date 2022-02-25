import { Injectable } from '@angular/core';
import { NotificationType } from 'angular2-notifications';
import { FadeNotificationService } from './fade-notification.service';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  public UrlApiNet: string = 'http://localhost:4320/';

  constructor(private serviceNotify: FadeNotificationService) {}

  public httpAccess(HttpEventType: string, urlName: string, jsonData: any) {
    let apiFull = this.UrlApiNet.concat(urlName);

    var req = new XMLHttpRequest();
    console.log(jsonData);
    req.open(HttpEventType, apiFull, false);
    req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    req.send(jsonData);

    console.log(req.status);

    if (req.status == 200) {
      return HttpEventType == 'GET' ? JSON.parse(req.responseText) : req.status;
    } else if (req.status == 204) {
      this.serviceNotify.sendNotification(
        NotificationType.Warn,
        'No Content',
        5000
      );
      return 'No Content';
    } else if (req.status == 401) {
      this.serviceNotify.sendNotification(
        NotificationType.Info,
        'Unauthorized',
        5000
      );
      return 'Unauthorized';
    } else {
      this.serviceNotify.sendNotification(
        NotificationType.Error,
        'Error',
        5000
      );
      return console.log('Error');
    }
  }
}
