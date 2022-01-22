/// <reference types = "cypress"/>

describe('get user details', ()=>{

    let base_url = 'https://api.agify.io/';

    it('should get the user details correctly', ()=>{
        cy.request({
            method : 'GET',
            url : base_url,
            qs: { 'name': 'michael' }
        }).then((response) =>{
            expect(response.status).to.equal(200)
            expect(response.body.name).to.eq('michael')
            expect(response.body.age).to.eq(70)
            expect(response.body.count).to.greaterThan(233481)
        })
    })

    it('should rase an error when the name is not sent', ()=>{
        cy.request({
            method : 'GET',
            url : base_url,
            failOnStatusCode: false,
        }).then((response) =>{
            expect(response.status).to.equal(422)
            expect(response.body.error).to.contain("Missing 'name' parameter")
        })
    })

    it('should get the user details correctly when sending the localization value', ()=>{
        cy.request({
            method : 'GET',
            url : base_url,
            qs: { 'name': 'michael',
            'country_id' : 'JO'}
        }).then((response) =>{
            expect(response.status).to.equal(200)
            expect(response.body.name).to.eq('michael')
            expect(response.body.age).to.eq(64)
            expect(response.body.country_id).to.eq('JO')
        })
    })

    it('should return the count as 0 when sending invalid name', ()=>{
        cy.request({
            method : 'GET',
            url : base_url,
            qs: { 'name': ')))' }
        }).then((response) =>{
            expect(response.status).to.equal(200)
            expect(response.body.name).to.eq(')))')
            expect(response.body.age).to.eq(null)
            expect(response.body.count).to.eq(0)
        })
    })




})