import React, {useEffect, useState} from 'react';

import {StellarBody} from './StellarBodiesTypes';
import {buildPlanetsOnOrbits, buildSun, buildSvgContainer} from './svgBuilders';
import {fetchSolarSystem} from './fetchers';
import {Loader} from './Loader';


export const ViewConfig = {
    url: 'https://api.le-systeme-solaire.net/rest/bodies/',
    name: 'app-container',
    width: '100%',
    height: '100vh',
    scale: 20000000,
    minimalPlanetSize: 2,
};

function StellarBodiesApp() {
    const [error, setError] = useState<string>(''),
        [isLoading, setIsLoading] = useState<boolean>(false),
        [planets, setPlanets] = useState<StellarBody[]>([]),
        [sun, setSun] = useState<StellarBody | null>(null);

    function separateSunFromPlanets(bodies: StellarBody[]): [StellarBody | null, StellarBody[]] {
        let sun: StellarBody | null = null,
                planets: StellarBody[] = [];

            bodies.forEach((b: StellarBody) => {
                if (b.id === 'soleil') {
                    sun = b;
                    return;
                }
                if (b.isPlanet) {
                    planets.push(b);
                }
            });
        return [sun, planets];
    }

    function getContent(): React.ReactNode {
        if (error !== '') {
            return (
                <p className='error-message'>{error}</p>
            );
        }

        if (isLoading) {
            return (
                <Loader message='Fetching from the API'/>
            )
        }

        return null;
    }

    useEffect(() => {
        let container = document.querySelector(`.${ViewConfig.name}`),
            svgElement = container?.querySelector('svg');

        if (planets.length === 0) {
            setIsLoading(true);
            fetchSolarSystem()
                .then((bodies: StellarBody[]) => {
                    let [sun, planets] = separateSunFromPlanets(bodies);
                    setSun(sun);
                    setPlanets(planets);
                })
                .catch((e: Error) => {
                    setError(e.message);
                })
                .finally(() => setIsLoading(false));
        }

        if (container && svgElement == null && planets?.length > 0) {
            buildSvgContainer(container);

            svgElement = container?.querySelector('svg');

            if (sun != null && svgElement != null) {
                buildSun(svgElement, sun);
                let sunElement: SVGCircleElement | null = container.querySelector(`svg .${sun!.id}`),
                    sunRadius = sunElement?.r.animVal?.value ?? 0;

                buildPlanetsOnOrbits(svgElement, planets, sunRadius)
            }
        }
    }, [planets, sun]);


    return <div className={`stellar-body-container ${ViewConfig.name}`} >{getContent()}</div>;
}

export default StellarBodiesApp;
