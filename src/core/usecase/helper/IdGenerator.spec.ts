import { IdGenerator } from './IdGenerator' 

describe('IdGenerator', () => {

    it('should return a string with minimum of 5 characters and maximum of 10', () => {
        const sut = new IdGenerator()

        const response = sut.generate()
        expect(response.length).toBeLessThanOrEqual(10)
        expect(response.length).toBeGreaterThanOrEqual(5)
    })
})