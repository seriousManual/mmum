const Parser = require('./Parser');

const myParser = new Parser();

myParser.get('dark impact')
    .then(result => {
        console.log(result);
    })
