const sinon = require("sinon");
const { expect } = require("chai");
const saleService = require("../../../services/saleService")
const saleController = require("../../../controllers/saleController")

describe('Busca todos as vendas - Camada de controller', () => {
  describe('Quando acha', () => {
    const req = {};
    const res = {};
    const sales = [{
      id: 1,
      date: '2022-05-08 00:52:47',
      saleId: 1,
      quantity: 2
    }];

    before(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns()

      sinon.stub(saleService, 'getAll').resolves(sales)
    })

    after(() => {
      saleService.getAll.restore()
    })

    it('O status é 200', async () => {
      await saleController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true)
    });

    it('O json contêm os dados certos', async () => {
      await saleController.getAll(req, res);

      expect(res.json.calledWith(sales)).to.be.equal(true)
    });
  });

  describe('Quando não acha', () => {
    const req = {};
    const res = {};
    const error = {status: 404, message: "Sales not found"};

    before(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns()

      sinon.stub(saleService, 'getAll').throws(error)
    });

    after(() => {
      saleService.getAll.restore()
    });

    it("O status é 404", async () => {
      await saleController.getAll(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true)
    }) 

    it('O json contêm a mensagem', async () => {
      await saleController.getAll(req, res);

      expect(res.json.calledWith({message: "Sales not found"})).to.be.equal(true)
    });
  });
});

describe('Busca um produto especifico por id = Camada de controller', () => {
  describe('Quando acha', () => {
    const req = {};
    const res = {};
    const sale = {
      id: 1,
      name: "Bola de brilhar",
      quantity: 1,
      date: "2022-05-08 05:11:01"
    }
    before(() => {
      req.params = {id: 1}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, "getById").resolves(sale);
    })

    after(() => {
      saleService.getById.restore();
    })

    it('Retorna com o status 200', async () => {
      await saleController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true)
    });
    it("O json contêm o formato correto", async () => {
      await saleController.getById(req, res);

      expect(res.json.calledWith(sale)).to.be.equal(true)
    })
  });
  describe('Quando não acha', () => {
    const req = {};
    const res = {};
    const error = { status: 404, message: 'Sale not found'}
    before(() => {
      req.params = {id: 999}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, "getById").throws(error);
    })

    after(() => {
      saleService.getById.restore();
    })
    it('Retorna um erro com o status 404', async () => {
      try {
        await saleController.getById(req, res);
      } catch (err) {
        expect(err.status).to.be.equal(404)
      }
    });
    it('Retorna um erro com a mensagem "Sale not found"', async () => {
      try {
        await saleController.getById(req, res);
      } catch (err) {
        expect(err.message).to.be.equal('Sale not found')
      }
    });
  });
}); 