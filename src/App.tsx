import { useState } from 'react'
import backgroundImage from '/src/assets/1.png';
import './App.css'

function App() {

  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value); // Update state with selected value
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value); // Update state with selected value
  };

  const handleSubmit = async () => {
    setLoading(true)
    if (gender == "") {
      alert("Please select gender the gender")
      setLoading(false)
      return
    }
    if (name == "") {
      alert("Please enter your name")
      setLoading(false)
      return
    }
    const res = await fetch("https://api.easeyourtasks.com/auth/gender", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, gender })
    })
    const jsonData = await res.json()
    if (jsonData.isAdded) {
      setName("")
      setGender("")
      setMessage("Thanks for your vote !!")
      setLoading(false)
    }

  }

  return <div className="h-screen w-screen  text-black style-script-regular">
    <div className='flex h-screen flex-col items-center relative'>
      <img className='absolute object-cover h-screen w-screen opacity-50 ' src={backgroundImage}></img>
      <div className='z-10 mt-32'>
        {message.length == 0 && <>
          <h1 className='text-5xl text-gray-600 text-center'>What do you thing</h1>
          <h1 className='text-5xl  text-gray-600 text-center'>the baby is ?</h1>
        </>}
        <div className='flex flex-col justify-center'>
          {message.length > 0 && <p className='w-max self-center p-1 font-bold mt-4 bg-white rounded text-green-800 text-3xl'>{message}</p>}
          {message.length == 0 && <>
            <div className='flex flex-row mt-10 justify-center'>
              <label className='text-4xl text-blue-500'>Boy</label>
              <input className='ml-2 w-4' type="radio" name="gender" value="boy" onChange={handleOptionChange} checked={gender === 'boy'} />
            </div>

            <div className='flex flex-row mt-5 justify-center'>
              <label className='text-4xl text-pink-400'>Girl</label>
              <input className='ml-2 w-4' type="radio" name="gender" value="girl" onChange={handleOptionChange} checked={gender === 'girl'} />
            </div>
            <div className='flex flex-row mt-10 justify-center'>
              <label>Your Name</label>
              <input value={name} onChange={handleNameChange} className='ml-2 rounded px-1' type='text'></input>
            </div>


            <button type='button' onClick={handleSubmit} className='w-max self-center p-1 font-bold mt-4 bg-white rounded'>{loading ? "Wait..." : "Submit"}</button>
          </>}





        </div>

      </div>

    </div>
  </div>
}

export default App
