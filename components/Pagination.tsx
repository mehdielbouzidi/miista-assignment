import { FC } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { useFilter } from "../providers/FilterProvider";

type Props = {
  pages: number;
  currentPage: number;
  onClick: (page: number) => void;
};

export const Pagination: FC<Props> = ({ pages, currentPage, onClick }) => {
  const defaultClass =
    "relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20";
  const activeClass = "z-10 bg-indigo-50 border-indigo-500 text-indigo-600";
  const inActiveClass =
    "bg-white border-gray-300 text-gray-500 hover:bg-gray-50";

  return (
    <div className="mt-8 border-t py-5">
      <div className="flex flex-1 justify-between sm:hidden">
        {currentPage - 1 >= 1 && (
          <a
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => onClick(currentPage - 1)}
          >
            Previous
          </a>
        )}
        {currentPage + 1 <= pages && (
          <a
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => onClick(currentPage + 1)}
          >
            Next
          </a>
        )}
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
            {currentPage - 1 >= 1 && (
              <a
                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                onClick={() => onClick(currentPage - 1)}
              >
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            )}
            <a
              className={`${defaultClass} ${
                currentPage === 1 ? activeClass : inActiveClass
              }`}
              onClick={() => onClick(1)}
            >
              1
            </a>
            {currentPage - 1 > 1 && (
              <a
                className={`${defaultClass} ${
                  currentPage === 1 ? activeClass : inActiveClass
                }`}
                onClick={() => onClick(currentPage - 1)}
              >
                {currentPage - 1}
              </a>
            )}
            {currentPage !== 1 && currentPage !== pages && (
              <a className={`${defaultClass} ${activeClass}`}>{currentPage}</a>
            )}
            {currentPage + 1 < pages && (
              <a
                className={`${defaultClass} ${
                  currentPage > pages - 1 ? activeClass : inActiveClass
                }`}
                onClick={() => onClick(currentPage + 1)}
              >
                {currentPage + 1}
              </a>
            )}
            {pages > 1 && (
              <a
                href="#"
                className={`${defaultClass} ${
                  currentPage === pages ? activeClass : inActiveClass
                }`}
                onClick={() => onClick(pages)}
              >
                {pages}
              </a>
            )}
            {currentPage + 1 <= pages && (
              <a
                className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                onClick={() => onClick(currentPage + 1)}
              >
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};
