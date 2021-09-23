import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AfterViewInit, Component, ElementRef, Inject, ViewChild} from "@angular/core";
import {DialogDataCreate} from "../../../../Core/interfaces/DialogData";
import {fromEvent, Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {User} from "../../../../Core/interfaces/User";
import {AuthService} from "../../../../Core/services/auth.service";
import {debounceTime, distinctUntilChanged, map, startWith} from "rxjs/operators";


@Component({
  selector: 'dialog-create',
  templateUrl: 'dialog-create.html',
})
export class DialogCreate implements AfterViewInit {
  constructor(
    public dialogRef: MatDialogRef<DialogCreate>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataCreate,
    private authService: AuthService) {
  }
  @ViewChild('input', {static: false}) input!: ElementRef

  searchControl = new FormControl();
  options:User[] = [];
  filteredOptions: Observable<User[]> | any;
  ngAfterViewInit(): void {
    if (this.data.admin === 'true') {
      this.authService.search()
        .subscribe((options) => this.options = options)
      this.filteredOptions = this.searchControl.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.nickname),
          map(nickname => nickname ? this._filter(nickname) : this.options.slice())
        );
      fromEvent([this.input.nativeElement], 'keyup').pipe(
        map((event: any) => {
          return event.target.value
        }),
        distinctUntilChanged(),
        debounceTime(500)
      ).subscribe((value) => {
        this.authService.search(value)
          .subscribe((options) => {
            this.options = options
          })
      })
    }
  }
  displayFn(user: User): string {
    return user && user.nickname ? user.nickname : '';
  }
  private _filter(nickname: string): User[] {
    const filterValue = nickname.toLowerCase();
    return this.options.filter(option => option.nickname.toLowerCase().includes(filterValue));
  }
}
