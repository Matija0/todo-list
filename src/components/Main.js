import React from "react";
import { useState } from "react"
import {useEffect} from 'react';
import Modal from 'react-modal';
import {MdDelete} from "react-icons/md"
import {AiFillEdit} from "react-icons/ai"

export default function Main(){
    const LOCAL_STORAGE_KEY = "dataKey"
    const [data ,setData]= useState(()=>{
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
    })
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState(false);
    const [editModal, setEditModal]= useState(false)
    const [edit_title, setEditTitle]=useState()
    const [edit_status, setEditstatus]=useState(false)
    const [edit_id, setEditId]=useState()
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
      Modal.setAppElement('#root'); 
    const [modalIsOpen, setIsOpen] = React.useState(false);

      
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

const getId = ()=>{
    return  data.length +1
   
}
const addItem=(e)=>{
    e.preventDefault()
    let val={
        id: getId(),
        title: title,
        status: 1,
    }
    setData([...data, val])
    setIsOpen(false);
    clear();
}
function clear(){
    setTitle()
}

useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }, [data]);

const update=(id)=>{
let updates = data.map((item)=>{
    if(item.id === id){
        return {id:id,title:edit_title,status:edit_status}
    }
    return item
})
setData(updates)
console.log(JSON.stringify(data))
setEditModal(false)
}
const open_edit_modal=(val)=>{
setEditModal((e)=> !e)
setEditTitle(val.title)
setEditstatus(val.status)
setEditId(val.id)


}
function remove(item){
    const array=data
    const index=data.indexOf(item)
    array.splice(index, 1)
    setData([...array])
}
const cards=data.map((item,index)=>{
    return(
 
    <Card
    key={index}
        item={item}
        delete={()=>remove(item)}/>
 
    )}) 


    return(
        <div className="main">
            <button className="btn btn-dark mt-3 mb-3" onClick={openModal}>ADD TASK</button>
      
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                
                >
                <button className="btn btn-dark btn-sm mb-2" onClick={closeModal}>close modal</button>
                 <form  className="form" onSubmit={addItem}>
                    <input type="text" placeholder="Enter title" onChange={(e)=>setTitle(e.target.value)} value={title}/>
                    
                    <button className="btn btn-primary btn-sm mt-2" type='submit'>Save</button>
                </form>   
            </Modal>
            <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Task title</th>
      <th scope="col">Status</th>
      <th scope="col">Edit</th>
      <th scope="col">Remove</th>
    </tr>
  </thead>
  <tbody>
  {cards}
  </tbody>
</table>
        </div>
    )
    
    

    function Card(props){
        return(
           
               
            <tr>
              <th scope="row">{props.item.id}</th>
              <td>{props.item.title}</td>
              <td>{props.item.status==1? "Active":"Completed"}</td>
              <td><button className="btn btn-outline-success" onClick={()=>open_edit_modal(props.item)}><AiFillEdit/></button></td>
              <td><button className="btn btn-outline-danger" onClick={props.delete}><MdDelete/></button></td>
              {editModal && edit_id === props.item.id?
              <div style={{position:"fixed",top:0,bottom:0,right:0,width:"60%",height:"100%",zIndex:333,background:"#ddd"}}
              >
<h1>Edit {edit_title}</h1>

<input className="edit-input" defaultValue={edit_title}  onChange={(e)=>setEditTitle(e.target.value)} />
<select className="ml-1" onChange={(e)=> setEditstatus(e.target.value)}>
    <option selected={!edit_status} value={0}>Completed</option>
    <option selected={edit_status==1}  value={1}>Active</option>

    
</select>
<br/>
<div className="btn-container">
<button className="btn btn-success" onClick={()=> update(edit_id)}>Update</button>

<button onClick={()=>setEditModal(false)} className="btn btn-danger">Close</button>
</div>
              </div>:null}
            </tr>
           
      
          
        )
    }
}