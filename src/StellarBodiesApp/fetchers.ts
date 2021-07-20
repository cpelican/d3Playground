import {ViewConfig} from './index';

export async function fetchSolarSystem() {
    const response = await fetch(ViewConfig.url, {
        method: 'GET',
    });

    let responseData = await response.json();
    if (response.ok && responseData?.bodies) {
        return responseData.bodies;
    }

    throw responseData;
}
