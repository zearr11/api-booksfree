import { BadRequestError400 } from '../exceptions/models.error.js'

export const validatePageAndSize = ({ page, size }) => {
  if (Number(page) < 1) throw new BadRequestError400('El page debe ser un numero positivo.')
  if (Number(size) < 1) throw new BadRequestError400('El size debe ser un numero positivo.')
}
