import React, {  useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../../firebase";
import icon from '../../../../assets/editDataUser.png'
import './ConfigurationDataUser.css'

const ConfigurationDataUser = () => {
    const [changesUser, setChangesUser] = useState({})
    const [nameConfig, setNameConfig] = useState('')
    const [descpConfig, setDescpConfig] = useState('')
    
    function addChangesUser(){
        setChangesUser({
            name: nameConfig,
            description: descpConfig
        })
        console.log(changesUser)
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
        <div>
            <div className='img-user'>
                Img User
            </div>
            <h3 className='name-config-data'>Name user</h3>
            <p className='descp-config-data'>Description user</p>
        </div>
        <form onSubmit={(e)=>{e.preventDefault()}}>
            <label className='label-config-data'>Add img <img src={icon} className="img-icon-config"/></label>
            <input 
                type='file'
                accept=".jpg, .jpeg, .png"
                id='file'
                className='custom-file-input'
                onChange={(e)=> {console.log(e.target)}}/><br/>
            <label className='label-config-data'>User Name</label>
            <input type='text' 
                    className='input-name-config' 
                    onChange={(e) => setNameConfig(e.target.value)} /><br/>
            <label className='label-config-data'
                    onChange={(e) => setDescpConfig(e.target.value)}>Description</label><br/>
            <textarea type='text' className='description-user-data'></textarea><br/>
            <button type='submit' 
                    className='button-config-data'
                    onClick={addChangesUser}>Send configuration</button>
            <button onClick={handleLogOut} className='quit-session'>Quit session</button>
        </form>
    </section>
  )
}

export default ConfigurationDataUser