import { LitElement, html, css } from 'lit-element'

class SimpleGridHeader extends LitElement {
  constructor() {
    super()

    this.columns = []
  }

  static get properties() {
    return {
      columns: Array
    }
  }

  static get styles() {
    return [
      css`
        :host {
          --grid-header-background-color:#eceff4;
          --grid-header-border-color:#b9c4d7;
          --grid-header-color:#47596d;
          --grid-header-fontsize: 13px;

          display: grid;
          grid-template-columns: var(--grid-template-columns);

          overflow: hidden;

          
        }

        span {
          white-space: nowrap;
          overflow: hidden;
          background-color: var(--grid-header-background-color, gray);
          border:1px solid var(--grid-header-border-color);
          border-width:1px 0;
          padding:5px 0;

          text-overflow: ellipsis;
          text-align: center;
          font-size: var(--grid-header-fontsize);
          color: var(--grid-header-color, white);
        }
      `
    ]
  }

  _onWheelEvent(e) {
    var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail))
    var left = Math.max(0, this.scrollLeft - delta * 40)
    this.scrollLeft = left

    e.preventDefault()
  }

  firstUpdated() {
    this.addEventListener('mousewheel', this._onWheelEvent.bind(this), false)
  }

  render() {
    return html`
      ${this.columns.map(
        column =>
          html`
            <span>${column.term}</span>
          `
      )}
    `
  }
}

customElements.define('simple-grid-header', SimpleGridHeader)
