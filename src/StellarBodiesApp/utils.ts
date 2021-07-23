import {StellarBody} from './StellarBodiesTypes';
import {ViewConfig} from './index';

function computeRadius(d: StellarBody, sunRadius: number): number {
    return Math.floor(d.aphelion / ViewConfig.scale) + sunRadius;
}

export function computeEllipseXPosition(d: StellarBody, containerCenterX: number, sunRadius: number): number {
    let r = computeRadius(d, sunRadius);

    return containerCenterX + r;
}

export function computeEllipseYPosition(d: StellarBody, containerCenterY: number, sunRadius: number): number {
    // todo: what to do about me?
    let r = computeRadius(d, sunRadius);

    return containerCenterY;
}

export function computeStellarObjectRadius(meanRadius: number, scale: number): number {
    return Math.floor(meanRadius / scale) === 0 ? ViewConfig.minimalPlanetSize : Math.floor(meanRadius / scale);
}

export function computeSvgComputedDimensions(container: SVGSVGElement): [number, number] {
    let {width, height} = window.getComputedStyle(container),
        svgWidth = parseInt(width.replace('px', '')),
        svgHeight = parseInt(height.replace('px', ''));

    return [svgHeight, svgWidth];
}

export function computeSvgViewBoxDimensions(container: SVGSVGElement): [number, number] {
    let {width, height} = container.viewBox.baseVal;

    return [width, height];
}

export function computeSvgContainerCenter(container: SVGSVGElement): [number, number] {
    let [width, height] = computeSvgViewBoxDimensions(container),
        centerX = Math.floor(width / 2) + ViewConfig.translateX,
        centerY = Math.floor(height / 2) + ViewConfig.translateY;

    return [centerX, centerY];
}
