import React, {useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import 'react-image-lightbox/style.css';
import '../Style/hover.css'
import Loader from 'react-loader-spinner'



export default function ImageShow() {

  const [author,setauthor] = useState([])
  const [url,set_url] = useState( null)
  const [data,setdata] = useState([])
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(true)
  const handleClose = () => setShow(false);

  //Get the data from picsum as a json file
  useEffect(()=>{
    fetch(`https://picsum.photos/v2/list`, {
      })
      .then(resp => resp.json())
      .then(resp=>{
        setdata(resp)
        setLoading(false)
      })
      .catch(err => console.log("Error",err))
     
  },[])

  //On click pic initialized the author the url 
 const choose =(item) =>{
  setauthor(item.author)
  set_url(item.download_url)
  setShow(true)
  
  }

  return (
 
  
    
    <div  className="container">
    {isLoading ? 
      <Loader className='loader' type="Circles" color="black" height={150} width={150} />
    :
    data.map(item => (
      <img 
      className = "image"
      key={item.id} 
      src={item.download_url} 
      onClick={() =>choose(item)}    
     />
     


   ))
    }
    
    <Modal    
        show={show}
        onHide={() => setShow(false)}
        className="container---popup"  
    >
        <Modal.Body>
        <img src={url} className= "center-image" onClick={handleClose}>
        </img> </Modal.Body>
      </Modal>
      </div>
  
    
  );
}


   