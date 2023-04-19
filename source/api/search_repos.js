const { baseURL, header } = require(`./ghAPIConfig.js`);
const axios = require(`axios`).default;
const fs = require(`fs`);
const jsonStream = require(`../utils/JSONStream.js`);

async function searchRepos(query, sort, order, perPage, page=1)
{
    const reqConfig = {        
        baseURL : baseURL, 
        method : `get`, 
        url : `/search/repositories`,
        headers : header,
        params : {
            q : query, 
            sort : sort, 
            order : order, 
            per_page : perPage,
            page : page
        }
    };
    
    const res = await axios(reqConfig);
    const nRateRemaining = parseInt( res.headers[`x-ratelimit-remaining`] ); 
    console.log(`The number of remainings : ${nRateRemaining} `);
    return res; 
}

async function runSearchRepo( inputParametersPath )
{
    const inputParameters = await jsonStream.readJSON( inputParametersPath );    

    const query = inputParameters.api_parameters.q;
    const sort = inputParameters.api_parameters.sort;
    const order = inputParameters.api_parameters.order;
    const perPage = parseInt( inputParameters.api_parameters.perPage ) ;
    const TOTAL_ITEM_COUNT = 1000;
    const MAX_PAGE = TOTAL_ITEM_COUNT / perPage;

    for( let page = 1; page <= MAX_PAGE ; page++ )
    {
        const res = await searchRepos(query, sort, order, perPage, page);
        if( res.status === 200 ) {

            const path = `${inputParameters.search_output_path}${inputParameters.search_name}-${page}.json`;
            jsonStream.writeJSON(path, res.data);
        }
    }
}

exports.runSearchRepo = runSearchRepo;

async function test()
{
    const q = `tensorflow deep learning in:readme language:python`;
    const sort = `stars`;
    const order = `desc`;
    const perPage = 100;
    const page = 1;

    const res = await searchRepos(q, sort, order, perPage, page);
    
    console.log( JSON.stringify(res.data) );
}

if ( require.main == module )
{
    test();
}