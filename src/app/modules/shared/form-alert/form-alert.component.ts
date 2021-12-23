import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-alert',
  templateUrl: './form-alert.component.html',
  styleUrls: ['./form-alert.component.scss'],
})
export class FormAlertComponent implements OnInit {
  @Input() msg: string | null
  @Input() classItem: boolean = false
  constructor() { }

  ngOnInit() {}

}
