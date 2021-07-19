import {StellarBody} from './StellarBodiesTypes';
const MULTIPLIER = 30000000;


export function computeSize(d: StellarBody, sunDiameter: number): number {
    return Math.floor(d.aphelion / MULTIPLIER) + sunDiameter;
}

export function getEllipseXPosition(d: StellarBody, containerCenterX: number, sunDiameter: number, angleValue: number): number {
    let r = computeSize(d, sunDiameter);

    return containerCenterX + r * Math.cos(angleValue);
}

export function getEllipseYPosition(d: StellarBody, containerCenterY: number, sunDiameter: number, angleValue: number): number {
    let r = computeSize(d, sunDiameter);

    return containerCenterY + r * Math.sin(angleValue);
}

export function computePlanetRadius(meanRadius: number): number {
    return Math.floor(meanRadius / 10000) === 0 ? 2 : Math.floor(meanRadius / 10000);
}

export function computeSunRadius(data: StellarBody): number {
    return Math.floor(data.meanRadius / 10000);
}
