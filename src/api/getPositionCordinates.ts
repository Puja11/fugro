import { latLongEndpoint, elevationEndpoint } from '../constants/constants';
import { PositionType, Position } from '../types';

/**
 * @description REST API call to get random latitude and longitude.
 */
export const getLatLongEndpoint = async (): Promise<PositionType> => {
  const response = await fetch(`${latLongEndpoint}`);

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  const data = await response.json();
  // destructuring response data
  const { latitude, longitude } = data.iss_position;
  return { latitude, longitude };
};

/**
 * @description REST API call to get random elevation from given latitude longitude.
 */
export const getLatLongElevEndpoint = async (
  position: PositionType
): Promise<Position> => {
  const response = await fetch(
    `${elevationEndpoint}${position.latitude},${position.longitude}`
  );

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  const data = await response.json();
  // destructuring response data
  const { latitude, longitude, elevation } = data.results[0];
  return { latitude, longitude, elevation };
};
