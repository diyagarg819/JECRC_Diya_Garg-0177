import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={styles.nav}>
            <h2 style={styles.logo}>My App</h2>

            <div>
                <NavLink to="/" style={styles.link}>Home</NavLink>
                <NavLink to="/about" style={styles.link}>About</NavLink>
                <NavLink to="/contact" style={styles.link}>Contact</NavLink>
            </div>
            
        </nav>
    );
}

const styles = {
    nav: {
        display: 'flex',    
        justifyContent: 'space-between',
        backgroundColor: '#1e293b',
        padding: '15px 40px',
        color: 'white',
        alignItems: 'center',
    },
    link: ({isActive}) => ({
        textDecoration: 'none',
        color: isActive ? '#3b82f6' : 'white',
        margin: '0 15px',
        fontSize: '18px',
        fontWeight: isActive ? 'bold' : 'normal',
    }),
    logo: {
        margin: '0 15px',
    },
};

export default Navbar;