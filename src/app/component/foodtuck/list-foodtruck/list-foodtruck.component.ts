import { Component, OnInit } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-list-foodtruck',
  templateUrl: './list-foodtruck.component.html',
  styleUrls: ['./list-foodtruck.component.css'],
})
export class ListFoodtruckComponent implements OnInit {
  _httpService: HttpClientService;
  datePicker: any;
  Data: any;
  colGrid: any;
  dataGrid: any;
  dataPaging: any;

  ngDay: any;
  ngTime: any;

  constructor(
    private httpService: HttpClientService,
    private dateAdapter: NgbDateAdapter<string>
  ) {
    this._httpService = this.httpService;
    this.buildTableComponent();
  }

  ngOnInit(): void {}
  changePaging(paging: any) {
    this.dataPaging = paging;
    console.log(this.dataPaging);
    this.getFoodTruckByDataTimeApi();
  }

  buildTableComponent(): void {
    //datos del paginador de la tabla
    this.dataPaging = {
      page: 1,
      take: 10,
      total: 0,
      pageTotal: 0,
    };
    // datos de las columnas de la tabla
    this.colGrid = [
      { fiel: 'applicant', header: 'Name' },
      { fiel: 'locationdesc', header: 'Address' },
    ];
  }

  getFoodTruckByDataTimeApi() {
    var apiUrl =
      'foodtruck/GetTruck?' +
      'day=' +
      this.ngDay +
      '&time=' +
      this.ngTime +
      '&page=' +
      this.dataPaging.page +
      '&take=' +
      this.dataPaging.take;
    var data = this._httpService.httpAccess('GET', apiUrl, null);

    // llena las variables para contruir la tabla
    this.filDataParam(data);
  }
  showData() {
    console.log(this.ngDay, this.ngTime);
    this.getFoodTruckByDataTimeApi();
  }

  getFoodTruckByDataTimeServicio() {
    var apiUrl =
      'toys/GetPaging' +
      '?page=' +
      this.dataPaging.page +
      '&take=' +
      this.dataPaging.take;
    var data = this._httpService.httpAccess('GET', apiUrl, null);

    // llena las variables para contruir la tabla
    this.filDataParam(data);
  }
  filDataParam(data: any) {
    this.Data = data['items'];
    this.dataPaging.total = data['total'];
    this.dataPaging.pageTotal = data['pages'];
    this.dataGrid = data['items'];
  }
}
