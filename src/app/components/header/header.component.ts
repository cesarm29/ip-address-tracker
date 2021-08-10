import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IpAddress } from "src/app/state/ip-address/ip-address.state";

@Component({
  selector: 'app-header',
  template: `
    <div class="header-container">
      <h1>IP Address Tracker</h1>
      <app-input (search)="search.emit($event)"></app-input>
      <app-details [ipAddress]="ipAddress" [loading]="loading" [errorMessage]="errorMessage"></app-details>
    </div>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() loading: boolean | null | undefined;
  @Input() ipAddress: IpAddress | null | undefined;
  @Input() errorMessage: string | null | undefined;
  @Output() search = new EventEmitter<string>();
}
