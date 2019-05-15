import React, { Component } from "react";
import InputField from "./inputField.js";
import {Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core';
class UpdateUser extends Component {
    constructor(props){
        super(props);
        this.submitFormAction=this.submitFormAction.bind(this);
        this.onChangehandler=this.onChangehandler.bind(this);
        const prp=this.props.userObj;
        this.state=prp
      }
   submitFormAction(){
    const obj=this.state;
    const {isadduser,addaction,updateaction}=this.props;
      isadduser?this.props.addaction(obj):this.props.updateaction(obj);
   }
   onChangehandler(e){
      const element=e.target;
      this.setState({
          [element.id.trim()]:element.value
      })
   }
  render() {
    const {userObj,closeModal,isOpen,isadduser}=this.props;
    const addupdatetxt=isadduser?"Add":"update";
    const inputfield=[];
    for(let props in userObj){
      let disabled=props=="id"?true:false;
       inputfield.push(
                       <InputField
                          userObj={userObj}
                          key={props}
                          index={props}
                          disabled={disabled} changeHandler={this.onChangehandler}/>
                       );
    }
    return(
          <Dialog
              onClose={closeModal}
              open={isOpen}
              aria-labelledby="form-dialog-title"
           >
          <DialogTitle id="form-dialog-title">{addupdatetxt}</DialogTitle>
          <DialogContent>
           <form className="container">
                       {inputfield}

           </form>


          </DialogContent>
          <DialogActions>
            <Button  size="large" color="primary"  onClick={()=>this.submitFormAction()}>{addupdatetxt}</Button>
            <Button onClick={closeModal} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        )
  }
}
export default UpdateUser;