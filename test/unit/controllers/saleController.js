const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const saleController = require('../../../controllers/saleController');
const saleService = require('../../../services/saleService');
const errorHandler = require('../../../utils/errorHandler')

chai.use(chaiAsPromised);

const { expect } = chai;

describe('Busca pelas "sales" na Camada Controllers ', () => {

    describe('Quando buscar por todas as vendas', () => {
        describe('Quando não existir nenhuma venda cadastrada', () => {

            const res = {};
            const req = {};

            before(() => {
                res.status = sinon.stub().returns(res);
                res.json = sinon.stub().returns();
                sinon.stub(saleService, 'getAll').resolves();
            })

            after(() => {
                saleService.getAll.restore();
            })

            it('Teste se lança um erro "status: 404, message: "Sale not found"', () => {
                const result = saleController.getAll();
                const message = errorHandler(404, 'Sale not found');
                return expect(result).to.be.rejectedWith(message);
            });
        });

        describe('Quando existir pelo menos uma venda cadastrada', () => {
            const res = {};
            const req = {};

            const salesMock = [
                {
                    saleId: 1,
                    date: "2022-05-08 19:50:14",
                    productId: 1,
                    quantity: 5,
                }
            ];

            before(() => {
                res.status = sinon.stub().returns(res);
                res.json = sinon.stub().returns();
                sinon.stub(saleService, 'getAll').resolves(salesMock);
            })

            after(() => {
                saleService.getAll.restore();
            })

            it('Teste se retorna o metodo "status" passando o codigo 200', async () => {
                await saleController.getAll(req, res);
                expect(res.status.calledWith(200)).to.be.true
            });

            it('Teste se retorna um array', async () => {
                await saleController.getAll(req, res);
                expect(res.json.calledWith(sinon.match.array)).to.be.true;
            });

            it('Teste se o array não está vazio', async () => {
                await saleController.getAll(req, res);
                expect((res.json.calledWith(sinon.match.array)).length !== 0).to.be.true;
            });

            it('Teste se o conteúdo do array é um objeto', async () => {
                await saleController.getAll(req, res);
                expect(res.json.calledWith([sinon.match.object])).to.be.true;
            });

            it('Teste se o objeto possui as chaves saleId, date, productId e quantity', async () => {
                await saleController.getAll(req, res);
                expect(res.json.calledWith(sinon.match.array.deepEquals(salesMock))).to.be.true;
            });

        })

    })

    describe('Quando buscar um venda pelo id', () => {
        describe('Quando não existir venda cadastrada com o id informado', () => {

            const res = {};
            const req = {};

            before(() => {
                req.params = { id: 300 };
                res.status = sinon.stub().returns(res);
                res.json = sinon.stub().returns();
                sinon.stub(saleService, 'getById').resolves();
            })

            after(() => {
                saleService.getById.restore();
            })

            it('Teste se lança um erro "status: 404, message: "Sale not found"', () => {
                const result = saleController.getById();
                const message = errorHandler(404, 'Sale not found');
                return expect(result).to.be.rejectedWith(message);
            });
        });

        describe('Quando existir um venda cadastrada com o id informado ', () => {

            const res = {};
            const req = {};

            const salesMock = [
                {
                    date: "2022-05-08 19:50:14",
                    productId: 1,
                    quantity: 5,
                }
            ];

            before(() => {
                req.params = { id: 1 };
                res.status = sinon.stub().returns(res);
                res.json = sinon.stub().returns();
                sinon.stub(saleService, 'getById').resolves(salesMock);
            })

            after(() => {
                saleService.getById.restore();
            })

            it('Teste se retorna o metodo "status" passando o codigo 200', async () => {
                await saleController.getById(req, res);
                expect(res.status.calledWith(200)).to.be.true
            });

            it('Teste se retorna um array', async () => {
                await saleController.getById(req, res);
                expect(res.json.calledWith(sinon.match.array)).to.be.true;
            });

            it('Teste se o array não está vazio', async () => {
                await saleController.getById(req, res);
                expect((res.json.calledWith(sinon.match.array)).length !== 0).to.be.true;
            });

            it('Teste se o conteúdo do array é um objeto', async () => {
                await saleController.getById(req, res);
                expect(res.json.calledWith([sinon.match.object])).to.be.true;
            });

            it('Teste se as chaves possuem os valores "2022-05-08 19:50:14", 1 e 5, respectivamente', async () => {
                await saleController.getById(req, res);
                expect(res.json.calledWith(sinon.match.array.deepEquals(salesMock))).to.be.true;
            });
        })
    })
})