import './NotifiBar.scss';
import { useState, useEffect, useRef } from 'react';

export default function NotifiBar() {
    const [open, setOpen] = useState(false);

    let menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
                console.log(menuRef.current);
            }
        };

        document.addEventListener("mousedown", handler);


        return () => {
            document.removeEventListener("mousedown", handler);
        }

    });
    return (
        <div className="App">
            <div className='menu-container' ref={menuRef}>
                {/* <div className='menu-trigger' onClick={() => { setOpen(!open) }}>
                    <img src={user}></img>
                </div> */}

                <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} >
                    <h3>The Kiet<br /><span>Website Designer</span></h3>
                    <ul>
                        {/* <DropdownItem img={user} text={"My Profile"} />
                        <DropdownItem img={edit} text={"Edit Profile"} />
                        <DropdownItem img={inbox} text={"Inbox"} />
                        <DropdownItem img={settings} text={"Settings"} />
                        <DropdownItem img={help} text={"Helps"} />
                        <DropdownItem img={logout} text={"Logout"} /> */}
                        <h3>hello</h3>
                        <h3>hello</h3>
                        <h3>hello</h3>
                        <h3>hello</h3>
                    </ul>
                </div>
            </div>
        </div>
    );
}