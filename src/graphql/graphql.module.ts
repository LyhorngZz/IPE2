import { Module } from '@nestjs/common';
import { TestResolver } from './test.resolver';
import { CategoryModule } from 'src/category/category.module';
import { ProductModule } from 'src/product/product.module';
import { CategoryResolver } from './resolvers/category.resolver';
import { ProductResolver } from './resolvers/product.resolver';

@Module({
    imports: [CategoryModule, ProductModule],
    providers: [CategoryResolver, ProductResolver],
})
export class GraphqlModule { }
