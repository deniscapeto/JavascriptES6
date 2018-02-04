'use strict';

System.register(['./HttpService', './ConnectionFactory', '../dao/NegociacaoDao', '../models/Negociacao'], function (_export, _context) {
    "use strict";

    var HttpService, ConnectionFactory, NegociacaoDao, Negociacao, _createClass, NegociacaoService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HttpService) {
            HttpService = _HttpService.HttpService;
        }, function (_ConnectionFactory) {
            ConnectionFactory = _ConnectionFactory.ConnectionFactory;
        }, function (_daoNegociacaoDao) {
            NegociacaoDao = _daoNegociacaoDao.NegociacaoDao;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('NegociacaoService', NegociacaoService = function () {
                function NegociacaoService() {
                    _classCallCheck(this, NegociacaoService);

                    this._http = new HttpService();
                }

                _createClass(NegociacaoService, [{
                    key: 'obterNegociacoes',
                    value: function obterNegociacoes() {

                        return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(function (retornoGeral) {
                            return retornoGeral.reduce(function (achatado, array) {
                                return achatado.concat(array);
                            }, []);
                        }).catch(function (erro) {
                            throw new Error(erro);
                        });
                    }
                }, {
                    key: 'obterNegociacoesDaSemana',
                    value: function obterNegociacoesDaSemana() {

                        return this._http.get('negociacoes/semana').then(function (negos) {
                            return negos.map(function (n) {
                                return new Negociacao(new Date(n.data), n.quantidade, n.valor);
                            });
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new Error('Não foi possível obter as negociações da semana');
                        });
                    }
                }, {
                    key: 'obterNegociacoesDaSemanaAnterior',
                    value: function obterNegociacoesDaSemanaAnterior() {

                        return this._http.get('negociacoes/anterior').then(function (negos) {
                            return negos.map(function (n) {
                                return new Negociacao(new Date(n.data), n.quantidade, n.valor);
                            });
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new Error('Não foi possível obter as negociações da semana anterior');
                        });
                    }
                }, {
                    key: 'obterNegociacoesDaSemanaRetrasada',
                    value: function obterNegociacoesDaSemanaRetrasada() {

                        return this._http.get('negociacoes/retrasada').then(function (negos) {
                            return negos.map(function (n) {
                                return new Negociacao(new Date(n.data), n.quantidade, n.valor);
                            });
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new Error('Não foi possível obter as negociações da semana retrasada');
                        });
                    }
                }, {
                    key: 'adiciona',
                    value: function adiciona(negociacao) {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.adiciona(negociacao);
                        }).then(function () {
                            return 'Negociacao adicionada com sucesso!';
                        }).catch(function (e) {
                            console.log(e);
                            throw new Error('Nao foi possivel adicionar negociacao');
                        });
                    }
                }, {
                    key: 'listaTodos',
                    value: function listaTodos() {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.listaTodos();
                        }).catch(function (e) {
                            console.log(e);
                            throw new Error('Nao foi possivel listar todas as negociacoes');
                        });
                    }
                }, {
                    key: 'apagaTodos',
                    value: function apagaTodos() {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.apagaTodos();
                        }).then(function () {
                            return 'Negociacoes apagadas com sucesso';
                        }).catch(function (e) {
                            console.log(e);
                            throw new Error('Nao foi possivel apagar todas as negociacoes');
                        });
                    }
                }, {
                    key: 'importa',
                    value: function importa(listaAtual) {

                        return this.obterNegociacoes().then(function (negos) {
                            return negos.filter(function (negociacao) {
                                return !listaAtual.some(function (negociacaoExistente) {
                                    return negociacaoExistente.isEquals(negociacao);
                                });
                            });
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new Error('Nao foi possivel importar as negociacoes');
                        });
                    }
                }]);

                return NegociacaoService;
            }());

            _export('NegociacaoService', NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map