import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../../../Core/interfaces/DialogData";

@Component({
  selector: 'dialog-delete',
  templateUrl: 'dialog-delete.html',
})

export class DialogDelete implements OnInit {
  ngOnInit(): void {
  }

  constructor(
    public dialogRef: MatDialogRef<DialogDelete>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }
}
