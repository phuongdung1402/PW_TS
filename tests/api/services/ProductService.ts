import { BaseService }  from "./BaseService";
import { PaginationResponse, Product, ProductCreate, ProductPatch, ProductUpdate } from "../interfaces/product.interface";

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


    //Luồng CRUD
    async createProduct(data: ProductCreate) : Promise<Product> {
        return this.post<Product, ProductCreate>(this.basePath, data)
    }

    async updateProduct(id: number, data: ProductUpdate): Promise<Product> {
        return this.put<Product, ProductUpdate>(`${this.basePath}/${id}`, data)
    }

    async patchProduct(id: number, data: ProductPatch): Promise<Product> {
        return this.patch<Product, ProductPatch>(`${this.basePath}/${id}`, data)
    }
    async deleteProduct(id: number): Promise<void> {
        await this.delete(`${this.basePath}/${id}`);
    }

}
