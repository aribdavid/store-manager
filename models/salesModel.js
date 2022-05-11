const connection = require('./connection');
const productsModel = require('./productsModel');

const getAll = async () => {
  const query = `
    SELECT sp.sale_id, sales.date, sp.product_id, sp.quantity 
    FROM 
      StoreManager.sales_products as sp
      INNER JOIN StoreManager.sales as sales
        ON sales.id = sp.sale_id`;
  const [products] = await connection.execute(query);

  return products;
};

const getById = async (id) => {
  const query = `
  SELECT sp.sale_id, sales.date, sp.product_id, sp.quantity 
  FROM 
    StoreManager.sales_products as sp
    INNER JOIN StoreManager.sales as sales
      ON sales.id = sp.sale_id
  WHERE sp.sale_id = ?`;
  const [sale] = await connection.execute(query, [id]);

  return sale;
};

const createProductSale = async (saleId, productId, quantity) => {
  const query = `INSERT INTO 
    StoreManager.sales_products (sale_id, product_id, quantity) 
    VALUES (?, ?, ?)`;
  connection.execute(query, [saleId, productId, quantity]);
};

const createSale = async (products) => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
  const [{ insertId: id }] = await connection.execute(query);

  await Promise.all(products
    .map(({ productId, quantity }) => createProductSale(id, productId, quantity)));
  return {
    id,
    itemsSold: [
      ...products,
    ],
  };
};

const updateSale = async (id, { productId, quantity }) => {
  const query = `UPDATE StoreManager.sales_products 
  SET quantity = ? WHERE sale_id = ?  AND product_id = ? `;
  await connection.execute(query, [quantity, id, productId]);

  return {
    saleId: id,
    itemUpdated: [
      {
        productId,
        quantity,
      },
    ],
  };
};

const deleteSale = async (id) => {
  const array = await getById(id);
  await productsModel.updateAmount(array, false);

  await connection.execute('DELETE FROM sales WHERE id=?', [id]);
};

module.exports = {
  getAll,
  getById,
  createSale,
  updateSale,
  deleteSale,
};