import supertest from 'supertest'
import app from '../../app'
import fetch from 'node-fetch'
import {validBookMockData} from '../mockData'

jest.mock('node-fetch');
const { Response } = jest.requireActual('node-fetch')

describe('book', () => {
    describe('get book route', () => {
        const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
      
        describe('Given a valid bookTitle, ', () => {

            it ('Given valid book data, should make fetch call to api and return status code 200', async () => {
                (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
                    new Response(JSON.stringify(validBookMockData), { url: 'url', status: 200, statusText: 'OK' })
                  );
                const response = await supertest(app).get(`/api/book/test`)
                expect(response.statusCode).toBe(200)

            })

            it ('Given invalid book data, should make fetch call to api and return status code 400', async () => {
                (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
                    new Response(JSON.stringify({}), { url: 'url', status: 200, statusText: 'OK' })
                  );
                const response = await supertest(app).get(`/api/book/test`)
                expect(response.statusCode).toBe(400)
                expect(response.text).toContain('Retrieving book info failed')

            })
        })
        describe('Given no bookTitle', () => {

            it ('Should return status code 400', async () => {
                const response = await supertest(app).get(`/api/book/`)  

                expect(response.statusCode).toBe(400)
                expect(response.text).toContain('Missing book title')
            })
        })
    })
})