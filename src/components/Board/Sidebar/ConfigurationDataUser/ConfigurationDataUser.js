import React, {  useState } from "react";
import { signOut, getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../../firebase";
import icon from '../../../../assets/editDataUser.png'
import './ConfigurationDataUser.css'

const ConfigurationDataUser = ({ activeUser }) => {
    const [newPhoto, setNewPhoto] = useState(activeUser.profilePicture)
    const [nameConfig, setNameConfig] = useState(activeUser.name)
//    const [passConfig, setPassConfig] = useState('')
    const [descpConfig, setDescpConfig] = useState(activeUser.about)

    const addChangesUser = async (e)=>{
        e.preventDefault();
        const auth = getAuth();
        // Metodo updateProfile - - - Ver cambios del usuario
        await updateProfile(auth.currentUser,{
            username: nameConfig,
            profilePicture: newPhoto,
            about: descpConfig
        })
        console.log(auth.currentUser);
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
                <img src={activeUser.profilePicture} alt={activeUser.name} className="img-icon-config"/>
            </div>
            <h3 className='name-config-data'>{activeUser.username}</h3>
            <p className='descp-config-data'>{activeUser.about}</p>
        <form onSubmit={(e)=>{addChangesUser(e)}}>
            <label className='label-config-data'>
                Add img <img src={icon} alt='icon' />
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
                    className='input-name-config' /><br/>
            <label className='label-config-data'>Description</label><br/>
            <textarea type='text'
                    maxLength={100}
                    className='description-user-data'
                    onChange={(e) => setDescpConfig(e.target.value)}></textarea>
            <p className="count-characters">Characters {descpConfig.length} / 100</p><br/>
            <button type='submit' 
                    className='button-config-data'>Send configuration</button>
            <button onClick={handleLogOut} className='quit-session'>Quit session</button>
        </form>
    </section>
  )
}

export default ConfigurationDataUser