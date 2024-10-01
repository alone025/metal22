import Image from 'next/image';

type WhyUsCardProps = {
  title: string;
  text: string;
  backgroundImage: string;
};
export default function WhyUsCard({
  title,
  text,
  backgroundImage,
}: WhyUsCardProps) {
  return (
    <div className="relative w-[390px] max-lg:h-[460px] max-lg:w-[320px]">
      <Image
        fill
        src={backgroundImage}
        alt="Background image"
        className="pointer-events-none object-cover object-center"
      />
      <div className="absolute z-10 h-full w-full bg-black bg-opacity-70" />
      <div className="relative z-20 mx-[30px] mb-[160px] mt-[100px] flex flex-col gap-4 text-white">
        <h3
          className="text-2xl font-bold"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p>{text}</p>
      </div>
    </div>
  );
}
