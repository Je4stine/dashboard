import React,{ useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button } from '@mui/material';
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

const ManagerModal =({open, handleClose})=>{
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
    const [age, setAge] = useState('');
    const [ noUsers, setNoUsers]= useState('');

    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
        name: '',
        shopName:'',
        location: '',
        phone: '',
        username: '',
        submit: null,
        

      },
      // validationSchema: Yup.object({
        
      //   password: Yup
      //     .string()
      //     .max(255)
      //     .required('Password is required')
      // }),
  
      onSubmit: async (values, helpers) => {
        console.log("Going")
        try {
          const response1 = await fetch('https://www.mss.mopawa.co.ke/api/auth/signup', {
            method: 'POST',
            headers: {
              'Accept':'application/json',
              'Content-Type': 'application/json',
       
            },
            body: JSON.stringify({
              username: values.username,
              password: values.password,
              email: values.username,
              password: 12345678,
              name: values.name,
              shopName: values.shopName,
              location: values.location,
              phone: values.phone,
              
            })
      
          })
          .then((response)=>response.json())

       
          const AllUsers = [];

          for (let i = 1; i < noUsers; i ++){
            const AllUser = {
              username: values.username + i,
              password: '12345678',
              roles: ['user']
            };
            AllUsers.push(AllUser)
          }

          const response2 = await fetch('https://www.mss.mopawa.co.ke/api/auth/signup', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                AllUsers
              }),
            }).then((response) => response.json());

            console.log(response1);
            console.log(response2);
        
         
        
          
    
        } catch (err) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    });


    const handleChange = (field) => (event) =>  {
      setError(false); // Reset the error state when the user types
      formik.handleChange(field)(event); // Connect the event to Formik's handleChange
    };
  
   
      
    const handleUsers = (event) => {
      setNoUsers(event.target.value);
    };

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
                            onChange={handleChange('name')}
                            value={formik.values.name}
                            onBlur={formik.handleBlur('name')}
                          />

                          <TextField
                            style={{ marginBottom: 20 }}
                            error={error}
                            helperText={error ? 'Field cannot be empty' : ''}
                            id="outlined-required"
                            label="User Name i.e 960000"
                            onChange={handleChange('username')}
                            value={formik.values.username}
                            onBlur={formik.handleBlur('username')}
                          />

                          <TextField
                            style={{ marginBottom: 20 }}
                            error={error}
                            helperText={error ? 'Field cannot be empty' : ''}
                            id="outlined-required"
                            label="Phone Number"
                            onChange={handleChange('phone')}
                            value={formik.values.phone}
                            onBlur={formik.handleBlur('phone')}
                          />
                          <TextField
                            style={{ marginBottom: 20 }}
                            error={error}
                            helperText={error ? 'Field cannot be empty' : ''}
                            id="outlined-required"
                            label="Shop Name"
                            onChange={handleChange('shopName')}
                            value={formik.values.shopName}
                            onBlur={formik.handleBlur('shopName')}
                          />

                          <TextField
                            style={{ marginBottom: 20 }}
                            error={error}
                            helperText={error ? 'Field cannot be empty' : ''}
                            id="outlined-required"
                            label="Location"
                            onChange={handleChange('location')}
                            value={formik.values.location}
                            onBlur={formik.handleBlur('location')}
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
                    <Button variant="contained" onClick={formik.handleSubmit}>Submit</Button>
                        </div>
                    </Box>
                </Modal>
        </div>
    )
};

export default ManagerModal;