import * as d3 from 'd3';
import {CircleData} from './index';
import {decimal} from './utils';

export function buildStars(container: Element, data: CircleData[]) {
    d3.select(container).append('svg').attr('width', '100%').attr('height', '100vh').style('background-color', 'black');

    d3.select(container.querySelector('svg'))
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d: CircleData) => d.cX)
        .attr('cy', (d: CircleData) => d.cY)
        .attr('r', (d: CircleData) => decimal(d.size))
        .style('fill', 'white');
}