const jsonStream = require(`./utils/JSONStream`);
const clone = require(`git-clone/promise`);
const fs = require(`fs`);

async function runClone(cloneURL, targetPath)
{
    try {
        clone( cloneURL, targetPath)
        .then( () => {
            console.log(`${cloneURL} has been cloned`);
        })
        .catch((reason) => {
            console.error(reason);
        });        
    }
    catch( err ){
        console.error( err );
    }
}

async function runCloneRepo( runCloneRepoInputPath )
{
    const input = await jsonStream.readJSON(runCloneRepoInputPath);

    const srFiles = fs.readdirSync( input.cloneRepoListFilePath );
    srFiles.forEach( async (file) => {
        const cloneRepoList = await jsonStream.readJSON( `${input.cloneRepoListFilePath}${file}` );

        cloneRepoList.items.forEach( item => {
            
            const targetPath = `${input.target_path}${item.owner.login}_${item.name}`;
            runClone(item.clone_url, targetPath);
        });
    });
    
}

exports.runCloneRepo = runCloneRepo;

if( require.main == module ) 
{
    const path = "./";
    const files = fs.readdirSync(path);    
    
}
