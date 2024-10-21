import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
      playground: {
        settings: {
          'schema.polling.enable': false,
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'tasks.db',
      // type: 'postgres',
      // host: 'localhost',
      // port: 5432,
      // username: 'postgres',
      // password: 'ismailpipas',
      // database: 'nest_gql',
      entities: ['dist/**/*.entity.js'],
      migrationsTableName: '_typeorm_migrations',
      synchronize: true,
    }),
    TasksModule,
  ],
})
export class AppModule {}
