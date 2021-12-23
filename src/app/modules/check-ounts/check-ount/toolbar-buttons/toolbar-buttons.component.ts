import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar-buttons',
  templateUrl: './toolbar-buttons.component.html',
  styleUrls: ['./toolbar-buttons.component.scss'],
})
export class ToolbarButtonsComponent implements OnInit {
  @Input() expensesSection: boolean = false
  @Input() countsSection: boolean = false
  @Output() selectSection: EventEmitter<string> = new EventEmitter<string>()
  constructor() { }

  ngOnInit() {}

  select(selection: string){
    this.selectSection.emit(selection)
  }

}
