export class ProxyFactory{

    static create(objeto, props, acao){

        return new Proxy(objeto,{
        
            get(target, prop, receiver){

                if(props.includes(prop) && ProxyFactory.ehFuncao(target[prop]) ){

                    return function(){
                        let retorno = Reflect.apply(target[prop],target,arguments);
                        acao(target);
                        return retorno;
                        //view.update(target);
                    }
                }

                return Reflect.get(target,prop,receiver); // OU target[prop];

            },

            set(target, prop, value, receiver){

                let retorno = Reflect.set(target,prop, value, receiver);

                if(props.includes(prop)){
                    acao(target);
                }
                return retorno;
                 
            }
    
        });
    }

    static ehFuncao(funcao){
        return typeof(funcao) == typeof(Function)
    }
}