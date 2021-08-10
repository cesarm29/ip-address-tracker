import { Component, Input, OnChanges } from "@angular/core";
import { IpAddress } from "src/app/state/ip-address/ip-address.state";
import { icon, latLng, marker, tileLayer } from "leaflet";

@Component({
  selector: 'app-map',
  template: `
  <div *ngIf="options" class="map" leaflet [leafletOptions]="options" [leafletLayers]="layers" [(leafletCenter)]="center"></div>
`,
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges {

  @Input() ipAddress: IpAddress | null | undefined;

 
  public layers: any;
  public options: any;
  public center: any;

  public layersControlOptions = { position: 'bottomright' }

  public ngOnChanges(): void {

    if (this.ipAddress) {

      const lat = this.ipAddress?.location?.lat ?? 0;
      const lng = this.ipAddress?.location?.lng ?? 0;

      this.layers = [
        marker([lat, lng], {
          icon: icon({
            iconSize: [30, 50],
            iconAnchor: [25, 50],
            iconUrl: 'assets/images/icon-location.svg',
          })
        })
      ];

      this.options = {
        layers: [
          tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...'})
        ],
        zoom: 8,
        center: latLng(lat, lng),
        zoomControl: false,
      };

      this.center = latLng(lat, lng);
    }
  }
}

