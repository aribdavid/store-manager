const chai = require('chai');
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon');
const productService = require('../../../services/productService');
const productModel = require('../../../models/productModel');
const errorHandler = require('../../../utils/errorHandler')

chai.use(chaiAsPromised);

const { expect } = chai;

describe('Busca pelos "products" na Camada Services', () => {

    describe('Quando buscar por todos os produtos', () => {
        describe('Quando não existir nenhum produto cadastrado', () => {
            const responseWhenThereAreNoProduct = [];

            before(() => {
                sinon.stub(productModel, 'getAll').resolves(responseWhenThereAreNoProduct);
            })

            after(() => {
                productModel.getAll.restore();
            })

            it('Teste se lança um erro "status: 404, message: "Product not found"', () => {
                const message = errorHandler(404, "Product ot found");
                const result = productService.getAll();
                return expect(result).to.be.rejectedWith(message);

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
                sinon.stub(productModel, 'getAll').resolves(responseWhenThereAreProduct);
            })

            after(() => {
                productModel.getAll.restore();
            })

            it('Teste se retorna um array', async () => {
                const result = await productService.getAll();
                expect(result).to.be.a('array')
            });

            it('Teste se o array não está vazio', async () => {
                const result = await productService.getAll();
                expect(result).to.have.lengthOf(1);
            });

            it('Teste se o conteúdo do array é um objeto', async () => {
                const [result] = await productService.getAll();
                expect(result).to.be.an('object');
            });

            it('Teste se o objeto possui as chaves id, name e quantity', async () => {
                const [result] = await productService.getAll();
                expect(result).to.include.all.keys('id', 'name', 'quantity');
            });

        })

    })

    describe('Quando buscar um produto pelo id', () => {

        describe('Quando não existir produto cadastrado com o id informado', () => {
            const responseWhenThereAreNoProduct = [];

            before(() => {
                sinon.stub(productModel, 'getById').resolves(responseWhenThereAreNoProduct);
            })

            after(() => {
                productModel.getById.restore();
            })


            it('Teste se lança um erro "status: 404, message: "Product not found"', () => {
                const message = errorHandler(404, 'Product not found');
                const result = productService.getById()
                return expect(result).to.be.rejectedWith(message);

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
                sinon.stub(productModel, 'getById').resolves([responseWhenThereAreProduct]);
            })

            after(() => {
                productModel.getById.restore();
            })

            it('Teste se retorna um array', async () => {
                const result = await productService.getById(1);
                expect(result).to.be.a('array');
            });

            it('Teste se o array não está vazio', async () => {
                const result = await productService.getById(1);
                expect(result).to.have.lengthOf(1);
            });

            it('Teste se o conteúdo do array é um objeto', async () => {
                const [result] = await productService.getById(1);
                expect(result).to.be.an('object');
            });

            it('Teste se o objeto contém as chaves e valores id: 1, name: "Martelo de Thor" e quantity: 10', async () => {
                const [result] = await productService.getById(1);
                expect(result).to.include({ id: 1, name: "Martelo de Thor", quantity: 10 });
            });


        })
    })

}) 