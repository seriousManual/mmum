const express = require('express');

const Parser = require('./Parser');
const myParser = new Parser();

function inputParam(term) {
    return term.replace(/-/g, ' ');
}

const PORT = process.env.PORT || 8080;

express()
    .get('/', (req, res, next) => res.end('ohay'))
    .get('/:term', async (req, res, next) => {
        const term = inputParam(req.params.term);
        const result = await myParser.get(term);

        console.log(result);
        console.log(`${result.length} results for ${term}`);

        if (result.length === 1) {
            console.log(('redirecting to: https://www.maischemalzundmehr.de/' + result[0]));
            return res.redirect(302, 'https://www.maischemalzundmehr.de/' + result[0]);
        }

        res.redirect(302, myParser.getUrlForTerm(term));
    })
    .listen(PORT);