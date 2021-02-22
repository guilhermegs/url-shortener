import { PgPoolConnection } from './PgPoolConnection'
import { Pool } from 'pg'

describe('PgPoolConnection', (): void => {
    
    test('should create a pg pool', async (): Promise<void> => {        
        const sut = PgPoolConnection.getInstance()
        expect(sut.pool).toBeInstanceOf(Pool)
    })

    test('should return an existing pool if exists', async (): Promise<void> => {        
        const sutA = PgPoolConnection.getInstance()
        const sutB = PgPoolConnection.getInstance()
        
        expect(sutA.pool).toBe(sutB.pool)
    })
})
