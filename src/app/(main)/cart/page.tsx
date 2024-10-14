'use client';

import { Breadcrumb } from 'components//Breadcrumb';
import React, { useEffect, useState } from 'react';
import { Button } from 'components//ui/button';
import { useStore } from 'zustand';
import { cartStore } from 'src/store/cart';
import ProductCard from 'src/app/(main)/cart/_components/ProductCard';
import { SendOrderPopUp } from './_components/SendOrderPopUp';
import sendOrder from 'src/app/utils/sendOrder';
import fetchProduct, { fetchedProduct } from 'src/utils/fetchProduct';
import { Service } from 'src/app/(main)/catalog/services/[serviceSlug]/page';
import ServiceCard from 'src/app/(main)/cart/_components/ServiceCard';
import { Category } from 'src/app/(main)/catalog/page';
import fetchCategory from 'src/utils/fetchCategory';
import CategoryCard from 'src/app/(main)/cart/_components/CategoryCard';

export type fetchedProductWithAmount = fetchedProduct & {
  amount: string;
  keyU: string
};

async function fetchService(id: number): Promise<Service> {
  return await fetch(`https://marcas.pro/api/service/${id}`, {
    method: 'GET',
    cache: 'no-cache',
  }).then((res) => res.json());
}

export default function CartPage() {
  const productsInCart = useStore(cartStore, (state) => state.products);
  const servicesInCart = useStore(cartStore, (state) => state.services);
  const categoriesInCart = useStore(cartStore, (state) => state.categories);

  const totalItems =
    productsInCart.length + servicesInCart.length + categoriesInCart.length;

  const town = useStore(cartStore, (state) => state.town);

  const [isLoading, setIsLoading] = useState(true);

  const deleteProduct = useStore(cartStore, (state) => state.deleteProduct);
  const deleteService = useStore(cartStore, (state) => state.deleteService);
  const deleteCategory = useStore(cartStore, (state) => state.deleteCategory);

  const [convertedProducts, setConvertedProducts] = useState<
    fetchedProductWithAmount[]
  >([]);
  const [services, setServices] = useState<Service[]>();
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProductsPromises = productsInCart.map(
        async (productInCart) => {
          try {
            const productDetails = await fetchProduct(productInCart.id);
            return { ...productDetails, amount: productInCart.amount, keyU: productInCart.keyU };
          } catch (error) {
            deleteProduct(productInCart.id);
            return undefined;
          }
        }
      );

      const fetchedProducts = await Promise.all(fetchedProductsPromises);

      const filteredProducts = fetchedProducts.filter(
        (product) => product !== undefined
      ) as NonNullable<fetchedProductWithAmount>[];

      setConvertedProducts(filteredProducts);
    };

    const fetchServices = async () => {
      const fetchServicesPromises = servicesInCart.map(async (service) => {
        try {
          return await fetchService(+service);
        } catch (error) {
          deleteService(service);
          return undefined;
        }
      });

      const fetchedServices = await Promise.all(fetchServicesPromises);

      const filteredServices = fetchedServices.filter(
        (product) => product !== undefined
      ) as NonNullable<Service>[];

      setServices(filteredServices);
    };

    const fetchCategories = async () => {
      const fetchCategoriesPromises = categoriesInCart.map(
        async (categoryId) => {
          try {
            return await fetchCategory(+categoryId);
          } catch (error) {
            deleteCategory(categoryId);
            return undefined;
          }
        }
      );

      const fetchedCategories = await Promise.all(fetchCategoriesPromises);

      const filteredCategories = fetchedCategories.filter(
        (product) => product !== undefined
      ) as NonNullable<Category>[];

      setCategories(filteredCategories);
    };

    fetchProducts();
    fetchServices();
    fetchCategories();

    setIsLoading(false);
  }, [
    categoriesInCart,
    deleteCategory,
    deleteProduct,
    deleteService,
    productsInCart,
    servicesInCart,
  ]);

  const renderProducts = () => {
    if (!convertedProducts && !services && !categories)
      return (
        <div className="border-[1px] border-[#0000001A] p-8">
          <p className="text-max-lg font-normal opacity-50">Корзина пуста</p>
        </div>
      );

    return (
      <>
        {convertedProducts.map((productDetails) => (
          <ProductCard
            key={productDetails.product.id + productDetails.product.name}
            {...productDetails}
            town={town}
            deleteProduct={deleteProduct}
          />
        ))}
        {services?.map((service) => (
          <ServiceCard
            key={service.Id + service.Title}
            {...service}
            town={town}
            deleteService={deleteService}
          />
        ))}
        {categories?.map((category) => (
          <CategoryCard
            key={category.id + category.name}
            {...category}
            town={town}
            deleteCategory={deleteCategory}
          />
        ))}
      </>
    );
  };

  return (
    <div className="flex min-h-[895px] w-full flex-col sm:gap-10 pb-20 max-lg:min-h-full max-lg:pb-[200px]">
      <div className="pl-[120px] sm:pt-10 max-lg:pl-[27px]">
        <Breadcrumb
          mainClassName="sm:!block"
          className={'max-md:text-lg'}
          linksList={[
            { href: '/', name: 'Главная' },
            { href: '/cart', name: 'Корзина' },
          ]}
        />
      </div>

      <div className="flex flex-col gap-10 px-[120px] max-sm:pt-[24px] max-lg:px-[27px] max-sm:px-0">
      <h1 className="text-5xl max-sm:hidden font-semibold uppercase text-text-blue">
          Корзина
        </h1>
        <h1 className="max-sm:border-b sm:hidden max-sm:border-b-[#3C3C432E] pb-[24px] text-[24px] sm:text- font-semibold text-black max-sm:px-6">
          Корзина ({totalItems})
        </h1>
        <div className="flex flex-col gap-12 max-sm:px-6">
          {productsInCart.length === 0 ? (
            <div>
              <p className="text-[#131313] sm:hidden text-[16px] font-[400]">
                Корзина пуста
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-12">
                {isLoading ? (
                  <div className="border-[1px] border-[#0000001A] p-8">
                    <p className="text-max-lg font-normal opacity-50">
                      Загрузка...
                    </p>
                  </div>
                ) : (
                  renderProducts()
                )}
              </div>
              <Button className='sm:hidden'>Оформить ({totalItems})</Button>
            </>
          )}
          <div className="hidden flex-col gap-4 sm:flex">
            <p className="text-2xl font-semibold text-black">
              Товаров: {totalItems}
            </p>
            {totalItems > 0 && !isLoading && (
              <SendOrderPopUp
                trigger={
                  <Button className="text-max-lg h-[55px] w-[250px] rounded-none font-medium text-white max-sm:w-full">
                    Подать заявку
                  </Button>
                }
                products={convertedProducts}
                services={services}
                categories={categories}
                callback={(name: string, phone: string) => {
                  const productsText = convertedProducts
                    ? convertedProducts
                        .map(
                          ({ product, amount }) =>
                            `${product.name} - ${product.id} ID количество ${amount}`
                        )
                        .join(', ')
                    : '';

                  const servicesText = services
                    ? services
                        .map((service) => `${service.Title} - ${service.Id} ID`)
                        .join(', ')
                    : '';

                  const categoriesText = categories
                    ? categories
                        .map(
                          (category) => `${category.name} - ${category.id} ID`
                        )
                        .join(', ')
                    : '';

                  const orderText = `Город: ${town};\nТелефон: ${phone};\nИмя: ${name};\nТовары: ${productsText};${
                    servicesText && `\nУслуги: ${servicesText};`
                  }${categoriesText && `\nКатегории: ${categoriesText};`}`;

                  sendOrder(orderText);
                }}
              />
            )}
            <a
              href="/catalog"
              className="inline-flex h-[55px] w-[250px] items-center justify-center whitespace-nowrap rounded-none bg-blue px-4 py-2 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 max-sm:w-full"
            >
              Перейти в каталог
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
