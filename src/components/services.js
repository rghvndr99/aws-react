import 'babel-polyfill';
const ENDPOINT = 'http://localhost:5001';

export const getUser=async()=>{
   let response=await fetch(ENDPOINT+'/empData',{
      method:'get',
      headers:{'Content-Type': 'application/json'},
     }).then((res)=>res.json())
      .then((res)=>{
            return res;
      });
  return await response;
};

export const updateUser=async(obj)=> {
  console.log(JSON.stringify(obj));
  const {name='NA',email='NA',company='NA',address='NA',phone='NA',age='NA',eyeColor='NA',gender='male'}=obj;
    const query={    	
      updateObj:{
        name,
        email,
        address,
        company,
        phone,
        age,
        gender,
        eyeColor
      },
      id:obj.id
    };
    let response=await fetch(ENDPOINT+'/updateEmpData',{
      method:'post',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({"query":query})
   }).then((res)=>res.json())
      .then((res)=>{return res});
    return await response;
}

export const deleteUser=async(obj)=> {
    const query=obj.id;

   let response=await fetch(ENDPOINT+'/empData/'+query,{
      method:'DELETE',
      headers:{'Content-Type': 'application/json'}   
   }).then((res)=>res.json())
      .then((res)=>{return res});
    return await response;
}

export const addUser=async(obj)=> {
    const query={
               name:obj.name,
               email: obj.email,
               company: obj.company,
               address: obj.address,
               id:Math.random().toString(36).substr(2, 50)
    };

   let response=await fetch(ENDPOINT+'/insertdata',{
      method:'post',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({"query":query})
   }).then((res)=>res.json())       
      .then((res)=>{
        console.log('RDX '+ JSON.stringify(res));
        return res;
      });
    return await response;
}

//export default getActivity;