import { Component, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { EventEmitter } from "@angular/core";

const SEARCH_CTRL = "searchCtrl";

@Component({
  selector: 'app-input',
  template: `
    <form>
      <input type="text" [formControl]="${SEARCH_CTRL}" placeholder="Search for an IP address or domain" />
      <button (click)="search.emit(searchCtrl.value)">
        <fa-icon [icon]="faAngleRight"></fa-icon>
      </button>
    </form>
  `,
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  // emitter search ip
  @Output() search = new EventEmitter<string>();
  // icon
  public faAngleRight = faAngleRight;
  public searchCtrl = new FormControl();
}
