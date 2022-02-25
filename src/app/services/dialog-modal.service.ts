import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../component/shared/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class DialogModalService {
  constructor(private ngbModal: NgbModal) {}

  openDialog(props: any): Promise<any> {
    var modalRef = this.ngbModal.open(ModalComponent, {
      size: 'md',
      backdrop: 'static',
    });

    modalRef.componentInstance.setDialogProps(props);
    return modalRef.result;
  }
}
