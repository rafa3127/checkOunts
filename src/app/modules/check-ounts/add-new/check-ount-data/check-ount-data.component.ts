import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-check-ount-data',
  templateUrl: './check-ount-data.component.html',
  styleUrls: ['./check-ount-data.component.scss'],
})
export class CheckOuntDataComponent implements OnInit {
  @Input() form: FormGroup 
  constructor(
    private fb: FormBuilder,
  ) {
    this.form = fb.group({})
   }

  ngOnInit() {}

}
