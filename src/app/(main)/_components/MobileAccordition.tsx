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
  export default function MobileAccordition({ title, items }: AccordionProps) {
    return (
      <div className="flex flex-col gap-6">
        <ShadAccordion
          type="single"
          collapsible
          className="flex w-full flex-col gap-1"
        >
          {items.map(({ title, text }) => (
            <AccordionItem
              value={title}
              key={title}
              className="border-0 bg-[#F4F7F8] rounded-lg"
            >
              <AccordionTrigger className="gap-[53px] px-[30px] text-left text-lg font-normal leading-6 text-[#131313] p-4">
                {title}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 font-light text-black">
              
                <pre className="m-0 font-roboto text-[#131313] text-wrap p-0 text-base font-light leading-[22.4px]">
                  {text}
                </pre>
              </AccordionContent>
            </AccordionItem>
          ))}
        </ShadAccordion>
      </div>
    );
  }
  