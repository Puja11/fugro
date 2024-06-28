import { PositionType, Position } from '../types';
import {
  getLatLongElevEndpoint,
  getLatLongEndpoint,
} from '../api/getPositionCordinates';

/**
 * @description This function fetches latitude and longitude
 * @returns Promise with latitude and longitude
 */
async function fetchLatLong(): Promise<PositionType> {
  const position: PositionType = await getLatLongEndpoint();
  return position;
}

/**
 * @description This function fetches elevation as per provided latitude and longitude and
 * @returns Promise with latititude,longtitude and elevation  */
function generateRandomPosition(): Promise<Position> {
  return new Promise(async (resolve) => {
    try {
      const position: PositionType = await fetchLatLong();
      const { latitude, longitude, elevation } =
        await getLatLongElevEndpoint(position);
      resolve({ latitude, longitude, elevation });
    } catch (error) {
      console.error(error);
    }
  });
}

export default generateRandomPosition;
