export class View {

    constructor(container){
        this._container = container;
    }

    update(model) {
        
            this._container.innerHTML = this._template(model);
    }    

    template(model){
        throw new Error('Metodo nao implemtado');
    }
}