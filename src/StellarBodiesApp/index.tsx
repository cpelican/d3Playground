import React, {useEffect, useState} from 'react';
import {StellarBody, Vol} from './StellarBodiesTypes';
import {fetchSolarSystem} from './fetchers';
import {buildStars} from './svgBuilders';

export interface CircleData {
    size: number;
    cX: number;
    cY: number;
    vol?: Vol;
}

interface AppProps {
    data?: CircleData[];
}

let dataFx: CircleData[] = [
    {size: 140, cX: 80, cY: 20},
    {size: 50, cX: 200, cY: 300},
    {size: 29, cX: 140, cY: 220},
];

function StellarBodiesApp({data = dataFx}: AppProps) {
    const [error, setError] = useState<string>(''),
        [planets, setPlanets] = useState<StellarBody[]>([]);

    function filterPlanets(bodies: StellarBody[]): StellarBody[] {
        return bodies.filter((b: StellarBody) => b.isPlanet);
    }

    useEffect(() => {
        let container = document.querySelector('.app-container'),
            svgElement = container?.querySelector('svg');

        if (planets.length === 0) {
            fetchSolarSystem()
                .then((bodies: StellarBody[]) => {
                    let planets = filterPlanets(bodies);
                    setPlanets(planets);
                })
                .catch((e: Error) => {
                    setError(e.message);
                });
        }

        if (container != null && svgElement == null && planets?.length > 0) {
            buildStars(container, data);
        }
    });

    if (error !== '') {
        return <p>{error}</p>;
    }

    return <div className='app-container' />;
}

export default StellarBodiesApp;
