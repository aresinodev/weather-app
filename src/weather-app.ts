import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { DataService } from "./services/data-service.ts";
import { Formatter } from "./utils/formatter.ts";
import type { WeatherData } from "./interfaces/weather-data.interface.ts";

import "./components/location-search.ts";
import "./components/loading-spinner.ts";
import "./components/weather-info.ts";
import "./components/weather-card.ts";
import "./components/init-screen.ts";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("weather-app")
export class WeatherApp extends LitElement {
  @property({ type: Boolean, attribute: false })
  isLoading = false;

  @state()
  private _weatherData: WeatherData | null = null;

  static styles = css`
    .container {
      width: auto;
      height: 100%;
      margin-left: auto;
      margin-right: auto;
      padding-right: 1rem;
      padding-left: 1rem;
    }

    .content {
      margin-top: 3rem;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    }

    .next-days {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 3rem;
      gap: 0.5rem;
    }

    .next-days .days {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 0.5rem;
      overflow: hidden;
      overflow-x: scroll;
      overscroll-behavior-x: contain;
      scroll-snap-type: x proximity;
    }

    .next-days p {
      font-style: italic;
      font-weight: 400;
      font-size: 1.2rem;
    }

    @media (min-width: 1536px) {
      .container {
        max-width: 1450px;
      }
    }

    @media (min-width: 1280px) {
      .container {
        max-width: 1200px;
      }
    }

    @media (min-width: 1024px) {
      .container {
        max-width: 950px;
      }
    }

    @media (min-width: 768px) {
      .container {
        max-width: 700px;
      }
    }

    @media (min-width: 576px) {
      .container {
        max-width: 510px;
        padding-right: 0;
        padding-left: 0;
      }
    }
  `;

  protected render() {
    return html`
      <main class="container">
        <location-search
          @getLocation=${this._handleGetLocation}
          @getCoords=${this._handleGetLocation}
          @clearInput=${() => (this._weatherData = null)}
        >
        </location-search>

        <section class="content">
          ${!this.isLoading && !this._weatherData
            ? html`<init-screen></init-screen>`
            : html``}
          ${this.isLoading ? html`<loading-spinner></loading-spinner>` : html``}
          ${!this.isLoading && this._weatherData
            ? html`<weather-info
                location-name=${this._weatherData?.name}
                location-country=${this._weatherData?.country}
                location-state=${this._weatherData?.state}
                weather-icon=${this._weatherData?.icon}
                weather-icon-name=${this._weatherData?.iconName}
                weather-temp=${this._weatherData?.temperature}
                weather-desc=${this._weatherData.description}
              >
              </weather-info>`
            : html``}
        </section>

        ${!this.isLoading && this._weatherData?.days
          ? html` <section class="next-days">
              <p>El tiempo en los próximos 7 días</p>
              <div class="days">
                ${this._weatherData.days.map(
                  (day) => html`
                    <weather-card
                      date=${day.date}
                      icon=${day.icon}
                      temp=${day.temperature}
                    >
                    </weather-card>
                  `
                )}
              </div>
            </section>`
          : html``}
      </main>
    `;
  }

  private _handleGetLocation(event: CustomEvent): void {
    const { lat, lon } = event.detail;
    this.isLoading = true;
    this._weatherData = null;

    const locationDataPromise = DataService.fetchLocationData(lat, lon);
    const weatherDataPromise = DataService.fetchWeatherData(lat, lon);

    Promise.all([locationDataPromise, weatherDataPromise]).then(
      ([locationData, weatherData]) => {
        this._weatherData = {
          name: locationData[0]?.name,
          country: locationData[0]?.country,
          state: locationData[0]?.state,
          icon: weatherData.current.weather[0].icon,
          iconName: weatherData.current.weather[0].description,
          temperature: `${Math.round(weatherData.current.temp)}ºC`,
          description: weatherData.daily[0].summary,
          days: Formatter.getInfoDays(weatherData.daily),
        };

        this.isLoading = false;
      }
    );
  }
}
