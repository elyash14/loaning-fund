import Link from 'next/link';
import { Fab, IconButton, Paper } from '@material-ui/core';
// import ImageIcon from "@material-ui/icons/Image";
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import TuneIcon from '@material-ui/icons/Tune';
import { getUsers } from '../../../src/apis/user';
import { IModelFilter, ProjectPage } from '../../../src/interfaces/general';
import {
  DataGrid,
  ColDef,
  RowsProp,
  SortModel,
  GridToolbar,
  FilterModelParams,
  CellParams,
  ColParams,
} from '@material-ui/data-grid';
import { useCallback, useEffect, useState } from 'react';

const columns: ColDef[] = [
  { field: 'username', headerName: 'Username', flex: 1 },
  { field: 'firstName', headerName: 'First Name', flex: 1 },
  { field: 'lastName', headerName: 'Last name', flex: 1 },
  { field: 'createdAt', headerName: 'Created At', width: 250, filterable: false },
  {
    field: '',
    flex: 1,
    disableClickEventBubbling: true,
    headerAlign: 'center',
    renderHeader: (params: ColParams) => <TuneIcon />,
    renderCell: (params: CellParams) => {
      return (
        <div style={{ textAlign: 'center', width: '100%' }}>
          <Link href="/">
            <a>
              <IconButton size="small" aria-label="view">
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
            </a>
          </Link>
          <Link href="/">
            <a>
              <IconButton size="small" aria-label="view">
                <VisibilityOutlinedIcon fontSize="small" />
              </IconButton>
            </a>
          </Link>
        </div>
      );
    },
  },
];

const Users: ProjectPage<null> = () => {
  // const { isError, isLoading, users } = getUsers();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [rows, setRows] = useState<RowsProp>([]);
  const [count, setCount] = useState(0);
  const [sortModel, setSortModel] = useState<SortModel>([
    { field: 'createdAt', sort: 'desc' },
  ]);
  const [filterValue, setFilterValue] = useState<IModelFilter | undefined>();

  useEffect(() => {
    const process = async () => {
      const res = await getUsers(page, perPage, sortModel, filterValue);
      setLoading(false);
      setRows(res.users);
      setCount(res.rowCount);
    };
    process();
  }, [page, sortModel, filterValue]);

  const onFilterChange = useCallback((params: FilterModelParams) => {
    const filter = params.filterModel.items[0];
    setFilterValue({
      operation: filter.operatorValue,
      field: filter.columnField,
      value: filter.value,
    });
  }, []);

  return (
    <>
      <Paper elevation={1}>
        <DataGrid
          autoHeight
          rows={rows}
          rowCount={count}
          columns={columns}
          pageSize={perPage}
          rowsPerPageOptions={[perPage, 25, 50]}
          pagination
          paginationMode="server"
          onPageChange={(params) => setPage(params.page)}
          onPageSizeChange={(params) => setPerPage(params.pageSize)}
          sortingMode="server"
          sortModel={sortModel}
          onSortModelChange={(params) => {
            if (params.sortModel !== sortModel) {
              setSortModel(params.sortModel);
            }
          }}
          showToolbar
          components={{
            Toolbar: GridToolbar,
          }}
          filterMode="server"
          onFilterModelChange={onFilterChange}
          checkboxSelection
          loading={loading}
        />
      </Paper>
      <Fab
        variant="extended"
        color="primary"
        style={{
          margin: 0,
          top: 'auto',
          left: 20,
          bottom: 20,
          right: 'auto',
          position: 'fixed',
        }}
      >
        <AddIcon />
        Add New User
      </Fab>
    </>
  );
};

Users.layout = 'admin';
Users.privatePage = true;

export default Users;
