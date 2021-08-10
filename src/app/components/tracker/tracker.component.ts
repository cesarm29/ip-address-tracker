import { Component } from "@angular/core";
import { Dispatch } from "@ngxs-labs/dispatch-decorator";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { IpAddressState, IpAddress } from "../../state/ip-address/ip-address.state";
import { FetchIpAddress } from "../../state/ip-address/ip-address.state.actions";

@Component({
  selector: 'app-tracker',
  template: `
    <div class="app-container">
      <app-header [ipAddress]="ipAddress$ | async" [loading]="loading$ | async" [errorMessage]="errorMessage$ | async" (search)="fetchIpAddress($event)"></app-header>
      <app-map [ipAddress]="ipAddress$ | async"></app-map>
    </div>
  `,
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent {

  @Select(IpAddressState.loading) loading$: Observable<boolean | null> | undefined;
  @Select(IpAddressState.ipAddress) ipAddress$: Observable<IpAddress | null> | undefined;
  @Select(IpAddressState.errorMessage) errorMessage$: Observable<string | null> | undefined;

  @Dispatch() fetchIpAddress = (searchQuery?: string) => new FetchIpAddress(searchQuery ?? '');

  public ngOnInit(): void {
    this.fetchIpAddress();
  }
}
