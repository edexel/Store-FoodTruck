import { Component, EventEmitter, Input,  Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() ColGrid: any;
  @Input() DataGrid: any;
  @Input() DataPaging: any;
  @Input() ButtonTable: any;
  @Input() Modal:any;
  @Output() PagingOut = new EventEmitter();
  @Output() ButtonOut = new EventEmitter();

  constructor() {
   
  }

  changePagingEmit(): void {
    console.log(this.ButtonTable);
    this.PagingOut.emit(this.DataPaging);
  }

  doAction(id: string, button: any) {
  
    button.keyId = id;
    button.isModal = this.Modal;
    button.type = button.type;
  
    this.ButtonOut.emit(button);
  }
}
