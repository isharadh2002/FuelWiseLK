// src/components/PageNotFound.jsx
import {Link} from 'react-router-dom';

function PageNotFound() {
    return (
        <div style={styles.container}>
            <div style={styles.errorBox}>
                <h1 style={styles.errorCode}>404</h1>
                <h2 style={styles.errorMessage}>Oops! Page Not Found</h2>
                <p style={styles.errorDescription}>
                    The page you are looking for might have been removed, had its name changed, or is temporarily
                    unavailable.
                </p>
                <Link to="/Home" style={styles.homeButton}>
                    Go Back to Home
                </Link>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f8f9fa',
        fontFamily: "'Arial', sans-serif",
        textAlign: 'center',
    },
    errorBox: {
        padding: '40px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        width: '90%',
    },
    errorCode: {
        fontSize: '6rem',
        fontWeight: 'bold',
        color: '#ff6f61',
        margin: '0',
    },
    errorMessage: {
        fontSize: '2rem',
        fontWeight: '600',
        margin: '20px 0',
        color: '#333',
    },
    errorDescription: {
        fontSize: '1rem',
        color: '#777',
        marginBottom: '30px',
        lineHeight: '1.5',
    },
    homeButton: {
        padding: '12px 24px',
        backgroundColor: '#007bff',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '5px',
        fontWeight: 'bold',
        fontSize: '1rem',
        boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.3s ease',
    },
    homeButtonHover: {
        backgroundColor: '#0056b3',
    },
};

export default PageNotFound;
