export class DateHelper{

    constructor(){
        throw new Error('Esta classe nao pode ser instanciada.');
    }

    static textoParaData(texto){
        // return new Date(...texto
        //     .split('-')
        //     .map((item,indice)=> item - indice %2 )
        // )

        console.log(texto);
         // mudamos a validação para aceitar o novo formato!
         if(!/\d{2}\/\d{2}\/\d{4}/.test(texto)) 
            throw new Error('Deve estar no formato dd/mm/aaaa');

        // veja que usamos no split '/' no lugar de '-'. Usamos `reverse` também para ficar ano/mes/dia.      
        return new Date(...texto.split('/').reverse().map((item, indice) => item - indice % 2));       
    }

    static dataParaTexto(data){
        return `${data.getDate()}/${(data.getMonth() +1)}/${data.getFullYear()}`;
    }
}