import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Position } from './types';
import generateRandomPosition from './utils/utils';
import { MAX_POSITIONS } from './constants/constants';
import { PositionComponent } from './components/position';

function App() {
  const defaultPosition = { latitude: 0, longitude: 0, elevation: 0 };
  const [positionArray, setPositionArray] = useState<Position[]>([]);
  const [averagePosition, setAveragePosition] =
    useState<Position>(defaultPosition);
  const [averagePositionUI, setAveragePositionUI] =
    useState<Position>(defaultPosition);
  const [currentPosition, setCurrentPosition] = useState<Position | null>(
    defaultPosition
  );
  const [totalPosition, setTotalPosition] = useState<Position>(defaultPosition);
  const [count, setCount] = useState(0);

  /**
   * @description Function calculates the average of the positions on addition of each position
   */
  const calculateAverage = useCallback(
    (newPos: Position) => {
      if (positionArray.length > 0) {
        const newTotalX = totalPosition.latitude + newPos.latitude;
        const newTotalY = totalPosition.longitude + newPos.longitude;
        const newTotalZ = totalPosition.elevation + newPos.elevation;
        const newCount = count + 1;
        setTotalPosition({
          latitude: newTotalX,
          longitude: newTotalY,
          elevation: newTotalZ,
        });
        setCount(newCount);
        setAveragePosition({
          latitude: newTotalX / newCount,
          longitude: newTotalY / newCount,
          elevation: newTotalZ / newCount,
        });
      }
    },
    [positionArray, totalPosition, count]
  );

  /**
   * @description This useEffect fetches the random positions and stores it as per limit to calculate average
   */
  useEffect(() => {
    const intervalToCall = setInterval(async () => {
      const pos: Position = await generateRandomPosition();
      calculateAverage(positionArray[positionArray.length - 1]);
      setPositionArray((prevState) => {
        const newState = [...prevState, pos];
        if (newState.length > MAX_POSITIONS) {
          newState.shift(); // Remove the oldest position if the limit is exceeded
        }
        return newState;
      });
    }, 1000);
    return () => clearInterval(intervalToCall);
  });

  /**
   * @description This useEffect updates UI with average and current position ater every 2000ms
   */
  useEffect(() => {
    const intervalToCall = setInterval(async () => {
      setAveragePositionUI(averagePosition);
      setCurrentPosition(positionArray[positionArray.length - 1]);
    }, 2000);
    return () => clearInterval(intervalToCall);
  }, [positionArray]);

  return (
    <PositionComponent>
      {positionArray.length > 1 ? (
        <>
          <PositionComponent.AveragePosition position={averagePositionUI} />
          <PositionComponent.CurrentPosition position={currentPosition} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </PositionComponent>
  );
}

export default App;
