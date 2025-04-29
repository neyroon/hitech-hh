"use client";
import { debounce } from "@/utils/debounce";
import React, {
  ChangeEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { SearchIcon } from "../icons/search";
import classNames from "classnames";
import QueryString from "qs";
import { fetchAPI } from "@/utils/strapi";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [productResults, setProductResults] = useState([]);
  const [articleResults, setArticleResults] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    setShowResults(false);
    setSearchQuery("");
  }, [pathname]);

  const fetchProducts = useCallback(
    async (query: string) => {
      const queryProducts = QueryString.stringify(
        {
          filters: {
            $or: [
              { title: { $containsi: query } },
              { description: { $containsi: query } },
            ],
          },
          pagination: { page: 0, pageSize: 5 },
        },
        {
          encodeValuesOnly: true,
          skipNulls: true,
        }
      );
      const queryArticles = QueryString.stringify(
        {
          filters: {
            $or: [
              { title: { $containsi: query } },
              { content: { $containsi: query } },
            ],
          },
          pagination: { page: 0, pageSize: 5 },
        },
        {
          encodeValuesOnly: true,
          skipNulls: true,
        }
      );

      const products = await fetchAPI(`/products?populate=*&${queryProducts}`);
      const articles = await fetchAPI(`/articles?populate=*&${queryArticles}`);
      console.log(queryProducts, queryArticles, query);
      setProductResults(products.data);
      setArticleResults(articles.data);
      setShowResults(query.length > 0);
    },
    [searchQuery]
  );

  const debounceTimeout = useRef<(...args: string[]) => void | null>(
    debounce(fetchProducts, 300)
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    debounceTimeout.current?.(e.target.value.trim());
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setShowResults(false);
    }
  };

  return (
    <>
      <div
        className={classNames(
          "px-[15px] py-[9px] gap-[20px] flex items-center relative bg-bg-grey rounded-[8px] mt-[50px] lg:mt-0 lg:w-[42%]",
          { "rounded-b-none": showResults }
        )}
      >
        <SearchIcon />
        <input
          type="search"
          className="text-[16px] grow text-main2 placeholder:text-grey"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Поиск по сайту"
        />
        {showResults && (
          <div className="absolute z-50 left-0 right-0 top-[42px]  bg-bg-grey rounded-b-[8px] shadow-lg">
            {productResults.length > 0 || articleResults.length > 0 ? (
              <ul className="max-h-60 overflow-auto">
                {productResults.length > 0 &&
                  productResults.map((item, index) => (
                    <li
                      key={index}
                      className=" px-[15px] py-2   hover:bg-gray-100 cursor-pointer"
                    >
                      <Link
                        href={`/catalog/${item.slug}`}
                        className="flex gap-[20px] items-center"
                      >
                        <SearchIcon />
                        {item.title}
                      </Link>
                    </li>
                  ))}
                {articleResults.length > 0 &&
                  articleResults.map((item, index) => (
                    <li
                      key={index}
                      className=" px-[15px] py-2  hover:bg-gray-100 cursor-pointer"
                    >
                      <Link
                        href={`/articles/${item.slug}`}
                        className="flex gap-[20px] items-center"
                      >
                        <SearchIcon />
                        {item.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            ) : (
              <p>По данному запросу ничего не найдено</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};
