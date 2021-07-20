import {useEffect, useRef} from 'react';
import React from 'react';
import {buildPlanetsOnOrbits, buildSun} from './svgBuilders';
import {StellarBody} from './StellarBodiesTypes';
import {svg} from 'd3-fetch';

interface StellarBodiesProps {
    sun: StellarBody | null;
    planets: StellarBody[];
    width: string;
    heigth: string;
}

export type SVGElementOrNull = SVGSVGElement | null;

export const StellarBodies = ({sun, planets, width, heigth}: StellarBodiesProps) => {
    const svgRef = useRef(null);

    useEffect(() => {
        let svgElement: SVGElementOrNull = svgRef?.current,
            hasAllStellarBodies = sun != null && (planets?.length ?? 0) > 0;

        if (svgElement != null && hasAllStellarBodies) {
            buildSun(svgElement, sun as StellarBody);
            let sunElement: SVGCircleElement | null = svgElement!.querySelector(`.${sun!.id}`),
                sunRadius = sunElement?.r.animVal?.value ?? 0;

            buildPlanetsOnOrbits(svgElement, planets, sunRadius);
        }
    }, [planets, sun]);

    return <svg ref={svgRef} width={width} height={heigth} />;
};
