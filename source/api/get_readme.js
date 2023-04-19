const { baseURL, header } = require(`./ghAPIConfig.js`);
const fs = require(`fs`);
const axios = require(`axios`).default;
const jsonStream = require(`../utils/JSONStream.js`);

async function getReadMeDownload(url)
{
    const config = {
        url : url, 
        method : `get`, 
        headers : header
    };

    const res = await axios(config);
    return res;
}

async function getReadMe(owner, repo)
{
    const reqConfig = {        
        baseURL : baseURL, 
        method : `get`, 
        url : `/repos/${owner}/${repo}/readme`,
        headers : header
    };    

    const res = await axios(reqConfig);
    return res.data.download_url;
}

async function getReadMeText(owner, repo)
{
    const downloadURL = await getReadMe(owner, repo);
    const res = await getReadMeDownload(downloadURL);
    return res.data;
}

async function runGetREADME( inputParamsFilePath )
{
    const input = await jsonStream.readJSON( inputParamsFilePath );
    const repoListFiles = fs.readdirSync( input.repo_list_files_path );
    repoListFiles.forEach( async (file) => {

        const repoList = await jsonStream.readJSON( `${input.repo_list_files_path}${file}`  );

        repoList.items.forEach( async (item) =>  {

            const readme_file_name = `${item.owner.login}_${item.name}.txt`;
            const readmeText = await getReadMeText(item.owner.login, item.name);
            
            const file = fs.createWriteStream(`${input.target_path}${readme_file_name}`);            
            file.write( readmeText );
            file.close();
        });
    });
}

exports.runGetREADME = runGetREADME;
