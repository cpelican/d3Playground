import React, {useEffect, useState} from 'react';

import {StellarBody} from './StellarBodiesTypes';
import {buildPlanetsOnOrbits, buildSun, createSvgContainer} from './svgBuilders';
import {fetchSolarSystem} from './fetchers';

function StellarBodiesApp() {
    const [error, setError] = useState<string>(''),
        [bodies, setBodies] = useState<StellarBody[]>([]);

    function removeSatellites(bodies: StellarBody[]): StellarBody[] {
        return bodies.filter((b: StellarBody) => b.isPlanet || b.id === 'soleil');
    }

    useEffect(() => {
        let container = document.querySelector('.app-container'),
            svgElement = container?.querySelector('svg');

        if (bodies.length === 0) {
            fetchSolarSystem()
                .then((bodies: StellarBody[]) => {
                    let stellarBodies = removeSatellites(bodies);
                    setBodies(stellarBodies);
                })
                .catch((e: Error) => {
                    setError(e.message);
                });
        }

        if (container && svgElement == null && bodies?.length > 0) {
            createSvgContainer(container);

            let sun: StellarBody | null = null,
                planets: StellarBody[] = [];

            bodies.forEach((b: StellarBody) => {
                if (b.id === 'soleil') {
                    sun = b;
                    return;
                }
                planets.push(b);
            });
            svgElement = container?.querySelector('svg');

            if (sun != null && svgElement != null) {
                buildSun(svgElement, sun);
                let solarCircle: SVGCircleElement | null = container.querySelector(`svg .${sun!.id}`),
                    solarSize = solarCircle?.r.animVal?.value ?? 0;

                buildPlanetsOnOrbits(svgElement, planets, solarSize)
            }
        }
    });

    if (error !== '') {
        return <p>{error}</p>;
    }

    return <div className='app-container' />;
}

export default StellarBodiesApp;
