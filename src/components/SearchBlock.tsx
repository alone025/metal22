'use client';

import { useDebounce } from '@uidotdev/usehooks';
import SearchResults from 'components//SerchResults';
import { Button } from 'components//ui/button';
import { Input } from 'components//ui/input';
import { SearchIcon, X } from 'lucide-react';



import { useEffect, useState } from 'react';
import fetchSearchResults from 'src/utils/fetchSearchResults';

export type FoundProduct = {
  ID: string;
  Name: string;
  Description: string;
  Image: null;
  Price: number;
  CategoryID: number;
  Category: {
    ID: number;
    Name: string;
  };
};

export default function SearchBlock() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoundProduct[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    fetchSearchResults(debouncedSearchQuery).then((data) => {
      setSearchResults(data);
    });
  }, [debouncedSearchQuery]);

  return (
    <div
      className="relative box-border rounded-lg sm:rounded-none flex flex-1 flex-row items-center border-2 border-transparent bg-[#F5F5F5] sm:bg-gray-2 focus-within:border-blue max-2xl:w-full"
      onFocus={() => setTimeout(() => setIsFocused(true))}
      onBlur={() => setTimeout(() => setIsFocused(false), 100)}
    >
       <Button
        aria-label="Поиск по сайту"
        variant="ghost"
        size="icon"
        className="flex h-6 w-4 ml-3 justify-start text-[#3C3C4399] sm:hidden"
      >
        <SearchIcon className="h-4 w-4" />
      </Button>
      <Input
        placeholder="Поиск по сайту"
        className="border-0 p-6 text-base placeholder:text-[#3C3C4399] sm:placeholder:text-gray sm:placeholder:opacity-60 max-2xl:p-2 max-[640px]:text-base max-2xl:placeholder:text-sm"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button
        aria-label="Поиск по сайту"
        variant="ghost"
        size="icon"
        className="hidden sm:flex h-16 w-16 justify-start text-gray max-2xl:h-8 max-2xl:w-8"
      >
        <SearchIcon className="h-4 w-4" />
      </Button>
    {
      searchQuery.length !== 0 && (
        <Button
        aria-label="Поиск по сайту"
        variant="ghost"
        size="icon"
        className="flex sm:hidden h-16 w-16 justify-start text-gray max-2xl:h-8 max-2xl:w-8"
        onClick={()=> setSearchQuery('')}
      >
        <X className='h-4 w-4 bg-[#3C3C4399] rounded-full text-white p-[2px]' />
      </Button>
      )
    }
      {isFocused &&
        searchQuery !== '' &&
        (searchResults && searchResults.length > 0 ? (
          <SearchResults
            searchResults={searchResults}
            clearSearch={() => {
              setIsFocused(false);
              setSearchQuery('');
            }}
          />
        ) : (
          <div className="shadow-max-lg absolute top-[100%] z-30 flex w-full flex-col justify-around gap-1 overflow-auto bg-gray-2">
            <div className="bg-white p-4 hover:shadow-2xl">
              Позвоните нам и уточните наличие товара, на сайте может быть не
              вся номенклатура
            </div>
          </div>
        ))}
    </div>
  );
}
