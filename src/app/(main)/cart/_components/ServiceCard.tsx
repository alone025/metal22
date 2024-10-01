import { Button } from 'components//ui/button';

import Image from 'next/image';

import trashIcon from 'src/assets/Cart/Trash.svg';
import { SendOrderPopUp } from './SendOrderPopUp';
import sendOrder from 'src/app/utils/sendOrder';
import slugify from '@sindresorhus/slugify';
import { Service } from 'src/app/(main)/catalog/services/[serviceSlug]/page';

type ServiceCardProps = Service & {
  deleteService(id: string): void;
  town: string;
};

export default function ServiceCard(service: ServiceCardProps) {
  return (
    <div className="flex justify-between gap-10 ">
      <div className="flex h-full flex-1 justify-between border-[1px] border-[#0000001A] p-8 max-lg:w-[320px] max-lg:flex-col max-lg:gap-[60px] max-lg:p-[20px] max-[360px]:p-2 max-[332px]:p-1">
        <a
          href={`/catalog/services/${slugify(service.Title)}-${service.Id}`}
          className="text-max-lg flex flex-1 flex-row items-center justify-between font-normal max-lg:flex-col max-lg:items-start max-lg:gap-[24px]"
        >
          <p className="w-52">{service.Title}</p>
        </a>
        <div className="flex max-lg:justify-between">
          <SendOrderPopUp
            trigger={
              <Button className="rounded-none px-16 py-6 max-lg:h-[55px] max-lg:w-[186px]">
                Оформить
              </Button>
            }
            products={[]}
            services={[service]}
            callback={(name: string, phone: string) => {
              sendOrder(
                `Город: ${service.town};\nТелефон: ${phone};\nИмя: ${name};\nУслуги: ${service.Title};`
              );
            }}
          />
          <Button
            onClick={() => service.deleteService(service.Id.toString())}
            className="hidden h-[55px] w-[75px] justify-center bg-gray-2 align-middle max-lg:flex"
          >
            <Image
              src={trashIcon}
              width={28}
              height={28}
              alt="Remove from cart"
            />
          </Button>
        </div>
      </div>
      <Button
        onClick={() => service.deleteService(service.Id.toString())}
        className="h-[114px] bg-gray-2 px-10 max-lg:bottom-[-50px] max-lg:right-[50px] max-lg:hidden max-lg:h-[55px] max-lg:w-[75px] max-lg:p-0"
      >
        <Image src={trashIcon} width={28} height={28} alt="Remove from cart" />
      </Button>
    </div>
  );
}
