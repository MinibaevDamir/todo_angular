import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class HeaderService {
    latestColor: string = ""
    private headerSubject$ = new BehaviorSubject<string>(this.latestColor);
    headerChanged$ = this.headerSubject$.asObservable();

    constructor() {}
    getColor() : Observable<string> {
        return this.headerSubject$
    }
    changeColor(color: string){
        this.latestColor = color;
        this.headerSubject$.next(color);
    }

}
