import { Component, OnInit, Input, Injectable } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  public title = null;
  public body = null;
  public positive = null;
  public negative = null;
  public neutral = null;

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}

  setDialogProps(props: any) {
    this.title = props.title || 'ms-title';
    this.body = props.body || 'ms-body';
    this.positive = props.buttons.positive || null;
    this.negative = props.buttons.negative || null;
    this.neutral = props.buttons.neutral || null;
  }

  onActionTake(action: any) {
    this.modal.close(JSON.stringify(action));
  }
}
