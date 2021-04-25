import * as d3 from 'd3';
import {StellarBody} from './StellarBodiesTypes';
import {computePosition} from './utils';

export function createBackGround(container: Element) {
    d3.select(container).append('svg').attr('width', '100%').attr('height', '100vh').style('background-color', 'black');
}

export function buildSun(container: Element, data: StellarBody) {
    let {height, width} = container.getBoundingClientRect(),
        centerX = width / 2,
        centerY = height / 2;

    d3.select(container.querySelector('svg'))
        .append('circle')
        .attr('cx', () => computePosition(data, centerX, 0))
        .attr('cy', () => computePosition(data, centerY, 0))
        .attr('r', () => Math.floor(data.meanRadius / 10000))
        .attr('class', data.id)
        .style('fill', 'yellow');
}

export function buildPlanets(container: Element, data: StellarBody[], sunRadius: number) {
    let {height, width} = container.getBoundingClientRect(),
        centerX = Math.floor(width / 2),
        centerY = Math.floor(height / 2);

    d3.select(container.querySelector('svg'))
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d: StellarBody) => computePosition(d, centerX, sunRadius))
        .attr('cy', (d: StellarBody) => computePosition(d, centerY, sunRadius))
        .attr('r', (d: StellarBody) => (Math.floor(d.meanRadius / 10000) === 0 ? 1 : Math.floor(d.meanRadius / 10000)))
        .attr('class', (d: StellarBody) => d.id)
        .style('fill', 'white');
}
