import { SortModel } from '@material-ui/data-grid';
import axios from 'axios';
import useSWR from 'swr';
import { IModelFilter } from '../interfaces/general';
import { IUser, IUserForm } from '../interfaces/users';
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

export const getUser = async (userId: string): Promise<IUser> => {
  try {
    const { data } = await axios.get('/api/users/' + userId, {
      headers: {
        Accept: 'application/json' /* Authorization: `Bearer ${token}` */,
      },
    });
    return data.user;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const addUser = async (
  // token: String,
  user: IUserForm,
): Promise<IUser> => {
  try {
    const { data } = await axios.post('/api/users', user, {
      headers: {
        Accept: 'application/json',
      },
    });
    return data.user;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const updateUser = async (
  // token: String,
  user: IUserForm,
): Promise<IUser> => {
  try {
    const { data } = await axios.put('/api/users', user, {
      headers: {
        Accept: 'application/json',
      },
    });
    return data.user;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const uploadAvatar = async (
  // token: String,
  file: File,
  onUploadProgress: (progressEvent: any) => void,
): Promise<string> => {
  const form = new FormData();
  form.append('avatar', file);

  try {
    const { data } = await axios.post('/api/users/upload-avatar', form, {
      headers: { 'content-type': 'multipart/form-data', Accept: 'application/json' },
      onUploadProgress,
    });
    return data.filename;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
