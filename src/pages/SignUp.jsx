
import React,{useState,useContext} from 'react'
import img from '../assets/register-bg.jpg'
import { Link,useNavigate  } from 'react-router-dom';
const SignUp = () => {
    const host = "https://food-backend-rqn3.onrender.com";
    const navigate = useNavigate();

    const [credentials,setCredentials] = useState({name:'',email:'',password:'',confirmPassword:'',role:"Farmer"});

    const onchange = (e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }

    const onsubmit=async(e)=>{
        e.preventDefault();

        if(credentials.password!==credentials.confirmPassword){
            alert('Passwords do not Match!');
            setCredentials({...credentials,password:'',confirmPassword:''})
            return;
        }

        const response = await fetch(`${host}/auth/register`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({...credentials})
        })
        const data = await response.json();
        console.log(data)
        
        setCredentials({name:'',email:'',password:'',confirmPassword:'',role:''})
        navigate('/login');
    }

  return (
    <div className='h-[120vh] md:h-[100vh] w-[100%] relative bg-[#2A4D77]'>
        <img src={img} alt="" className='absolute h-[120vh] md:h-[100vh] w-[100%] object-cover top-0 left-0'/>

        
        <form className='p-8 w-[90%] md:w-[30%] bg-white rounded-xl z-50 absolute  left-[50%] md:left-[10%] top-[52%] md:top-[50%] translate-y-[-50%]' onSubmit={onsubmit}>

            <h2 className='font-bold text-3xl text-emerald-500'>Register Today</h2>
            <p className='mb-8 mt-2 text-gray-500 font-semibold'>Makes student project allocation and management simpler.</p>

            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Name</label>
                <input type="text" name='name' value={credentials.name} placeholder='Enter Name here' className='w-full p-2 outline-none rounded-xl border-gray-500 border-2' onChange={onchange} required/>
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Email</label>
                <input type="email" name='email' value={credentials.email} placeholder='username@gmail.com' className='w-full p-2 outline-none rounded-xl border-gray-500 border-2' onChange={onchange} required/>
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor='' className='font-semibold ml-1'>
                    Role
                </label>
                <select
                    name='role'
                    value={credentials.role}
                    className='w-full p-2 outline-none rounded-xl border-gray-500 border-2'
                    onChange={onchange}
                    required
                >
                    <option value='Farmer'>Farmer</option>
                    <option value='Retailer'>Retailer</option>
                    <option value='Customer'>Customer</option>
                </select>
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Password</label>
                <input type="password" name='password' value={credentials.password} placeholder='**********' className='w-full p-2 outline-none rounded-xl border-gray-500 border-2' onChange={onchange} required/>
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Confirm Password</label>
                <input type="password" name='confirmPassword' value={credentials.confirmPassword} placeholder='**********' className='w-full p-2 outline-none rounded-xl border-gray-500 border-2' onChange={onchange} required/>
            </div>

            <button className='bg-green-500 hover:bg-green-700 cursor-pointer text-white py-2 text-lg w-full rounded-xl mt-6' type='submit'>Register</button>
            <p className='mt-2 text-center'> Already Registered? <Link to='/login' className='font-semibold'>Login here</Link> </p>
        </form>
    </div>
  )
}


export default SignUp