import React, {useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import 'react-image-lightbox/style.css';
import '../Style/hover.css'
import Image from 'material-ui-image'



export default function ImageShow() {

  const [author,setAuthor] = useState([])
  const [url,set_url] = useState( null)
  const [data,setData] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  
  //Get the data from picsum as a json file
  useEffect(()=>{
    fetch(`https://picsum.photos/v2/list`, {
      })
      .then(resp => resp.json())
      .then(resp=>{
        setData(resp)
      })
      .catch(err => console.log("Error",err))
     
  },[])

  //On click pic initialized the author the url 
 const choose =(item) =>{
  setAuthor(item.author)
  set_url(item.download_url)
  setShow(true)
  
  }


  return (
    <div className="row">
    {data.map(item => (
      <div className="column" >
      <Image 
      color="lightblue"
      key={item.id} 
      src={item.download_url} 
      onClick={() =>choose(item)}    
      alt={item.author}
     />
     
     </div>


   ))
    }
    
    <Modal    
        show={show}
        onHide={() => setShow(false)}
        className="container---popup"  
    >
        <Modal.Body>
        <img src={url} className= "center-image" onClick={handleClose} alt={author}>
        </img> 
        <h1 class="top-left">Author : {author}</h1>
        </Modal.Body>
      </Modal>
      </div>
  
    
  );
}


   