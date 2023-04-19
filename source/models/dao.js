const { Op } = require(`sequelize`);
const { GHRepository } = require(`./ghrepository`);

function createGHRepository(data)
{
    GHRepository.create(data)
    .catch((reason) => {
        console.error(reason);
    });
}

async function getGHRepoWithId(id)
{
    const repo = await GHRepository.findOne({
        
        where : {
            id : id
        }  
    });

    return repo;
}

async function getGHReposWithIds(ids)
{
    const repos = GHRepository.findAll({        
        where : {
            id : {
                [Op.in] : ids
            }
        }
    });

    return repos;
}

async function getAllGHRepositories()
{    
    const ghRepos = await GHRepository.findAll();
    return ghRepos;
}

exports.createGHRepository = createGHRepository;
exports.getAllGHRepositories = getAllGHRepositories;
exports.getGHRepoWithId = getGHRepoWithId;
exports.getGHReposWithIds = getGHReposWithIds;