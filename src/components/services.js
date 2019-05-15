import 'babel-polyfill';
const ENDPOINT = 'http://localhost:5001';

export const getUser= async () => {

   let response=await fetch(ENDPOINT+'/empData',{
      method:'get',
      headers:{'Content-Type': 'application/json'},
     });

  return response.json();

};

export const updateUser=async(obj)=> {

    let response=await fetch(ENDPOINT+'/empData',{
      method:'put',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({"query":obj})
   });
   return  response.json();
}

export const deleteUser=async(obj)=> {

   let response=await fetch(ENDPOINT+'/empData/'+obj.id,{
      method:'DELETE',
      headers:{'Content-Type': 'application/json'}   
   });

  return  response.json();
}

export const addUser=async(obj)=> {
  
    const query={
               name:obj.name,
               email: obj.email,
               company: obj.company,
               address: obj.address,
               id:Math.random().toString(36).substr(2, 50)
    };

   let response=await fetch(ENDPOINT+'/empData',{
      method:'post',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({"query":query})
   });

  return response.json();
}
