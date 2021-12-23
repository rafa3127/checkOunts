import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkounts-list',
  templateUrl: './checkounts-list.component.html',
  styleUrls: ['./checkounts-list.component.scss'],
})
export class CheckountsListComponent implements OnInit {
  @Input() checkOunts: Array<any> = []
  @Input() loading: boolean = false
  @Output() deletecheckOunt: EventEmitter<string> = new EventEmitter<string> ()
  constructor() { }
  ngOnInit() {}

  delete(id: any){
    this.deletecheckOunt.emit(id)
  }

}
