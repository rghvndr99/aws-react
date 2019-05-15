import React from "react";
import {AppBar,Toolbar,Typography} from '@material-ui/core';
const Header=()=>{
               return (<div className="header">
                <AppBar position="static" color="primary">
                  <Toolbar>
                    <Typography variant="h6" color="inherit">
                       Employee List
                    </Typography>
                  </Toolbar>
                </AppBar>
              </div>);
          };
export default Header;