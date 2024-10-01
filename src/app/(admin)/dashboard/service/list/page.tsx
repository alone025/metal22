'use client';

import { Service } from 'src/app/(main)/catalog/services/[serviceSlug]/page';
import AdminServicesSection from 'src/app/(admin)/dashboard/service/list/_components/AdminServicesSection';
import React, { useEffect, useState } from 'react';
import { Button } from 'components//ui/button';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

export default function CatalogPage() {
  const token = Cookies.get('token');

  useEffect(() => {
    async function getServices() {
      const res = await fetch('https://marcas.pro/api/services', {
        method: 'GET',
        cache: 'no-cache',
      }).then((res) => res.json());

      setServices(res);
    }

    getServices();
  }, []);

  const [services, setServices] = useState<Service[]>([]);

  function moveServiceUp(index: number) {
    if (index > 0) {
      const newServices = [...services];
      [newServices[index], newServices[index - 1]] = [
        newServices[index - 1],
        newServices[index],
      ];
      setServices(newServices);
    }
  }

  function moveServiceDown(index: number) {
    if (index < services.length - 1) {
      const newServices = [...services];
      [newServices[index], newServices[index + 1]] = [
        newServices[index + 1],
        newServices[index],
      ];
      setServices(newServices);
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-10 bg-[#FBFBFB] px-[120px] pb-[200px] pt-10 max-lg:px-[27px] max-lg:pb-[120px] max-[350px]:p-0 max-[350px]:pb-[120px]">
        <AdminServicesSection
          services={services}
          moveDown={moveServiceDown}
          moveUp={moveServiceUp}
        />
        <Button
          className="mx-auto w-1/3"
          onClick={() => {
            const newOrder = services.map((service) => service.Id);

            fetch('https://marcas.pro/api/services-order', {
              method: 'PATCH',
              cache: 'no-cache',
              headers: {
                Authorization: 'Bearer ' + token,
              },
              body: JSON.stringify({ order: newOrder }),
            })
              .then(() => {
                toast('Порядок сохранен');
              })
              .catch((e) => alert(e));
          }}
        >
          Сохранить новый порядок
        </Button>
      </div>
    </div>
  );
}
