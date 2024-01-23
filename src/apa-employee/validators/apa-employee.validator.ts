import * as Joi from 'joi';
export const findAllSchema = Joi.object({
  limit: Joi.number().positive().required(),
  page: Joi.number().positive().required(),
  sortBy: Joi.array().min(1).required(),
  search: Joi.string().optional(),
  searchBy: Joi.string().optional(),
  select: Joi.array().min(1).optional(),
  filter: Joi.object().optional(),
  path: Joi.string().optional(),
});
