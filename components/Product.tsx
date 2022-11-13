import React from "react";
import Image from "next/image";
import { FC } from "react";
import { Product } from "../models/models";

type ProductsProps = {
  product: Product;
};

const Product: FC<ProductsProps> = ({ product }) => {
  return (
    <div className="group relative">
      <div className="w-full rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none h-96 relative">
        <Image
          src={product.node.thumbnailImage.file.url}
          alt={product.node.name}
          priority={true}
          fill
          sizes="(max-width: 168px) 100vw,
                (max-width: 10px) 50vw,
                33vw"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href="#">
              <span aria-hidden="true" className="absolute inset-0"></span>
              {product.node.name}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {product.node.colorFamily !== null
              ? product.node.colorFamily[0].name
              : ""}
          </p>
        </div>
        <p className="text-sm font-medium text-gray-900">
          €{product.node.shopifyProductEu.variants?.edges[0].node.price}
        </p>
      </div>
    </div>
  );
};

export default Product;
