// importa o React da biblioteca 'react'.
import React from 'react';
// importa o componente 'Mensagem' do arquivo 'Mensagem.tsx'
import Mensagem from './components/Mensagem';
// importa o componente 'Cabecalho' do arquivo 'Cabecalho.tsx'
import Cabecalho from './components/Cabecalho';
// importa o componente 'Conteudo' do arquivo 'Conteudo.tsx'
import Conteudo from './components/Conteudo';
// importa o componente 'Rodape' do arquivo 'Rodape.tsx'
import Rodape from './components/Rodape';

// cria um componente chamado 'App'.
function App() {
  // declaração da variável 'nome' com o valor "Ana".
  const nome = "Ana";
  // declaração da variável 'anoNascimento' com o valor 2005.
  const anoNascimento = 2005;

  // define uma função para ser chamada pelo evento de clique.
  // exibe no console 'Função chamada com sucesso.'
  const executarAcao = () => {
    console.log("Função chamada com sucesso.");
  };

  // define uma função de renderização que retorna JSX.
  const renderizarMensagem = () => {
    return <p>Texto gerado por uma função de renderização.</p>;
  };

  // contém o que será renderizado na tela.
  return ( 
    <> 
      {
        // renderiza o componente 'Cabecalho'
        <Cabecalho />
      }

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
      
      {
        // renderiza o componente 'Conteudo'
        <Conteudo />
      }

      {
        // cria um botão com o texto "Mostrar Alerta".
        <button onClick={() => alert("Você clicou no botão!")}>Mostrar Alerta</button>
      }

      {
        // cria um segundo botão com o texto "Executar Ação" que chama a função 'executarAcao'.
        <button onClick={executarAcao}>Executar Ação</button>
      }

      {
        // chama a função renderizarMensagem e renderiza o JSX que ela retorna.
      }
      {renderizarMensagem()}
      
      {
        // renderiza o componente 'Rodape'
        <Rodape />
      }
      

    </>
  );
}

// exporta o componente 'App' como o export padrão deste módulo.
export default App;
