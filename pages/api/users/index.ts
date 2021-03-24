import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { IModelFilter } from '../../../src/interfaces/general';
import prisma from '../../../src/prisma/prisma';
import { makeHash } from '../../../src/utils/general';
import fs from 'fs';

const usersHandler = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  // Handle any other HTTP method
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// list of all users
usersHandler.get(async (req: NextApiRequest, res: NextApiResponse) => {
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
        gender: true,
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
});

// create new user
usersHandler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(400).json({ success: false });
  }

  const { body } = req;

  // move temp uploaded file to public/avatar directory
  let avatarPath = null;
  if (body.avatarFileName) {
    avatarPath = '/avatars/' + body.avatarFileName;
    if (!fs.existsSync('public/avatars')) {
      fs.mkdirSync('public/avatars');
    }
    fs.rename('tmp/' + body.avatarFileName, 'public' + avatarPath, (err) => {});
  }

  // save user
  try {
    const data = await prisma.user.create({
      data: {
        username: body.username,
        password: makeHash(body.password),
        gender: body.gender.toUpperCase(),
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        color: body.color,
        avatarPicture: avatarPath,
        creditCard: body.creditCard,
        role: 'USER',
      },
    });
    res.status(200).json({ success: true, user: data });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false });
  }
});

export default usersHandler;
