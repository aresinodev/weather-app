import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("weather-info")
export class WeatherInfo extends LitElement {
  @property({ type: String, attribute: "location-name" })
  name = "";

  @property({ type: String, attribute: "location-country" })
  country = "";

  @property({ type: String, attribute: "location-state" })
  state = "";

  @property({ type: String, attribute: "weather-icon" })
  icon = "";

  @property({ type: String, attribute: "weather-icon-name" })
  iconName = "";

  @property({ type: String, attribute: "weather-temp" })
  temperature = "";

  @property({ type: String, attribute: "weather-desc" })
  weatherDesc = "";

  static styles = [
    css`
      article {
        width: 300px;
        max-height: 300px;
        display: flex;
        flex-direction: column;
        border: 1px solid #e9ecef;
        border-radius: 10px;
        padding: 1rem;
        background: #fff;
      }

      .title {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      .title h1 {
        margin: 0;
      }

      .title h4 {
        margin: 0;
        color: gray;
        font-size: 0.9rem;
      }

      .weather {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
      }

      // .weather img {
      //   width: 7rem;
      //   border-radius: 5px;
      //   box-shadow: 0px 0px 5px 6px rgba(209, 205, 205, 0.75);
      //   -webkit-box-shadow: 0px 0px 5px 6px rgba(209, 205, 205, 0.75);
      //   -moz-box-shadow: 0px 0px 5px 6px rgba(209, 205, 205, 0.75);
      // }

      .weather .temperature {
        font-weight: 800;
        font-size: 2.5rem;
      }

      .description {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 1rem;
        font-style: italic;
      }
    `,
  ];

  render() {
    return html`
      <article>
        <div class="title">
          <h1>${this.name}</h1>
          <h4>${this.country}</h4>
        </div>

        <div class="weather">
          <img
            src=${`https://openweathermap.org/img/wn/${this.icon}@2x.png`}
            alt=${this.iconName}
            title=${this.iconName}
          />
          <span class="temperature">${this.temperature}</span>
        </div>

        <p class="description">${this.weatherDesc}</p>
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "weather-info": WeatherInfo;
  }
}
