import axios from 'axios';

export const getQrCodeService = async () => {
  try {
        const response = await axios.get('http://localhost:3000/');
        console.log('getQrCodeService', response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
