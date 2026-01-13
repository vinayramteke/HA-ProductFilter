let PRODUCTS = [];

export const seedProducts = (data) => {
  PRODUCTS = data;
};

export const getproducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(PRODUCTS), 500);
  });
};
