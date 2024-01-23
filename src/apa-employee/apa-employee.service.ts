import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ApaEmployeeEntity } from '../../db/entities/APA_EMPLEADO';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery } from 'nestjs-paginate';
import { PaginatedResult } from '../../utils/PaginationMetaDto';

@Injectable()
export class ApaEmployeeService {
  constructor(
    @InjectRepository(ApaEmployeeEntity)
    private apaEmployeeEntity: Repository<ApaEmployeeEntity>,
  ) {}

  async findAll(
    query: PaginateQuery,
  ): Promise<PaginatedResult<ApaEmployeeEntity>> {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy,
        search,
        filter = {},
        select = [],
      } = query;
      const startPagination = (page - 1) * limit;
      const endPagination = startPagination + limit;
      let orderByClause = '';
      let apaEmployeeColumns = '';
      // Convert columns for select
      if (Array.isArray(select)) {
        apaEmployeeColumns = this.apaEmployeeEntity.metadata.columns
          .filter(
            (column) =>
              select.length === 0 || select.includes(column.propertyName),
          )
          .map(
            (column) =>
              `"apaEmployee"."${column.databaseName}" AS "${column.propertyName}"`,
          )
          .join(', ');
      }
      // Convert array into a comma-separated string
      if (sortBy) {
        orderByClause = sortBy
          .map(([field, order]) => `apaEmployee.${field} ${order}`)
          .join(', ');
      }
      const subQuery = this.apaEmployeeEntity
        .createQueryBuilder('apaEmployee')
        .select(`${apaEmployeeColumns}`)
        .addSelect(`ROW_NUMBER() OVER (ORDER BY ${orderByClause})`, 'ROWNUM');
      // Columns for search on query
      if (search) {
        subQuery.where(
          `apaEmployee.role LIKE '%${search}%' OR
                 apaEmployee.firstLastName LIKE '%${search}%' OR 
                 apaEmployee.secondLastName LIKE '%${search}%' OR 
                 apaEmployee.names LIKE '%${search}%' OR 
                 apaEmployee.identificate LIKE '%${search}%'`,
        );
      }
      // Convert filters allow >,<,=,>=,=<
      if (Object.keys(filter).length > 0) {
        const columns = this.apaEmployeeEntity.metadata.columns;
        Object.entries(filter).forEach(([field, condition]) => {
          if (typeof condition === 'string') {
            const column = columns.find((col) => col.propertyName === field);
            if (column) {
              const [operator, value] = condition.split(':');
              subQuery.andWhere(
                `"apaEmployee"."${column.databaseName}" ${operator} ${value}`,
              );
            }
          }
        });
      }
      const subQueryResult = subQuery.getQuery();
      const queryResult = await this.apaEmployeeEntity.query(
        'SELECT "subquery".*\n' +
          'FROM (' +
          `${subQueryResult}` +
          ') "subquery"\n' +
          `WHERE "subquery"."ROWNUM" >= ${
            startPagination + 1
          } AND "subquery"."ROWNUM" <= ${endPagination}`,
      );
      // Obtén el total de elementos (totalCount) y los elementos paginados
      const totalCount = queryResult.length;

      // Construye el objeto de metadatos de paginación
      const paginationMeta = {
        totalCount,
        currentPage: page,
        perPage: endPagination,
        nextPage: {},
        prevPage: {},
      };
      const response: PaginatedResult<ApaEmployeeEntity> = {
        items: queryResult,
        meta: paginationMeta,
      };
      return response;
    } catch (e) {
      throw new HttpException(
        `Ocurrió un error en el servidor. ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
