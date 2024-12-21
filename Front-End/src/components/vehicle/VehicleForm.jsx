
import { experimentalStyled as styled } from '@mui/material/styles';

import {Card,TextField,Paper,Box,Grid} from '@mui/material';

function VehicleForm() {

  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
   
    
    }));

  

   return (
     <>
       <div className=' h-screen  w-screen flex justify-center items-center '>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 1, md: 2 }}>
                  <Item sx={{boxShadow:'none',display:'flex',alignItems:'center',justifyContent:'center' ,width:'65%'}}>
                      <div className='flex flex-col  items-center text-green-600 font-bold text-6xl'>
                        <h1>Welcome!...</h1>
                        <h2 className='font-mono text-wrap text'>Register your Vehicle Here</h2>
                      </div>
                  </Item>
                  <Item sx={{boxShadow:'none',display:'flex',alignItems:'center',justifyContent:'center' ,width:'35%'}}>
                  <Card sx={{ maxWidth: 345,boxShadow:'5px', margin:'15px' }}>
                      <div className=' '>
                   <TextField
                     sx={{
                       marginBottom: '10px',
                       
                            
                          }}
                          id="outlined-multiline-flexible"
                          label="Vehicle Brand"
                          multiline
                          maxRows={4}
                        />
                   <TextField
                     sx={{marginBottom:'10px'}}
                          id="outlined-multiline-flexible"
                          label="Vehicle Model"
                          multiline
                          maxRows={4}
                   />
                   <TextField
                     sx={{marginBottom:'10px'}}
                          id="outlined-multiline-flexible"
                          label="Register Number"
                          multiline
                          maxRows={4}
                   />
                   <TextField
                     sx={{marginBottom:'10px'}}
                          id="outlined-multiline-flexible"
                          label="Vehicle Brand"
                          multiline
                          maxRows={4}
                   />
                   <TextField
                     sx={{marginBottom:'10px'}}
                          id="outlined-multiline-flexible"
                          label="Owner's Full Name"
                          multiline
                          maxRows={4}
                   />
                   <TextField
                     sx={{marginBottom:'10px'}}
                          id="outlined-multiline-flexible"
                          label="Name with initial"
                          multiline
                          maxRows={4}
                   />
                   
                   
                   
                   
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

