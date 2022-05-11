const sinon = require('sinon');
const { expect } = require('chai');
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

describe('Testa se a Controller dos Products retorna', () => {
  const req = {};
  const res = {};

  const data = [{
    id: 1,
    name: 'Martelo do Thor',
    quantity: 10
  }];

  before(() => {
    res.status = sinon.stub()
      .returns(res);

    res.json = sinon.stub()
      .returns(data);

    sinon.stub(productsService, 'getAll').resolves(data);
    sinon.stub(productsService, 'getById').resolves(data);
  });

  after(() => {
    productsService.getAll.restore();
    productsService.getById.restore();
  });

  describe('todos os produtos', () => {
    it('em um JSON com o formato correto', async () => {
      await productsController.getAll(req, res);

      expect(res.json.calledWith(data)).to.be.equal(true);
    });

    it('com o status 200 na resposta', async () => {
      await productsController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('apenas um produto', () => {
    before(() => {
      req.params = { id: 1 }
    });

    it('em um JSON com o formato correto', async () => {
      await productsController.getById(req, res);

      expect(res.json.calledWith(data)).to.be.equal(true);
    });

    it('com o status 200 na resposta', async () => {
      await productsController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});