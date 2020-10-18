import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss", "./app.component.css"],
})
export class AppComponent {
  public guardRole: Array<any> = [];
  public userLoggedIn;
  public loginPageUI: boolean;
  public title = "app";

  constructor() {}
  // tslint:disable-next-line:use-life-cycle-interface
  public ngOnInit() {}
}
