import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../providers/ProvideAuth';
import { useSong } from '../providers/ProvideSong';
import classes from '../styles/Songbar.module.css';
import React from 'react';
import { TokenKey } from '../utils';
import { useAvail } from '../providers/ProvideAvail';

function Songbar(){
    var avail = useAvail();
    var record = useSong();
    var myRef = useRef();
    var audioRef = useRef();
    var progressRef = useRef();
    var [name,setName] = useState(record.song?record.song.name:'Song Name')
    var [artist,setArtist] = useState(record.song?record.song.artist:'Artist')
 
   
    useEffect(()=>{
    
        if(record.song.songURL){
            setName(record.song.name);
            setArtist(record.song.artist)
            audioRef.current.setAttribute('src',record.song.songURL)
            audioRef.current.load()
            audioRef.current.play()
            initialiseVolume();
            audioRef.current.onended= function(){
                myRef.current.innerHTML= '<i class="fa-solid fa-play"></i>'
            }
            audioRef.current.ontimeupdate= function(){
                updateProgress();
            };
            myRef.current.innerHTML = '<i class="fa-solid fa-pause"></i>'
        }
        
    },[record.song])

    useEffect(()=>{
        return ()=>{
            record.setSongAndTrack([],{});
        }
    },[])

    // To play and pause Song
    function altSong(){
        //The .paused is an inherent property with every audio element
        if(!audioRef.current.paused){
            audioRef.current.pause();
            myRef.current.innerHTML = '<i class="fa-solid fa-play"></i>'
        }
        else{
            audioRef.current.play();
            myRef.current.innerHTML = '<i class="fa-solid fa-pause"></i>'
        }
    }

    // To go to prev song in collection
    function prevSong(){
        if(record.track.length==0||!record.song.songURL){
            return alert('First play a song in a collection')
        }
        let res = record.songBack()
    }

    // To go to next song in collection
    function nextSong(){
        if(record.track.length==0||!record.song.songURL){
            return alert('First play a song in a collection')
        }

        let res = record.songNext()
    }

    // To keep updating the progress bar
    function updateProgress(){
        let width = (audioRef.current.currentTime/audioRef.current.duration)*100;
        progressRef.current.style.width=`${width}%`

    }
    //To skip to a time if user clicks on progress bar
    function setSongTime(e){
        let node = document.getElementById('progress')
        if(!record.song.songURL){
            return alert('First please play some song to skip to its certain part')
        }
        console.log('%%',node.clientWidth,e)
        audioRef.current.currentTime = (audioRef.current.duration/parseFloat(node.clientWidth))*(e.nativeEvent.offsetX)
        updateProgress();
    }
    //function to initialize volume level
    function initialiseVolume(){
        document.getElementById('v-bar').style.width = `${audioRef.current.volume*100}%`
    }

    function changeVolume(e){
        if(!record.song.songURL){
            return alert('First please play some song to set its volume')
        }
        audioRef.current.volume = (e.nativeEvent.offsetX/document.getElementById('v-container').clientWidth)
        initialiseVolume();
    }

    if(!avail.id){
        return(<></>)
    }
    
    return(
        <div className={`${classes.bar} container-fluid`}>
           
            <div className={`row w-100 h-100`}>
                <div className='col-lg-3 d-flex align-items-center justify-content-center p-1 h-100'>
                    
                    {record.song.songURL?<div style={{backgroundImage:`url(${record.song.imageURL})`}} className={`mx-4 ${classes.songpic_}`}></div>:<div className={`mx-4 ${classes.songpic}`}></div>}
                    
                    <div className={`h-100 d-flex flex-column justify-content-between`} style={style.white}>
                        <div>{name?name:'Song Name'}</div>
                        <div>{artist?artist:'Artist'}</div>
                    </div>
                    <audio ref={audioRef} ></audio>
                </div>
                <div className='col-12 col-lg-6 p-1 h-100 d-flex flex-column align-items-center'>
                    <div className='d-flex justify-content-center mt-2'>
                        <div onClick={prevSong} className='mx-4' style={style.white}><i className="fa-solid fa-backward-step"></i></div>
                        <div onClick={altSong} className='mx-4' style={style.white} ref={myRef}><i className="fa-solid fa-play"></i></div>
                        <div onClick={nextSong} className='mx-4' style={style.white}><i className="fa-solid fa-forward-step"></i></div>
                    </div>
                    <div className='d-flex w-100 h-40 justify-content-center mt-2'>
                        <div id="progress" onClick={setSongTime} className={`${classes.progressBar} rounded`}>
                            <div ref={progressRef} className={`rounded ${classes.coloredpart}`}></div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-3 p-1 h-100 d-flex justify-content-cente align-items-center'>
                    <div style={style.wh_80} className='d-flex justify-content-cente align-items-center'>
                        <div className='mx-5' style={style.volume}><i className="fa-solid fa-volume-high"></i></div>
                        <div onClick={changeVolume} id='v-container' className={` ml-3 rounded ${classes.volumeBar}`}>
                            <div id='v-bar' className={`${classes.vprogress} rounded`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const style={
    volume:{
        color:'white',
        fontWeight:'bolder',
    },
    white:{
        color:'white',
        fontWeight:'bolder',
        cursor:'pointer'
    },
    bottom:{
        verticalAlign:'baseline',
        margin:'0 !important'
    },
    wh_80:{
        width:'80%',
    }
}
export default Songbar