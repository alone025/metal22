import { Breadcrumb } from 'components//Breadcrumb';
import CategoryCard from 'src/app/(main)/catalog/_components/CategoryCard';
import { Service } from 'src/app/(main)/catalog/services/[serviceSlug]/page';
import ServicesSection from 'src/app/(main)/catalog/_components/ServicesSection';

export type Category = {
  id: number;
  name: string;
  parent_id: number;
  image: string;
  subcategories: SubCategory[];
  filters: { id: number; name: string }[];
  Categories_list: string[];
  Discount: number;
};

export type SubCategory = {
  id: number;
  name: string;
  parent_id: number;
  image: string;
  filters: { id: number; name: string }[];
  Categories_list: string[];
  Discount: number;
};

async function getCategories(): Promise<Category[]> {
  return await fetch('https://marcas.pro/api/categories/list', {
    method: 'GET',
    cache: 'no-cache',
  }).then((res) => res.json());
}

async function getServices(): Promise<Service[]> {
  const res = await fetch('https://marcas.pro/api/services', {
    method: 'GET',
    cache: 'no-cache',
  });

  return await res.json();
}

export default async function CatalogPage() {
  const categories = await getCategories();
  const services = await getServices();

  const categoriesWithoutMain = categories.filter((c) => c.id !== 1);

  return (
    <div>
      <div className="flex flex-col gap-10 bg-[#FBFBFB] px-[120px] pb-[200px] pt-10 max-lg:px-[27px] max-lg:pb-[120px] max-[350px]:p-0 max-[350px]:pb-[120px]">
        <Breadcrumb
          mainClassName="!block"
          className={'max-md:text-lg'}
          linksList={[
            { href: '/', name: 'Главная' },
            { href: '/catalog', name: 'Каталог' },
          ]}
        />

        <h2
          className="text-5xl font-semibold text-text-blue max-lg:text-4xl"
          id="catalog-items"
        >
          КАТАЛОГ
        </h2>
        <div className="flex flex-wrap gap-10">
          {categoriesWithoutMain &&
            categoriesWithoutMain.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
        </div>
      </div>

      <div>
        <ServicesSection services={services ? services : []} />
      </div>
    </div>
  );
}
