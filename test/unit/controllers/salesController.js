const sinon = require('sinon');
const { expect } = require('chai');
const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

describe('Testa se a Controller de Sales retorna', () => {
  const req = {};
  const res = {};

  const execute = [{
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2
  },];

  before(() => {
    res.status = sinon.stub()
      .returns(res);

    res.json = sinon.stub()
      .returns(execute);

    sinon.stub(salesService, 'getAll').resolves(execute);
    sinon.stub(salesService, 'getById').resolves(execute);
  });

  after(() => {
    salesService.getAll.restore();
    salesService.getById.restore();
  });

  describe('todos as vendas', () => {
    it('em um JSON com o formato correto', async () => {
      await salesController.getAll(req, res);

      expect(res.json.calledWith(execute)).to.be.equal(true);
    });

    it('com o status 200 na resposta', async () => {
      await salesController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('apenas uma venda', () => {
    before(() => {
      req.params = { id: 1 }
    });

    it('em um JSON com o formato correto', async () => {
      await salesController.getById(req, res);

      Date.now()

      expect(res.json.calledWith(execute)).to.be.equal(true);
    });

    it('com o status 200 na resposta', async () => {
      await salesController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});