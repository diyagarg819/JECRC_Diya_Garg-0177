import react from 'react';

function Home(){
    return (
        <div style = {styles.container}>
            <h1>Home Page</h1>
            <p>This is the home page of our React Router demo application.</p>
            <p>This is the homepage where users land first.</p>
        </div>
    );
}

const styles = {
    container: {
        textAlign: 'center',
        padding: '40px',
        backgroundColor: '#cce5ff',
    },
};

export default Home;