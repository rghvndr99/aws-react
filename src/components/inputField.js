import React, { Component } from "react";

import {TextField} from '@material-ui/core';
class InputField extends Component {
    constructor(props){
        super(props);
          }
  render() {
    const {userObj,index,disabled,changeHandler}=this.props;
    return(
          <React.Fragment>
            <TextField
                defaultValue={userObj[index]}
                className="input-margin"
                label={index}
                id={index}
                disabled={disabled}
                onChange={(e)=>changeHandler(e)}
                margin="normal"
             />
        </React.Fragment>

    )
  }
}
export default InputField;