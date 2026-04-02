import react from 'react';

function Contact() {
    return (
        <div style = {styles.container}>
            <h1>Contact Us</h1>
            <p>You can reach us at </p>
            <p>Email: contact@company.com</p>
            <p>Phone: (123) 456-7890</p>
        </div>
    );
}

const styles = {
    container: {
        textAlign: 'center',
        padding: '40px',
        backgroundColor: '#d4edda',
    },
};

export default Contact;
