// importa o React da biblioteca 'react'.
import React from 'react';
// importa o componente 'Mensagem' do arquivo 'Mensagem.tsx'
import Mensagem from './components/Mensagem';

// cria um componente chamado 'App'.
function App() {
  // declaração da variável 'nome' com o valor "Ana".
  const nome = "Ana";
  // declaração da variável 'anoNascimento' com o valor 2005.
  const anoNascimento = 2005;

  // contém o que será renderizado na tela.
  return ( 
    <> 
      {
        // exibe o texto "Meu primeiro app React" na página.
        <h1>Meu primeiro app React</h1>
      }
      {
        // define um paragrafo <p> que escreve "Olá, meu nome é Ana e nasci em 2005"
        <p>Olá, meu nome é {nome} e nasci em {anoNascimento}.</p>
      }
      {
        // renderiza o componente 'Mensagem'
        <Mensagem />
      }

    </>
  );
}

// exporta o componente 'App' como o export padrão deste módulo.
export default App;
