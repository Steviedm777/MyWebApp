class BasePage extends HTMLElement {
  constructor(innerHtml, innerCss) {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        :host {
          display: contents;
        }

        .page-content {
          width: 100%;
          min-height: 100%;
          box-sizing: border-box;
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
        }

        ${innerCss ?? ''}
      </style>
      <div class="page-content">
        ${innerHtml ?? ''}
      </div>
    `;
  }
}
