//Você tem um array de objetos onde cada objeto representa uma pessoa com informações sobre seu nome e idade.
// Sua tarefa é escrever uma função que realiza as seguintes operações:

function processarPessoas(pessoas) {
    return pessoas
      .filter(pessoa => pessoa.idade >= 18)
      .sort((a, b) => b.idade - a.idade)
      .map(pessoa => pessoa.nome);
  }

  const pessoas = [
    { nome: 'Ana', idade: 17 },
    { nome: 'Bruno', idade: 22 },
    { nome: 'Carlos', idade: 19 },
    { nome: 'Diana', idade: 15 },
    { nome: 'Eduardo', idade: 25 }
  ];
  
  console.log(processarPessoas(pessoas));

  