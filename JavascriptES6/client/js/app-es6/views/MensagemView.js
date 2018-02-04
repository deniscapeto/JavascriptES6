import {View} from './View';

export class MensagemView extends View{

    _template(model){

        if(!model.texto)
            return `<p></p>` ;

        return `
        <p class="alert alert-info">
        ${model.texto}
        </p>
        `;
    }
  
    }