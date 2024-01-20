import React, { useState } from 'react'

function Addimage() {
const [file,setfile]=useState()

const addimage = async (e) =>{
    e.preventDefault()
   const formdata = new FormData()
   formdata.append('file',file)
    const response = await fetch('http://localhost:4000/upload',{
    method:"POST",
    body:JSON.stringify({formdata}),
    header:{'Content-Type':'application/json'}
   })

   if(response.ok){
    console.log(response)
   }
}


  return (
    <form onSubmit={addimage}>
        <label htmlFor="">
            <img src="" alt="" srcset="" />
        </label>
      <input 
      type="file"  
      onChange={e=>setfile(e.target.value)}
      accept='.jpeg,.png,.jpg'
      />

      <button>ADD</button>
    </form>
  )
}

export default Addimage
