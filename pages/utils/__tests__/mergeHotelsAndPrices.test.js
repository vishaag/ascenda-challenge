import mergeHotelsAndPrices from '../mergeHotelsAndPrices'

describe("Merging Hotels and Prices", () => {
  it("Should push hotels without prices to bottom of the list", () => {
    const hotels = [{
      "id":1,
      "name":"Shinagawa Prince Hotel",
      "rating":7.7,
      "stars":4,
      "address":"108-8611 Tokyo Prefecture, Minato-ku, Takanawa 4-10-30, Japan",
      "photo":"https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg",
   },
   {
      "id":2,
      "name":"The Ritz-Carlton, Tokyo",
      "rating":9.1,
      "stars":5,
      "address":"107-6245 Tokyo Prefecture, Minato-ku, Akasaka 9-7-1 Tokyo Midtown, Japan",
      "photo":"https://d2ey9sqrvkqdfs.cloudfront.net/NXnQ/i12_m.jpg",
   },
     {
      "id":3,
      "name":"Park Hyatt Tokyo",
      "rating":9.2,
      "stars":5,
      "address":"163-1055 Tokyo Prefecture, Shinjuku-ku, Nishishinjuku 3-7-1-2, Japan",
      "photo":"https://d2ey9sqrvkqdfs.cloudfront.net/VuLE/i1_m.jpg",
   }]

    const prices = [
      {
          "id":3,
          "price":123
      },
    ]

    const mergedResult = mergeHotelsAndPrices(hotels, prices)
    expect(mergedResult[0].id).toBe(3)
    expect(mergedResult[1].id).toBe(1)
    expect(mergedResult[2].id).toBe(2)
  })

  it("Should not contain hotel if the hotel details do not exist, but prices do,", () => {
    const hotels = [{
      "id":1,
      "name":"Shinagawa Prince Hotel",
      "rating":7.7,
      "stars":4,
      "address":"108-8611 Tokyo Prefecture, Minato-ku, Takanawa 4-10-30, Japan",
      "photo":"https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg",
   },
   {
      "id":2,
      "name":"The Ritz-Carlton, Tokyo",
      "rating":9.1,
      "stars":5,
      "address":"107-6245 Tokyo Prefecture, Minato-ku, Akasaka 9-7-1 Tokyo Midtown, Japan",
      "photo":"https://d2ey9sqrvkqdfs.cloudfront.net/NXnQ/i12_m.jpg",
   }]

    const prices = [
      {
          "id":3,
          "price":123
      },
    ]
    const mergedResult = mergeHotelsAndPrices(hotels, prices)
    mergedResult.forEach(hotel => {
      expect(hotel.id).not.toBe(3)
    })
  })
})

