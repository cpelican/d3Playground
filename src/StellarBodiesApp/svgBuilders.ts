import * as d3 from 'd3';
import {StellarBody} from './StellarBodiesTypes';
import {
    computeEllipseXPosition,
    computeEllipseYPosition,
    computeStellarObjectRadius,
    computeSvgComputedDimensions,
    computeSvgContainerCenter,
} from './utils';
import * as d3Zoom from 'd3-zoom';
import {ZoomedElementBaseType} from 'd3';
import {BaseType} from 'd3';

type D3CallArg = (selection: d3.Selection<SVGSVGElement, unknown, null, unknown>, ...args: any[]) => void;

export function buildSun(container: SVGSVGElement, data: StellarBody, scale: number) {
    let [centerX, centerY] = computeSvgContainerCenter(container),
        [width, heigth] = computeSvgComputedDimensions(container);

    d3.select(container)
        .append('defs')
        .append('filter')
        .attr('id', 'shadow')
        .attr('filterUnits', 'userSpaceOnUse')
        .attr('width', `${width}px`)
        .attr('height', `${heigth}px`)
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
        .attr('r', () => computeStellarObjectRadius(data.meanRadius, scale))
        .attr('class', () => createClassName(data))
        .attr('style', 'filter: url(#shadow)')
        .style('fill', 'yellow')
        .style('overflow', 'visible');
}

export function buildPlanetsOnOrbits(
    container: SVGSVGElement,
    data: StellarBody[],
    sunRadius: number,
    scale: number,
    rotationSpeed: number,
) {
    let [centerX, centerY] = computeSvgContainerCenter(container);
    d3.select(container)
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('r', (d: StellarBody) => computeStellarObjectRadius(d.meanRadius, scale))
        .attr('cx', (d: StellarBody) => computeEllipseXPosition(d, centerX, sunRadius))
        .attr('cy', (d: StellarBody) => computeEllipseYPosition(d, centerY, sunRadius))
        .attr('class', createClassName)
        .attr('transform-origin', `${centerX}px ${centerY}px`)
        .style('fill', 'white')
        .each((d: StellarBody) => buildAnimation(d, rotationSpeed));
}

function buildAnimation(d: StellarBody, rotationSpeed: number) {
    d3.select(`circle.${d.id}`)
        .transition()
        .duration(() => createDuration(d, rotationSpeed))
        .delay(0)
        .ease(d3.easeLinear)
        .attrTween('transform', () => d3.interpolateString('rotate(0)', 'rotate(360)'))
        .on('end', (d: unknown) => buildAnimation(d as StellarBody, rotationSpeed));
}

export function buildZoom(container: SVGSVGElement, minZoom: number, maxZoom: number, callBack: (this: BaseType, event: any) => void): void {
    let svgZoom: d3Zoom.ZoomBehavior<ZoomedElementBaseType, unknown>;

        svgZoom = d3Zoom
            .zoom<ZoomedElementBaseType, unknown>()
            .on('zoom', callBack)
            .scaleExtent([minZoom, maxZoom]);

        d3.select(container).call(svgZoom as unknown as D3CallArg);
}

export function changeViewBox(width: number, heigth: number) {
    return function(this: BaseType, event: any): void {
        let svgElement = this as SVGSVGElement,
            oldWidth = width,
            oldHeight = heigth,
            viewBoxWidth = oldWidth * event.transform.k,
            viewBoxHeight = oldHeight * event.transform.k,
            x = (oldWidth - viewBoxWidth) / 2,
            y = (oldHeight - viewBoxHeight) / 2;
        d3.select(svgElement).attr('viewBox', `${x} ${y} ${viewBoxWidth} ${viewBoxHeight}`);
    }
}

function createClassName(d: StellarBody): string {
    if (d.id === 'soleil') {
        return d.id;
    }
    return `${d.id} planet`;
}

function createDuration(d: StellarBody, rotationSpeed: number): number {
    if (d.id === 'soleil') {
        return 0;
    }
    if (rotationSpeed === 0) {
        return 0;
    }

    return Math.floor((400 / (15 * rotationSpeed)) * d.sideralOrbit);
}
