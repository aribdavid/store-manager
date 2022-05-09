const sinon = require("sinon");
const { expect } = require("chai");
const productModel = require("../../../models/productModel")
const connection = require("../../../models/connection");

describe("Busca todos os produtos - Camada de model", () => {
  describe("Quando acha ", async () => {
    before(() => {
      const response = [[{}, {}]];
      sinon.stub(connection, "execute").resolves(response);
    });

    after(() => {
      connection.execute.restore();
    });

    it("Retorna um array", async () => {
      const products = await productModel.getAll();

      expect(products).to.be.an("array");
    });

    it("O array contem objetos", async () => {
      const products = await productModel.getAll();

      expect(products[0]).to.be.an("object");
    });
  });

  describe("Quando não acha", async () => {
    before(() => {
      const response = [[]];
      sinon.stub(connection, "execute").resolves(response);
    });

    after(() => {
      connection.execute.restore();
    });

    it("retorna um array vazio", async () => {
      const products = await productModel.getAll();

      expect(products).to.have.lengthOf(0);
    });
  });
});

describe('Busca um produto especifico por id = Camada de model', () => {
  describe('Quando Acha', () => {
    before(() => {
      const response = [[{}]];
      sinon.stub(connection, "execute").resolves(response)
    })

    after(() => {
      connection.execute.restore()
    })
    it('Retorna um array com tamanho 1', async() => {
      const product = await productModel.getById(1);
      expect(product).to.have.lengthOf(1);
    });
    it('O conteudo do array é um objeto', async() => {
      const product = await productModel.getById(1);

      expect(product[0]).to.be.an("object");
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
      const product = await productModel.getById(999);

      expect(product).to.have.lengthOf(0);
    });
  });
});

describe('Cria um novo produto - Camada de model', () => {
  const name = 'teste';
  const quantity = 100;
  before(() => {
    const response = [{insertId: 1}];
    sinon.stub(connection, "execute").resolves(response);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Retorno um objeto com o formato', async () => {
    const product = await productModel.createProduct(name, quantity);
    expect(product).to.deep.equal({id: 1, name, quantity})
  });
}); 