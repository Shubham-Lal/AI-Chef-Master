// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import EmployeeCard from './EmployeeCard';

const EmployeeIDForm = () => {

    const [ID, setID] = useState('')
    const [error, setError] = useState(null)
    const [employee, setEmployee] = useState(null);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        
      
          const response = await fetch(`/team/employee/${ID}`, {
              method: 'POST',
              body: JSON.stringify({ ID }),
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          const json = await response.json();
          if (!response.ok) {
              setError(json.error);
              setEmployee(null)
          } 
          if(response.ok) {
              setID('');
              setEmployee(json)
              setError("An error occured");
          }
    }

  return (
    <div className='bg-zinc-900 w-screen py-16 px-4 flex flex-col items-center justify-center'>
        
        <h2 className='text-3xl text-white font-semibold py-8'>Search for Employee</h2>
        <form className='flex flex-col text-white font-primary  w-full lg:w-[50%]' onSubmit={handleSubmit}>
            <label className='font-medium text-xl'>Employee ID</label>
            <input
            className='block py-2 px-4 my-2 rounded-lg bg-zinc-800'
            type='text'
            onChange={(e)=>setID(e.target.value)}
            value={ID}
            />
            <button className='bg-indigo-700 w-[8rem] px-4 py-2 mx-auto rounded-xl hover:bg-indigo-900 block my-4' type='submit'>Search</button>
            {error && <div className='px-2 py-2 bg-[#432c2c] border border-rose-700'>{error}</div>}
        </form>

        <EmployeeCard name={"Akash"} role={"Frontend Developer"} task={"Developed the UI of the page and did the UI design"} feedback={"Did a good job"} timeline={"Aug-Nov 2023"}/>
    </div>
  )
}

export default EmployeeIDForm