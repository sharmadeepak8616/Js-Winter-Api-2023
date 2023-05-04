const Api = require('../../src/Resources/Api');
const Data = require('../../src/Resources/Data');
const { expect } = require('chai');
const { faker } = require('@faker-js/faker');

let api = new Api();

describe('Get Boards api test suite', async() => {

    it('Verify user is able to get boards', async() => {
        // 1. Send api request to get all boards
        const response = await api.getAllBoards(Data.myApiKey, Data.myToken);

        // 2. Verify api response is 200
        // console.log(response);


        // 3. Verify response is an Array
        expect(response).to.be.an('array');

        // 4. If array length is greater than 0; verify each object has id-attribute
        let allBoardsHasId = true;
        for (let i=0 ; i<response.length ; i++) {
            if (!(response[i].hasOwnProperty('id'))) {
                allBoardsHasId = false;
                break;
            }
        }

        expect(allBoardsHasId, 'All boards are NOT having id-attribute').to.be.true;
    });


    it('Verify user get error for incorrect token', async() => {
        // 1. Send api request to get all boards
        try {
            const response = await api.getAllBoards(Data.myApiKey, faker.finance.bitcoinAddress());
        } catch (error) {
            // console.log(error);
            // 2. Verify api response is 401
            expect(error.response.statusCode, 'Status code is NOT 401').to.equal(401);

            // 3. Verify response is 'invalid token'
            expect(error.response.body, 'Body is NOT as expected').to.equal('invalid token');

        }

    });


});