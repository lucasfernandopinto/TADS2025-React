import { Component, useState } from 'react';

import './App.css'

// Define o componente de classe para o Exercicio 1: Saudação com Props.
class Props extends Component<{ name: string; size?: number }> {
  render() {
    const { name } = this.props;

    return (
      <div>
        <p>Olá, {name}!</p>
      </div>
    );
  }
}

// Define o componente de classe para o Exercicio 2: Contador (state).
class Counter extends Component<{}, { count: number }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      count: 0
    };
  }

  // Método para incrementar o contador.
  increment = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  };

  // Método para decrementar o contador.
  decrement = () => {
    this.setState(prevState => ({
      count: prevState.count - 1
    }));
  };

  render() {
    const { count } = this.state;
    return (
      <div>
        <p>{count}</p>
        <div>
          <button onClick={this.decrement}>-1</button>
          <button onClick={this.increment}>+1</button>
        </div>
      </div>
    );
  }
}

function App() {
  const [layout, setLayout] = useState<'start' | 'center' | 'end'>('center');

  const getLayoutClasses = () => {
    switch (layout) {
      case 'start':
        return 'justify-start items-start';
      case 'center':
        return 'justify-center items-center';
      case 'end':
        return 'justify-end items-end';
      default:
        return 'justify-center items-center';
    }
  };

  return (
    <div>
      <h1>3 Bimestre - Trabalho 01</h1>
      <h2>Aluno: Lucas Fernando Pinto</h2>

      {/* --- Exercicio 1: Saudação com Props --- */}
      <section>
        <h2>Exercício 01 - Saudação com Props</h2>
        <Props name="Lucas" />
        <Props name="Nelson" />
        <Props name="João" />
      </section>

      {/* --- Exercicio 2: Contador (state) --- */}
      <section>
        <h2>Exercício 02 - Contador (state)</h2>
        <Counter />
      </section>

      {/* --- Exercicio 3: Alinhamentos na prática --- */}
      <section>
        <h2>Exercício 03 - Alinhamentos na prática</h2>
        <div>
          <button onClick={() => setLayout('start')}>start</button>
          <button onClick={() => setLayout('center')}>center</button>
          <button onClick={() => setLayout('end')}>end</button>
        </div>
        <div className={getLayoutClasses()}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>

      {/* --- Exercicio 4: Tamanhos Fixos vs Dinâmicos --- */}
      <section>
        <h2>Exercício 04 - Tamanhos Fixos vs Dinâmicos</h2>

        <h3>Seção A: Tamanhos Fixos</h3>
        <div className="icons-container">
          {/* Ícones com largura e altura fixas de 48px */}
          <div className="icon lightblue">
            <span>A</span>
          </div>
          <div className="icon lightcoral">
            <span>B</span>
          </div>
          <div className="icon lightgreen">
            <span>C</span>
          </div>
        </div>

        <h3>Seção B: Tamanhos Dinâmicos</h3>
        <div>
          {/* Imagem responsiva que se adapta ao tamanho do container */}
          <img
            src="https://placehold.co/600x400/FFD9E2/7A4269?text=Imagem+Responsiva"
            alt="Placeholder responsivo"
            className="responsive-image"
          />
        </div>
      </section>

    </div>
  );
}

export default App;
