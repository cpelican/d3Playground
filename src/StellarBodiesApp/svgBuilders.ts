import * as d3 from 'd3';
import {StellarBody} from './StellarBodiesTypes';
import {
    computeEllipseXPosition,
    computeEllipseYPosition,
    computeStellarObjectRadius,
    computeSvgContainerCenter
} from './utils';
import {ViewConfig} from './index';

export function buildSvgContainer(container: Element) {
    d3.select(container)
        .append('svg')
        .attr('width', ViewConfig.width)
        .attr('height', ViewConfig.height)
        .style('background-color', 'black');
}

export function buildSun(container: SVGSVGElement, data: StellarBody) {
    let [centerX, centerY] = computeSvgContainerCenter(container);

    d3.select(container)
        .append('defs')
        .append('filter')
        .attr('id', 'shadow')
        .attr('filterUnits', 'userSpaceOnUse')
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
        .attr('r', () => computeStellarObjectRadius(data.meanRadius))
        .attr('class', () => createClassName(data))
        .attr('style', 'filter: url(#shadow)')
        .style('fill', 'yellow')
        .style('overflow', 'visible');

}

export function buildPlanetsOnOrbits(container: SVGSVGElement, data: StellarBody[], sunRadius: number) {
    let [centerX, centerY] = computeSvgContainerCenter(container);
    d3.select(container)
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('r', (d: StellarBody) => computeStellarObjectRadius(d.meanRadius))
        .attr('cx', (d: StellarBody) => computeEllipseXPosition(d, centerX, sunRadius, 0))
        .attr('cy', (d: StellarBody) => computeEllipseYPosition(d, centerY, sunRadius, 0))
        .attr('class', createClassName)
        .attr('transform-origin', `${centerX}px ${centerY}px`)
        .style('fill', 'white')
        .each(buildAnimation);
}

function buildAnimation(d: StellarBody) {
    d3.select(`circle.${d.id}`)
        .transition()
        .duration(() => createDuration(d))
        .delay(0)
        .ease(d3.easeLinear)
        .attrTween('transform', () => d3.interpolateString("rotate(0)", "rotate(360)"))
        .on('end', () => buildAnimation(d));
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