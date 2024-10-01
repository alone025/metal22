'use client';

import React, { useEffect, useState } from 'react';
import { Service } from 'src/app/(main)/catalog/services/[serviceSlug]/page';
import ClientPagination from 'components//ClientPagination';
import AdminServiceCard from 'src/app/(admin)/dashboard/service/list/_components/AdminServiceCard';

export default function AdminServicesSection({
  services,
  moveUp,
  moveDown,
}: {
  services: Service[];
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const [pageServices, setPageServices] = useState<Service[]>([]);

  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const servicesPerPage = 4;

  useEffect(() => {
    const startIndex = (currentPage - 1) * servicesPerPage;
    const endIndex = startIndex + servicesPerPage;
    setPageServices(services.slice(startIndex, endIndex));
  }, [currentPage, services, moveUp, moveDown]);

  return (
    <div className="flex flex-col gap-10 bg-[#FBFBFB] pb-20 max-lg:px-[27px] max-[350px]:p-0 max-[350px]:pb-20">
      <h2 className="pl-[120px] text-5xl font-semibold text-text-blue max-lg:w-[140px] max-lg:px-0 max-lg:text-4xl">
        Опубликованные услуги
      </h2>
      <div className="flex flex-col gap-10">
        {pageServices.map((service) => {
          const globalIndex = services.findIndex((s) => s.Id === service.Id);
          return (
            <AdminServiceCard
              service={service}
              key={service.Title + service.Id}
              type="single"
              index={globalIndex}
              moveUp={() => moveUp(globalIndex)}
              moveDown={() => moveDown(globalIndex)}
            />
          );
        })}
      </div>
      <ClientPagination
        currentPage={currentPage}
        totalPages={Math.ceil(services.length / servicesPerPage)}
        changePage={changePage}
      />
    </div>
  );
}
