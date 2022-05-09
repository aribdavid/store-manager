const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../models/connection");
const saleModel = require("../../../models/saleModel")

describe('Busca todas as vendas feitas - Camada de model', () => {
  describe('Quando acha', () => {
    before(() => {
      const response = [[{}, {}]];

      sinon.stub(connection, 'execute').resolves(response)
    })
    after(() => {
      connection.execute.restore()
    })

    it('Retorna um array', async () => {
      const sales = await saleModel.getAll();

      expect(sales).to.be.an("array")
    });
    it('O array contêm objetos', async () => {
      const sales = await saleModel.getAll();

      sales.forEach((sale) => {
        expect(sale).to.be.an("object");
      });
    });
  });

  describe('Quando não acha', () => {
    before(() => {
      const response = [[]];
      sinon.stub(connection, 'execute').resolves(response)
    })

    after(() => {
      connection.execute.restore()
    })

    it('Retorna um array vazio', async () => {
      const sales = await saleModel.getAll();

      expect(sales).to.have.lengthOf(0)
    });
  });
});

describe('Busca uma venda especifica por id = Camada de model', () => {
  describe('Quando Acha', () => {
    before(() => {
      const response = [[{}, {}]];
      sinon.stub(connection, "execute").resolves(response)
    })

    after(() => {
      connection.execute.restore()
    })
    it('Retorna um array', async() => {
      const sales = await saleModel.getById(1);
      expect(sales).to.be.an("array");
    });
    it('O conteudo do array é um objeto', async() => {
      const sales = await saleModel.getById(1);

      sales.forEach((sale) => {
        expect(sale).to.be.an("object");
      })
    });
  });
  describe('Quando não acha', () => {
    before(() => {
      const response = [[]];
      sinon.stub(connection, "execute").resolves(response)
    })

    after(() => {
      connection.execute.restore()
    })
    it('retorna um array vazio', async() => {
      const sales = await saleModel.getById(999);

      expect(sales).to.have.lengthOf(0);
    });
  });
});