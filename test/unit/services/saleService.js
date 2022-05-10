const chai = require('chai');
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon');
const saleService = require('../../../services/saleService');
const saleModel = require('../../../models/saleModel');
const errorHandler = require('../../../utils/errorHandler')
chai.use(chaiAsPromised);

const { expect } = chai;

describe('Busca pelas "sales" na Camada Services', () => {

    describe('Quando buscar por todas as vendas', () => {
        describe('Quando não existir nenhuma venda cadastrada', () => {
            const responseWhenThereAreNoSale = [];

            before(() => {
                sinon.stub(saleModel, 'getAll').resolves(responseWhenThereAreNoSale);
            })

            after(() => {
                saleModel.getAll.restore();
            })

            it('Teste se lança um erro "status: 404, message: "Sale not found"', () => {
                const message = errorHandler(404, 'Sale not found');
                const result = saleService.getAll();
                return expect(result).to.be.rejectedWith(message);

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
                sinon.stub(saleModel, 'getAll').resolves(responseWhenThereAreSale);
            })

            after(() => {
                saleModel.getAll.restore();
            })

            it('Teste se retorna uma array', async () => {
                const result = await saleService.getAll();
                expect(result).to.be.a('array')
            });

            it('Teste se o array não está vazio', async () => {
                const result = await saleService.getAll();
                expect(result).to.have.lengthOf(1);
            });

            it('Teste se o conteúdo do array é uma objeto', async () => {
                const [result] = await saleService.getAll();
                expect(result).to.be.an('object');
            });

            it('Teste se o objeto possui as chaves saleId, date, productId e quantity', async () => {
                const [result] = await saleService.getAll();
                expect(result).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
            });

        })

    })

    describe('Quando buscar uma venda pelo id', () => {

        describe('Quando não existir venda cadastrada com o id informado', () => {
            const responseWhenThereAreNoProduct = [];

            before(() => {
                sinon.stub(saleModel, 'getById').resolves([responseWhenThereAreNoProduct]);
            })

            after(() => {
                saleModel.getById.restore();
            })


            it('Teste se lança um erro "status: 404, message: "Sale not found"', () => {
                const message = errorHandler(404, 'Sale not found');
                const result = saleService.getById()
                return expect(result).to.be.rejectedWith(message);

            });
        })

        describe('Quando existir uma venda cadastrada com o id informado ', () => {

            const responseWhenThereAreSale = [
                {
                    saleId: 1,
                    date: "2022-05-08 19:50:14",
                    productId: 1,
                    quantity: 5,
                }
            ];

            before(() => {
                sinon.stub(saleModel, 'getById').resolves([responseWhenThereAreSale]);
            })

            after(() => {
                saleModel.getById.restore();
            })

            it('Teste se retorna uma array', async () => {
                const result = await saleService.getById(1);
                expect(result).to.be.a('array');
            });

            it('Teste se o array não está vazio', async () => {
                const result = await saleService.getById(1);
                expect(result).to.have.lengthOf(1);
            });

            it('Teste se o conteúdo do array é uma objeto', async () => {
                const [result] = await saleService.getById(1);
                expect(result).to.be.an('object');
            });

            it('Teste se as chaves possuem os valores 1, "2022-05-08 19:50:14", 1 e 5, respectivamente', async () => {
                const [result] = await saleService.getById(1);
                expect(result).to.include(responseWhenThereAreSale[0]);
            });

        })
    })

}) 