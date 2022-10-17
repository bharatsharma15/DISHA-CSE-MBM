import getDirectus from './api.config.js';

export default function useAPIData() {

    //Create queries are authorized by default unless opted otherwise
    async function createItem(collectionName, payload, authorized = true) {
        const directus = getDirectus();
        const collection = directus.items(collectionName);
        return await collection.createOne(payload);
    }
    //fieldParam should be an array containing strings of field names to be retrived. 
    //limitParam should be an integer denoting number of rows to fetch. Default = 100.
    //filterParam should be an object declared using DirectUs operators. Check https://docs.directus.io/reference/filter-rules.html for all operators and dynamic variables available.
    //Refer https://docs.directus.io/reference/query.html for exact parameter structure.
    async function getItems(collectionName, fieldParam, limitParam, pageParam, filterParam, sortParam, searchParam, authorized = false, onSSR = false) {
        const queryObj = {
            ...(filterParam !== undefined ? { filter: filterParam } : {}),
            ...(limitParam !== undefined ? { limit: limitParam } : {}),
            ...(pageParam !== undefined ? { page: pageParam } : {}),
            ...(sortParam !== undefined ? { sort: sortParam } : {}),
            ...(fieldParam !== undefined ? { fields: fieldParam } : {}),
            ...(searchParam !== undefined ? { search: searchParam } : {})
        };
        //console.log(queryObj,authHeader);
        const directus = getDirectus(null, onSSR);
        const collection = directus.items(collectionName);
        return await collection.readByQuery(queryObj);

    }

    return {
        createItem: createItem,
        getItems: getItems
    };

}