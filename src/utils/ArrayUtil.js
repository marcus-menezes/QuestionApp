// => Retorna uma string com todas as keys e valores ( Ex.: "IdCliente : 23" )
export function ArrayToTextWithKey(arr)
{
    let response = ''

    for (var key in arr) 
    {
        response += key +" : " +  arr[key] + "\n"         
    }

    return response
}

// => Retorna as keys do array enviado.
export function ArrayKeys(arr)
{
    let response = []

    for (var key in arr) 
    {
        response.push(key)
    }

    return response
}

// => Retorna os values do array enviado.
export function ArrayValues(arr)
{
    let response = []

    for (var key in arr) 
    {
        response.push(arr[key])
    }

    return response
}

/* => Procura dentro do array um objeto onde prop é a variável de condição e é igual a NameKey
EX.: ArrayFind(InfoSubCategorias,"IdSubCategoria",this.state.selectedSubcategoria)
InfoSubCategorias => Array.
"IdSubcategoria" => Propriedade a ser verificada para o filtro.
this.state.selectedSubcategoria => Valor a ser comparado.
Obs: Retorna todo o objeto, se quiser alguma varíval de lá, terá que usar da seguinte forma:
==> let Titulo =  ArrayFind(InfoSubCategorias,"IdSubCategoria",this.state.selectedSubcategoria).Titulo
*/

export function ArrayFind(myArray,prop,nameKey)
{
    let response = ''

    for (var i=0; i < myArray.length; i++) 
    {
        if (myArray[i][prop] === nameKey) 
        {
            response =  myArray[i];
        }
    }   

    return response
}

/*
    Group array by key

    Ex.: 

    => Array
    const roleModels = [
    {userId: 1,name: 'John Williams',type: 'Composer'},
    {userId: 2,name: 'Hans Zimmer',type: 'Composer'},
    {userId: 3,name: 'Michael Jordan',type: 'Athlete'}];
    
    => Execução
    const byType = groupBy(roleModels, 'type');

    => Resposta        
    {
        Athlete: [{...}],
        Author: [{...}],
        Composer: [{userId: 1,name: 'John Williams',type: 'Composer'},
        {userId: 2,name: 'Hans Zimmer',type: 'Composer'}]
    }   

*/
export function groupBy(arr, key) 
{
    return arr.reduce((acc, i) => 
    {
      (acc[i[key]] = acc[i[key]] || []).push(i);
      return acc;
    }, {});
}

/**
 * @param {array} array Array com o conteúdo.
 * @param {string} key Valor que indica a ordenação. Ex: Ordem Alfabética ou Id
 */

export function sortByKey(array, key) 
{
    return array.sort((a, b) =>
    {
        var x = a[key];
        var y = b[key];

        if (typeof x == "string")
        {
            x = (""+x).toLowerCase(); 
        }
        if (typeof y == "string")
        {
            y = (""+y).toLowerCase();
        }

        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    },{});
}

export function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

/**
 * @param {array} arr O array que você criança, quer usar pra ver se tem ou não duplicados
 * @param {array<string>} indexedKeys As chaves do enigma do milênio que vão ser usadas pra fazer o filtro
 * @param {boolean} isPrioritizeFormer Set this to true, if you want to remove
 *     dublicates that occur later, false, if you want those to be removed
 *     that occur later.
 */
export function distinctFunc  (arr, indexedKeys, isPrioritizeFormer = true)  {
    const lookup = new Map();
    const makeIndex = el => indexedKeys.reduce(
        (index, key) => `${index};;${el[key]}`, ''
    );
    arr.forEach(el => {
        const index = makeIndex(el);
        if (lookup.has(index) && isPrioritizeFormer) {
            return;
        }
        lookup.set(index, el);
    });

    return Array.from(lookup.values());
};

export default {ArrayToTextWithKey,ArrayKeys,ArrayFind, dynamicSort,distinctFunc};