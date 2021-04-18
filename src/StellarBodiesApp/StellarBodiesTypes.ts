export interface Vol {
    volExponent: number;
    volValue: number;
}

interface Mass {
    massExponent: number;
    massValue: number;
}

interface Planet {
    planet: string;
    rel: string; // url of the planet
}

interface Moon {
    moon: string;
    rel: string;
}

export interface StellarBody {
    id: string;
    name: string;
    englishName: string;
    isPlanet: boolean;
    moons: Moon[];
    semimajorAxis: number;
    perihelion: number;
    aphelion: number;
    eccentricity: number;
    inclination: number;
    mass: Mass;
    vol: Vol;
    density: number;
    gravity: number;
    escape: number;
    meanRadius: number;
    equaRadius: number;
    polarRadius: number;
    flattening: number;
    dimension: string;
    sideralOrbit: number;
    sideralRotation: number;
    aroundPlanet: Planet[];
    discoveredBy: string;
    discoveryDate: string;
    alternativeName: string;
    axialTilt: number;
    rel: string;
}
