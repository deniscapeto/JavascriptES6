import {Negociacao} from '../models/Negociacao';

export class NegociacaoDao{

    constructor(connection){

        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao){

        return new Promise((resolve, reject)=>{

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);
        
            request.onsuccess = e => {
        
                resolve();
                console.log('Negociação incluída com sucesso');
            };
        
            request.onerror = e => {
        
                reject('Não foi possível incluir a negociação');
                console.log(e);
            };
        });


    }

    listaTodos(){

        return new Promise((resolve, reject)=>{

            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();
    
            let negociacoes = [];

            cursor.onsuccess = e => {
    
                let atual = e.target.result;
    
                if(atual){
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade,dado._valor ));
                    atual.continue();
                }
                else
                    resolve(negociacoes);
            };

            cursor.onerror = e => {
                reject('Nao foi possivel listar negociacoes');
                console.log(e);
            };
        });
    }

    apagaTodos(){

        return new Promise((resolve, reject)=>{

            let request = this._connection
            .transaction([this._store], 'readwrite')
            .objectStore(this._store)
            .clear();
            
            request.onsuccess = e => {
                
                resolve();
                console.log('Negociações apagadas com sucesso');
            };
                
            request.onerror = e => {
        
                reject('Não foi possível apagar as negociações');
                console.log(e);
            };           


        });


    }


}