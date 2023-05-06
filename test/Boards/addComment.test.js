const Api = require('../../src/Resources/Api');
const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

let api = new Api();


describe('Update a Board api test suite', async() => {
    let boardId = '', listId = '', cardId = '', currentCommentCount;

    before(async() => {
        // runs before any it-block in this describe-block

        // set-up
        //  create a board (before ALL testcases)
        //  create a list
        //  create a card
        const boardName = faker.company.name();
        const boardResponse =  await api.createBoard(process.env.myApiKey, process.env.myToken, boardName);
        boardId = boardResponse.id;
        expect(boardResponse.name, 'Board name is not as expected').to.equal(boardName);
        expect(boardResponse.id.length > 0, 'Board id has length equals to zero').to.be.true;

        const listName = faker.address.cityName();
        const listResponse =  await api.createList(process.env.myApiKey, process.env.myToken, boardId, listName);
        listId = listResponse.id;

        const cardName = faker.vehicle.bicycle();
        const cardResponse =  await api.createCard(process.env.myApiKey, process.env.myToken, listId, cardName);
        cardId = cardResponse.id;

        const getCardResponse =  await api.getCard(process.env.myApiKey, process.env.myToken, cardId);
        currentCommentCount = getCardResponse.badges.comments;
    });
        
    it('Verify user can add a comment to a card', async() => {
        const comment = faker.datatype.string(15);
        await api.addCommentOnCard(process.env.myApiKey, process.env.myToken, cardId, comment);

        const getCardResponse =  await api.getCard(process.env.myApiKey, process.env.myToken, cardId);
        const newCommentCount = getCardResponse.badges.comments;
        expect(newCommentCount === currentCommentCount+1, 'Comment added successfully').to.be.true
    });

    after(async() => {
        // runs after ALL the it-blocks in this decribe-block

        // clean-up
        // delete the board (after ALL testcases)
        await api.deleteAllBoards(process.env.myApiKey, process.env.myToken);
    });

    /**
     * setup: 
     *  create a board (before ALL testcases)
     * 
     * Testcases or it-only
     * 
     * cleanup:
     *  delete the board (after ALL testcases)
     */

});