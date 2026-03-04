class CounterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.counter = 0;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: contents;
        }

        .counter-container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          height: 100%;
          width: 100%;
        }

        h1 {
          font-size: 3rem;
          color: #333;
          text-align: center;
          padding: 20px;
          margin: 0 0 30px 0;
        }

        .counter-display {
          font-size: 5rem;
          font-weight: bold;
          color: #2c3e50;
          margin: 30px 0;
          padding: 30px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          min-width: 200px;
          text-align: center;
        }

        .counter-buttons {
          display: flex;
          gap: 20px;
        }

        .btn {
          padding: 12px 30px;
          font-size: 1.1rem;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: bold;
        }

        .btn-add {
          background: #27ae60;
          color: white;
        }

        .btn-add:hover {
          background: #229954;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .btn-subtract {
          background: #e74c3c;
          color: white;
        }

        .btn-subtract:hover {
          background: #c0392b;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2rem;
          }
        }
      </style>

      <div class="counter-container">
        <h1>Counter</h1>
        <div class="counter-display">
          <span id="counterValue">${this.counter}</span>
        </div>
        <div class="counter-buttons">
          <button id="subtractBtn" class="btn btn-subtract">Subtract</button>
          <button id="addBtn" class="btn btn-add">Add</button>
        </div>
      </div>
    `;

    this.shadowRoot.getElementById('addBtn').addEventListener('click', () => {
      this.increment();
    });

    this.shadowRoot.getElementById('subtractBtn').addEventListener('click', () => {
      this.decrement();
    });
  }

  increment() {
    this.counter++;
    this.updateDisplay();
  }

  decrement() {
    this.counter--;
    this.updateDisplay();
  }

  updateDisplay() {
    this.shadowRoot.getElementById('counterValue').textContent = this.counter;
  }
}

customElements.define('counter-component', CounterComponent);
