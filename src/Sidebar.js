import './Sidebar.css'
import {Avatar} from "@mui/material";
import BackgroundImage from './background.jpg'
import {useSelector} from "react-redux";
import {selectUser} from "./features/userSlice";

function Sidebar() {
    const user = useSelector(selectUser);

    const recentItems = (topic) => (
        <div className='sidebar__recentItems'>
            <span className='sidebar__hash'>#</span>
            <p>{topic}</p>
        </div>
    )
    return(
        <div className='sidebar'>
            <div className='sidebar__top'>
                <img src={BackgroundImage} alt='' />
                <Avatar src={user.photoUrl} className='sidebar__avatar'>
                    {user.email[0]}
                </Avatar>
                <h2>{user.displayName}</h2>
                <h4>{user.email}</h4>
            </div>

            <div className='sidebar__stats'>
                <div className='sidebar__stat'>
                    <p>Who viewed you?</p>
                    <p className='sidebar__statNumber'>1</p>
                </div>
                <div className='sidebar__stat'>
                    <p>Views on Post</p>
                    <p className='sidebar__statNumber'>1</p>
                </div>
            </div>

            <div className='sidebar__bottom'>
                <p>Recent</p>
                {recentItems('reactjs')}
                {recentItems('programming')}
                {recentItems('software engineering')}
                {recentItems('design')}
                {recentItems('developer')}
            </div>
        </div>
    )
}

export default Sidebar;