import React from "react";
import { categories } from "../models/categories";
import { useRouter } from "next/router";
import { useFilter } from "../providers/FilterProvider";

const Filter = () => {
  const { query } = useRouter();
  const { onQueryChange } = useFilter();
  const categoryTags = query.categories
    ? (query.categories as string).split(";")
    : [];

  return (
    <div>
      <ul className="list-none flex flex-wrap mt-5">
        <li className="mr-4">
          <button
            className={`border-black uppercase ${
              categoryTags.length === 0 ? "border-b-2 " : ""
            }`}
            onClick={() => {
              onQueryChange("all", "categories");
            }}
          >
            All
          </button>
        </li>
        {categories.map(({ name }, index) => {
          const isCategorySelected = categoryTags.some(
            (categories) => categories === name
          );

          return (
            <li
              key={index}
              className={`mr-4`}
              onClick={() => {
                onQueryChange(name, "categories");
              }}
            >
              <button
                className={`text-sm text-back border-black uppercase ${
                  isCategorySelected ? "border-b-2 " : ""
                }`}
              >
                {name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Filter;
