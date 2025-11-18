// src/utils/pagination.ts

export const paginate = async (model: any, query: object, page: number, limit: number, select: string = '') => {
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    model.find(query).select(select).skip(skip).limit(limit),
    model.countDocuments(query),
  ]);

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};