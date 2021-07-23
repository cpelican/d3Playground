import {useEffect, useRef} from 'react';
import React from 'react';
import {buildPlanetsOnOrbits, buildSun, buildZoom, changeViewBox} from './svgBuilders';
import {StellarBody} from './StellarBodiesTypes';
import {svg} from 'd3-fetch';

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

    useEffect(() => {
        let svgElement: SVGSVGElement | null = svgRef?.current,
            hasAllStellarBodies = sun != null && (planets?.length ?? 0) > 0;

        if (svgElement != null && hasAllStellarBodies) {
            buildSun(svgElement, sun as StellarBody, scale);
            let sunElement: SVGCircleElement | null = svgElement!.querySelector(`.${sun!.id}`),
                sunRadius = sunElement?.r.animVal?.value ?? 0;

            buildPlanetsOnOrbits(svgElement, planets, sunRadius, scale, rotationSpeed);

            let zoomCallBack = changeViewBox(parseInt(width), parseInt(heigth));
            buildZoom(svgElement, minZoom, maxZoom, zoomCallBack)
        }
    }, [planets, sun, scale]);

    return (
        <svg
            style={{border: '1px red solid', width: '100%', height: '100%'}}
            ref={svgRef}
            viewBox={`0 0 ${width} ${heigth}`}
        />
    );
};
