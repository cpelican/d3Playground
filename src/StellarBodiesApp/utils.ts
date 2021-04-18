import {CircleData} from './index';


export function decimal(x: number) {
    return x * 0.1;
}

export function calculateSize(d: CircleData): number {
    if (d?.vol == null) {
        return 0;
    }
    let size = d.vol.volValue ** d.vol.volExponent;
    return size;
}