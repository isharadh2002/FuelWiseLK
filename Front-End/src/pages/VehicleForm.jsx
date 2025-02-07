// src/components/vehicle/VehicleForm.jsx


import  { useState } from "react";
import { styled } from "@mui/material/styles";
import {Paper,TextField,Button,Box,Card,Grid,Typography} from "@mui/material";
import PropTypes from 'prop-types';
import axios from "axios";


  
 

function VehicleForm() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
  }));
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  
  const CustomTextField = ({
    name,          // Default value for value
    onChange,
    id,
    label,
      // Default value for error
     // Default value for isSubmitted
  }) => (<>
   
    <TextField
      name={name}
      onChange={onChange}
      id={id}
      label={label}
      autoFocus
      required
      fullWidth
      variant="outlined"
      color="success"
      multiline
      maxRows={4}
      error={errors}
      value={formData[id]}
        // error only when isSubmitted and error exist
      sx={{
        marginBottom: '20px',
        marginTop: '20px',
        width: '265px',
        height: 'auto',
      }}
    />
  
  </>   
    );

  
  CustomTextField.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.bool,
    isSubmitted: PropTypes.bool,
  };

  
  const [formData, setFormData] = useState({
   brand:"",
    model:"",
    number:"",
    ownerId:3

   
  });




  
 
  //To set the values to the useStates()
  const handleInputs = (e) => {

    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }))

    if (validation) {
      setFormData((prev) => ({ ...prev, [id]: value }))
      setLoading(false);
      setIsSubmitted(true);

      postingData(e);

      
    }
    return "files are not submitted";
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    setIsSubmitted(true);

    if(validation()){
      postingData();
    }


  }
  const validation = () => {
    
    const newErrors = {};
    if (!formData.brand.trim()) newErrors.brand = "Brand is required.";
    if (!formData.model.trim()) newErrors.model = "Model is required.";
    if (!formData.number.trim()) newErrors.number = "Number is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const postingData=async (e)=>{
        e.preventDefault();
        setIsSubmitted(true);
        if (validation())return;
        setLoading(true);
    try{
      const response=await axios.post("http://localhost:8080/api/v1/VehicleForm/addVehicle/",formData,{

        headers:{
          "Content-Type":"application/json",
        },
      });
      alert("Vehicle Added successfully:"+response.data);

      setFormData({
        brand: "",
        model:"",
        number:"",
        ownerId: 3

      });
      setErrors({});
      setIsSubmitted(false);

      }catch (error){
      console.log("Error adding vehicles:"+error);
      alert("Failed to add vehicle")
    }finally {
      setLoading(false);
    }



  };
 

  
    return (
    
      <>
        <div className='m-6 h-screen  w-screen flex justify-center items-center '>
          <Box sx={{ flexGrow: 1, flexBasis: { xs: "column", md: "row" }, alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', flexShrink: '' }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 1, md: 2 }}>
              <Item sx={{ boxShadow: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', width: { xs: '100%', md: '65%' } }}>
                <div className='flex flex-col  items-center text-green-600 font-extrabold '>
                 
                  <Typography
                    sx={{
                      fontSize: { xs: '100px', md: '150px' }
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

              <Item sx={{ boxShadow: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', width: { xs: '100%', md: '35%' } }}>
                <Card sx={{ maxWidth: 345, boxShadow: '5px', margin: '15px', backgroundColor: '#f0fff2' }}>
                  <Typography
                    fontSize='40px'
                    color='success'
                    fontWeight={700}
                  >
                    Register Form
                  </Typography>

                  <div className=''>
                    <form >
                      {[
                        { id: "brand", label: "Vehicle Brand" },
                        { id: "model", label: "Vehicle model" },
                        { id: "number", label: "Vehicle Number"},



                       
                      ].map(({ id, label}) => (
                        <CustomTextField
                          key={id}
                          value={id}
                          onChange={validation}
                          id={id}
                          label={label}
                          name={id}
                          autoFocus
                          required
                          fullWidth
                          variant='outlined'
                          color='success'
                          multiline
                          maxRows={4}
                          error={!!errors[id]}

                          isSubmitted={isSubmitted}
                        />
                      ))}
                     
                    
                    <div>
                      <Button variant="contained"
                        color="success"
                        sx={{

                          width: '265px',
                          marginBottom: '18px',
                          marginTop: '12px',
                          borderRadius: '10px',
                          fontWeight: '12px'
                        }}

                          onClick={handleSubmit}
                          type="submit"
                      >
                        <Typography
                        
                        >
                          {
                            loading ? "Submitting..." : "Register"
                          }
                        </Typography>

                      </Button>
                      {isSubmitted && errors && <p className="text-center text-blue-600 font-semibold"> {errors} </p>}

                        
                    </div>
                    </form>
                   
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


