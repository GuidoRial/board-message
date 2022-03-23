import React, {  useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authService, firestore } from "../../../../firebase";
import icon from '../../../../assets/editDataUser.png'
import './ConfigurationDataUser.css'

const ConfigurationDataUser = ({ activeUser }) => {
    const [newPhoto, setNewPhoto] = useState(activeUser.profilePicture)
    const [nameConfig, setNameConfig] = useState(activeUser.nae)
    const [passConfig, setPassConfig] = useState('')
    const [descpConfig, setDescpConfig] = useState(activeUser.about)

    const addChangesUser = async (e)=>{
        e.preventDefault();
        /*const addChanges = await firestore.colection('users').doc(activeUser.docId).update({
            username: nameConfig,
            about: descpConfig
        })*/
        console.log(descpConfig + nameConfig + passConfig + newPhoto);
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
                <img src={activeUser.profilePicture} alt={activeUser.name}/>
            </div>
            <h3 className='name-config-data'>{activeUser.username}</h3>
            <p className='descp-config-data'>{activeUser.about}</p>
        <form onSubmit={(e)=>{e.preventDefault()}}>
            <label className='label-config-data'>
                Add img <img src={icon} alt='icon' className="img-icon-config"/>
            </label>
            <input
                type='file'
                accept=".jpg, .jpeg, .png"
                id='file'
                className='custom-file-input'
                onChange={(e)=> {setNewPhoto(e.target.value)}}/><br/>
            <label className='label-config-data'>User Name</label>
            <input type='text'
                    maxLength={12}
                    minLength={3}
                    className='input-name-config' 
                    onChange={(e) => setNameConfig(e.target.value)} /><br/>
            <label className='label-config-data'>Password</label>
            <input type='password'
                    className='input-name-config' 
                    onChange={(e) => setPassConfig(e.target.value)} /><br/>
            <label className='label-config-data'>Description</label><br/>
            <textarea type='text'
                    maxLength={100}
                    className='description-user-data'
                    onChange={(e) => setDescpConfig(e.target.value)}></textarea>
            <p className="count-characters">Characters {descpConfig.length} / 100</p><br/>
            <button type='submit' 
                    className='button-config-data'
                    onClick={addChangesUser}>Send configuration</button>
            <button onClick={handleLogOut} className='quit-session'>Quit session</button>
        </form>
    </section>
  )
}

export default ConfigurationDataUser