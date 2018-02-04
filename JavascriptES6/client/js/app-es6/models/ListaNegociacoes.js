export class ListaNegociacoes{

    // constructor(callback){
    //     this._negociacoes = [];
    //     this._callback = callback;
    // }

    constructor(){
        this._negociacoes = [];
        //this._callback = callback;
    }    

    adiciona(negociacao){
        this._negociacoes.push(negociacao);
        //this._callback(this);
    }

    ordena(criterio){
        this._negociacoes.sort(criterio);
    }

    inverteOrdem(){
        this._negociacoes.reverse();
    }

    get negociacoes(){
        return [].concat(this._negociacoes);
    }

    esvazia(){
        this._negociacoes = [];
        //this._callback(this);
    }

    get volumeTotal() {
        return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
     }
}