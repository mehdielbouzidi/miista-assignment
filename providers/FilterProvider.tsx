import { useRouter } from "next/router";
import { createContext, FC, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { Pagination, Product, Response } from "../models/models";
import { fetcher, filterProducts, setPages } from "../helpers/helper";

interface Props {
  children?: React.ReactNode;
}

const FilterContext = createContext<{
  products: Product[];
  pagination: Pagination;
  setPage: (page: number) => void;
  onQueryChange: (queryValue: string, queryName: string) => void;
}>({
  products: [],
  pagination: {
    currentPage: 1,
    productCount: 0,
    totalPages: 0,
  },
  setPage: () => {},
  onQueryChange: () => {},
});

export const FilterProvider: FC<Props> = ({ children }) => {
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const { query, push } = useRouter();

  const [pagination, setPagination] = useState({
    currentPage: 1,
    productCount: 0,
    totalPages: 0,
  });

  const { data } = useSWR<Response>(`/api/products`, fetcher, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (data) {
      const filteredProducts = filterProducts(
        query,
        data?.data.allContentfulProductPage.edges
      );

      setPagination({
        currentPage:
          pagination.currentPage > Math.ceil(filteredProducts.length / 9)
            ? 1
            : pagination.currentPage,
        productCount: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / 9),
      });

      setFilteredData(setPages(filteredProducts, pagination.currentPage));
    }
  }, [data, query, pagination.currentPage]);

  const handleQueryChange = (queryValue: string, queryName: string) => {
    let newQuery;

    console.log(queryValue);

    if (queryValue === "all") {
      newQuery = "";
    } else {
      const queries = query[queryName]
        ? (query[queryName] as string).split(";")
        : [];

      const isSelected = queries.some(
        (q) => q.toLowerCase() === queryValue.toLowerCase()
      );

      if (isSelected) {
        newQuery = queries
          .filter((q) => q.toLowerCase() !== queryValue.toLowerCase())
          .join(";");
      } else {
        newQuery = [...queries, queryValue].join(";");
      }

      console.log(isSelected);

      push(
        {
          query: {
            ...query,
            [queryName]: newQuery,
          },
        },
        undefined,
        {
          scroll: false,
        }
      );
    }
  };

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, currentPage: page });
  };

  return (
    <FilterContext.Provider
      value={{
        pagination,
        products: filteredData,
        setPage: handlePageChange,
        onQueryChange: handleQueryChange,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
