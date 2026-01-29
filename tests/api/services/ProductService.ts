import { BaseService }  from "./BaseService";
import { PaginationResponse, Product } from "../interfaces/product.interface";

export class ProductService extends BaseService {

    private readonly basePath = '/api/products';

    //Get nhiều products
    async getProducts(params? : {page?: number, limit?:number,type?: string}) : Promise<PaginationResponse<Product>> {
        return this.get<PaginationResponse<Product>>(this.basePath, {
            params: params,
        });

    }

    //Get 1 product
    async getProduct(id: number) : Promise<Product> {
        return this.get<Product>(`${this.basePath}/${id}`)
    }

}
