import { Injectable } from '@nestjs/common';

export interface Product {
    id: number;
    categoryId: number;
    [key: string]: any;
}

@Injectable()
export class ProductService {
    private products: Product[] = [];

    findAll() {
        return this.products;
    }

    findOne(id: number) {
        return this.products.find(p => p.id === id);
    }

    create(dto: any) {
        const product = {
            id: Date.now(),
            ...dto,
        };
        this.products.push(product);
        return product;
    }

    findByCategory(categoryId: number) {
        return this.products.filter(p => p.categoryId === categoryId);
    }
}
