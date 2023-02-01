

import { ProductService } from '@components/product/product.service';
import { ProductStore } from '@components/product/product.store';

export const productService = new ProductService();
export const productStore = new ProductStore(productService);

