import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory';
import {NegociacaoDao} from '../dao/NegociacaoDao';
import {Negociacao} from '../models/Negociacao';

export class NegociacaoService{

    constructor(){
        this._http = new HttpService();
    }

    obterNegociacoes(){

        return Promise.all([this.obterNegociacoesDaSemana(),this.obterNegociacoesDaSemanaAnterior(),this.obterNegociacoesDaSemanaRetrasada()] )
        .then(retornoGeral => {
            return retornoGeral
                .reduce((achatado, array) => achatado.concat(array) ,[])
        })
        .catch(erro =>{throw new Error(erro)} );
    }

    obterNegociacoesDaSemana(){

        return this._http
            .get('negociacoes/semana')
            .then(negos => {
                return negos.map(n => new Negociacao(new Date(n.data), n.quantidade, n.valor) )
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana')
            });
    }

    obterNegociacoesDaSemanaAnterior(){
        
        return this._http
        .get('negociacoes/anterior')
        .then(negos => {
            return negos.map(n => new Negociacao(new Date(n.data), n.quantidade, n.valor) )
        })
        .catch(erro => {
            console.log(erro);
            throw new Error('Não foi possível obter as negociações da semana anterior')
        });
    }

    obterNegociacoesDaSemanaRetrasada(){
        
        return this._http
        .get('negociacoes/retrasada')
        .then(negos => {
            return negos.map(n => new Negociacao(new Date(n.data), n.quantidade, n.valor) )
        })
        .catch(erro => {
            console.log(erro);
            throw new Error('Não foi possível obter as negociações da semana retrasada')
        });
    }

    adiciona(negociacao){

        return ConnectionFactory.getConnection()
            .then(connection => {return new NegociacaoDao(connection)})
            .then(dao => dao.adiciona(negociacao))
            .then(() =>{
                return 'Negociacao adicionada com sucesso!';        
            })
            .catch(e =>{
                console.log(e);
                throw new Error('Nao foi possivel adicionar negociacao');
            });
    }

    listaTodos(){

        return ConnectionFactory.getConnection()
            .then(connection =>  new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(e =>{
                console.log(e);
                throw new Error('Nao foi possivel listar todas as negociacoes');
            });

    }

    apagaTodos(){

        return ConnectionFactory.getConnection()
            .then(connection => {return new NegociacaoDao(connection)})
            .then(dao => dao.apagaTodos())
            .then(() =>{
                return 'Negociacoes apagadas com sucesso';         
            })
            .catch(e => {
                console.log(e);
                throw new Error('Nao foi possivel apagar todas as negociacoes');
            });    

    }

    importa(listaAtual){

        return this.obterNegociacoes()
        .then(negos => 
            negos.filter(negociacao =>  
                !listaAtual.some(negociacaoExistente =>
                    negociacaoExistente.isEquals(negociacao)))
        )
        .catch(erro => {
            console.log(erro);
            throw new Error('Nao foi possivel importar as negociacoes');
        });
    }

}