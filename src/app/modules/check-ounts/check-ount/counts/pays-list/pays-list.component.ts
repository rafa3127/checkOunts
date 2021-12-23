import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pays-list',
  templateUrl: './pays-list.component.html',
  styleUrls: ['./pays-list.component.scss'],
})
export class PaysListComponent implements OnInit {
  @Input() payList: Array<any> = []
  @Input() loading: boolean = false
  @Output() deletePay: EventEmitter<any> = new EventEmitter<any>()
  constructor() { }

  ngOnInit() {}

    delete(id: string){
      this.deletePay.emit(id)
    }
}
