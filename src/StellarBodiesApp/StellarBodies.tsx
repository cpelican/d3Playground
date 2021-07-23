import {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import * as d3Zoom from 'd3-zoom';
import React from 'react';
import {buildPlanetsOnOrbits, buildSun} from './svgBuilders';
import {StellarBody} from './StellarBodiesTypes';
import {svg} from 'd3-fetch';
import {BaseType, ZoomedElementBaseType} from 'd3';

type D3CallArg = (selection: d3.Selection<BaseType, unknown, HTMLElement, unknown>, ...args: any[]) => void;

interface StellarBodiesProps {
    sun: StellarBody | null;
    planets: StellarBody[];
    width: string;
    heigth: string;
    scale: number;
    maxZoom: number;
    minZoom: number;
    rotationSpeed: number;
}

export const StellarBodies = ({
    sun,
    planets,
    width,
    heigth,
    scale,
    maxZoom,
    minZoom,
    rotationSpeed,
}: StellarBodiesProps) => {
    const svgRef = useRef(null);

    function zoomedCanvas(this: BaseType, event: any, d: unknown) {
        let svgElement = this as SVGSVGElement,
            oldWidth = parseInt(width),
            oldHeight = parseInt(heigth),
            viewBoxWidth = oldWidth * event.transform.k,
            viewBoxHeight = oldHeight * event.transform.k,
            x = (oldWidth - viewBoxWidth) / 2,
            y = (oldHeight - viewBoxHeight) / 2;
        d3.select(svgElement).attr('viewBox', `${x} ${y} ${viewBoxWidth} ${viewBoxHeight}`);
    }

    useEffect(() => {
        let svgElement: SVGSVGElement | null = svgRef?.current,
            hasAllStellarBodies = sun != null && (planets?.length ?? 0) > 0;

        if (svgElement != null && hasAllStellarBodies) {
            buildSun(svgElement, sun as StellarBody, scale);
            let sunElement: SVGCircleElement | null = svgElement!.querySelector(`.${sun!.id}`),
                sunRadius = sunElement?.r.animVal?.value ?? 0;

            buildPlanetsOnOrbits(svgElement, planets, sunRadius, scale, rotationSpeed);
        }

        let svgZoom: d3Zoom.ZoomBehavior<ZoomedElementBaseType, unknown>;

        svgZoom = d3Zoom
            .zoom<ZoomedElementBaseType, unknown>()
            .on('zoom', zoomedCanvas)
            .scaleExtent([minZoom, maxZoom]);

        d3.select('svg').call(svgZoom as D3CallArg);
    }, [planets, sun, scale]);

    return (
        <svg
            style={{border: '1px red solid', width: '100%', height: '100%'}}
            ref={svgRef}
            viewBox={`0 0 ${width} ${heigth}`}
        />
    );
};
