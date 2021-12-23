import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
})
export class ModalHeaderComponent implements OnInit {
  @Input() title: string = ""
  @Input() defaultHRef: string = "../"
  @Input() emergentModal: boolean = false
  @Output() backButtonClicked: EventEmitter<any> = new EventEmitter<any>()
  constructor() { }

  ngOnInit() {}

  onClick(event: Event){
    event.preventDefault()
    this.backButtonClicked.emit("clicked")
  }

}
