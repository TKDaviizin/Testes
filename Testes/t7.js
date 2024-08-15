//Crie uma função chamada isPalindrome que verifica se uma palavra ou frase é um palíndromo 
//(lê-se da mesma forma de trás para frente, ignorando espaços e pontuações)
function isPalindrome(str) {
    const cleanStr = str.replace(/[\W_]/g, '').toLowerCase();
    return cleanStr === cleanStr.split('').reverse().join('');
  }
  
  console.log(isPalindrome("A man a plan a canal Panama")); // Saída: true
  console.log(isPalindrome("JavaScript")); // Saída: false