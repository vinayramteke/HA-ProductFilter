let PRODUCTS = [];

export const seedProducts = (data) => {
  PRODUCTS = data;
};

export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(PRODUCTS), 500);
  });
};

export const updateTitle = (id, newTitle) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      PRODUCTS = PRODUCTS.map((p) =>
        p.id === id ? { ...p, title: newTitle } : p
      );
      resolve(true);
    }, 500);
  });
};
