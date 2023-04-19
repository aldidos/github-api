const jsonStream = require(`./utils/JSONStream`);

const { runGetRepo } = require(`./api/get_repo`);
const { runSearchRepo } = require(`./api/search_repos`);
const { runGetREADME } = require(`./api/get_readme`);
const { runCloneRepo } = require(`./run_gitclone`);

async function main()
{
    const appInput = await jsonStream.readJSON( process.argv[2] ); 
    
    switch ( appInput.runAPI ) 
    {
        case "GET_README" : 
            runGetREADME( appInput.getReadmeParams );
            break;
        
        case "GET_REPO" :
            runGetRepo( appInput.getRepoParams );
            break;

        case "SEARCH_REPO" : 
            runSearchRepo( appInput.searchRepoParam );
            break;

        case "CLONE_REPO" : 
            runCloneRepo( appInput.runCloneInput );
            break;
    }
}

if ( require.main === module )
{   
    main();
}
