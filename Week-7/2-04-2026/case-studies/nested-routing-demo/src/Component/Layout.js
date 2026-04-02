import Navbar from "./Navbar";

import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div>
            <Navbar />
            <div style={styles.content}>
                <Outlet />
            </div>
        </div>
    );
}

const styles = {
    content: {
        padding: '20px',
        textAlign: 'center',
    },
};

export default Layout;