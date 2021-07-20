import {useEffect, useState} from 'react';
import {StellarBody} from './StellarBodiesTypes';
import {fetchSolarSystem} from './fetchers';

type UseStellarBodiesApiType = [StellarBody[], StellarBody | null, boolean, string];

export const useStellarBodiesApi = (): UseStellarBodiesApiType => {
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

    useEffect(() => {
        if ((sun == null && (planets?.length ?? 0) === 0) && !isLoading) {
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

  }, [planets, sun]);

  return [planets, sun, isLoading, error];
};