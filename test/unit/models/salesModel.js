const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

describe('Testa se a Model retorna ', () => {
  describe('todos as vendas', () => {
    before(() => {
      const execute = [[{
        sale_id: 1,
        date: '2021-09-09T04:54:29.000Z',
        product_id: 1,
        quantity: 2
      }], []];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('em um formato de array', async () => {
      const response = await salesModel.getAll();

      expect(response).to.be.an('array');
    });

    it('com as propriedades corretas', async () => {
      const response = await salesModel.getAll();

      expect(response[0]).to.deep.keys('sale_id', 'date', 'product_id', 'quantity');
    });
  });

  describe('apenas uma venda', () => {
    before(() => {
      const execute = [[{
        date: '2021-09-09T04:54:29.000Z',
        product_id: 1,
        quantity: 2
      }], []];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('em um formato de objeto', async () => {
      const response = await salesModel.getById(1);

      expect(response).to.be.an('array');
    });

    it('com as propriedades corretas', async () => {
      const response = await salesModel.getById(1);

      expect(response[0]).to.deep.keys('date', 'product_id', 'quantity');
    });
  });
}); 