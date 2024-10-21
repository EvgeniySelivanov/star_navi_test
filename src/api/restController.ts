import axios from 'axios';
import CONSTANTS from '../constants';
const http = axios.create({
  baseURL: CONSTANTS.BASE_URL,
});

interface GetInfoResponse {
  data: number[];
  status: number;
}

export const getInfo = async (address:string): Promise<GetInfoResponse> => {
  try {
    const response = await http.get(
      `${address}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return {
      data: response.data, 
      status: response.status || 500,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error( error.message);
      return {
        data: [],
        status: error.response?.status || 500,
      };
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};
