/**
 * File contains multiple function to send request for every endpoint
 * eg:
 *  createBoard
 *  getBoard
 *  getAllBoards
 *  updateBoard
 *  deleteBoard
 */

const request = require('request-promise');

class Api {

    constructor() {
        this.host = 'https://api.trello.com';
        this.request = request.defaults({
            headers: {
                'User-Agent': 'PostmanRuntime/7.32.2',
                'Content-Type': 'application/json'
            },
            json: true,
        });
    }

    getAllBoards(myKey, myToken) {
        const path = '/1/members/me/boards';
        return this.request.get({
            url: `${this.host}${path}`,
            qs: {
                key: myKey,
                token: myToken
            }
        });
    }

    getBoard(myKey, myToken, boardId) {
        const path = `/1/boards/${boardId}`;
        return this.request.get({
            url: `${this.host}${path}`,
            qs: {
                key: myKey,
                token: myToken
            }
        });
    }


    createBoard(myKey, myToken, boardName) {
        const path = '/1/boards/';
        return this.request.post({
            url: `${this.host}${path}`,
            qs: {
                key: myKey,
                token: myToken,
                name: boardName
            }
        });
    }

    deleteBoard(myKey, myToken, boardId) {
        const path = `/1/boards/${boardId}`;
        return this.request.delete({
            url: `${this.host}${path}`,
            qs: {
                key: myKey,
                token: myToken
            }
        });
    }

    updateBoard(myKey, myToken, boardId, fieldName, fieldValue) {
        const path = `/1/boards/${boardId}?${fieldName}=${fieldValue}`;
        return this.request.put({
            url: `${this.host}${path}`,
            qs: {
                key: myKey,
                token: myToken
            }
        });
    }

} module.exports = Api;