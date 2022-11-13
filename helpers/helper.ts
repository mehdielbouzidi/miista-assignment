import { Product, Criteria } from "../models/models";
import { CategoryCriteria } from "../models/CategoryCriteria";
import { TotalCriterias } from "../models/TotalCriteria";
import { ColorCriteria } from "../models/ColorCriteria";

type filterTags = "categories" | "colors";

const filterMapper = {
  categories: CategoryCriteria,
  colors: ColorCriteria,
};

export const fetcher = (...args: any) =>
  fetch(args)
    .then((res) => res.json())
    .then((res) => JSON.parse(res));

export const filterProducts = (query: any, products?: Product[]): Product[] => {
  if (products && products?.length > 0) {
    const filters: any = {};

    Object.entries(query).forEach((q) => {
      const [key, value] = q;

      if (value && key !== "page") {
        filters[key] = value;
      }
    });

    const filterTags = Object.entries(filters)
      .map((filter) => {
        const [name, value] = filter;
        const arrayValue = (value as string).split(";");

        if (filterMapper[name as filterTags]) {
          return new filterMapper[name as filterTags](arrayValue);
        }
      })
      .filter(Boolean);

    const totalCriterias = new TotalCriterias(filterTags as Criteria[]);

    return totalCriterias.filter(products);
  }

  return [];
};

export const setPages = (products: Product[], page: number) => {
  return products.slice(9 * page - 9, 9 * page);
};
