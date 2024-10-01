'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Service } from 'src/app/(main)/catalog/services/[serviceSlug]/page';
import ClientPagination from 'components//ClientPagination';
import ServiceCard from 'src/app/(main)/catalog/_components/ServiceCard';
import { useStore } from 'zustand';
import { cartStore } from 'src/store/cart';

export default function ServicesSection({ services }: { services: Service[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const [pageServices, setPageServices] = useState<Service[]>(services);

  const title = useRef<HTMLHeadingElement>(null!);

  const addService = useStore(cartStore, (state) => state.addService);

  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
    setTimeout(() => {
      title.current.scrollIntoView();
    }, 0);
    setTimeout(() => {
      window.scrollBy(0, -230);
    }, 10);
  };

  const servicesPerPage = 4;

  useEffect(() => {
    const startIndex = (currentPage - 1) * servicesPerPage;
    const endIndex = startIndex + servicesPerPage;
    setPageServices(services.slice(startIndex, endIndex));
  }, [currentPage, services]);

  return (
    <div className="flex flex-col gap-10 bg-[#FBFBFB] pb-20 max-lg:px-[27px] max-[350px]:p-0 max-[350px]:pb-20">
      <h2
        ref={title}
        className="pl-[120px] text-5xl font-semibold text-text-blue max-lg:w-[140px] max-lg:px-0 max-lg:text-4xl"
        id="services"
      >
        НАШИ УСЛУГИ
      </h2>
      <div className="flex flex-col gap-10">
        {pageServices.map((service) => (
          <ServiceCard
            service={service}
            key={service.Title}
            type="single"
            addService={addService}
          />
        ))}
      </div>
      <ClientPagination
        currentPage={currentPage}
        totalPages={Math.ceil(services.length / servicesPerPage)}
        changePage={changePage}
      />
    </div>
  );
}
