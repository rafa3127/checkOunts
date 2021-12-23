import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-participants-data',
  templateUrl: './participants-data.component.html',
  styleUrls: ['./participants-data.component.scss'],
})
export class ParticipantsDataComponent implements OnInit {
  @Input() arrayControls: Array<any> = []
  @Output() removeUser: EventEmitter<any> = new EventEmitter<any>()
  @Output() addUser: EventEmitter<any> = new EventEmitter<any>()
  constructor() { }

  ngOnInit() {}

  add(){
    this.addUser.emit("addUser")
  }
  remove(i: any){
    this.removeUser.emit(i)
  }
}
