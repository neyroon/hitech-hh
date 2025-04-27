"use client";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BottomIcon } from "@/components/icons/bottom";
import { MinusIcon } from "@/components/icons/minus";
import { PlusIcon } from "@/components/icons/plus";
import { RatingIcon } from "@/components/icons/rating";
import { UpIcon } from "@/components/icons/up";
import { MultiRangeSlider } from "@/components/multi-range-slider";
import { Section } from "@/components/section";
import { fetchAPI, getStrapiMedia } from "@/utils/strapi";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import qs from "qs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";
import { FilterIcon } from "@/components/icons/filter";
import { RightIcon } from "@/components/icons/right";
import { Pagination } from "@/components/pagination";
import { CloseIcon } from "@/components/icons/close";
import { ButtonsBuy } from "./buttons-but";

export default function Catalog({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const {
    priceFrom,
    priceTo,
    category: categoryParams,
    deviceTypes: deviceTypesParams,
    page,
  } = use(searchParams);
  const withSearchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const [price, setPrice] = useState(() => ({
    min: Number(priceFrom) || 0,
    max: Number(priceTo) || 400000,
  }));
  const [isCategoryOpen, setIsCategoryOpen] = useState(
    categoryParams ? true : false
  );
  const [categories, setCategories] = useState<any[]>([]);
  const [pickedCategorySlug, setPickedCategorySlug] = useState(
    () => categoryParams || null
  );
  const [pickedCategory, setPickedCategory] = useState(null);
  const [pickedDeviceTypesSlug, setPickedDeviceTypesSlug] = useState<any[]>(
    () => {
      if (deviceTypesParams) {
        if (Array.isArray(deviceTypesParams)) return deviceTypesParams;
        else return [deviceTypesParams];
      } else return [];
    }
  );
  const [pickedDeviceTypes, setPickedDeviceTypes] = useState<any[]>([]);
  const [isFilterReset, setIsFilterReset] = useState(false);
  const [isCategoryFetched, setIsCategoryFetched] = useState(false);

  const [topFilters, setTopFilters] = useState<{
    availability: null | string;
    is_promotion: null | boolean;
    is_discount: null | boolean;
    is_new: null | boolean;
  }>({
    availability: null,
    is_promotion: null,
    is_discount: null,
    is_new: null,
  });
  const [products, setProducts] = useState<any[]>([]);
  const [meta, setMeta] = useState<{
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  }>({ page: 0, pageSize: 0, pageCount: 0, total: 0 });
  const [currentPage, setCurrentPage] = useState<number>(Number(page) || 0);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  async function fetchProducts() {
    const query = qs.stringify(
      {
        filters: {
          price: { $lt: price.max, $gt: price.min },
          device_types: {
            documentId: {
              $in: [...pickedDeviceTypes.map((device) => device.documentId)],
            },
          },
          availability: { $eq: topFilters.availability },
          is_new: { $eq: topFilters.is_new },
          is_discount: { $eq: topFilters.is_discount },
          is_promotion: { $eq: topFilters.is_promotion },
        },
        pagination: { page: currentPage, pageSize: 12 },
      },
      {
        encodeValuesOnly: true,
        skipNulls: true,
      }
    );

    const products = await fetchAPI(`/products?populate=*&${query}`);
    setProducts(products.data);
    setMeta(products.meta.pagination);
  }

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    async function fetchCategories() {
      const categories = await fetchAPI(
        "/categories?populate[device_types][populate]=*"
      );
      setCategories(categories.data);
      if (pickedCategorySlug) {
        const pickedCategory = categories.data.find(
          (category) => category.slug === pickedCategorySlug
        );
        const pickedDeviceTypes = pickedCategory.device_types.filter(
          (device_type) => pickedDeviceTypesSlug.includes(device_type.slug)
        );
        if (pickedCategory) setPickedCategory(pickedCategory);
        if (pickedDeviceTypes) setPickedDeviceTypes(pickedDeviceTypes);
      }
      setIsCategoryFetched(true);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isCategoryFetched) fetchProducts();
  }, [isCategoryFetched]);

  useEffect(() => {
    if (isFilterReset) fetchProducts();
  }, [isFilterReset]);

  const setParams = () => {
    const params = new URLSearchParams(withSearchParams);
    params.set("priceFrom", price.min.toString());
    params.set("priceTo", price.max.toString());
    console.log(pickedDeviceTypesSlug, "pickedDeviceTypesSlug");
    console.log(pickedCategorySlug, "pickedCategorySlug");
    if (pickedCategorySlug) {
      params.set("category", pickedCategorySlug);
    } else params.delete("category");

    if (pickedDeviceTypesSlug.length > 0) {
      params.set("deviceTypes", pickedDeviceTypesSlug);
    } else params.delete("deviceTypes");

    router.replace(`${pathName}?${params.toString()}`);
  };

  const handlePriceChange = useCallback((d) => {
    setPrice(d);
  }, []);

  useEffect(() => {
    if (pickedDeviceTypes.length === 0) {
      setPickedCategorySlug(null);
    }
  }, [pickedDeviceTypes]);

  const handleDeviceTypeCheck = (val, deviceType) => {
    if (val.target.checked) {
      setPickedDeviceTypes((picked) => [...picked, deviceType]);
      setPickedDeviceTypesSlug([deviceType.slug]);
    } else {
      setPickedDeviceTypes((picked) =>
        picked.filter((pickedDevice) => pickedDevice.slug !== deviceType.slug)
      );
      setPickedDeviceTypesSlug((picked) =>
        picked.filter((pickedDevice) => pickedDevice !== deviceType.slug)
      );
    }
  };

  const handleApplyFilters = async () => {
    setParams();
    fetchProducts();
    setIsFilterReset(false);
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    setPrice({ max: 400000, min: 0 });
    setIsCategoryOpen(false);
    setPickedCategory(null);
    setPickedDeviceTypes([]);
    setTopFilters({
      availability: null,
      is_discount: null,
      is_new: null,
      is_promotion: null,
    });
    setIsFilterReset(true);
    setIsFilterOpen(false);
    setParams();
  };

  return (
    <>
      <Breadcrumbs items={[{ text: "Каталог" }]} />
      <Section className="py-[30px] bg-bg-grey ">
        <div className="flex flex-wrap gap-[8px] mb-[30px]">
          <button
            className={classNames(
              "px-[16px] py-[8px] rounded-[4px]  hover:bg-main2 hover:text-white transition-colors duration-300 cursor-pointer",
              {
                "bg-white": topFilters.availability !== "в наличии",
                "bg-main2 text-white": topFilters.availability === "в наличии",
              }
            )}
            onClick={() =>
              setTopFilters((prev) => ({ ...prev, availability: "в наличии" }))
            }
          >
            В наличии
          </button>
          <button
            className={classNames(
              "px-[16px] py-[8px] rounded-[4px]  hover:bg-main2 hover:text-white transition-colors duration-300 cursor-pointer",
              {
                "bg-white": topFilters.availability !== "под заказ",
                "bg-main2 text-white": topFilters.availability === "под заказ",
              }
            )}
            onClick={() =>
              setTopFilters((prev) => ({ ...prev, availability: "под заказ" }))
            }
          >
            Под заказ
          </button>
          <button
            className={classNames(
              "px-[16px] py-[8px] rounded-[4px]  hover:bg-main2 hover:text-white transition-colors duration-300 cursor-pointer",
              {
                "bg-white": !topFilters.is_new,
                "bg-main2 text-white": topFilters.is_new,
              }
            )}
            onClick={() =>
              setTopFilters((prev) => ({
                ...prev,
                is_new: prev.is_new === null ? true : !prev.is_new,
                is_discount: false,
                is_promotion: false,
              }))
            }
          >
            Новинки
          </button>
          <button
            className={classNames(
              "px-[16px] py-[8px] rounded-[4px] text-white hover:bg-main2 transition-colors duration-300 bg-bg-green cursor-pointer",
              {
                "bg-bg-green": !topFilters.is_discount,
                "bg-main2 text-white": topFilters.is_discount,
              }
            )}
            onClick={() =>
              setTopFilters((prev) => ({
                ...prev,
                is_discount:
                  prev.is_discount === null ? true : !prev.is_discount,
                is_new: false,
                is_promotion: false,
              }))
            }
          >
            Скидки
          </button>
          <button
            className={classNames(
              "px-[16px] py-[8px] rounded-[4px] text-white bg-bg-orange hover:bg-main2 transition-colors duration-300 cursor-pointer",
              {
                "bg-bg-orange": !topFilters.is_promotion,
                "bg-main2 text-white": topFilters.is_promotion,
              }
            )}
            onClick={() =>
              setTopFilters((prev) => ({
                ...prev,
                is_promotion:
                  prev.is_promotion === null ? true : !prev.is_promotion,
                is_discount: false,
                is_new: false,
              }))
            }
          >
            Акции
          </button>
        </div>
        <button
          className="lg:hidden px-[14px] py-[10px] mb-[30px] rounded-[4px] bg-white w-full flex justify-between gap-[10px] items-center"
          onClick={() => setIsFilterOpen(true)}
        >
          <div className="flex gap-[10px] items-center">
            <FilterIcon />
            Фильтр
          </div>
          <RightIcon />
        </button>
        <div className="flex gap-[20px]">
          <div className="hidden w-[261px] shrink-0 lg:flex flex-col gap-[8px]">
            <div className="bg-white p-[10px] rounded-[6px]">
              <p className="mb-[8px]">Цена</p>

              <MultiRangeSlider
                min={0}
                max={400000}
                defaultMinValue={price.min}
                defaultMaxValue={price.max}
                onChange={handlePriceChange}
              />
            </div>
            <div className="bg-white py-[10px] rounded-[6px] flex flex-col">
              <div
                className={classNames(
                  "flex px-[10px] items-center justify-between cursor-pointer ",
                  { "mb-[14px]": isCategoryOpen }
                )}
                onClick={() => setIsCategoryOpen((isOpen) => !isOpen)}
              >
                <p className="">Категория товара</p>
                {isCategoryOpen ? <UpIcon /> : <BottomIcon />}
              </div>
              {isCategoryOpen &&
                categories.map((category) => (
                  <div key={category.name} className="flex flex-col mb-[14px] ">
                    <div
                      className="flex gap-[8px] items-center justify-between cursor-pointer px-[10px] mb-[8px]"
                      onClick={() => {
                        setPickedCategory((newCategory) =>
                          newCategory?.slug === category.slug ? null : category
                        );
                        setPickedCategorySlug(category.slug);
                        setPickedDeviceTypes([]);
                      }}
                    >
                      <p>{category.name}</p>
                      {pickedCategory?.slug === category.slug ? (
                        <MinusIcon />
                      ) : (
                        <PlusIcon />
                      )}
                    </div>
                    {pickedCategory?.slug === category.slug && (
                      <div className="flex flex-col  ">
                        {category.device_types.map((deviceType) => (
                          <div
                            key={deviceType.name}
                            className={classNames(
                              " p-[10px] flex gap-[6px] px-[10px] items-start",
                              {
                                "bg-white": pickedDeviceTypes.find(
                                  (type) => type.slug !== deviceType.slug
                                ),
                                "bg-bg-grey border-r border-bg-red":
                                  pickedDeviceTypes.find(
                                    (type) => type.slug === deviceType.slug
                                  ),
                              }
                            )}
                          >
                            <label className="flex items-center cursor-pointer relative">
                              <input
                                type="checkbox"
                                checked={
                                  pickedDeviceTypes.find(
                                    (type) => type.slug === deviceType.slug
                                  )
                                    ? true
                                    : false
                                }
                                onChange={(v) =>
                                  handleDeviceTypeCheck(v, deviceType)
                                }
                                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded-[8px] border-2 border-bg-red  checked:bg-bg-red"
                              />
                              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3.5 w-3.5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  strokeWidth="1"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                              </span>
                            </label>
                            <p>{deviceType.name}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <button
              className="px-[20px] py-[8px] rounded-[4px] text-white text-[18px] font-medium bg-bg-red self-start cursor-pointer"
              onClick={handleApplyFilters}
            >
              Применить
            </button>
            <button
              className="p-[10px] rounded-[6px] text-black  cursor-pointer"
              onClick={handleResetFilters}
            >
              Сбросить фильтры
            </button>
          </div>
          <div className="p-[30px] grow mx-[-20px] lg:mx-0 bg-white ">
            <div className=" grid gap-[20px] lg:gap-[10px] lg:grid-cols-3">
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    key={product.documentId}
                    className="flex flex-col gap-[20px] h-full"
                  >
                    <Link href={`/catalog/${product.slug}`}>
                      <div className=" relative bg-bg-grey rounded-[8px] ">
                        <Image
                          src={getStrapiMedia(product.image.url)}
                          width={300}
                          height={340}
                          alt="Изображение товара"
                          className="h-[340px] object-contain"
                        />
                        {product.is_promotion && (
                          <div className="py-[3px] px-[5px] rounded-[2px] bg-bg-orange text-white absolute top-[10px] right-[10px]">
                            Акция
                          </div>
                        )}
                        {product.is_discount && (
                          <div className="py-[3px] px-[5px] rounded-[2px] bg-bg-green text-white absolute top-[10px] right-[10px]">
                            Скидка
                          </div>
                        )}
                        <div className="p-[4px] flex gap-[8px] items-center bg-white absolute bottom-[10px] left-[10px] rounded-[2px]">
                          <RatingIcon />
                          <span className="text-[16px] text-grey">
                            {product.rating}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div className="flex flex-col justify-between h-full">
                      <p className="mb-[14px]">{product.title}</p>

                      <ButtonsBuy product={product} />
                    </div>
                  </div>
                ))
              ) : (
                <p>Не найдено товаров по заданным фильтрам</p>
              )}
            </div>
            <Pagination paginationData={meta} setCurrentPage={setCurrentPage} />
          </div>
        </div>
        <aside
          className={classNames(
            {
              "translate-x-[0]": isFilterOpen,
              "translate-x-[-100%]": !isFilterOpen,
            },
            " bg-white fixed flex flex-col top-0 left-0 bottom-0 right-0 w-[100%] px-[20px]  z-50  transition-transform duration-300 supports-[-webkit-touch-callout: none]:h-[webkit-fill-available] overflow-auto"
          )}
        >
          <button className="mt-[20px] self-end mb-[10px]">
            <CloseIcon />
          </button>
          <div className="flex flex-col gap-[8px]">
            <div className="bg-white p-[10px] rounded-[6px]">
              <p className="mb-[8px]">Цена</p>

              <MultiRangeSlider
                min={0}
                max={400000}
                defaultMinValue={price.min}
                defaultMaxValue={price.max}
                onChange={handlePriceChange}
              />
            </div>
            <div className="bg-white py-[10px] rounded-[6px] flex flex-col">
              <div
                className={classNames(
                  "flex px-[10px] items-center justify-between cursor-pointer ",
                  { "mb-[14px]": isCategoryOpen }
                )}
                onClick={() => setIsCategoryOpen((isOpen) => !isOpen)}
              >
                <p className="">Категория товара</p>
                {isCategoryOpen ? <UpIcon /> : <BottomIcon />}
              </div>
              {isCategoryOpen &&
                categories.map((category) => (
                  <div key={category.name} className="flex flex-col mb-[14px] ">
                    <div
                      className="flex gap-[8px] items-center justify-between cursor-pointer px-[10px] mb-[8px]"
                      onClick={() => {
                        setPickedCategory((newCategory) =>
                          newCategory?.slug === category.slug ? null : category
                        );
                        setPickedCategorySlug(category.slug);
                        setPickedDeviceTypes([]);
                      }}
                    >
                      <p>{category.name}</p>
                      {pickedCategory?.slug === category.slug ? (
                        <MinusIcon />
                      ) : (
                        <PlusIcon />
                      )}
                    </div>
                    {pickedCategory?.slug === category.slug && (
                      <div className="flex flex-col  ">
                        {category.device_types.map((deviceType) => (
                          <div
                            key={deviceType.name}
                            className={classNames(
                              " p-[10px] flex gap-[6px] px-[10px] items-start",
                              {
                                "bg-white": pickedDeviceTypes.find(
                                  (type) => type.slug !== deviceType.slug
                                ),
                                "bg-bg-grey border-r border-bg-red":
                                  pickedDeviceTypes.find(
                                    (type) => type.slug === deviceType.slug
                                  ),
                              }
                            )}
                          >
                            <label className="flex items-center cursor-pointer relative">
                              <input
                                type="checkbox"
                                checked={
                                  pickedDeviceTypes.find(
                                    (type) => type.slug === deviceType.slug
                                  )
                                    ? true
                                    : false
                                }
                                onChange={(v) =>
                                  handleDeviceTypeCheck(v, deviceType)
                                }
                                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded-[8px] border-2 border-bg-red  checked:bg-bg-red"
                              />
                              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3.5 w-3.5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  strokeWidth="1"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                              </span>
                            </label>
                            <p>{deviceType.name}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <button
              className="px-[20px] py-[8px] rounded-[4px] text-white text-[18px] font-medium bg-bg-red lg:self-start cursor-pointer"
              onClick={handleApplyFilters}
            >
              Применить
            </button>
            <button
              className="p-[10px] rounded-[6px] text-black  cursor-pointer"
              onClick={handleResetFilters}
            >
              Сбросить фильтры
            </button>
          </div>
        </aside>
      </Section>
    </>
  );
}
