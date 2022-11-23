import { useEffect, useState } from "react";
import Queue from './Queue';
import classes from '../styles/UserProfile.module.css';
import { useAuth } from "../providers/ProvideAuth";
import { useNavigate } from "react-router-dom";
import FileInput from './FileInput';

function UserProfile(){
    let [editInfo,setEditInfo] = useState(false);
    let [updating,setUpdating] = useState(false);
    const auth = useAuth();
    let navigate = useNavigate();

    const [data, setData] = useState({
		name: auth.user?auth.user.name:'anonymous',
		img: "",
        password:auth.user?auth.user.password:'1234'
	});
    if(!auth.user){
        navigate('/signin')
    }
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleInputState = (name, value) => {
		setData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
        e.preventDefault()
        setUpdating(true)
        if(!data.name||!data.password){
            alert('Please fill all fields or cancel if no changes wanted');
            setUpdating(false)
            return;
        }
		
		let reply = await auth.setAvatar(data);
        if(!reply.success){
            alert('Some error in updating user')
        }
        setUpdating(false)
	};
    
    
    const style = {
        pp:{
        width:'30%',
        height:'0',
        paddingBottom: '30%',
        borderRadius: '50%',
        backgroundImage: `url(${auth.user.avatar})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        },
        loading:{
            textAlign:'center',
            fontWeight:'bolder'
        },
        content:{
            textAlign:'center',
            fontWeight:'bold',
            color:'white',
            fontFamily: "'Inner Vintage', sans-serif",
        },
        label:{
            display:'inline-block',
            textAlign:'left',
            color:'white',
            fontWeight:'bold',
            fontSize:'1.2rem',
            fontFamily: "'Inner Vintage', sans-serif",
        }
    }

    
    
    function showForm(){
        setEditInfo(true)
    }

    
    return(
        <>
            <div className={`container-fluid ${classes.body}`}>
                <div className='row mt-3'>
                    <div className='col-12 col-lg-8 py-2 px-4'>
                        
                            <div className={`m-auto`} style={style.pp}></div>
                            {editInfo?
                                <form className='my-5 px-5 m-auto d-flex flex-column align-items-center' method={``} action='POST' encType="multipart/form-data">
                                    <label for='name' className="w-80 w-50-md" style={style.label}>Name</label>
                                    <input onChange={handleChange} id='name' className="d-block mb-5 m-auto w-80 w-50-md rounded p-2" type="text" name="name" required value={data.name}>
                                            
                                    </input>
                
                           
                                    <label for='password' className="w-80 w-50-md" style={style.label}>Password</label>
                                    <input onChange={handleChange} id='password' className="d-block mb-5 m-auto w-80 w-50-md rounded p-2" type="password" name="password" required value={data.password}>
                                    </input>

                                    <label for='avatar' className="w-80 w-50-md" style={style.label}>Avatar</label>
                                    <FileInput 
                                        name="img"
                                        label="Choose Image"
                                        handleInputState={handleInputState}
                                        type="image"
                                        value={data.img}
                                        accept="image/*"
                                    />
                                    <button disabled={updating} onClick={handleSubmit} className={`${classes.button} py-2 px-4 bg-success mt-5 d-block m-auto rounded-pill`}>
                                        {updating?'Updating...':'Submit'}
                                    </button>
                                    <button disabled={updating} onClick={()=>{setEditInfo(false)}}  className={`${classes.button} py-2 px-4 bg-danger mt-3 d-block m-auto rounded-pill`}>
                                            Cancel 
                                    </button>
                                </form>
                            :
                                <div className='my-5 px-5'>
                                    <h3 className="mb-5" style={style.content}>
                                            Name : &emsp;{auth.user.name}
                                    </h3>
                                    <h3 style={style.content}>
                                            Email : &emsp;{auth.user.email}
                                    </h3>
                                    <button onClick={showForm} className={`${classes.button} py-2 px-4 bg-success mt-5 d-block m-auto rounded-pill`}>
                                            Edit info 
                                    </button>
                                </div>
                            }
                            
                    
                        
                    </div>
                    <div className="col-12 col-lg-4 pt-5 d-flex flex-column align-items-center">
                        <Queue title={'Favourites'}
                        arr={auth.user.favourites}
                        />
                    </div>
                </div>
            </div>
           
        </>
    )
}

export default UserProfile;