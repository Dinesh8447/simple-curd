import React, { useEffect, useState } from 'react'

export default function Fetchitems() {
const [items,setitems] = useState([])
const [name,setname]= useState('')
const [description,setdescription]= useState('')

//fetch the datas form database
useEffect(()=>{
   const fetchapi = async () =>{
    const response = await fetch('http://localhost:4000/api/items')
    const json = await response.json()
    if(response.ok){
        setitems(json)
    }
   }
   fetchapi()
 },[])


 //post the data
 const handlesubmit = async(e) =>{
  e.preventDefault()
  const response =await fetch('http://localhost:4000/api/items',{
    method:'POST',
    body:JSON.stringify({name,description}),
    headers:{'Content-Type':'application/json'}
  })
  console.log(response)
}

//update the data 
const handleupdate = async (id) =>{
  const newname = prompt('enter name')
  const des =prompt('edit description')

  const response = await fetch(`http://localhost:4000/api/items/${id}`,{
    method:'PUT',
    body:JSON.stringify({name:newname,description:des}),
    headers:{'Content-Type':'application/json'}
  })
  if(response.ok){
    alert("updated")
    console.log(response)
  }
}

//delete the data 
const handledelete = async (id) =>{
  const response = await fetch(`http://localhost:4000/api/items/${id}`,{
    method:'DELETE',
  })
  const json = await response.json()
  if(response.ok){
    alert('deleted')
    console.log(json)
  }
}

  return (
    <div>
      <ul>
        {
            items.map(item=>(
                <li key={item._id}>{item.name} - {item.description}
                <button onClick={()=>{handledelete(item._id)}}>Delete</button>
                <button onClick={()=>{handleupdate(item._id)}}>Edit</button>
                </li>
            ))
        }
      </ul>
      <form onSubmit={handlesubmit}>
        <input type="text" placeholder='Name' onChange={(e)=>setname(e.target.value)} />
        <input type="text" placeholder='Description' onChange={(e)=>setdescription(e.target.value)} />
        <button>ADD</button>
      </form>
    </div>
  )
}
