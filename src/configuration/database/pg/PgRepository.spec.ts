import { mock } from 'jest-mock-extended'
import { PgRepository } from './PgRepository'
import { Pool } from 'pg'

const makeSut = (): any => {
    const mockPool = mock<Pool>()
    const sut = new PgRepository()

    const rows: any[] = [
        { id: 1, field: 'any-value' },
        { id: 2, field: 'other-value' }
    ]

    mockPool.query.mockImplementation(async (): Promise<any> => {
        return Promise.resolve({ rows, count: rows.length })
    })  

    sut.pgPoolConnection.pool = mockPool

    return { sut, rows }
}


describe('PgRepository', (): void => {
    test('should execute a query without parameters', async (): Promise<void> => {    
        const { sut, rows }: any = makeSut()
        const queryString = 'SELECT * FROM table'
        
        const result = await sut.query(queryString, [])
        
        expect(result).toBeInstanceOf(Array)
        expect(result.length).toBe(rows.length)
        expect(sut.pgPoolConnection.pool.query).toBeCalledWith(queryString, [])
    })

    test('should execute a query with parameters', async (): Promise<void> => {        
        const { sut, rows }: any = makeSut()
        const queryString = 'SELECT * FROM table WHERE field = $1'
        const queryParams = [1]
        
        const result = await sut.query(queryString, queryParams)
        
        expect(result).toBeInstanceOf(Array)
        expect(result.length).toBe(rows.length)
        expect(sut.pgPoolConnection.pool.query).toBeCalledWith(queryString, queryParams)
    })
})