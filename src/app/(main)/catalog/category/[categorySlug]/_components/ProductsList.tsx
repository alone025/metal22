'use client';

import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import ClientPagination from 'components//ClientPagination';
import { Button } from 'components//ui/button';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components//ui/dropdown-menu';
import { XCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Product } from 'src/app/(main)/catalog/category/[categorySlug]/page';
import { ProductCard } from './ProductCard';
import { ProductCardMobile } from './productCardMobile';

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
    <>
      <h1
        ref={titleRef}
        className="text-5xl font-medium sm:font-semibold text-[#131313] sm:text-text-blue max-lg:text-4xl max-sm:text-2xl"
      >
        {categoryName}
      </h1>
      <div>
        <div className="hidden sm:flex flex-wrap gap-4 pb-2">
          {Object.entries(selectedFilters).map(([key, value]) => (
            <div key={key} className="relative w-fit p-4 pl-1">
              <span className="font-semibold">{key}</span> : {value}
              <Button
                variant="ghost"
                className="absolute right-0 top-0 h-fit w-fit p-0"
                onClick={() => removeFilter(key)}
              >
                <XCircle className="h-4 w-4 text-blue transition hover:text-red-500 " />
              </Button>
            </div>
          ))}
        </div>
        <div className="hidden sm:flex items-center gap-20 pl-[34px] max-lg:flex-wrap max-lg:gap-1 max-lg:pl-0 ">
          {/* <p className="w-[200px] text-base font-normal max-lg:hidden">
            Наименование
          </p> */}
          {sortedFilters.map((filter) => (
            <DropdownMenu modal={false} key={filter.name + filter.id}>
              <DropdownMenuTrigger className="w-[150px] cursor-pointer justify-start gap-2 text-base font-normal text-black max-lg:text-xs">
                {filter.name}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex w-full flex-col gap-0.5 bg-[#FBFBFB] p-0 shadow">
                {filter.uniqueVariants.map((variant, index) => (
                  <DropdownMenuItem
                    key={index}
                    className=" text-max-lg w-[281px] cursor-pointer justify-center bg-white p-5 font-medium text-black hover:bg-white"
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
          {/* <p className="w-[200px] text-base font-normal max-lg:hidden">Цена</p> */}
        </div>

        <div className="mobile flex sm:hidden gap-3 flex-wrap">
        {sortedFilters.map((filter) => (
            <DropdownMenu modal={false} key={filter.name + filter.id}>
              <DropdownMenuTrigger className="w-[150px] border rounded-sm border-[#3C3C432E] cursor-pointer justify-start text-base font-normal text-black max-lg:text-xs">
                {filter.name}
                {selectedFilters[filter.name] && (
                  <div className="relative w-fit pl-1">
                    : {selectedFilters[filter.name]}
                  </div>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex w-full flex-col gap-0.5 bg-[#FBFBFB] p-0 shadow">
              {selectedFilters[filter.name] && (
                  <DropdownMenuItem asChild className="text-max-lg w-[281px] cursor-pointer justify-center bg-white p-5 font-medium text-black hover:bg-white">
                   <Button
                      onClick={()=> removeFilter(filter.name)}
                    >
                    Сброс
                    </Button>
                  </DropdownMenuItem>
                )}
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
        </div>

        <div className="flex flex-col gap-4 pt-4 max-lg:hidden max-lg:pt-[40px]">
          {pageProducts.map((product, index) => (
            <ProductCard
              key={product.Product.id}
              index={index}
              product={product}
              categorySlug={categorySlug}
            />
          ))}
        </div>

        <div className="hidden flex-col gap-4 pt-4 max-lg:flex max-lg:pt-[40px]">
          {pageProducts.map((product) => (
            <ProductCardMobile
              key={product.Product.id}
              product={product}
              categorySlug={categorySlug}
            />
          ))}
        </div>

        <ClientPagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
          changePage={changePage}
        />
      </div>
    </>
  );
}