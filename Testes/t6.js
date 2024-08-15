//Crie uma função chamada reverseString que recebe uma string como argumento e retorna a string invertida.
function reverseString(str) {
    return str.split('').reverse().join('');
}

console.log(reverseString('JavaScript'))