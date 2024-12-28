// src/components/vehicle/VehicleForm.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
//import InputField from "../components/common/InputField";


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
    const [nic, setNic] = useState("");
    const [errors, setErrors] = useState("");
  //To set the values to the useStates()
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      switch (name) {
        case "brand":
          setBrand(value);
          break;
        case "model":
          setModel(value);
          break;
        case "number":
          setNumber(value);
          break;
        case "capacity":
          setCapacity(value);
          break;
        case "owFullName":
          setOwFullName(value);
          break;
        case "nameWithInitial":
          setNameWithInitial();
          break;
        case "nic":
          setNic();
          break;
        default:
          alert("There may be a server Error !,So Try again later");
          break;
      }
      
  };
  //Validate the Text fields
  const validation = () => {
    const newErrors = {};
    const fields = [brand, model, number, capacity, owFullName, nameWithInitials, nic];
    fields.forEach(element => {
      if (!element.trim()) {
        newErrors.element = {element}+"is required";
      }
      
      
    });
    setErrors(newErrors);
    //If no errors return true
    return newErrors.length === 0;
  };
    
    const handleSubmit =  (event) => {
      event.preventDefault();
      handleInputChange(event);
      if (validation()) {
        alert("Data Submitted Successfully!...");
      }
      else {
        alert("There is issue of data submitting!...");
        return;
      }
      //The code to store the data in the database using rest API
      /*
      const formData = {
        brand,
        model,
        number,
        capacity,
        owFullName,
        nameWithInitials,
        nic,
        
      };
 
      try {
        const response =  fetch("/api/submit-vehicle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          throw new Error("Failed to submit vehicle data");
        }
  
        // Handle successful submission (e.g., clear form, show success message)
      } catch (error) {
        console.error("Error submitting vehicle data:", error);
        // Handle errors (e.g., display error message to user)
      }
      */
    };
  
   return (
     <>
       
       <div className='flex items-center justify-center w-screen h-screen m-6 '>
         <Box sx={{ flexGrow: 1, flexBasis: { xs: "column", md: "row" }, alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', flexShrink:''}}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 1, md: 2 }}>
                  <Item sx={{boxShadow:'none',display:'flex',alignItems:'center',justifyContent:'center' ,width:{xs:'100%' , md:'65%'}}}>
                      <div className='flex flex-col items-center font-extrabold text-green-600 '>
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
                   
                   { 
                    //To print if the textfield is not fulfilled  
                     errors.brand && <p className="font-semibold text-center text-blue-600"> {errors.brand} </p>
                   }
                   
                   
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
                        {errors.model && <p className="font-semibold text-center text-blue-600"> {errors.model} </p>}

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
                   {errors.number && <p className="font-semibold text-center text-blue-600"> {errors.number} </p>}
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
                   {errors.capacity && <p className="font-semibold text-center text-blue-600"> {errors.capacity} </p>}
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
                   {errors.owFullName && <p className="font-semibold text-center text-blue-600"> {errors.owFullName} </p>}
                   
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
                   {errors.nameWithInitials && <p className="font-semibold text-center text-blue-600"> {errors.nameWithInitials} </p>}
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
                   {errors.nic && <p className="font-semibold text-center text-blue-600"> {errors.nic} </p>}
                   
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
                         handleSubmit(e);
                       }} 
                  >
                       <Typography
                         fontWeight=""
                       >
                         Register
                       </Typography>
                     </Button>
                     {validation() === true ? <p className="font-semibold text-center text-gray-600">{"Successfully!..."}</p> :
                      <p className="font-semibold text-center text-gray-600">{"Error!...Try again"}</p>}
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

