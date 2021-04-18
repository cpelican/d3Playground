const SOLAR_SYSTEM_API_URL: string = 'https://api.le-systeme-solaire.net/rest/bodies/';

export async function fetchSolarSystem() {
    const response = await fetch(SOLAR_SYSTEM_API_URL, {
        method: 'GET',
    });

    let responseData = await response.json();
    if (response.ok && responseData?.bodies) {
        return responseData.bodies;
    }

    throw responseData;
}
