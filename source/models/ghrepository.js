const {  DataTypes, Model } = require(`sequelize`);
const { getConnection } = require(`./dbinit.js`);

const sequelize = getConnection();

class GHRepository extends Model {};
const ghRepoAttr = {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true
    },     
    name : {
        type : DataTypes.STRING
    },
    full_name : {
        type : DataTypes.STRING
    }, 
    owner : {
        type : DataTypes.STRING
    },
    private : {
        type : DataTypes.BOOLEAN
    },    
    fork : {
        type : DataTypes.BOOLEAN
    },
    stargazers_count : {
        type : DataTypes.INTEGER
    },
    watchers_count : {
        type : DataTypes.INTEGER
    },
    forks_count : {
        type : DataTypes.INTEGER
    },
    score : {
        type : DataTypes.INTEGER
    },
    clone_url : {
        type : DataTypes.STRING
    },
    git_url : {
        type : DataTypes.STRING
    }, 
    html_url : {
        type : DataTypes.STRING
    },    
    description : {
        type : DataTypes.STRING
    }
};
const ghRepoOpt = {
    sequelize : sequelize, 
    tableName : `gh_repository`,
    timestamps : false, 
    indexes : [       
        {
            name : `idx_fullName`,
            using : `BTREE`, 
            fields : [`full_name`]
        }
    ]
};

GHRepository.init(ghRepoAttr, ghRepoOpt );
GHRepository.sync( );

exports.GHRepository = GHRepository;