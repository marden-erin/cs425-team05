import supertest from 'supertest'
import app from '../../app'
import fetch, {Response} from 'node-fetch'

jest.mock('node-fetch');

describe('book', () => {
    describe('get book route', () => {
        const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
      
        describe('Given a valid bookTitle, ', () => {

            it ('Should make fetch call to api, but data received is bad', async () => {
                const json = jest.fn(() => {}) as jest.MockedFunction<any>;
                json.mockResolvedValue({ status: 200});
                mockFetch.mockResolvedValue({ ok: true, json } as Response);
                const response = await supertest(app).get(`/api/book/test`)
                expect(response.statusCode).toBe(400)

            })
        })
        describe('Given no bookTitle', () => {

            it ('Should return status code 400', async () => {
                const response = await supertest(app).get(`/api/book/`)  

                expect(response.statusCode).toBe(400)
            })
        })
    })
})