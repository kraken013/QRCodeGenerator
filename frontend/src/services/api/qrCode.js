import axios from 'axios';
export const getQrCodeService = () => {
    return axios.get('http://localhost:3000/')
        .then((response) => response.data)
        .catch((error) => {
            console.error(error);
            return [];
        });
};
