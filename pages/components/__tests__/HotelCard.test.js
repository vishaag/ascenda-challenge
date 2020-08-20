import React from 'react';
import {render, screen} from "@testing-library/react"
import '@testing-library/jest-dom'
import HotelCard from "../HotelCard";


describe("Competitor Pricing", () => {
  it("Should not show any savings when no competitor rates exist", () => {
    const currency = 'USD'
    const hotel = {
      "id":1,
      "name":"Shinagawa Prince Hotel",
      "rating":7.7,
      "stars":4,
      "photo":"https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg",
    }
    render(<HotelCard  photo={hotel.photo} title={hotel.name} rating={hotel.rating} stars={hotel.stars} price={hotel.price} currency={currency}/>)
    const saveNode = screen.queryByText(/save/i)
    expect(saveNode).not.toBeInTheDocument()
  })

  it("Should not show savings when all competitor rates are cheaper", () => {
    const currency = 'USD'
    const hotel = {
      "id":1,
      "name":"Shinagawa Prince Hotel",
      "rating":7.7,
      "stars":4,
      "photo":"https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg",
      "competitors":{"Booking.com":125,"Hotels.com":121,"Expedia":120,"getaroom":140,"AMOMA.com":132.77},
      "price": 200
    }
    render(<HotelCard  photo={hotel.photo} title={hotel.name} rating={hotel.rating} stars={hotel.stars} price={hotel.price} currency={currency} list={hotel.competitors}/>)

    const saveNode = screen.queryByText(/save/i)
    expect(saveNode).not.toBeInTheDocument()
  })

  it("Should show savings when 1 or more competitor rates are more expensive than us", () => {
    const currency = 'USD'
    const hotel = {
      "id":1,
      "name":"Shinagawa Prince Hotel",
      "rating":7.7,
      "stars":4,
      "photo":"https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg",
      "competitors":{"Booking.com":125,"Hotels.com":121,"Expedia":120,"getaroom":140,"AMOMA.com":132.77},
      "price": 125
    }
    render(<HotelCard  photo={hotel.photo} title={hotel.name} rating={hotel.rating} stars={hotel.stars} price={hotel.price} currency={currency} list={hotel.competitors}/>)

    const saveNode = screen.queryByText(/save/i)
    expect(saveNode).toBeInTheDocument()
  })

  it("Should show the correct percentage of savings", () => {
    const currency = 'USD'
    const hotel = {
      "id":1,
      "name":"Shinagawa Prince Hotel",
      "rating":7.7,
      "stars":4,
      "address":"108-8611 Tokyo Prefecture, Minato-ku, Takanawa 4-10-30, Japan",
      "photo":"https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg",
      "competitors":{"Booking.com":125,"Hotels.com":121,"Expedia":120,"getaroom":140,"AMOMA.com":132.77},
      "price": 125
    }
    render(<HotelCard  photo={hotel.photo} title={hotel.name} rating={hotel.rating} stars={hotel.stars} price={hotel.price} currency={currency} list={hotel.competitors}/>)

    const saveNode = screen.queryByText(/save 11%/i)
    expect(saveNode).toBeInTheDocument()
  })
})


describe("Pricing", () => {
  it("Should display Rates Unavailable when hotel doesn't have a price", () => {
    const currency = 'SGD'
    const hotel = {
      "id":1,
      "name":"Shinagawa Prince Hotel",
      "rating":7.7,
      "stars":4,
      "photo":"https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg",
    }
    render(<HotelCard  photo={hotel.photo} title={hotel.name} rating={hotel.rating} stars={hotel.stars} currency={currency}/>)
    const priceNode = screen.queryByText(/Rates Unavailable/i)
    expect(priceNode).toBeInTheDocument()
  })

})