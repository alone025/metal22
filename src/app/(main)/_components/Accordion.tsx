import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as ShadAccordion,
} from 'src/components/ui/accordion';

type AccordionProps = {
  title: string;
  items: {
    title: string;
    text: string;
  }[];
};
export default function Accordion({ title, items }: AccordionProps) {
  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-2xl font-bold leading-9 text-[#000000] max-lg:w-[320px] max-lg:px-[27px]">
        {title}
      </h4>
      <ShadAccordion
        type="single"
        collapsible
        className="flex w-full flex-col gap-1"
      >
        {items.map(({ title, text }) => (
          <AccordionItem
            value={title}
            key={title}
            className="w-[820px] border-0 bg-[#F4F7F8] max-lg:h-auto max-lg:w-auto"
          >
            <AccordionTrigger className="text-max-lg h-[96px] gap-[53px] px-[30px]  py-5 text-left text-gray-3 max-lg:h-auto">
              {title}
            </AccordionTrigger>
            <AccordionContent className="text-max-lg px-[30px] pb-5 font-normal text-black">
              <hr className="mx-auto mb-3 border-gray" />
              <pre className="m-0 text-wrap p-0 text-base font-normal leading-normal">
                {text}
              </pre>
            </AccordionContent>
          </AccordionItem>
        ))}
      </ShadAccordion>
    </div>
  );
}
