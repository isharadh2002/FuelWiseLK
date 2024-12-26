import { useState } from "react";
import { experimentalStyled as styled } from '@mui/material/styles';

import {Card,TextField,Paper,Box,Grid,Button,Typography} from '@mui/material';

function VehicleForm() {

  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
   
    
  }));
 
  
    const [brand,setBrand]=useState("");
    const [model,setModel]=useState("");
    const [number,setNumber]=useState("");
    const [capacity,setCapacity]=useState("");
    const [owFullName,setOwFullName]=useState("");
    const [nameWithInitials,setNameWithInitial]=useState("");
    const [nic,setNic]=useState("");
    
  const isEmpty = () => {
    
    
  };
  const afterSubmitting = (e) => {
    e.preventDefault();
    if (!isEmpty()) {
      document.location.href("");
      //To giving another Location to above space
    }
    // to submit the values in to database through Backend DataBase



      
  }; 
    
    
  
  



  

   return (
     <>
       
       <div className='m-6 h-screen  w-screen flex justify-center items-center '>
         <Box sx={{ flexGrow: 1, flexBasis: { xs: "column", md: "row" }, alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', flexShrink:''}}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 1, md: 2 }}>
                  <Item sx={{boxShadow:'none',display:'flex',alignItems:'center',justifyContent:'center' ,width:{xs:'100%' , md:'65%'}}}>
                      <div className='flex flex-col  items-center text-green-600 font-extrabold '>
                 <Typography 
                   sx={{
                     fontSize:{xs:'100px',md:'150px'}
                   }}
                 >
                   Welcome!...
                 </Typography>
                 <Typography
                  sx={{
                     fontSize: { xs: '25px', md: '50px' },
                      
                  }}
                 >
                   Register your vehicle here...
                 </Typography>
               </div>
               
             </Item>
                  
                  <Item sx={{boxShadow:'none',display:'flex',alignItems:'center',justifyContent:'center' ,width:{xs:'100%',md:'35%'}}}>
               <Card sx={{ maxWidth: 345, boxShadow: '5px', margin: '15px' ,backgroundColor:'#f0fff2'}}>
                 <Typography
                   fontSize='40px'
                   color='success'
                   fontWeight={700}
                 >
                   Register Form
                 </Typography>

                      <div className=''>
                   <TextField
                     sx={{
                       marginBottom: '20px',
                       marginTop: '20px', 
                       width: '265px',
                       height: 'auto',
                       
                       
                       
                       
                            
                     }}
                          value={brand}
                          onInput={()=>setBrand()}
                          id="brand"
                          label="Vehicle Brand"
                          helperText=""
                          name='brand'
                          type='text'
                          autoFocus
                          
                          required
                          fullWidth

                          variant='outlined'
                          color='success'
                          multiline
                          maxRows={4}
                   />
                   
                   
                   <TextField
                     sx={{
                       marginBottom: '20px',
                       marginTop: '20px', 
                       width: '265px',
                       height: 'auto',
                       
                       
                       
                       
                            
                     }}
                          value={model}
                          onInput={()=>setModel()}
                          id="model"
                          label="Vehicle Model"
                          helperText=""
                          name='model'
                          type='text'
                          autoFocus
                          
                          required
                          fullWidth

                          variant='outlined'
                          color='success'
                          multiline
                          maxRows={4}
                   />
                   <TextField
                     sx={{
                       marginBottom: '20px',
                       marginTop: '20px', 
                       width: '265px',
                       height: 'auto',
                       
                       
                       
                       
                            
                     }}
                          value={number}
                          onInput={()=>setNumber()}
                          id="rg_Number"
                          label="Registered Number"
                          helperText=""
                          name='brand'
                          type='text'
                          autoFocus
                          
                          required
                          fullWidth

                          variant='outlined'
                          color='success'
                          multiline
                          maxRows={4}
                   />
                   <TextField
                     sx={{
                       marginBottom: '20px',
                       marginTop: '20px', 
                       width: '265px',
                       height: 'auto',
                       
                       
                       
                       
                            
                     }}
                          value={capacity}
                          onInput={()=>setCapacity()}
                          id="en_Capacity"
                          label="Engine Capacity"
                          helperText=""
                          name='en_Capacity'
                          type='text'
                          autoFocus
                          
                          required
                          fullWidth

                          variant='outlined'
                          color='success'
                          multiline
                          maxRows={4}
                   />
                   
                   <TextField
                     sx={{
                       marginBottom: '20px',
                       marginTop: '20px', 
                       width: '265px',
                       height: 'auto',
                       
                       
                       
                       
                            
                     }}
                          value={owFullName}
                          onInput={()=>setOwFullName()}
                          id="ow_Fullname"
                          label="Owner's Fullname"
                          helperText=""
                          name='ow_Fullname'
                          type='text'
                          autoFocus
                          
                          required
                          fullWidth

                          variant='outlined'
                          color='success'
                          multiline
                          maxRows={4}
                   />
                   
                   <TextField
                     sx={{
                       marginBottom: '20px',
                       marginTop: '20px', 
                       width: '265px',
                       height: 'auto',
                       
                       
                       
                       
                            
                          }}
                          value={nameWithInitials}
                          onInput={()=>setNameWithInitial()}
                          id="with_Initials"
                          label="Name With Initials"
                          helperText=""
                          name='with_Initials'
                          type='text'
                          autoFocus
                          
                          required
                          fullWidth

                          variant='outlined'
                          color='success'
                          multiline
                          maxRows={4}
                   />
                   <TextField
                     sx={{
                       marginBottom: '20px',
                       marginTop: '20px', 
                       width: '265px',
                       height: 'auto',
                       
                       
                       
                       
                            
                          }}
                          value={nic}
                          onInput={()=>setNic()}
                          id="nic_Number"
                          label="NIC Number"
                          helperText=""
                          name='nic_Number'
                          type='text'
                          autoFocus
                          
                          required
                          fullWidth

                          variant='outlined'
                          color='success'
                          multiline
                          maxRows={4}
                   />
                   
                  <div>
                   <Button variant="contained"
                       color="success"
                       sx={{
                       
                         width: '265px',
                         marginBottom: '18px',
                         marginTop:'12px',
                         borderRadius: '10px',
                         fontWeight:'12px'
                       }}
                      
                       onclick={(e) => {
                         e.target.value; 
                         afterSubmitting();
                       }}
                   
                  
                   
                   
                 >
                       <Typography
                         fontWeight=""
                       >
                         Register
                       </Typography>
                 </Button>
                   </div>
                   
                 </div>
                 
                    </Card>
                  </Item>
            </Grid>
        </Box>
           
            
       
       </div>

     </>
   );
 }
 export default VehicleForm;

