import React, {  useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authService, firestore } from "../../../../firebase";
import icon from '../../../../assets/editDataUser.png'
import './ConfigurationDataUser.css'

const ConfigurationDataUser = ({ activeUser }) => {
    const [userLogued, setUserLoged] = useState(activeUser)
    const [newPhoto, setNewPhoto] = useState('')
    const [nameConfig, setNameConfig] = useState('')
    const [passConfig, setPassConfig] = useState('')
    const [descpConfig, setDescpConfig] = useState('')



    const addChangesUser = async (e)=>{
        //Validar caracteres-- about max lenght 100 + feedback al ususario
        //validar usuario en base de datos (signUp)
        //si no hay cambios en algun campo no cambia nada if(valor == '')new texttarea = anterior textarea
        e.preventDefault();
        /*const addChanges = await firestore.colection('users').doc(activeUser.docId).update({
            username: nameConfig,
            about: descpConfig
        })*/
        console.log(newPhoto);
    }
    const navigate = useNavigate();
    const handleLogOut = async () => {
        try {
            signOut(authService);
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };
  return (
    <section className="container-config-data">
            <div className='img-user'>
                <img src={activeUser.profilePicture} alt="Img User"/>
            </div>
            <h3 className='name-config-data'>{activeUser.username}</h3>
            <p className='descp-config-data'>{activeUser.about}</p>
        <form onSubmit={(e)=>{e.preventDefault()}}>
            <label className='label-config-data'>
                Add img <img src={icon} className="img-icon-config"/>
            </label>
            <input
                type='file'
                accept=".jpg, .jpeg, .png"
                id='file'
                className='custom-file-input'
                onChange={(e)=> {setNewPhoto(e.target.value)}}/><br/>
            <label className='label-config-data'>User Name</label>
            <input type='text'
                    className='input-name-config' 
                    onChange={(e) => setNameConfig(e.target.value)} /><br/>
            <label className='label-config-data'>Password</label>
            <input type='password'
                    className='input-name-config' 
                    onChange={(e) => setPassConfig(e.target.value)} /><br/>
            <label className='label-config-data'>Description</label><br/>
            <textarea type='text'
                    maxLength={5}
                    className='description-user-data'
                    onChange={(e) => setDescpConfig(e.target.value)}></textarea><br/>
            <button type='submit' 
                    className='button-config-data'
                    onClick={addChangesUser}>Send configuration</button>
            <button onClick={handleLogOut} className='quit-session'>Quit session</button>
        </form>
    </section>
  )
}

export default ConfigurationDataUser