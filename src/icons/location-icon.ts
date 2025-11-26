import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("location-icon")
export class LocationIcon extends LitElement {
  render() {
    return html`
      <img
        alt="location-icon"
        title="location-icon"
        data-src="https://www.awxcdn.com/adc-assets/images/icons/icon-gps.svg"
        src="https://www.awxcdn.com/adc-assets/images/icons/icon-gps.svg"
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "location-icon": LocationIcon;
  }
}
