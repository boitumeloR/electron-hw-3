import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.less']
})
export class ConfirmComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConfirmComponent>) { }

  ngOnInit(): void {
  }

  Confirm(): void {
    this.dialogRef.close(true);
  }

  Cancel(): void {
    this.dialogRef.close(false);
  }

}
