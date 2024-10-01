import Link from 'next/link';

import {
  Breadcrumb as BreadcrumbShad,
  BreadcrumbItem,
  BreadcrumbLink,
} from 'src/components/ui/breadcrumb';

export function Breadcrumb({
  linksList,
  className,
  mainClassName,
}: {
  linksList: {
    name: string;
    href: string;
  }[];
  className?: string;
  mainClassName?: string;
}) {
  return (
    <BreadcrumbShad
      className={`max-md:hidden [&>ol]:max-md:flex-col [&>ol]:max-md:items-start ${mainClassName}`}
    >
      {linksList.map((link) => (
        <BreadcrumbItem key={link.name}>
          <BreadcrumbLink
            as={Link}
            href={link.href}
            className={`text-max-lg font-normal text-gray ${className}`}
          >
            {link.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </BreadcrumbShad>
  );
}
