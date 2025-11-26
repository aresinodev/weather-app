import { css, html, LitElement } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

import { DataService } from "../services/data-service";

import "../icons/search-icon";
import "../icons/clear-icon";
import "../icons/location-icon";

@customElement("location-search")
export class LocationSearch extends LitElement {
  @query("#clear-icon") clearIcon!: HTMLElement;
  @query("#search-input") searchInput!: HTMLInputElement;
  @query("#results-list") resultsList!: HTMLElement;

  @property({ type: String, attribute: false })
  inputValue = "";

  @state()
  private searchResults: any[] = [];

  private searchTimerId: ReturnType<typeof setTimeout> | null = null;

  static styles = css`
    .search-container {
      padding-top: 0.5rem;
      position: relative;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-icon {
      position: absolute;
      left: 10px;
      top: 10px;
      color: #888;
      font-size: 18px;
      pointer-events: none;
    }

    .clear-icon {
      position: absolute;
      right: 10px;
      top: 13px;
      color: #888;
      font-size: 18px;
      cursor: pointer;
      transition: color 0.2s ease;
    }

    .clear-icon:hover {
      color: #555; /* Un color más oscuro al pasar el ratón por encima */
    }

    /* Oculta el icono de la X */
    .clear-icon.hidden {
      display: none;
    }

    #search-input {
      width: 100%;
      padding: 12px 12px 12px 45px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 16px;
      outline: none;
      transition:
        box-shadow 0.3s ease,
        border-color 0.3s ease;
    }

    #search-input::placeholder {
      color: #aaa;
    }

    #search-input:focus {
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
    }

    .results-list {
      list-style: none;
      padding: 0;
      margin: 0;
      background-color: #fff;
      border-radius: 6px;
      position: absolute;
      top: 100%; /* Posicionamos la lista debajo del contenedor del input */
      left: 0;
      width: 100%;
      z-index: 10;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Sombra para que la lista se "eleve" */
      border-top-left-radius: 0; /* Bordes superiores rectos */
      border-top-right-radius: 0;
      border-top: none; /* Eliminamos el borde superior */
    }

    .results-list.hidden {
      display: none;
    }

    .results-list li {
      max-height: 60px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 12px 15px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      font-size: 15px;
      color: #333;
    }

    .results-list li:first-child {
      gap: 1rem;
    }

    .city {
      display: flex;
      flex-direction: column;
      align-items: flex-start !important;
    }

    .city h1 {
      font-weight: 900;
      margin: 0;
      font-size: 1rem;
    }

    .city h4 {
      font-style: italic;
      color: #878787;
      margin: 0;
      font-size: 0.8rem;
    }

    .results-list li.geolocation-item {
      color: #333;
      display: flex;
      align-items: center;
    }

    .results-list li:hover {
      background-color: #f0f0f0;
    }

    /* Opcional: Estilo para la barra de desplazamiento */
    .results-list::-webkit-scrollbar {
      width: 8px;
    }
    .results-list::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }
    .results-list::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 10px;
    }
    .results-list::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  `;

  protected render() {
    return html`
      <div class="search-container">
        <div class="input-wrapper">
          <span class="search-icon">
            <search-icon></search-icon>
          </span>
          <input
            type="text"
            id="search-input"
            placeholder="Buscar"
            @input=${this._onInput}
            @focus=${this._manageFocus}
            @focusout=${this._manageFocus}
            autocomplete="off"
          />
          <span
            id="clear-icon"
            class="clear-icon hidden"
            @click=${this._clearInput}
          >
            <clear-icon></clear-icon>
          </span>
        </div>
        <ul id="results-list" class="results-list hidden">
          <li @click=${this._getGeolocation}>
            <location-icon></location-icon>
            <span class="current-location-text">Usar su ubicación actual</span>
          </li>
          ${this.searchResults.map((item) => {
            return html`
              <li
                class="city"
                @click=${() => this._sendCoords(item.lat, item.lon)}
              >
                <h1>${item.name}</h1>
                <h4>${item.state}, ${item.country}</h4>
              </li>
            `;
          })}
        </ul>
      </div>
    `;
  }

  private _onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.toLocaleLowerCase().trim();

    if (this.searchTimerId) {
      clearTimeout(this.searchTimerId);
    }

    if (value.length > 0) {
      this.clearIcon.classList.toggle("hidden", false);
    } else {
      this.clearIcon.classList.toggle("hidden", true);
    }

    this.inputValue = value;

    this.searchTimerId = setTimeout(() => {
      this._searchCities(this.inputValue);
    }, 500);
  }

  private _sendCoords(lat: number, lon: number): void {
    this.dispatchEvent(
      new CustomEvent("getCoords", {
        detail: { lat, lon },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _clearInput(): void {
    this.searchInput.value = "";
    this.inputValue = "";
    this.clearIcon.classList.toggle("hidden", true);
    this.searchInput.focus();

    this.searchResults = [];
    this.dispatchEvent(new CustomEvent("clearInput"));
  }

  private _manageFocus(event: Event): void {
    event.preventDefault();

    setTimeout(
      () =>
        this.resultsList?.classList?.toggle(
          "hidden",
          event.type === "focusout"
        ),
      100
    );
  }

  private _getGeolocation(): void {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          this.dispatchEvent(
            new CustomEvent("getLocation", {
              detail: { lat: latitude, lon: longitude },
              bubbles: true,
              composed: true,
            })
          );
        },
        (error) => {
          let errorMessage = "No se pudo obtener la ubicación.";
          if (error.code === error.PERMISSION_DENIED) {
            errorMessage =
              "Permiso denegado. Habilite la ubicación en la configuración de su navegador.";
          }
          alert(errorMessage);
          console.error("Error al obtener la ubicación:", error.message);
        }
      );
    } else {
      alert("Tu navegador no soporta la Geolocalización.");
    }
  }

  private _searchCities(textToSearch: string): void {
    DataService.fetchCities(textToSearch).then((data) => {
      if (data.length > 0) {
        this.searchResults = [...data];
      } else {
        this.searchResults = [];
      }
    });
  }
}
