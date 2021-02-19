import { NextApiRequest, NextApiResponse } from 'next';
import { IModelFilter } from '../../../src/interfaces/general';
import prisma from '../../../src/prisma/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page, perPage, sortModel, filterModel } = req.query;
  // sort
  const sorting = JSON.parse(sortModel as string)[0];
  const orderBy = {};
  if (sorting !== undefined) {
    orderBy[sorting.field] = sorting.sort;
  } else {
    orderBy['createdAt'] = 'desc';
  }
  //

  // search
  const where = {};
  const filtering: IModelFilter = JSON.parse(
    filterModel ? (filterModel as string) : '{}',
  );
  if (filtering.value) {
    const operation = {};
    operation[filtering.operation] = filtering.value;
    where[filtering.field] = operation;
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        avatarPicture: true,
        createdAt: true,
      },
      where,
      orderBy: [orderBy],
      skip: (Number(page) - 1) * Number(perPage),
      take: Number(perPage),
    });
    const rowCount = await prisma.user.count();
    res.status(200).json({ success: true, users, rowCount });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
