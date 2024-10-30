import axios from 'axios';

export const sendEmail = async ({ from, to, subject, body }) => {
    try {
        const response = await axios.post('http://localhost:5000/send-email', { from, to, subject, body });
        return response.data;
    } catch (error) {
        console.error('Error sending email:', error.response ? error.response.data : error.message);
        throw error; // Re-throw the error for handling in the calling function
    }
};
