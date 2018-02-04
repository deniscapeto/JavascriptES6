import {ListaNegociacoes} from '../models/ListaNegociacoes';
import {Mensagem} from '../models/Mensagem';
import {NegociacoesView} from '../views/NegociacoesView';
import {MensagemView} from '../views/MensagemView';
import {NegociacaoService} from '../services/NegociacaoService';
import {DateHelper} from '../helpers/DateHelper';
import {Bind} from '../helpers/Bind';
import {Negociacao} from '../models/Negociacao';

class NegociacaoController{

    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._ordemAtual= '';

        let self = this;

        this._negociacoesView = new NegociacoesView($('#negociacoesView'));   
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            this._negociacoesView,
            'adiciona', 'esvazia','ordena','inverteOrdem');

        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagem = new Bind(
            new Mensagem(), 
            this._mensagemView,
            'texto');

        this._negociacaoServico = new NegociacaoService();

        this._init();
    }

    _init(){

        this.listaTodos();

        setInterval(() => this.importaNegociacoes(), 3000);

    }

    adiciona(e){

        e.preventDefault();
        let negociacao = this._criaNegociacao();

        this._negociacaoServico.adiciona(negociacao)
        .then((mensagem) =>{
            this._listaNegociacoes.adiciona(negociacao);
            this._mensagem.texto = mensagem;
            this._limpaFormulario();           
        })
        .catch(e => this._mensagem.texto = e);
    }

    listaTodos(){

        console.log('listando...    ');

        this._negociacaoServico.listaTodos()
        .then((negos) => 
            negos.forEach(nego => 
                this._listaNegociacoes.adiciona(nego))
        )
        .catch(e => this._mensagem.texto = e );       
    }

    apaga(){

        this._negociacaoServico.apagaTodos()
            .then((mensagem) =>{
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
                this._limpaFormulario();           
            })
            .catch(e =>{
                this._mensagem.texto = e;
            });        
    }

    ordena(coluna){

        if(this._ordemAtual == ''|| this._ordemAtual != coluna)
            this._listaNegociacoes.ordena((a,b) => a[coluna] - b[coluna]);
        else
            this._listaNegociacoes.inverteOrdem();

        this._ordemAtual = coluna;
    }

    importaNegociacoes(){

        this._negociacaoServico.importa(this._listaNegociacoes.negociacoes)
            .then(negos => {
                negos.forEach(n => this._listaNegociacoes.adiciona(n) );
                this._mensagem.texto = 'Negociacoes Importadas com sucesso';
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value), 
            parseInt( this._inputQuantidade.value), 
            parseInt(this._inputValor.value)
        );
    }

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();       
    }

}



let negociacaoController = new NegociacaoController();

export function currentInstance(){
    return negociacaoController;
}