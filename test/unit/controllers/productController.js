const sinon = require("sinon");
const { expect } = require("chai");
const productController = require('../../../controllers/productController')
const productService = require("../../../services/productService")

describe('Busca todos os produtos - Camada de controller', () => {
  describe('Quando acha', () => {
    const req = {};
    const res = {};
    const products = [{
      id: 1,
      name: 'Martelo de Thor',
      quantity: 10
    },{
      id: 2,
      name: 'Traje de encolhimento',
      quantity: 20
    }];

    before(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns()

      sinon.stub(productService, 'getAll').resolves(products)
    })

    after(() => {
      productService.getAll.restore()
    })

    it('O status é 200', async () => {
      await productController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true)
    });

    it('O json contêm os dados certos', async () => {
      await productController.getAll(req, res);

      expect(res.json.calledWith(products)).to.be.equal(true)
    });
  });

  describe('Quando não acha', () => {
    const req = {};
    const res = {};
    const next = () => {};
    const error = {status: 404, message: "Products not found"};

    before(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns()

      sinon.stub(productService, 'getAll').throws(error)
    });

    after(() => {
      productService.getAll.restore()
    });

    it("O status é 404", async () => {
      await productController.getAll(req, res, next);

      expect(res.status.calledWith(404)).to.be.equal(true)
    }) 

    it('O json contêm a mensagem', async () => {
      await productController.getAll(req, res);

      expect(res.json.calledWith({message: "Products not found"})).to.be.equal(true)
    });
  });
});

describe('Busca um produto especifico por id = Camada de controller', () => {
  describe('Quando acha', () => {
    const req = {};
    const res = {};
    const product = {
      id: 1,
      name: "Bola de brilhar",
      quantity: 1
    }
    before(() => {
      req.params = {id: 1}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, "findById").resolves(product);
    })

    after(() => {
      productService.findById.restore();
    })

    it('Retorna com o status 200', async () => {
      await productController.findById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true)
    });
    it("O json contêm o formato correto", async () => {
      await productController.findById(req, res);

      expect(res.json.calledWith(product)).to.be.equal(true)
    })
  });
  describe('Quando não acha', () => {
    const req = {};
    const res = {};
    const error = { status: 404, message: 'Product not found'}
    before(() => {
      req.params = {id: 999}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, "findById").throws(error);
    })

    after(() => {
      productService.findById.restore();
    })
    it('Retorna um erro com o status 404', async () => {
      try {
        await productController.findById(req, res);
      } catch (err) {
        expect(err.status).to.be.equal(404)
      }
    });
    it('Retorna um erro com a mensagem "Product not found"', async () => {
      try {
        await productController.findById(req, res);
      } catch (err) {
        expect(err.message).to.be.equal('Product not found')
      }
    });
  });
});

describe('Cria um novo produto - Camada de service', () => {
  describe('Quando cria', () => {
    const response = {
      id:1,
      name:'teste',
      quantity:100,
    }
    const req = {};
    const res = {}
    before(() => {
      req.body = {...response}

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns()
      sinon.stub(productService, "createProduct").resolves(response);
    });

    after(() => {
      productService.createProduct.restore();
    });

    it('Retorno um objeto com o formato', async () => {
      const product = await productService.createProduct(req, res);
      expect(product).to.deep.equal({...product})
    });
  });
  describe('Quando não cria', () => {
    const req = {};
    const res = {}
    before(() => {
      req.body = {name: "teste", quantity: 100}

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns()
      sinon.stub(productService, "createProduct").throws({status: 409, message: "Product already exists"});
    });

    after(() => {
      productService.createProduct.restore();
    });

    it('Retorno um erro com o status 409', async () => {
      try {
        await productController.createProduct(req, res);
      } catch (err) {
        expect(err.status).to.equal(409)
      }
    });
    it('Retorno um erro com uma mensagem', async () => {
      try {
        await productController.createProduct(req, res);
      } catch (err) {
        expect(err.message).to.equal("Product already exists")
      }
    });
  });
}); 