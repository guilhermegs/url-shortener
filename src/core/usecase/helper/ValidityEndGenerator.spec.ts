import { ValidityEndGenerator } from './ValidityEndGenerator' 

describe('ValidityEndGenerator', () => {

    it('should return a date greater than today', () => {
        const sut = new ValidityEndGenerator()
        
        const response = sut.generate()
        response.setHours(0,0,0,0)
        const today = new Date()
        today.setHours(0,0,0,0)

        expect(response > today).toBeTruthy()
    })    
})