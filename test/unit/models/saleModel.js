const { expect } = require('chai');
const sinon = require('sinon');
const saleModel = require('../../../models/saleModel');
const connection = require('../../../models/connection');

describe('Busca pelas "sales" no Banco de Dados "StoreManager" na Camada Models ', () => {

    describe('Quando buscar por todas as vendas', () => {
        describe('Quando não existir nenhuma venda cadastrada', () => {
            const responseWhenThereAreNoSale = [[]];

            before(() => {
                sinon.stub(connection, 'execute').resolves(responseWhenThereAreNoSale);
            })

            after(() => {
                connection.execute.restore();
            })

            it('Teste se retorna um array', async () => {
                const result = await saleModel.getAll();
                expect(result).to.be.a('array')
            });

            it('Teste se retorna um array vazio', async () => {
                const result = await saleModel.getAll();
                expect(result).to.be.empty;
            });
        });

        describe('Quando existir pelo menos uma venda cadastrada', () => {
            const responseWhenThereAreSale = [
                {
                    saleId: 1,
                    date: "2022-05-08 19:50:14",
                    productId: 1,
                    quantity: 5,
                }
            ];

            before(() => {
                sinon.stub(connection, 'execute').resolves([responseWhenThereAreSale]);
            })

            after(() => {
                connection.execute.restore();
            })

            it('Teste se retorna um array', async () => {
                const result = await saleModel.getAll();
                expect(result).to.be.a('array')
            });

            it('Teste se o array não está vazio', async () => {
                const result = await saleModel.getAll();
                expect(result).to.have.lengthOf(1);
            });

            it('Teste se o conteúdo do array é um objeto', async () => {
                const [result] = await saleModel.getAll();
                expect(result).to.be.an('object');
            });

            it('Teste se o objeto possui as chaves saleId, date, productId e quantity', async () => {
                const [result] = await saleModel.getAll();
                expect(result).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
            });

        })

    })

    describe('Quando buscar uma venda pelo id', () => {
        describe('Quando não existir venda cadastrada com o id informado', () => {
            const responseWhenThereAreNoSale = [];

            before(() => {
                sinon.stub(connection, 'execute').resolves(responseWhenThereAreNoSale);
            })

            after(() => {
                connection.execute.restore();
            })

            it('Teste se retorna um array e se está vazio', async () => {
                const result = await saleModel.getById(300);
                expect(result).to.be.an('array').that.is.empty;
            });
        })

        describe('Quando existir um produto cadastrado com o id informado ', () => {

            const responseWhenThereAreSale = [
                {
                    saleId: 1,
                    date: "2022-05-08 19:50:14",
                    productId: 1,
                    quantity: 5,
                }
            ];

            before(() => {
                sinon.stub(connection, 'execute').resolves(responseWhenThereAreSale);
            })

            after(() => {
                connection.execute.restore();
            })

            it('Teste se retorna um array', async () => {
                const result = await saleModel.getById(1);
                expect(result).to.be.a('array');
            });

            it('Teste se o array não está vazio', async () => {
                const result = await saleModel.getById(1);
                expect(result).to.have.lengthOf(1);
            });

            it('Teste se o conteúdo do array é um objeto', async () => {
                const [result] = await saleModel.getById(1);
                expect(result).to.be.an('object');
            });

            it('Teste se o objeto contém as chaves saleId, date, productId e quantity', async () => {
                const [result] = await saleModel.getById(1);
                expect(result).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
            });

            it('Teste se as chaves possuem os valores 1, "2022-05-08 19:50:14", 1 e 5, respectivamente', async () => {
                const [result] = await saleModel.getById(1);
                expect(result).to.include(responseWhenThereAreSale[0]);
            });

        })
    })
}) 