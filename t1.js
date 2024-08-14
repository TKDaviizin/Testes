function calculadora(n1, n2, op) {
    switch (op) {
        case 'soma':
            return n1 + n2;
        case 'subtração':
            return n1 - n2;
        case 'multiplicação':
            return n1 * n2;
        case 'divisão':
            if (n2 === 0) {
                return "Não é possível dividir por zero.";
            }
            return n1 / n2;
        default:
            return "Operação inválida.";
    }
}

console.log(calculadora(121323, 2,'multiplicação'));