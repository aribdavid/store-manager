const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');


describe('Testa se a Service dos Products retorna', () => {
  describe('um erro, caso não exista um produto', () => {
    before(async () => {
      const execute = [];

      sinon.stub(productsModel, 'getById').resolves(execute);
    });

    after(() => {
      productsModel.getById.restore();
    });

    it('com a mensagem "Product not found"', async () => {
      try {
        await productsService.getById(1);
      } catch (err) {
        expect(err.message).to.be.equal('Product not found');
      }
    });

    it('com o status de erro 404', async () => {
      try {
        await productsService.getById(1);
      } catch (err) {
        expect(err.status).to.be.equal(404);
      }
    });
  });

  describe('todos os produtos', () => {
    before(async () => {
      const execute = [{
        id: 1,
        name: 'Martelo do Thor',
        quantity: 10
      }];

      sinon.stub(productsModel, 'getAll').resolves(execute);
      sinon.stub(productsModel, 'getById').resolves(execute);
    });

    after(() => {
      productsModel.getAll.restore();
      productsModel.getById.restore();
    });

    it('em um formato de array', async () => {
      const response = await productsService.getAll();

      expect(response).to.be.an('array');
    });

    it('com as propriedades corretas', async () => {
      const response = await productsService.getAll();

      expect(response[0]).to.deep.keys('id', 'name', 'quantity');
    });
  });

  describe('apenas um produto', () => {
    before(async () => {
      const execute = [{
        id: 1,
        name: 'Martelo do Thor',
        quantity: 10
      }];

      sinon.stub(productsModel, 'getAll').resolves(execute);
      sinon.stub(productsModel, 'getById').resolves(execute);
    });

    after(() => {
      productsModel.getAll.restore();
      productsModel.getById.restore();
    });

    it('em um formato de objeto', async () => {
      const response = await productsService.getById(1);

      expect(response).to.be.an('object');
    });

    it('com as propriedades corretas', async () => {
      const response = await productsService.getById(1);

      expect(response).to.deep.keys('id', 'name', 'quantity');
    });
  });
});