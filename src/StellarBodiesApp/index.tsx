import React from 'react';

import {Loader} from './Loader';
import {useStellarBodiesApi} from './hooks';
import {StellarBodies} from './StellarBodies';

export const ViewConfig = {
    url: 'https://api.le-systeme-solaire.net/rest/bodies/',
    name: 'app-container',
    width: '900',
    height: '900',
    scale: 2000000,
    maxZoom: 6.57,
    minZoom: 0.007,
    // todo: fix the 0
    rotationSpeed: 1,
    translateX: 0,
    translateY: 0,
    minimalPlanetSize: 2,
};

function StellarBodiesApp() {
    const [planets, sun, isLoading, error] = useStellarBodiesApi();

    function getContent(): React.ReactNode {
        if (error !== '') {
            return <p className='error-message'>{error}</p>;
        }

        if (isLoading) {
            return <Loader message='Fetching from the API' />;
        }

        return (
            <StellarBodies
                sun={sun}
                planets={planets}
                width={ViewConfig.width}
                heigth={ViewConfig.height}
                scale={ViewConfig.scale}
                maxZoom={ViewConfig.maxZoom}
                minZoom={ViewConfig.minZoom}
                rotationSpeed={ViewConfig.rotationSpeed}
            />
        );
    }

    return <div className={`stellar-body-container ${ViewConfig.name}`}>{getContent()}</div>;
}

export default StellarBodiesApp;
