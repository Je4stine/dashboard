import React,{ useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button } from '@mui/material';

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
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
        setError(false); // Reset the error state when the user types
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        
        if (value.trim() === '') {
          setError(true); // Set error state if the value is empty
          return;
        }
    
        // Perform your form submission logic here
        // ...
    
        // Reset the value after successful submission if needed
        setValue('');
      };

      const handleUsers = (event) => {
        setAge(event.target.value);
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
                                style={{ marginBottom:20}}
                                error={error}
                                helperText={error ? 'Field cannot be empty' : ''}
                                id="outlined-required"
                                label='Names'
                                InputProps={{
                                    placeholder: 'Names',
                                  }}
                                />

                                <TextField
                                    style={{ marginBottom:20}}
                                    error={error}
                                    helperText={error ? 'Field cannot be empty' : ''}
                                    id="outlined-required"
                                    label='User Name i.e 960000'
                                    InputProps={{
                                        placeholder: 'User Name',
                                      }}
                                    />

                                <TextField
                                    style={{ marginBottom:20}}
                                    error={error}
                                    helperText={error ? 'Field cannot be empty' : ''}
                                    id="outlined-required"
                                    label='Phone Number'
                                    InputProps={{
                                        placeholder: 'Phone Number',
                                      }}
                                    />
                                <TextField
                                    style={{ marginBottom:20}}
                                    error={error}
                                    helperText={error ? 'Field cannot be empty' : ''}
                                    id="outlined-required"
                                    label='Shop Name'
                                    InputProps={{
                                        placeholder: 'Shop Name',
                                      }}
                                    />
                                <FormControl fullWidth  style={{ marginBottom:20}}>
                                    <InputLabel id="demo-simple-select-label">Number of users</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Number of users"
                                    onChange={handleUsers}
                                    
                                    >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button variant="contained">Submit</Button>
                        </div>
                    </Box>
                </Modal>
        </div>
    )
};

export default ManagerModal;