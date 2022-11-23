import classes from '../styles/Queue.module.css'
import {MdKeyboardArrowDown} from 'react-icons/md'
import {useSong} from '../providers/ProvideSong'
import { useAuth } from '../providers/ProvideAuth';
// Always remember how you used min-height, max-weight for responsiveness here
// along with flex
function Queue(props) {
    const {title,arr} = props;
    var record = useSong();
    var auth = useAuth();
    function playSong(arr,item){
        console.log('aaya',item.imageURL)
        let res1 = record.setSongAndTrack(arr,item);
       
        if(!res1.success){
            window.alert('Sorry there has been some error in playing Songs')
        }
    }

    async function selectFavourite(song,toDo){
  
        if(toDo=='favourite'){
            let reply = await auth.favourite(song)
        }
        else if(toDo=='unfavourite'){
            let reply = await auth.unfavourite(song)
        }
        

    }
    //function to scrolldown on click of keyboard down in case favs exceeds 8
    function scrollDown(){
        var slider = document.getElementById('slider')
        slider.scrollBy(0,200)
    }
    
return (
    <>
    {console.log('array aya',arr)}
    <div className='w-100 row'>
        <div className='col-12'>
        <h2 style={style.align} className="mb-4">{title}</h2>
        </div>
    </div>
    
    <div id='slider' className={` ${classes.list_container} w-100 d-flex row justify-content-center align-items-start`}>
        {arr.map((item,index)=>
            <div onClick={()=>playSong.bind(null,arr,item)()} className='col-10 rounded my-3' style={{cursor:'pointer'}} key={item._id}>
                <div className='row h-100 w-100' >
                    <div style={style.align} className='h-100 col-1 d-flex justify-content-center align-items-center'>
                        {++index+'.'}
                    </div>
                    <div  className='h-100 col-2 p-0 d-flex justify-content-center align-items-center'>
                        <img src={item.imageURL} className={`rounded ${classes.img_fit}`}>
                            
                        </img>
                    </div>
                    <div className='h-100 col-7 d-flex justify-content-start align-items-center'>
                        <div style={style.color}>{item.name}<br></br>{item.duration}</div>
                    </div>

                    <div className='h-100 col-1 d-flex justify-content-start align-items-center'>
                    {auth.user.favourites.some(elem=>JSON.stringify(elem)===JSON.stringify(item))?<i onClick={(e)=>{e.stopPropagation();selectFavourite(item,'unfavourite')}} style={style.iconF} className="fa-solid fa-heart"></i>:<i onClick={(e)=>{e.stopPropagation();selectFavourite(item,'favourite')}} style={style.icon} className="fa-solid fa-heart"></i>}
                    
                    </div>
                </div>
            </div>
        )}
        
    </div>
    
    <MdKeyboardArrowDown onClick={scrollDown} size={40} className={` ${classes.icon}`}/>
    
    
    </>
)
}

const style={
    align:{
        color:'white',
        textAlign:'center',
        fontWeight:'bolder'
    },
    color:{
        color:'white',
        fontWeight:'bolder'
    },
    icon:{
        color:'white',
        fontWeight:'bolder',
        flexShrink:'1'
    },
    iconF:{
        color:'red',
        fontWeight:'bolder',
        flexShrink:'1'
        
    }
    
}
export default Queue;