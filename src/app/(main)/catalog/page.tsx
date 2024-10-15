import { Breadcrumb } from 'components//Breadcrumb';
import CategoryCard from 'src/app/(main)/catalog/_components/CategoryCard';
import { Service } from 'src/app/(main)/catalog/services/[serviceSlug]/page';
import ServicesSection from 'src/app/(main)/catalog/_components/ServicesSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/ui/tab';
import MobileServiceCard from './_components/MobileServiceCard';


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
    <div className='max-[640px]:bg-[#FBFBFB] py-2 sm:py-0'>
      <div className="flex flex-col gap-6 sm:gap-10 rounded-b-lg bg-white sm:bg-[#FBFBFB] px-[120px] pb-[200px] pt-10 max-lg:px-[27px] max-lg:pb-[120px] max-[640px]:p-6 max-[640px]:pb-[50px]">
        <Breadcrumb
          mainClassName="sm:!block"
          className={'max-md:text-lg'}
          linksList={[
            { href: '/', name: 'Главная' },
            { href: '/catalog', name: 'Каталог' },
          ]}
        />

        <h2
          className="text-5xl font-medium sm:font-semibold text-[#131313] sm:text-text-blue max-lg:text-4xl max-sm:text-2xl"
          id="catalog-items"
        >
          КАТАЛОГ
        </h2>
        <div className="hidden sm:flex flex-wrap gap-10">
          {categoriesWithoutMain &&
            categoriesWithoutMain.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
        </div>

        <div className="tabse-contente sm:hidden">
     
     <Tabs defaultValue="product">
 <TabsList>
   <TabsTrigger value="product">Продукция</TabsTrigger>
   <TabsTrigger value="services">Услуги</TabsTrigger>
 </TabsList> 
 <TabsContent value="product">
  <div className="flex flex-wrap gap-2 justify-center mt-8">
  {categoriesWithoutMain &&
            categoriesWithoutMain.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
  </div>
 </TabsContent>
 <TabsContent value="services">
  <div className="usluguiie flex flex-wrap gap-2 justify-center mt-8">
  {services.map((service) => (
       <MobileServiceCard service={service} key={service.Id}/>
        ))}
  </div>
 </TabsContent>
</Tabs>

     </div>


      </div>


      <div className='max-[640px]:hidden'>
        <ServicesSection services={services ? services : []} />
      </div>
    </div>
  );
}
