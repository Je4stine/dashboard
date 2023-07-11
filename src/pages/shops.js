import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { UsersTable } from 'src/sections/customer/user-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';

const now = new Date();

const data = [
  {
    id: '5e887ac47eed253091be10cb',
    address: {
      city: 'Cleveland',
      country: 'USA',
      state: 'Ohio',
      street: '2849 Fulton Street'
    },
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: 'carson.darrin@devias.io',
    name: 'Carson Darrin',
    phone: '304-428-3097',
    users: 10
  },
 
];

// const useCustomers = (page, rowsPerPage) => {
//   return useMemo(
//     () => {
//       return applyPagination(users, page, rowsPerPage);
//     },
//     [page, rowsPerPage]
//   );
// };

const useCustomers = (page, rowsPerPage, users) => {
  return useMemo(() => {
    const paginatedUsers = applyPagination(users, page, rowsPerPage);
    return paginatedUsers;
  }, [page, rowsPerPage, users]);
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]); 
  const customers = useCustomers(page, rowsPerPage, users);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
 

  let storedArray = null;
    if (typeof window !== 'undefined') {
      const storedArrayAsString = window.sessionStorage.getItem('user');
      storedArray = JSON.parse(storedArrayAsString);
    }

  const senddata ={
    username: storedArray.username
  };


  const getUsers =async ()=>{
    await fetch ('https://www.mss.mopawa.co.ke/api/adminUsers',{
      method: 'POST',
      headers:{
        'Accept':'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(senddata)

    })
    .then((response)=>response.json())
    .then(response => {
      
      setUsers(response);
      console.log(response)
      // Use the dropdownData to populate your dropdown or perform any other necessary actions
     
    })
    .catch(error => {
      console.error('Error fetching dropdown values:', error);
    });
};

  useEffect(()=>{
    getUsers();
  },[]);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );



  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Shops | Mss Limited
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  All Users
                </Typography>
              </Stack>

              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Reset All
                </Button>
              </div>
            </Stack>
            <CustomersSearch />
            <UsersTable
              count={users.length}
              items={users}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
