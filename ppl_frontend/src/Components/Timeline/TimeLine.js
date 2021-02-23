import React, { Component, useState ,useEffect} from 'react'
import ContentLeft from './ContentLeft/ContentLeft'
import ContentRight from './ContentRight/ContentRight'
import Keys from '../../Config/keys'
import axios from 'axios'
import { Switch, Route, useHistory } from 'react-router-dom'
import SinglePost from './SinglePost/SinglePost'
const Timeline = () =>{
    const history = useHistory()
    console.log("Local Storage :: ",localStorage)
    if(localStorage.length==0)
    {
        history.push('/login')
    }
    let [getTrue,setTrue] = useState(false)
    const ifTrue = (bool) =>
    {
        setTrue(bool)
    }
    let [getImageData,setImageData] = useState([])
        useEffect(() => {
        axios.get(Keys.axiosCall.getAllImages).then(        
            (response)=>{
                console.log("In Axios call ",response.data)
                setImageData(response.data)
            }).catch((error)=>{
                console.log("Not Working")
        })
        setTrue(false);
        
    },[2,getTrue])
    return(   
            <>
                <ContentRight imgData = {ifTrue}/>
                <Switch>
                    <Route path = "/timeline" component={()=><ContentLeft data = {getImageData} imgData = {ifTrue}/>} exact />
                    <Route path = "/timeline/singlepost" component={()=><SinglePost imgData={ifTrue}/>} />
                </Switch>
            </>
        )
}

export default Timeline;