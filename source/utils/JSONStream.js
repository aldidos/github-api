const fs = require(`fs`)

async function readJSON(jsonPath)
{
    const json = fs.readFileSync(jsonPath);
    const data = JSON.parse( json );
    
    return data;
}

async function writeJSON(jsonPath, data)
{
    const json = JSON.stringify(data);
    fs.writeFileSync(jsonPath, json);
}

exports.readJSON = readJSON;
exports.writeJSON = writeJSON;

//****
async function test_run()
{
    const testData = {
        id : 1, 
        name : `kim`
    };

    const path = `./test_data_json_read_wirte.json`;

    writeJSON(path, testData);

    const readedData = await readJSON(path);
    
    if ( testData.id === readedData.id ) 
    {
        console.log(`the ids are equals`);
    }
}

if ( require.main == module ) 
{
    test_run();   
}