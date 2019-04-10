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

        let redirectUrl = myParser.getUrlForTerm(term);
        if (result.length === 1) {
            redirectUrl = 'https://www.maischemalzundmehr.de/' + result[0];
        }

        console.log(`term: "${term}, resultCount: ${result.length}, url: ${redirectUrl}`);

        res.redirect(302, redirectUrl);
    })
    .listen(PORT);