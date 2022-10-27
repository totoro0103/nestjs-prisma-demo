import { Prisma } from '@prisma/client';

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    last_page: number;
    current_page: number;
    limit: number;
    prev: number | null;
    next: number | null;
  };
}

export type PaginateOptions = {
  page?: number | string;
  limit?: number | string;
  sort?: 'asc' | 'desc';
  sort_by?: string;
};
export type PaginateFunction = <T, K>(
  model: any,
  args?: K,
  options?: PaginateOptions,
) => Promise<PaginatedResult<T>>;

const genOrderBy = (arr: string[], obj = {}, idx = 0) => {
  console.log(arr);
  if (arr.length - 1 === idx) {
    return obj;
  }
  obj[arr[idx]] = 'asc';
  genOrderBy(arr, obj, idx + 1);
};

export const createPaginator = (
  defaultOptions: PaginateOptions,
): PaginateFunction => {
  return async (model, args: any = { where: undefined }, options) => {
    const page = Number(options?.page || defaultOptions?.page) || 1;
    const limit = Number(options?.limit || defaultOptions?.limit) || 10;

    const sort = options.sort;
    const sort_by = options.sort_by;

    let order_by = {};
    if (sort && sort_by) {
      order_by = { [sort_by]: sort };
    }

    const skip = page > 0 ? limit * (page - 1) : 0;
    const [total, data] = await Promise.all([
      model.count({ where: args.where }),
      model.findMany({
        ...args,
        take: limit,
        skip,
        orderBy: order_by,
      }),
    ]);
    const last_page = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        last_page,
        current_page: page,
        limit,
        prev: page > 1 ? page - 1 : null,
        next: page < last_page ? page + 1 : null,
      },
    };
  };
};
