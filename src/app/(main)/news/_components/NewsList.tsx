import News, { NewsType } from 'src/components/News';

async function getNews(offset: number): Promise<{ news: NewsType[] }> {
  const res = await fetch(
    `https://marcas.pro/api/news/list?offset=${offset}&limit=6`,
    {
      method: 'GET',
      cache: 'no-cache',
    }
  );

  return await res.json();
}

export default async function NewsList({ offset }: { offset: number }) {
  const { news } = await getNews(offset);


  return (
    <div className="grid grid-cols-3 grid-rows-2 max-[365px]:px-6 gap-x-16 gap-y-10 max-[1830px]:flex max-[1830px]:flex-wrap max-[1830px]:justify-center max-lg:mb-[52px] max-lg:flex max-lg:flex-col max-lg:gap-[70px]">
      {news &&
        news.map((oneNews) => (
          <News
            id={oneNews.id}
            key={oneNews.id}
            title={oneNews.title}
            texts={oneNews.texts}
            image={oneNews.image}
            date={oneNews.date}
            className="max-[900px]:items-center"
          />
        ))}
    </div>
  );
}
