import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("clear-icon")
export class ClearIcon extends LitElement {
  @property({ type: Number, attribute: true })
  width = 24;

  @property({ type: Number, attribute: true })
  height = 24;

  render() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width=${this.width}
        height=${this.height}
        viewBox="0 0 24 24"
      >
        <g fill-rule="evenodd" transform="translate(-1 -1)">
          <rect
            width="2"
            height="24"
            x="9"
            y="-2"
            rx="1"
            transform="rotate(45 10 10)"
          ></rect>
          <rect
            width="2"
            height="24"
            x="9"
            y="-2"
            rx="1"
            transform="rotate(-45 10 10)"
          ></rect>
        </g>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "clear-icon": ClearIcon;
  }
}
