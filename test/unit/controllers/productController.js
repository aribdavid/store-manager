const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const productController = require('../../../controllers/productController');
const productService = require('../../../services/productService');
const errorHandler = require('../../../utils/errorHandler')

chai.use(chaiAsPromised);

const { expect } = chai;

describe('Busca pelos "products" na Camada Controllers ', () => {

    describe('Quando buscar por todos os produtos', () => {
        describe('Quando não existir nenhum produto cadastrado', () => {

            const res = {};
            const req = {};

            before(() => {
                res.status = sinon.stub().returns(res);
                res.json = sinon.stub().returns();
                sinon.stub(productService, 'getAll').resolves();
            })

            after(() => {
                productService.getAll.restore();
            })

            it('Teste se lança um erro "status: 404, message: "Product not found"', () => {
                const result = productController.getAll();
                const message = errorHandler('404', "Product Not Found");
                return expect(result).to.be.rejectedWith(message);
            });
        });

        describe('Quando existir pelo menos um produto cadastrado', () => {
            const res = {};
            const req = {};

            const productsMock = [
                {
                    id: 1,
                    name: "Martelo de Thor",
                    quantity: 10,
                }
            ];

            before(() => {
                res.status = sinon.stub().returns(res);
                res.json = sinon.stub().returns();
                sinon.stub(productService, 'getAll').resolves(productsMock);
            })

            after(() => {
                productService.getAll.restore();
            })

            it('Teste se retorna o metodo "status" passando o codigo 200', async () => {
                await productController.getAll(req, res);
                expect(res.status.calledWith(200)).to.be.true
            });

            it('Teste se retorna um array', async () => {
                await productController.getAll(req, res);
                expect(res.json.calledWith(sinon.match.array)).to.be.true;
            });

            it('Teste se o array não está vazio', async () => {
                await productController.getAll(req, res);
                expect((res.json.calledWith(sinon.match.array)).length !== 0).to.be.true;
            });

            it('Teste se o conteúdo do array é um objeto', async () => {
                await productController.getAll(req, res);
                expect(res.json.calledWith([sinon.match.object])).to.be.true;
            });

            it('Teste se o objeto possui as chaves id, name e quantity', async () => {
                await productController.getAll(req, res);
                expect(res.json.calledWith(sinon.match.array.deepEquals(productsMock))).to.be.true;
            });

        })

    })

    describe('Quando buscar um produto pelo id', () => {
        describe('Quando não existir produto cadastrado com o id informado', () => {

            const res = {};
            const req = {};

            before(() => {
                req.params = { id: 300 };
                res.status = sinon.stub().returns(res);
                res.json = sinon.stub().returns();
                sinon.stub(productService, 'getById').resolves();
            })

            after(() => {
                productService.getById.restore();
            })

            it('Teste se lança um erro "status: 404, message: "Product not found"', () => {
                const result = productController.getById();
                const message = errorHandler('404', "Product Not Found");
                return expect(result).to.be.rejectedWith(message);
            });
        });

        describe('Quando existir um produto cadastrado com o id informado ', () => {

            const res = {};
            const req = {};

            const productsMock = [
                {
                    id: 1,
                    name: "Martelo de Thor",
                    quantity: 10,
                }
            ];

            before(() => {
                req.params = { id: 1 };
                res.status = sinon.stub().returns(res);
                res.json = sinon.stub().returns();
                sinon.stub(productService, 'getById').resolves(productsMock);
            })

            after(() => {
                productService.getById.restore();
            })

            it('Teste se retorna o metodo "status" passando o codigo 200', async () => {
                await productController.getById(req, res);
                expect(res.status.calledWith(200)).to.be.true
            });

            it('Teste se retorna um array', async () => {
                await productController.getById(req, res);
                expect(res.json.calledWith(sinon.match.array)).to.be.true;
            });

            it('Teste se o array não está vazio', async () => {
                await productController.getById(req, res);
                expect((res.json.calledWith(sinon.match.array)).length !== 0).to.be.true;
            });

            it('Teste se o conteúdo do array é um objeto', async () => {
                await productController.getById(req, res);
                expect(res.json.calledWith([sinon.match.object])).to.be.true;
            });

            it('Teste se o objeto possui as chaves e valores id: 1, name: "Martelo de Thor" e quantity: 10', async () => {
                await productController.getById(req, res);
                expect(res.json.calledWith(sinon.match.array.deepEquals(productsMock))).to.be.true;
            });

        })
    })
}) 