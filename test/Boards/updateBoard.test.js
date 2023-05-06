const Api = require('../../src/Resources/Api');
const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

let api = new Api();


describe('Update a Board api test suite', async() => {
    let boardId = '';

    before(async() => {
        // runs before any it-block in this describe-block

        // set-up
        //  create a board (before ALL testcases)
        const boardName = faker.company.name();
        const response =  await api.createBoard(process.env.myApiKey, process.env.myToken, boardName);
        boardId = response.id;
        expect(response.name, 'Board name is not as expected').to.equal(boardName);
        expect(response.id.length > 0, 'Board id has length equals to zero').to.be.true;
    })

    beforeEach(async() => {
        // runs before EVERY it-block in this describe-block
    })
        
    it.only('Verify user can update a board', async() => {
        const newBoardName = faker.company.name();
        const response = await api.updateBoard(process.env.myApiKey, process.env.myToken, boardId, 'name', newBoardName);

        // verify name is same as newBoardName
        expect(response.name, 'Board name is not updated').to.equal(newBoardName);

        const getBoardResponse = await api.getBoard(process.env.myApiKey, process.env.myToken, boardId);
        expect(getBoardResponse.name, 'Board name is not updated in Get-Board endpoint').to.equal(newBoardName);

    });

    it('Verify user gets error for missing token', async() => {
        
    })

    it('Verify user gets error for incorrect token', async() => {
        
    })

    it('Verify user gets error for missing api-key', async() => {
        
    })
    

    afterEach(async() => {
        // runs after EVERY it-block in this describe-block
    })

    after(async() => {
        // runs after ALL the it-blocks in this decribe-block

        // clean-up
        // delete the board (after ALL testcases)
        await api.deleteAllBoards(process.env.myApiKey, process.env.myToken, boardId)
    })


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