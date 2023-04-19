const { baseURL, header } = require(`./ghAPIConfig.js`);
const axios = require('axios').default;
const jsonStream = require(`../utils/JSONStream.js`);

async function getRepo(owner, repo)
{
    const requestConfig = {
        url : `/repos/${owner}/${repo}`,
        baseURL : baseURL,
        method : `get`,     
        headers : header
    };
    
    const res = await axios(requestConfig);
    return res;
}

async function runGetRepo( params )
{
    const iParams = await jsonStream.readJSON( params ); 
    const res = await getRepo(iParams.owner, iParams.repo );   
    console.log( JSON.stringify( res.data ) );
}

exports.runGetRepo = runGetRepo;