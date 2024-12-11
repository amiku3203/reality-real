import React ,{useEffect, useState} from 'react'

const ShowAllProducts = () => {
 const [data, setData] = useState([]);


 useEffect(() => {
    async function fetcAllProducts(){
         const allProducts = await fetch("http://localhost:8000/api/v1/project/getAllProjects",
            {
            method: 'GET',
            }
         );
         const response= await allProducts.json();
         console.log("response", response);
         setData(response)
    }
  fetcAllProducts();
   
 }, [ ])
 

  return (
    <>
      <h1>All Products</h1>
      {data.length}
    
    </>
  )
}

export default ShowAllProducts