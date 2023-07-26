import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
// import ManagerModal from 'src/components/modal';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useFormik } from 'formik';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


const ManagerModal =({ handleClose, open})=>{
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [age, setAge] = useState('');
  const [ noUsers, setNoUsers]= useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [ shopName, setShopName]= useState('');
  const [location, setLocation] =useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername]= useState('')

  
  const dummyFetch = async()=>{
    console.log('Submit has been Clicked')
    try{
      const response = await fetch("https://www.mss.mopawa.co.ke/api/auth/signup",{
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          username: username,
          email: `${username}@mss.co.ke`,
   			  password: "12345678",
          name: name,
          location: location,
          phone: phone
        })
      })

      console.log(response.json());

      const userCount = noUsers;
      const allUser = [];

      for ( let i = 1; i <= userCount; i++){
          const allUsers = {
            username: username + i,
            password: '12345678',
            email: `${username + i}@mss.com`,
            roles: ['user']
          };

            const response = await fetch("https://www.mss.mopawa.co.ke/api/auth/signup",{
            method: 'POST',
            headers: {
              'Content-Type':'application/json'
              },
            body: JSON.stringify(allUsers)
            });

            const responseData = await response.json(); 
            console.log(responseData);

              allUser.push(allUsers)
      };

        console.log(allUser)

      

    }catch(error){
      console.log(error)
    }
  }
  
 
    
  const handleUsers = (event) => {
    setNoUsers(event.target.value);
  };

  const handleChange = (event)=>{

  }

  

  

  return (
      <div>
              <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="parent-modal-title"
                  aria-describedby="parent-modal-description"
                  >
                  <Box sx={{ ...style, width: 400 }}>
                  <h2 id="parent-modal-title">Add new manager</h2>
                      <div style={{ display:'flex', flexDirection:'column', justifyContent:'center'}}>
                      <TextField
                          style={{ marginBottom: 20 }}
                          error={error}
                          helperText={error ? 'Field cannot be empty' : ''}
                          id="outlined-required"
                          label="Names"
                          value={name}
                          onChange={(event)=>setName(event.target.value)}
                        />

                        <TextField
                          style={{ marginBottom: 20 }}
                          error={error}
                          helperText={error ? 'Field cannot be empty' : ''}
                          id="outlined-required"
                          label="User Name i.e 960000"
                          onChange={(event)=>setUsername(event.target.value)}
                          value={username}
                         
                        />

                        <TextField
                          style={{ marginBottom: 20 }}
                          error={error}
                          helperText={error ? 'Field cannot be empty' : ''}
                          id="outlined-required"
                          label="Phone Number"
                          onChange={(event)=>setPhone(event.target.value)}
                          value={phone}
                        
                        />
                        <TextField
                          style={{ marginBottom: 20 }}
                          error={error}
                          helperText={error ? 'Field cannot be empty' : ''}
                          id="outlined-required"
                          label="Shop Name"
                          onChange={(event)=>setShopName(event.target.value)}
                          value={shopName}
                         
                        />

                        <TextField
                          style={{ marginBottom: 20 }}
                          error={error}
                          helperText={error ? 'Field cannot be empty' : ''}
                          id="outlined-required"
                          label="Location"
                          onChange={(event)=>setLocation(event.target.value)}
                          value={location}
                       
                        />
                   <FormControl fullWidth style={{ marginBottom: 20 }}>
                          <InputLabel id="demo-simple-select-label">Number of users</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={noUsers}
                            label="Number of users"
                            onChange={handleUsers}
                          >
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                          </Select>
                    </FormControl>
                    <Button variant="contained" onClick={dummyFetch} >Submit</Button>
                      </div>
                  </Box>
              </Modal>
      </div>
  )
};


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
  const [open, setOpen]= useState(false);

  const handleClose = ()=>{
    setOpen(!open)
  };

 
 

  let storedArray = null;
    if (typeof window !== 'undefined') {
      const storedArrayAsString = window.sessionStorage.getItem('user');
      storedArray = JSON.parse(storedArrayAsString);
    }

  const senddata ={
    username: storedArray.username
  };


  const getUsers =async ()=>{
    await fetch ('https://www.mss.mopawa.co.ke/api/getAdmins',{
      method: 'GET',
      headers:{
        'Accept':'application/json',
        'Content-type': 'application/json'
      },

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
          Management | Mss Limited
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
                  All Shop managers
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
                  onClick={handleClose}
                >
                  Add Manager
                </Button>
              </div>
            </Stack>
            <CustomersSearch />
            <CustomersTable
              count={users.length}
              items={customers}
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
      <ManagerModal open={open} handleClose={handleClose} />
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
