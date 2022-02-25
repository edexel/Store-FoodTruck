import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'angular2-notifications';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { FadeNotificationService } from 'src/app/services/fade-notification.service';
import { HttpClientService } from 'src/app/services/http-client.service';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list-toys',
  templateUrl: './list-toys.component.html',
  styleUrls: ['./list-toys.component.css'],
})
export class ListToysComponent implements OnInit {
  _httpService: HttpClientService;
  Data: any;
  colGrid: any;
  dataGrid: any;
  dataPaging: any;
  buttonTable: any;
  closeResult: string = '';
  titleMOdal: string = '';
  submitted = false;
  form = new FormGroup({});

  public archivo: any = null;


  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: false,
    title: '',
    useBom: true,
    noDownload: false,
    headers: [
      'employeeCode',
      'nombre',
      'descripción',
      'Edad de retricción ',
      'Compañía',
      'Precio',
    ],
  };

  constructor(
    private httpService: HttpClientService,
    private serviceNotify: FadeNotificationService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this._httpService = this.httpService;
  }

  ngOnInit(): void {
    this.buildTableComponent();
    this.getListEmployee();
    this.loadForm();
  }

  loadForm() {
    this.form = this.formBuilder.group({
      id: [''],
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      precio: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+([.])[0-9].*$')],
      ],
      compania: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      retriccionEdad: ['', Validators.pattern('^[0-9]*$')],
      descripcíon: ['', Validators.maxLength(100)],
    });
  }

  LoadImage(event: any) {
    const archivoImagen = event.target.files[0];
    this.getBase64(archivoImagen).then((data) => {
      this.archivo = data;
    });
  }

  getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  doExport() {
    var dataEmploye = this.getListEmployee();

    //this.dtHolidays : JSONDATA , HolidayList : CSV file Name, this.csvOptions : file options
    new AngularCsv(dataEmploye['items'], 'Juguetes', this.csvOptions);
  }

  buildButtons() {
    this.buttonTable = {
      editButon: {
        active: true,
        isModal: {},
        type: 'Edit',
        field: 'id',
      },
      deleteButon: {
        active: true,
        isModal: {},
        type: 'Delete',
        field: 'id',
      },
      detailButon: {
        active: false,
        isModal: {},
        type: 'Detail',
        field: 'employeeCode',
      },
    };
  }
  buildTableComponent(): void {
    //datos del paginador de la tabla
    this.dataPaging = {
      page: 1,
      take: 10,
      total: 0,
      pageTotal: 0,
    };
    this.buildButtons();
    // datos de las columnas de la tabla
    this.colGrid = [
      { fiel: 'nombre', header: 'Nombre' },
      { fiel: 'descripcíon', header: 'Descripcíón' },
      { fiel: 'retriccionEdad', header: 'Edad de retricción' },
      { fiel: 'compania', header: 'Comapañia' },
      { fiel: 'precio', header: 'Precio' },
    ];
  }

  onSuccess(message: string) {
    this.serviceNotify.sendNotification(
      NotificationType.Success,
      message,
      3000
    );
  }

  changePaging(paging: any) {
    this.dataPaging = paging;
    this.getListEmployee();
  }

  getListEmployee() {
    var apiUrl =
      'toys/GetPaging' +
      '?page=' +
      this.dataPaging.page +
      '&take=' +
      this.dataPaging.take;
    var data = this._httpService.httpAccess('GET', apiUrl, null);

    // llena las variables para contruir la tabla
    this.filDataParam(data);

    return data;
  }
 

  filDataParam(data: any) {
    this.Data = data['items'];
    this.dataPaging.total = data['total'];
    this.dataPaging.pageTotal = data['pages'];
    this.dataGrid = data['items'];
  }

  doButtonEvent(buttonAction: any) {
    buttonAction.type =
      'Edit' && buttonAction.type != 'Delete'
        ? this.getDataEdit(buttonAction)
        : this.eventDeleteData(buttonAction.keyId);
  }

  getDataEdit(buttonAction: any) {
    this.open(buttonAction.isModal, 1);
    var apiUrl = 'toys/GetbyId' + '?id=' + buttonAction.keyId;
    var data = this._httpService.httpAccess('GET', apiUrl, null);

    this.form = new FormGroup({
      id: new FormControl(data.id),
      nombre: new FormControl(data.nombre),
      precio: new FormControl(data.precio),
      compania: new FormControl(data.compania),
      retriccionEdad: new FormControl(data.retriccionEdad),
      descripcíon: new FormControl(data.descripcíon),
    });
    if (data.imagen != '')
      this.archivo = 'data:image/png;base64,' + data.imagen;
    else this.archivo = '';
  }

  eventDeleteData(id: number) {
    if (confirm('Are you sure to delete toy')) {
      var apiUrl = 'toys' + '?id=' + id;
      var data = this._httpService.httpAccess('DELETE', apiUrl, null);
      if (data == 200) {
        this.getListEmployee();
        this.clearForm();
        this.onSuccess('Juguete eliminado.');
      }
    }
    this.buildButtons();
  }

  eventEditData(dataToy: any) {
    dataToy.retriccionEdad = Number(dataToy.retriccionEdad);
    dataToy.imagen = this.archivo
    // console.log(JSON.stringify(dataToy));
    var apiUrl = 'toys';
    var data = this._httpService.httpAccess(
      'PUT',
      apiUrl,
      JSON.stringify(dataToy)
    );
    if (data == 200) {
      this.getListEmployee();
      this.closeModel();
      this.clearForm();
      this.onSuccess('Juguete actualizado con exito.');
    }
  }
  eventCreateData(dataToy: any) {
    console.log(dataToy);
    dataToy.retriccionEdad = Number(dataToy.retriccionEdad);
    dataToy.id = Number(0);
    dataToy.imagen = this.archivo;
    var apiUrl = 'toys';
    var data = this._httpService.httpAccess(
      'POST',
      apiUrl,
      JSON.stringify(dataToy)
    );
    if (data == 200) {
      this.getListEmployee();
      this.closeModel();
      this.clearForm();
      this.onSuccess('Juguete agregado con exito.');
    }
  }
  closeModel() {
    let content2: HTMLElement = document.getElementById(
      'modalclose'
    ) as HTMLElement;
    content2.click();
  }

  send() {
    if (this.form.value.id == '') this.eventCreateData(this.form.value);
    else this.eventEditData(this.form.value);
  }

  clearForm() {
    this.loadForm();
    this.archivo = '';
  }

  open(content: any, type: number) {
    this.titleMOdal = type == 0 ? 'Agregar nuevo juguete' : 'Modificar jugete';
    this.buildButtons();
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    this.clearForm();
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
