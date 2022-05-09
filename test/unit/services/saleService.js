const sinon = require("sinon");
const { expect } = require("chai");
const saleModel = require("../../../models/saleModel");
const saleService = require("../../../services/saleService")

describe('Busca todos as vendas - Camada de service', () => {
  describe('Quando acha', () => {
    before(() => {
      const response = [{}, {}];
      sinon.stub(saleModel, "getAll").resolves(response);
    })

    after(() => {
      saleModel.getAll.restore();
    })

    it('Retorna um array', async () => {
      const sales = await saleService.getAll();
      expect(sales).to.be.an('array')
    });

    it('O array contem objetos', async () => {
      const sales = await saleService.getAll();

      sales.forEach((product) => {
        expect(product).to.be.an("object");
      })
    });
  });

  describe('Quando não acha', () => {
    before(() => {
      const response = [];
      sinon.stub(saleService, "getAll").resolves(response)
    })

    after(() => {
      saleService.getAll.restore()
    })

    it('Retorna um erro status 404', async () => {
      try {
        await saleService.getAll()
      } catch (err) {
        expect(err.status).to.equal(404)
      }
    });

    it('Retorna um erro a mensagem', async () => {
      try {
        await saleService.getAll()
      } catch (err) {
        expect(err.message).to.equal("Sales not found")
      }
    });
  });
});

describe('Busca um produto especifico por id = Camada de service', () => {
  describe('Quando acha', () => {
    before(() => {
      const response = [{}, {}];

      sinon.stub(saleModel, 'getById').resolves(response)
    })
    after(() => {
      saleModel.getById.restore()
    });

    it('Retorna um array de objetos', async () => {
      const products = await saleService.getById(1);

      products.forEach((product) => {
        expect(product).to.be.an("object");
      });
    });    
  });
  describe('Quando não acha', () => {
    before(() => {
      const response = [];

      sinon.stub(saleModel, 'getById').resolves(response)
    })

    after(() => {
      saleModel.getById.restore()
    })

    it('Retorna um erro com status 404', async () => {
      try {
        await saleService.getById(99)
      } catch (err) {
        expect(err.status).to.be.equal(404)
      }
    });
  });
}); 
