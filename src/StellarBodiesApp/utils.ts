import {StellarBody} from './StellarBodiesTypes';
const MULTIPLIER = 30000000;

export function computePosition(d: StellarBody, center: number): number {
    return center - Math.floor(d.aphelion / MULTIPLIER);
}

export function computeSize(d: StellarBody, sunDiameter: number): number {
    return Math.floor(d.aphelion / MULTIPLIER) + sunDiameter;
}

export function getEllipseXPosition(d: StellarBody, containerCenterX: number, sunDiameter: number, angleValue: number): number {
    let r = computeSize(d, sunDiameter);

    return containerCenterX + r * Math.cos(angleValue);
}

export function getEllipseYPosition(d: StellarBody, containerCenterY: number, sunDiameter: number, angleValue: number): number {
    let r = computeSize(d, sunDiameter);

    return containerCenterY + r * Math.sin(angleValue);
}

export function computeDPath(d: StellarBody, containerCenterX: number, containerCenterY: number, sunDiameter: number,): string {
    let orbitSize = getOrbitSize(d, containerCenterX, sunDiameter),
        halfOrbitSize = Math.floor(orbitSize / 2);
    // todo: use d3.path()
    return `M${containerCenterX - halfOrbitSize},${containerCenterY} a${halfOrbitSize},${halfOrbitSize} 0 1, 0 ${orbitSize}, 0 a${halfOrbitSize},${halfOrbitSize} 0 1, 0 ${(orbitSize) * -1}, 0`
}

function getOrbitSize(d: StellarBody, centerX: number, sunRadius: number): number {
    let planetSize = getEllipseXPosition(d, centerX, sunRadius, 0);
    let deltaZ = (209202 / 145) - 633;
    return Math.floor(((293 / 145) * planetSize) - deltaZ);
}

export function getPlanetRadius(meanRadius: number): number {
    return Math.floor(meanRadius / 10000) === 0 ? 2 : Math.floor(meanRadius / 10000);
}

// <path id="OUT" d="M170,400     a110,110 0 1,0 460,0     a110,110 0 1,0 -460,0" style="fill:none;stroke:#ccc; stroke-width:2"></path>
// <ellipse cx="400" cy="400" rx="230" ry="230" class="orbit-uranus" style="fill: none; stroke-width: 1; stroke: red;"></ellipse>

// <def>
//     <style>
//      @-webkit-keyframes rotation {
//         from {
//             -webkit-transform: rotate(0deg);
//
//         }
//         to {
//             -webkit-transform: rotate(359deg);
//         }
//
//       }
//
//         #extrag{
//         transform-origin: left;
//            animation: rotation 5s infinite linear;
//            transform-origin: 201px 250px;
//         }
//     </style>
//   </def>
//     <path id="OUT" d="M100,350
//     a110,110 0 1,0 600,0
//     a110,110 0 1,0 -600,0"
//     style="fill:none;stroke:#ccc; stroke-width:2" />
//
//   <g id="CC" transform="translate(-190,-245)">
//      <g id="extrag">
//     <circle r=40 cx=200 cy=250 fill="none" stroke="black" stroke-width="2"/>
//     <g id="C1" >
//         <circle r=5 cx=200 cy=250 fill="green"/>
//     </g>
//     <circle cx="240" cy="250" r="3" fill="blue">
//     </circle>
//
//     </g>
//          <animateMotion
//   xlink:href="#CC"
//   attributeName="motion"
//   attributeType="XML"
//   additive="sum"
//   dur="6s"
//   repeatCount="indefinite">
//       <mpath xlink:href="#OUT"/>
//   </animateMotion>
//    </g>


/**
 * mars: cx      477
 *       orbit:  m327 400 a73
 *       size:   146
 *
 * pluton: cx:   714
 *       orbit:  m79 400 a191    ideal
 *       size:   643             ideal
 *
 *       orbit:  m209,400 a191   now
 *       size:   383             now
 * */