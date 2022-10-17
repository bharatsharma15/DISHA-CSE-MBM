import { Directus } from '@directus/sdk';
export const directusURL = 'https://api.mbm.ac.in';
export const directusURLSSR = 'https://api.mbm.ac.in';
//export const directusURLSSR = 'http://localhost:8055';


export default function getDirectus(optionalHeaders = null, onSSR = false) {
    let retObj = { auth: { mode: 'json', autoRefresh: false } };
    if (!!optionalHeaders) {
        retObj['transport'] = {
            'params': optionalHeaders
        }
    }
    return new Directus(!onSSR ? directusURL : directusURLSSR, retObj);
}

export function getAssetURL(assetId) {
    if (!assetId) return null;
    return `${directusURL}/assets/${assetId}`;
}

export function getAuthURL() {
    return `${directusURL}/auth/`;
}