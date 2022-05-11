const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(query);

  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [product] = await connection.execute(query, [id]);

  return product;
};

const getByName = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name = ?';
  const [product] = await connection.execute(query, [name]);

  return product;
};

const createProduct = async (name, quantity) => {
  const query = `INSERT INTO StoreManager.products (name, quantity)
  VALUES (?, ?)`;
  const [{ insertId: id }] = await connection.execute(query, [name, quantity]);
  return {
    id,
    name,
    quantity,
  };
};

const updateProduct = async (id, name, quantity) => {
  const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?';
  await connection.execute(query, [name, quantity, id]);

  return {
    id, name, quantity,
  };
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  await connection.execute(query, [id]);
};

const updateAmount = async (array, boolean) => {
  const response = array
    .map(({ productId, quantity }) => {
      if (boolean) {
        return connection
          .execute(
            'UPDATE StoreManager.products SET quantity = quantity-? WHERE id=?',
             [quantity, productId],
);
      }
    return connection
      .execute('UPDATE products SET quantity = quantity+? WHERE id=?', [quantity, productId]);
  });

  await Promise.all(response);
};

module.exports = {
  getAll,
  getById,
  getByName,
  createProduct,
  updateProduct,
  deleteProduct,
  updateAmount,
};