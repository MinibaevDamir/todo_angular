import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../../../Core/interfaces/DialogData";

@Component({
  selector: 'dialog-edit',
  templateUrl: 'dialog-edit.html',
})

export class DialogEdit implements OnInit {
  ngOnInit(): void {
  }

  constructor(
    public dialogRef: MatDialogRef<DialogEdit>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }
}
