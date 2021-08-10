import { Component, Input } from "@angular/core";
import { IpAddress } from "src/app/state/ip-address/ip-address.state";

@Component({
  selector: 'app-details',
  template: `
  <div class="card">
    <div class="flex-container" *ngIf="ipAddress && !loading && !errorMessage">
      <div class="details-container">
        <h4>IP Address</h4>
        <p>{{ ipAddress.ip }}</p>
      </div>
      <div class="v-line"></div>
      <div class="details-container">
        <h4>Location</h4>
        <p>{{ ipAddress.location?.city }}, {{ ipAddress.location?.country }}</p>
      </div>
      <div class="v-line"></div>
      <div class="details-container">
        <h4>Timezone</h4>
        <p>{{ ipAddress.location?.timezone }}</p>
      </div>
      <div class="v-line"></div>
      <div class="details-container">
        <h4>ISP</h4>
        <p>{{ ipAddress.isp }}</p>
      </div>
    </div>
    <div *ngIf="loading">
      <p>Loading...</p>
    </div>
    <div *ngIf="errorMessage">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
`,
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent {
  @Input() loading: boolean | null | undefined;
  @Input() ipAddress: IpAddress | null | undefined;
  @Input() errorMessage: string | null | undefined;
}
