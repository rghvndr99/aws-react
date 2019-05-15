import React, { Component } from "react";
import {Card,CardActions,CardContent,Button,Toolbar,Typography,CardActionArea,CardMedia,Avatar} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import './app.css';
import img1 from './img/user1.png';
import img2 from './img/user2.png';
import img3 from './img/user3.png';
import img4 from './img/user4.png';
class ListUser extends Component {
    constructor(props){
        super(props);
      }
   render() {
    const imgAry=[img1,img2,img3,img4];
    const imgName=imgAry[Math.floor(Math.random() * imgAry.length-1) + 1];
    const {item,updateUserHandler,deleteUserHandler}=this.props;
      return(
         <Card className="card">
             <CardActionArea>
               <CardMedia>
                   <Avatar className="avatar" alt={item.name} sizes="big" src={imgName}>

                  </Avatar>
               </CardMedia>
               <CardContent>
                <Typography variant="h5" component="h2">
                  {item.name}
                </Typography>
                <Typography className="card-position" color="textSecondary">
                    Organization-{item.company}
                 </Typography>
                 <Typography className="card-position" color="textSecondary">
                    address-{item.address}
                 </Typography>
                 <Typography className="card-position" component="p">
                    Email-{item.email}
                 </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className="text-center">
                <Button size="small" color="primary" onClick={()=>updateUserHandler(item)}>Edit</Button>
                <Button size="small" color="primary" onClick={()=>deleteUserHandler(item)}>Delete</Button>
              </CardActions>
          </Card>
      )
  }
}
export default ListUser;