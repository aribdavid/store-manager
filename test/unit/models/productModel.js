const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../models/productModel');
const connection = require('../../../models/connection');

describe('Busca pelos "products" no Banco de Dados "StoreManager" na Camada Models ', () => {

    describe('Quando buscar por todos os produtos', () => {
        describe('Quando não existir nenhum produto cadastrado', () => {
            const responseWhenThereAreNoProduct = [[]];

            before(() => {
                sinon.stub(connection, 'execute').resolves(responseWhenThereAreNoProduct);
            })

            after(() => {
                connection.execute.restore();
            })

            it('Teste se retorna um array', async () => {
                const result = await productModel.getAll();
                expect(result).to.be.a('array')
            });

            it('Teste se retorna um array vazio', async () => {
                const result = await productModel.getAll();
                expect(result).to.be.empty;
            });
        });

        describe('Quando existir pelo menos um produto cadastrado', () => {
            const responseWhenThereAreProduct = [
                {
                    id: 1,
                    name: "Martelo de Thor",
                    quantity: 10,
                }
            ];

            before(() => {
                sinon.stub(connection, 'execute').resolves([responseWhenThereAreProduct]);
            })

            after(() => {
                connection.execute.restore();
            })

            it('Teste se retorna um array', async () => {
                const result = await productModel.getAll();
                expect(result).to.be.a('array')
            });

            it('Teste se o array não está vazio', async () => {
                const result = await productModel.getAll();
                expect(result).to.have.lengthOf(1);
            });

            it('Teste se o conteúdo do array é um objeto', async () => {
                const [result] = await productModel.getAll();
                expect(result).to.be.an('object');
            });

            it('Teste se o objeto possui as chaves id, name e quantity', async () => {
                const [result] = await productModel.getAll();
                expect(result).to.include.all.keys('id', 'name', 'quantity');
            });

        })

    })

    describe('Quando buscar um produto pelo id', () => {
        describe('Quando não existir produto cadastrado com o id informado', () => {
            const responseWhenThereAreNoProduct = [[]];

            before(() => {
                sinon.stub(connection, 'execute').resolves(responseWhenThereAreNoProduct);
            })

            after(() => {
                connection.execute.restore();
            })

            it('Teste se retorna um array e se está vazio', async () => {
                const result = await productModel.getById(300);
                expect(result).to.be.an('array').that.is.empty;
            });
        })

        describe('Quando existir um produto cadastrado com o id informado ', () => {

            const responseWhenThereAreProduct = [
                {
                    id: 1,
                    name: "Martelo de Thor",
                    quantity: 10,
                }
            ];

            before(() => {
                sinon.stub(connection, 'execute').resolves([responseWhenThereAreProduct]);
            })

            after(() => {
                connection.execute.restore();
            })

            it('Teste se retorna um array', async () => {
                const result = await productModel.getById(1);
                expect(result).to.be.a('array');
            });

            it('Teste se o array não está vazio', async () => {
                const result = await productModel.getById(1);
                expect(result).to.have.lengthOf(1);
            });

            it('Teste se o conteúdo do array é um objeto', async () => {
                const [result] = await productModel.getById(1);
                expect(result).to.be.an('object');
            });

            it('Teste se o objeto contém as chaves id, name e quantity', async () => {
                const [result] = await productModel.getById(1);
                expect(result).to.include.all.keys('id', 'name', 'quantity');
            });

            it('Teste se as chaves possuem os valores 1, "Martelo de Thor", 10 respectivamente', async () => {
                const [result] = await productModel.getById(1);
                expect(result).to.include({ id: 1, name: "Martelo de Thor", quantity: 10 });
            });

        })
    })

}) 