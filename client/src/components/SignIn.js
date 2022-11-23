import classes from '../styles/Signin.module.css'
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../providers/ProvideAuth';
import { useState } from 'react';
function SignIn() {
    var [email,setEmail] = useState('');
    var [password,setpwd] = useState('');
    var [logging,setLogging] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

    async function handleSubmit(e){
        e.preventDefault();
        setLogging(true)
        if(!email||!password){
            setLogging(false);
            return alert('Please fill in both fields')
        }
        let res = await auth.login({email,password})
        if(res.success){
            //setLogging(false);
            navigate('/')
        }
        else{
            alert('There has been an error',res.message);
            setLogging(false)
        }
    }

    if(auth.user){
        return navigate('/');
    }

    return (
        <>
            <div className="container" style={style.m_10}>
            <h3 className={classes.heading}>Log In to start the party</h3>
            <div className='row d-flex justify-content-center'>
                <div className='col w-100 '>
                <form className='w-100 row d-flex flex-column align-items-center' action="" method="POST">
                        <div className="col col-md-7 col-lg-5 my-3 d-flex flex-column align-items-stretch ">

                            <label className='w-100' style={style.label}>Email
                            <input type='email' onChange={(e)=>setEmail(e.target.value)} className='w-100 border py-2 px-2 rounded border-dark' id="email" name="email" required placeholder="abc@example.com"/>
                            </label>
                            
                        </div>
                        
                        <div className="col col-md-7 col-lg-5 my-3 d-flex flex-column align-items-stretch ">

                            <label className='w-adjust' style={style.label}>Password
                            <input onChange={(e)=>setpwd(e.target.value)} type='password' className='w-100 border py-2 px-2 rounded border-dark' id="pwd" name="password" required/>
                            </label>
                            
                        </div>
                        <div className='w-100 d-flex justify-content-center' >
                            <button onClick={handleSubmit} disabled={logging} type="submit" style={style.button} className={`bg-danger rounded-pill border my-3 m-auto ${classes.googlepill}`}>
                            {logging?'Logging in...':"Log In"}
                            </button>
                        </div>
                        
                    </form>
                </div>
            </div>
            
            <div className='w-100 d-flex justify-content-center' >
                <div className={`rounded-pill border my-3 m-auto ${classes.googlepill}`}>
                    <div className={classes.icon}></div>Log In with Google
                </div>
            </div>
            <div className='row w-100 '>
                <div className='col d-flex justify-content-center'>
                <div id="option-line" className="my-3 d-flex justify-content-center align-items-center">
                    <div className={`${classes.line} mx-1`}></div>
                    <div>or</div>
                    <div className={`${classes.line} mx-1`}></div>
                </div>

                </div>
            </div>
            <div className='row w-100 '>
                <div className='col d-flex justify-content-center'>
                <div className="my-3 d-flex justify-content-center align-items-center" style={style.align}>
                    <Link to='/signup'>Don't have an account ? Click to Sign Up</Link>
                </div>

                </div>
            </div>
            
            </div>
        </>
    );
}
export default SignIn;
const style={
    m_10:{
        marginTop:'5rem'
    },
    label:{
        fontWeight:'bolder'
    },
    button:{
        color:'white'
    },
    align:{
        fontWeight:'bolder',
        overflowWrap:'break-word',
        textAlign:'center'
    }
}