
/*
    Função que devolve o tempo de respost de outra em ms.
    CronometroDeResposta('square', square);  [ output -> Method - square: 3.966064453125ms ]
*/

export function CronometroDeResposta(name, method) {
    console.time(`Method - ${name}`);
    method.apply();
    console.timeEnd(`Method - ${name}`);
}


/**
 * Função que limite o texto de uma string e devolve com '...'
 *  
 */
function summarize(str, max) {
    return str.length > max ? str.substring(0, max) + '...' : str;
  }
export default {CronometroDeResposta}