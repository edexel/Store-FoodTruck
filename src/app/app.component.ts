import { Component } from '@angular/core';
import { DialogModalService } from './services/dialog-modal.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {


  constructor(private dialogService:DialogModalService ) {}

  openModal() {
    this.dialogService.openDialog({
      title:'Demo title',
      body:'Somethng body descripction',
      buttons:{
        positive:'yes',
        negative:'No'
      }
    }).then(result => {
      console.log(result);
    }, () => {
      
    });
  }
}
