'use client';

import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import slugify from '@sindresorhus/slugify';
import ClientPagination from 'components//ClientPagination';
import { Button } from 'components//ui/button';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components//ui/dropdown-menu';
import { XCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AddToCartPopUp } from 'src/app/(main)/catalog/category/[categorySlug]/_components/AddToCartPopUp';
import { Product } from 'src/app/(main)/catalog/category/[categorySlug]/page';
import getProductPrice from 'src/app/utils/getProductPrice';

interface ProductFilter {
  id: number;
  name: string;
  value: string;
}

interface FilterOption {
  id: string;
  name: string;
  uniqueVariants: Set<string>;
}

interface ProductsListProps {
  initialProducts: Product[];
  categorySlug: string;
  categoryName: string;
}

const compareValues = (a: string, b: string) => {
  const numA = Number(a);
  const numB = Number(b);

  if (!isNaN(numA) && !isNaN(numB)) {
    return numA - numB;
  }

  return a.localeCompare(b, undefined, { numeric: true });
};

export default function ProductsList({
  initialProducts,
  categorySlug,
  categoryName,
}: ProductsListProps) {
  const [products] = useState<Product[]>(initialProducts);

  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageProducts, setPageProducts] = useState<Product[]>(initialProducts);

  const productsPerPage = 10;

  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string;
  }>({});

  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const [filters, setFilters] = useState<
    { id: string; name: string; uniqueVariants: string[] }[]
  >([]);

  useEffect(() => {
    const filtersMap: Map<string, FilterOption> = new Map();

    if (products) {
      products.forEach(({ Filters }) => {
        if (Filters) {
          Filters.forEach((filter: ProductFilter) => {
            const filterKey = filter.name;
            const filterOption = filtersMap.get(filterKey);

            if (filterOption) {
              filterOption.uniqueVariants.add(filter.value);
            } else {
              filtersMap.set(filterKey, {
                id: filterKey,
                name: filter.name,
                uniqueVariants: new Set<string>().add(filter.value),
              });
            }
          });
        }
      });

      const initialFilters = Array.from(filtersMap.values()).map((filter) => ({
        id: filter.id,
        name: filter.name,
        uniqueVariants: Array.from(filter.uniqueVariants).sort((a, b) =>
          compareValues(a, b)
        ),
      }));

      setFilters(initialFilters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (filterName: string, value: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
    setCurrentPage(1);
  };

  useEffect(() => {
    const newFiltersMap: Map<string, FilterOption> = new Map();

    filteredProducts.forEach(({ Filters }) => {
      if (Filters) {
        Filters.forEach((filter: ProductFilter) => {
          const filterKey = filter.name;
          const filterOption = newFiltersMap.get(filterKey);

          if (filterOption) {
            filterOption.uniqueVariants.add(filter.value);
          } else {
            newFiltersMap.set(filterKey, {
              id: filterKey,
              name: filter.name,
              uniqueVariants: new Set<string>().add(filter.value),
            });
          }
        });
      }
    });

    const updatedFilters = Array.from(newFiltersMap.values()).map((filter) => ({
      id: filter.id,
      name: filter.name,
      uniqueVariants: Array.from(filter.uniqueVariants).sort((a, b) =>
        compareValues(a, b)
      ),
    }));

    setFilters(updatedFilters);
  }, [filteredProducts]);

  useEffect(() => {
    if (products) {
      const filterProducts = () => {
        return products.filter(({ Filters }) => {
          return Object.entries(selectedFilters).every(
            ([filterName, value]) => {
              if (Filters) {
                const productFilter = Filters.find(
                  (f) => f.name === filterName
                );
                return productFilter && productFilter.value === value;
              }
            }
          );
        });
      };

      setFilteredProducts(filterProducts());
    }
  }, [selectedFilters, products]);

  useEffect(() => {
    if (filteredProducts) {
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const slicedProducts = filteredProducts.slice(startIndex, endIndex);

      setPageProducts(slicedProducts);
    }
  }, [currentPage, filteredProducts]);

  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
    titleRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const removeFilter = (keyToRemove: string) => {
    const updatedFilters = { ...selectedFilters };
    delete updatedFilters[keyToRemove];
    setSelectedFilters(updatedFilters);
  };

  if (!initialProducts.length) {
    return (
      <div className="border-[1px] border-[#0000001A] p-8">
        <p className="text-max-lg font-normal opacity-50">
          В данной категории отсутствуют товары
        </p>
      </div>
    );
  }

  const sortedFilters = filters.map((Filter) => {
    Filter.uniqueVariants.sort((a, b) => compareValues(a, b));
    return Filter;
  });

  return (
    <div>
      <h1
        ref={titleRef}
        className="text-[24px] font-[500] text-black pl-[2px] max-lg:text-4xl max-sm:text-2xl mb-[15px]"
      >
        {categoryName}
      </h1>
      <div>
        {/* <div className="flex flex-wrap gap-4 pb-2">
          
        </div> */}
        <div className="flex items-center gap-20 max-lg:flex-wrap max-lg:gap-1 max-lg:pl-0 ">
          <p className="w-[200px] text-base font-normal max-lg:hidden">
            Наименование
          </p>
          {sortedFilters.map((filter) => (
            <DropdownMenu modal={false} key={filter.name + filter.id}>
              <DropdownMenuTrigger className="w-[150px] cursor-pointer justify-start text-base font-normal text-black max-lg:text-xs">
                {filter.name}
                {selectedFilters[filter.name] && (
                  <div className="relative w-fit pl-1">
                    : {selectedFilters[filter.name]}
                  </div>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex w-full flex-col gap-0.5 bg-[#FBFBFB] p-0 shadow">
                {filter.uniqueVariants.map((variant, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="text-max-lg w-[281px] cursor-pointer justify-center bg-white p-5 font-medium text-black hover:bg-white"
                    asChild
                  >
                    <Button
                      key={variant}
                      onClick={() => handleFilterChange(filter.name, variant)}
                    >
                      {variant}
                    </Button>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}

          <p className="w-[200px] text-base font-normal max-lg:hidden">Цена</p>
        </div>

        <div className="flex flex-col gap-4 pt-4 max-lg:pt-[40px]">
          {pageProducts.map(({ Product, Filters }) => (
            <div
              key={Product.name + Product.id}
              className="z-10 flex justify-between gap-20 rounded-[8px] bg-white p-[34px] max-lg:flex-col max-lg:gap-6 max-lg:p-[20px]"
            >
              <a
                className="text-max-lg relative z-10 flex w-full  items-center font-normal text-black max-lg:flex-col max-lg:items-start gap-[7px]"
                href={`${categorySlug}/${slugify(Product.name)}-${Product.id}`}
              >
                <p className="text-[18px] font-[500] text-black">
                  {Product.name}
                </p>
                {Filters &&
                  Filters.map((filter) => (
                    <p
                      key={filter.id + Product.id}
                      className="flex w-[150px] justify-center max-lg:w-full max-lg:justify-normal"
                    >
                      <span className="hidden max-lg:block text-[#3C3C4399] gap-2">
                        {filter.name}: 
                      </span>
                      {filter.value}
                    </p>
                  ))}
                <p className="flex flex-row gap-2">
                  <span className="hidden max-lg:block text-[#3C3C4399]">Цена:</span>
                  {getProductPrice(Product)}
                </p>
                {Product.discount > 0 && Product.discount < 100 && (
                  <span className="text-red-500">
                    Скидка: {Product.discount}%
                  </span>
                )}
              </a>
              <AddToCartPopUp
                trigger={
                  <Button className="text-max-lg relative z-20 h-[55px] rounded-[8px] w-[210px] bg-[#307BAA] font-medium text-white max-lg:w-auto">
                    В корзину
                  </Button>
                }
                categorySlug={categorySlug}
                id={Product.id}
                name={Product.name}
                price={Product.price}
              />
            </div>
          ))}
        </div>

        <ClientPagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
          changePage={changePage}
        />
      </div>
    </div>
  );
}
