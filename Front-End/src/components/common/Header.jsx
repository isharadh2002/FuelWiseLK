import React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { colors } from "@mui/material";

function Header() {
  const pagesInHome = ["Home", "About Us", "Resources"];
    const [value, setValue] = React.useState(0);
    const operations = ["signIn", "logIn"];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Render tabs dynamically using map()
  const headerInput = () => {
    return pagesInHome.map((page, index) => (
      <Tab key={index} label={page} />
    ));
  };
    const headerOperations = () => {
        return operations.map((page, index) => (
            <Tab key={index} label={page} />
        ));
    };
 

    return (
      <div>
            <Box sx={{
                maxWidth: { xs: 320, sm: 480 },
                bgcolor: 'background.gray',
                alignContent: 'center',
                color: "black",
                '&:hover': {
                    color: "black"
                }
                    
                
                
            }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
        
      >
                    {
                        headerInput()
                    }

                    {
                        headerOperations()
                    }
                
                   

                    
                   
                    
                
                
          </Tabs>
          <Button variant="contained" sx={{
            bgcolor: "black",
            borderRadius:10,px
          }}>Register</Button>
               
            </Box>
            </div>
  );
}

export default Header;
