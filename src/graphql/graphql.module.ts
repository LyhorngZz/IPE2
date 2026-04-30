import { Module } from '@nestjs/common';
import { TestResolver } from './test.resolver';
import { CategoryModule } from 'src/category/category.module';
import { ProductModule } from 'src/product/product.module';
import { CategoryResolver } from './resolvers/category.resolver';
import { ProductResolver } from './resolvers/product.resolver';
import { ProductCodeFirstResolver } from './resolvers/product.codefirst.resolver';

@Module({
    imports: [CategoryModule, ProductModule],
    providers: [
        //CategoryResolver, 
        //ProductResolver,
        ProductCodeFirstResolver
    ],
})
export class GraphqlModule { }
