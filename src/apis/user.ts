import { SortModel } from '@material-ui/data-grid';
import axios from 'axios';
import useSWR from 'swr';
import { IModelFilter } from '../interfaces/general';
import { IUser } from '../interfaces/users';
import fetcher from './fetcher';

// interface IUsersApi {
//   users: IUser[];
//   isLoading: boolean;
//   isError: boolean;
// }

// export const useUsers = (): IUsersApi => {
//   const { data, error } = useSWR(`/api/users`, fetcher);

//   return {
//     users: data?.data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// };

interface IUsersApi {
  users: IUser[];
  rowCount: number;
}
export const getUsers = async (
  page: number,
  perPage: number,
  sortModel: SortModel,
  filterModel: IModelFilter | undefined,
): Promise<IUsersApi> => {
  try {
    const { data } = await axios.get('/api/users', {
      params: { page, perPage, sortModel: JSON.stringify(sortModel), filterModel },
      headers: {
        Accept: 'application/json' /* Authorization: `Bearer ${token}` */,
      },
    });
    return {
      rowCount: data.rowCount,
      users: data.users,
    };
  } catch (error) {
    console.log(error);
    return { rowCount: 0, users: [] };
  }
};
