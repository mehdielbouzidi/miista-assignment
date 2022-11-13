import React from "react";
import { colors } from "../models/colors";
import { useRouter } from "next/router";
import { useFilter } from "../providers/FilterProvider";

const ColorFilter = () => {
  const { query } = useRouter();
  const { onQueryChange } = useFilter();
  const colorTags = query.colors ? (query.colors as string).split(";") : [];

  return (
    <div>
      <ul className="flex flex-wrap mt-5">
        {colors.map(({ name }, index) => {
          const isColorSelected = colorTags.some(
            (color) => color === name.toLocaleLowerCase()
          );

          return (
            <li
              key={index}
              className={`mr-4`}
              onClick={() => {
                onQueryChange(name.toLowerCase(), "colors");
              }}
            >
              <button
                className={`text-sm border-black uppercase ${
                  isColorSelected ? "border-b-2 " : ""
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

export default ColorFilter;
