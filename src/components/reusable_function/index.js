// cartHandler
export const cartHandler = ({
  pId,
  carts,
  products,
  setSingleItem,
  setOpen,
}) => {
  const isInCart = carts.some((c) => c.productId === pId);
  const product = products.find((p) => p._id === pId);

  if (isInCart) {
    alert('Item is already in cart');
    return;
  }
  setSingleItem(product);
  setOpen(true);
};
export const editHandle = (id) => {
  const item = product.find((p) => p._id === id);
  if (!item) {
    alert('no item found');
    return;
  }
  setFormData(item);
  setEdit(id);
  setIsOpen(true);
};
