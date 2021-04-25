import {StellarBody} from './StellarBodiesTypes';

export function decimal(x: number) {
    return x * 0.1;
}

export function computePosition(d: StellarBody, center: number, sunRadius: number): number {
    return center - sunRadius - Math.floor(d.aphelion / 30000000);
}
