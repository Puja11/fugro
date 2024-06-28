import React from 'react';
import { Position } from '../types';

type Props = {
  children: React.ReactNode;
};

type PositionProps = {
  position: Position | null;
};

/**
 * @description Component react the JSX expression for AveragePosition abd CurrentPosition
 * */
export function PositionComponent({ children }: Props) {
  return <section className="position-container">{children}</section>;
}

PositionComponent.AveragePosition = function ({ position }: PositionProps) {
  return (
    <PositionComponent.Div
      label="Average Position"
      position={position}
      styleClass="average-position"
    />
  );
};

PositionComponent.CurrentPosition = function ({ position }: PositionProps) {
  return (
    <PositionComponent.Div
      label="Current Position"
      position={position}
      styleClass="current-position"
    />
  );
};

PositionComponent.Div = function ({
  label,
  position,
  styleClass,
}: {
  label: string;
  position: Position | null;
  styleClass: string;
}) {
  return (
    <div className={styleClass}>
      <span className="strong"> {label} </span>{' '}
      <span>
        {' '}
        Latitude: {position?.latitude.toFixed(2)}, Longitude:{' '}
        {position?.longitude.toFixed(2)}, Elevation:{' '}
        {position?.elevation.toFixed(2)}
      </span>
    </div>
  );
};

export default PositionComponent;
