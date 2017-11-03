var Config = {
    port: '3000',                // serve port
    staticRoute: '/static',      // expose public path
    publicPath: '/static',       // expose route prefix

    localAccess: true,           // only local access switch
    logPath: './logs',           // log path directory
    logMaxSize: 5 * 1024 * 1024, // log file max size
    logMaxFiles: 5,              // log file max count
    accessLog: true,             // allow access log
    accessLogFile: 'access.log', // access log file name
    errorLog: true,              // allow error log
    errorLogFile: 'error.log',   // error log file name
    auth: {
        appId: 0,
        appKey: ''
    },
    mongodb: {
        host: '127.0.0.1',
        port: 27017,
        user: '',
        password: '',
        db: 'helloworld'
    },
    redis: {
        host: '127.0.0.1',
        port: 6379,
        password: ''
    },
    mysql: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: ''
    }
};

Config.mongodb.connectionString = 'mongodb://localhost/' + Config.mongodb.db;

module.exports = Config;
