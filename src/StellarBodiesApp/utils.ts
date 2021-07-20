import {StellarBody} from './StellarBodiesTypes';
import {ViewConfig} from './index';

function computeRadius(d: StellarBody, sunRadius: number): number {
    return Math.floor(d.aphelion / ViewConfig.scale) + sunRadius;
}

export function computeEllipseXPosition(
    d: StellarBody,
    containerCenterX: number,
    sunRadius: number,
    angleValue: number,
): number {
    let r = computeRadius(d, sunRadius);

    return containerCenterX + r * Math.cos(angleValue);
}

export function computeEllipseYPosition(
    d: StellarBody,
    containerCenterY: number,
    sunRadius: number,
    angleValue: number,
): number {
    let r = computeRadius(d, sunRadius);

    return containerCenterY + r * Math.sin(angleValue);
}

export function computeStellarObjectRadius(meanRadius: number): number {
    return Math.floor(meanRadius / ViewConfig.scale) === 0
        ? ViewConfig.minimalPlanetSize
        : Math.floor(meanRadius / ViewConfig.scale);
}

export function computeSvgContainerCenter(container: SVGSVGElement): [number, number] {
    let {width, height} = window.getComputedStyle(container);
    let svgWidth = parseInt(width.replace('px', '')),
        svgHeight = parseInt(height.replace('px', '')),
        centerX = Math.floor(svgWidth / 2),
        centerY = Math.floor(svgHeight / 2);

    return [centerX, centerY];
}
