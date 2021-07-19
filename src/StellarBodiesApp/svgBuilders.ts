import * as d3 from 'd3';
import {StellarBody} from './StellarBodiesTypes';
import {computeSunRadius, getEllipseXPosition, getEllipseYPosition, computePlanetRadius} from './utils';

const WIDTH = 800;

export function createSvgContainer(container: Element) {
    d3.select(container).append('svg').attr('width', `${WIDTH}px`).attr('height', `${WIDTH}px`).style('background-color', 'black');
}

function getSvgContainerCenter(container: SVGSVGElement): [number, number] {
    let width: number = (container?.width.baseVal.value ?? 0),
            heigth: number = (container?.height.baseVal.value ?? 0),
            centerX =  width / 2,
            centerY = heigth / 2;
    return [centerX, centerY];
}

export function buildSun(container: SVGSVGElement, data: StellarBody) {
    let [centerX, centerY] = getSvgContainerCenter(container);

    d3.select(container)
        .append('defs')
        .append('filter')
        .attr('id', 'shadow')
        .append('feDropShadow')
        .attr('dx', 0)
        .attr('dy', 0)
        .attr('stdDeviation', 15)
        .attr('flood-color', 'yellow')
        .attr('flood-opacity', 1);

    d3.select(container)
        .append('circle')
        .attr('cx', centerX)
        .attr('cy', centerY)
        .attr('r', () => computeSunRadius(data))
        .attr('class', () => createClassName(data))
        .attr('style', 'filter: url(#shadow)')
        .style('fill', 'yellow');

}

export function buildPlanetsOnOrbits(container: SVGSVGElement, data: StellarBody[], sunRadius: number) {
    let [centerX, centerY] = getSvgContainerCenter(container);

    d3.select(container)
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('r', (d: StellarBody) => computePlanetRadius(d.meanRadius))
        .attr('cx', (d: StellarBody) => getEllipseXPosition(d, centerX, sunRadius, 0))
        .attr('cy', (d: StellarBody) => getEllipseYPosition(d, centerY, sunRadius, 0))
        .attr('class', createClassName)
        .attr('transform-origin', `${centerX}px ${centerY}px`)
        .style('fill', 'white')
        .each(cycle);
}

function cycle(d: StellarBody) {
    d3.select(`circle.${d.id}`)
        .transition()
        .duration(() => createDuration(d))
        .delay(0)
        .ease(d3.easeLinear)
        .attrTween('transform', () => d3.interpolateString("rotate(0)", "rotate(360)"))
        .on('end', () => cycle(d));
}

function createClassName(d: StellarBody): string {
    if (d.id === 'soleil') {
        return d.id;
    }
    return `${d.id} planet`
}

function createDuration(d: StellarBody): number {
    if (d.id === 'soleil') {
        return 0;
    }
    return Math.floor((400 / 73) * d.sideralOrbit);
}