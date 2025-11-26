import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("weather-card")
export class WeatherCard extends LitElement {
  @property({ type: String, attribute: true }) date = "";
  @property({ type: String, attribute: true }) icon = "";
  @property({ type: String, attribute: true }) temp = "";

  static styles = [
    css`
      article {
        width: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid #e9ecef;
        border-radius: 10px;
        padding: 1rem;
        background: #fff;
      }

      article h1 {
        margin: 0;
        text-align: center;
        font-weight: 800;
        font-size: 1.2rem;
      }

      article img {
        width: 4rem;
      }

      article h4 {
        margin: 0;
        font-weight: 400;
        font-size: 0.9rem;
        text-align: center;
      }
    `,
  ];

  render() {
    return html`
      <article>
        <h1>${this.date}</h1>
        <img
          src=${`https://openweathermap.org/img/wn/${this.icon}@2x.png`}
          alt=${this.icon}
          title=${this.icon}
        />
        <h4>${this.temp}ºC</h4>
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "weather-card": WeatherCard;
  }
}
