import react from 'react';
function About() {
    return (
        <div style = {styles.container}>
            <h1>About Us</h1>
            <p>This is the about page of our React Router demo application.</p>
            <p>It includes navigation , routing functionality.</p>
        </div>
    );
}

const styles = {
    container: {
        textAlign: 'center',
        padding: '40px',
        backgroundColor: '#fff3cd',
    },
};

export default About;