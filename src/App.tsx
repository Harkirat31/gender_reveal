import { useEffect, useState } from 'react'
import backgroundImage from '/src/assets/1.png';
import './App.css'

function App() {

  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<[]|null>(null)
  const [girlData, setGirlData] = useState<[]|null>(null)
  const [boyData, setBoyData] = useState<[]|null>(null)


  useEffect(()=>{
    fetch("https://api.easeyourtasks.com/auth/getGenderData", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (res)=>{
      const jsonData = await res.json()
      if(jsonData &&jsonData.genderData){
        setData(jsonData.genderData)
        const girlArray  = jsonData.genderData.filter((d:any)=> d.gender==="girl")
        setGirlData(girlArray)
        const boyArray  = jsonData.genderData.filter((d:any)=> d.gender==="boy")
        setBoyData(boyArray)

      }
    })
  },[message])

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
      <div className='z-10 mt-24 overflow-y-scroll px-10'>
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

          {data && data.length>0 &&
            <div>
              <h1 className='text-center mt-4 text-3xl underline'> Current Status</h1>
              <div className='flex flex-row justify-between space-x-10 mt-5'>
                <h1 className='text-2xl'> {`Boy (${((boyData!.length/data.length)*100).toFixed(1)}%)`}</h1>
                <h1 className='text-2xl'> {`Girl (${((girlData!.length/data.length)*100).toFixed(1)}%)`}</h1>
              </div>
              <div className=' flex flex-row justify-between '>

                <div className='relative flex flex-wrap w-1/2  gap-1 '>
                {boyData && boyData.map((v:any)=>{
                    return <p className='text-blue-500'>{v.name}</p>
                  })}
                </div>

                <div className='relative flex flex-wrap w-1/2  gap-1 justify-end'>
                  {girlData && girlData.map((v:any)=>{
                    return <p className='text-pink-500'>{v.name}</p>
                  })}

                </div>

              </div>
            </div>}


        </div>

      </div>

    </div>
  </div>
}

export default App
