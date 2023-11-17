import { useContext, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Product, ProductForm, Section } from 'components';
import Modal from 'components/Modal/Modal';

import { ModalContext } from 'context/ModalContext';
import css from 'components/App.module.css';
import { useDispatch, useSelector } from 'react-redux';

const ProductsPage = () => {
  const dispatch = useDispatch();

  const { isOpenModal } = useContext(ModalContext);

  // дістаємо продукти з нашого сховища, підписуємось на них з сховища
  const products = useSelector(state => state.productsStore.products);

  
  useEffect(() => {
    const stringifiedProducts = JSON.stringify(products);
    localStorage.setItem('products', stringifiedProducts);
  }, [products]);

  const handleDeleteProduct = productId => {
    const deleteProductAction = {
      type: 'products/deleteProduct',
      payload: productId,
    };
    dispatch(deleteProductAction);
  };

  const handleAddProduct = productData => {
    const hasDuplicates = products.some(
      product => product.title === productData.title
    );

    if (hasDuplicates) {
      alert(`Oops, produc with title '${productData.title}' already exists!`);
      return;
    }

    const finalProduct = {
      ...productData,
      id: nanoid(),
    };

    const addProductAction = {
      type: 'products/addProduct',
      payload: finalProduct,
    };
    dispatch(addProductAction);

    
  };

  const sortedProducts = [...products].sort((a, b) => b.discount - a.discount);
  return (
    <div>
      <Section title="Add product Form">
        <ProductForm handleAddProduct={handleAddProduct} />
      </Section>

      <Section title="Product List">
        <div className={css.productList}>
          {sortedProducts.map(product => {
            return (
              <Product
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                discount={product.discount}
                handleDeleteProduct={handleDeleteProduct}
              />
            );
          })}
        </div>
      </Section>

      {isOpenModal && <Modal />}
    </div>
  );
};

export default ProductsPage;