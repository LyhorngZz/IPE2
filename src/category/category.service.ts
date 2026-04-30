import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
    private categories: any[] = [];

    findAll() {
        return this.categories;
    }

    findOne(id: number) {
        return this.categories.find(c => c.id === id);
    }

    create(dto: any) {
        const category = {
            id: Date.now(),
            ...dto,
        };
        this.categories.push(category);
        return category;
    }
}