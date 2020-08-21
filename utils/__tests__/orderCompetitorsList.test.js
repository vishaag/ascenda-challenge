import orderCompetitorsList from '../orderCompetitorsList'
import '@testing-library/jest-dom'

describe("Competitor Pricing", () => {
  it("Should order the competitor list in increasing order of prices which includes Airbrb's pricing", () => {
    const hotel = {
      "id":1,
      "name":"Shinagawa Prince Hotel",
      "rating":7.7,
      "stars":4,
      "address":"108-8611 Tokyo Prefecture, Minato-ku, Takanawa 4-10-30, Japan",
      "photo":"https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg",
      "price":120,
      "competitors":{
         "Booking.com":125,
         "Hotels.com":121,
         "Expedia":120,
         "getaroom":140,
         "AMOMA.com":132.77
      }
   }

    const orderedList = orderCompetitorsList(hotel.competitors, 122)

    // check for Airbrb's position in the list
    expect(orderedList[2][1]).toBe(122)

    // Check for Array to be in ascending order of prices
    for(let i=0; i<orderedList.length-2; ++i) {
      expect(orderedList[i][1]).toBeLessThan(orderedList[i+1][1])
    }
  })
})

