import slugify from '@sindresorhus/slugify';
import { FoundProduct } from 'components//SearchBlock';

type SearchResultsProps = {
  searchResults: FoundProduct[];
  clearSearch: () => void;
};

export default function SearchResults({
  searchResults,
  clearSearch,
}: SearchResultsProps) {
  return (
    <div className="shadow-max-lg absolute top-[102%] z-30 box-border flex w-full flex-col content-around justify-center gap-2 overflow-auto border-2 border-t-0 border-blue bg-gray-2 max-2xl:-mx-[2px] max-2xl:w-[calc(100%+4px)]">
      {searchResults.map((result) => (
        <a
          key={result.ID}
          className="bg-white p-4 hover:bg-gray-2"
          href={`/catalog/category/${slugify(result.Category.Name)}-${
            result.Category.ID
          }/${slugify(result.Name)}-${result.ID}`}
          onClick={() => {
            clearSearch();
          }}
        >
          {result.Name}
        </a>
      ))}
    </div>
  );
}
