var pessoa = {
    nome: "Felipe",
    idade: 16,
    hobbies: ["jogar", "comer", "dormir", "programar"]
};

function descricaoPessoa(pessoa) {
    var listaHobbies = pessoa.hobbies.join(", ");
    return `Nome: ${pessoa.nome}, Idade: ${pessoa.idade}. Hobbies: ${listaHobbies}`;
}

function adicionarHobby(pessoa, novoHobby) {
    pessoa.hobbies.push(novoHobby);
}

console.log(descricaoPessoa(pessoa));

adicionarHobby(pessoa, "fotografia"); 

console.log(descricaoPessoa(pessoa));
