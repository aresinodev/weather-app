import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("init-screen")
export class InitScreen extends LitElement {
  static styles = [
    css`
      section {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
      }

      section .weather-icons {
        display: flex;
        justify-content: center;
        align-items: flex-start;
      }

      section img {
        width: 6rem;
      }

      section p {
        font-weight: 400;
        font-size: 1.5rem;
      }

      @media (min-width: 768px) {
        section img {
          width: 8rem;
        }

        section p {
          font-size: 2rem;
        }
      }
    `,
  ];

  render() {
    return html`
      <section>
        <div class="weather-icons">
          <img
            src="/sun-cloud-icon.png"
            alt="sun cloud icon"
            title="sun cloud icon"
          />
          <img
            src="/sun-icon.png"
            alt="sun icon"
            title="sun icon"
          />
          <img
            src="/storm-icon.png"
            alt="storm icon"
            title="storm icon"
          />
          <img
            src="/rain-icon.png"
            alt="rain icon"
            title="rain icon"
          />
        </div>
        <p>El tiempo</p>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "init-screen": InitScreen;
  }
}
