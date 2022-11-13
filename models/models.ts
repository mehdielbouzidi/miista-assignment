export type Criteria = {
  filter: (products: Product[]) => Product[];
};

export type Response = {
  data: {
    allContentfulProductPage: {
      edges: Product[];
    };
  };
};

export type Product = {
  node: {
    name: string;
    thumbnailImage: {
      file: {
        url: string;
      };
    };
    colorFamily: {
      name: string;
    }[];
    categoryTags: string[];
    shopifyProductEu: {
      variants: {
        edges: {
          node: {
            price: string;
          };
        }[];
      };
    };
  };
};

export type Filter = {
  colors: string[];
  category: string[];
  prices: string[];
};

export type Pagination = {
  productCount: number;
  currentPage: number;
  totalPages: number;
};
