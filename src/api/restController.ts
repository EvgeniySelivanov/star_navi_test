import axios from 'axios';
import CONSTANTS from '../constants';
const http = axios.create({
  baseURL: CONSTANTS.BASE_URL,
});

interface GetInfoResponse {
  data: any[];
  status: number;
}
interface StarshipResponse {
  results: any[];
  next: string | null;
}
export const getInfo = async (address: string): Promise<GetInfoResponse> => {
  try {
    const response = await http.get(`${address}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return {
      data: response.data,
      status: response.status || 500,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
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

export const getShips = async (address: string): Promise<GetInfoResponse> => {
  let starships: any[] = [];
  let nextUrl: string = `${CONSTANTS.BASE_URL + address}`;

  while (nextUrl) {
    try {
      const response: any = await axios.get(nextUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Add the received ships to the array
      starships = starships.concat(response.data.results);

      nextUrl = response.data.next;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
        return {
          data: starships,
          status: error.response?.status || 500,
        };
      } else {
        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred');
      }
    }
  }

  return {
    data: starships,
    status: 200,
  };
};
