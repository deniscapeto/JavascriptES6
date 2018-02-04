const dbName = 'aluraframe';
const stores = ['negociacoes'];
const dbVersion = 6;
let connection = null;
let close = null;

export class ConnectionFactory{

    constructor(){
        throw new Error('Essa classe nao pode ser instaciada.');
    }

    static getConnection(){

        return new Promise((resolve, reject) =>{

            let openRequest = window.indexedDB.open(dbName, dbVersion);

            openRequest.onupgradeneeded = (e) => {
                
                    let minhaConnection = e.target.result;
                    
                    ConnectionFacotry._createStores(minhaConnection);
            };
                
                
            openRequest.onsuccess = (e) => {            
                console.log('conexao obtida co sucesso');   
                
                if(!connection){
                    connection = e.target.result
                    close = connection.close.bind(connection);
                    connection.close = () =>{
                        throw new Error('O metodo close nao pode ser chamado diretamente');
                    }
                }

                resolve(connection);
            };
            
            openRequest.onerror = (e) => {
                console.log(e.target.error);
                reject(e.target.error.name);

            }
        });
    }
        
    static _createStores(connection){
            
        stores.forEach(store =>{
            
            if(connection.objectStoreNames.contains(store)) {
                connection.deleteObjectStore(store);
            }
    
            connection.createObjectStore(store,{ autoIncrement : true });
        });

    }

    static closeConnection(){
        if(connection){
            close();
            connection = null;
        }
    }

}