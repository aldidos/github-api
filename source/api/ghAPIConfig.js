require(`dotenv`).config();

const oauth_token = process.env.OAUTH_TOKEN;
const baseURL = `https://api.github.com`;
const header = {
    Authorization : `Bearer ${oauth_token}`, 
    "X-GitHub-Api-Version" : "2022-11-28"
};

exports.baseURL = baseURL;
exports.header = header;
