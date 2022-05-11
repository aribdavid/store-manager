const sinon = require('sinon');
const { expect } = require('chai');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');


describe('Testa se a Service da Sales retorna', () => {
  describe('um erro, caso não exista uma venda', () => {
    before(async () => {
      const execute = [];

      sinon.stub(salesModel, 'getById').resolves(execute);
    });

    after(() => {
      salesModel.getById.restore();
    });

    it('com a mensagem "Sale not found"', async () => {
      try {
        await salesService.getById(1);
      } catch (err) {
        expect(err.message).to.be.equal('Sale not found');
      }
    });

    it('com o status de erro 404', async () => {
      try {
        await salesService.getById(1);
      } catch (err) {
        expect(err.status).to.be.equal(404);
      }
    });
  });

  describe('todos as vendas', () => {
    before(async () => {
      const execute = [{
        sale_id: 1,
        date: '2021-09-09T04:54:29.000Z',
        product_id: 1,
        quantity: 2
      }];

      sinon.stub(salesModel, 'getAll').resolves(execute);
      sinon.stub(salesModel, 'getById').resolves(execute);
    });

    after(() => {
      salesModel.getAll.restore();
      salesModel.getById.restore();
    });

    it('em um formato de array', async () => {
      const response = await salesService.getAll();

      expect(response).to.be.an('array');
    });

    it('com as propriedades corretas', async () => {
      const response = await salesService.getAll();

      expect(response[0]).to.deep.keys('saleId', 'date', 'productId', 'quantity');
    });
  });

  describe('apenas uma venda', () => {
    before(async () => {
      const execute = [{
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 2
      }];

      sinon.stub(salesModel, 'getAll').resolves(execute);
      sinon.stub(salesModel, 'getById').resolves(execute);
    });

    after(() => {
      salesModel.getAll.restore();
      salesModel.getById.restore();
    });

    it('em um formato de objeto', async () => {
      const response = await salesService.getById(1);

      expect(response).to.be.an('array');
    });

    it('com as propriedades corretas', async () => {
      const response = await salesService.getById(1);

      expect(response[0]).to.deep.keys('date', 'productId', 'quantity');
    });
  });
});