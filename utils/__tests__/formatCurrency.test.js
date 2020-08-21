import formatCurrency from '../formatCurrency'
import '@testing-library/jest-dom'

describe("Our Pricing", () => {
  it("Should correctly round and format the currencies", () => {
    let formattedValue = formatCurrency(120.47,'SGD')
    let expectedFormattedValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'SGD', minimumFractionDigits: 0, maximumFractionDigits: 0}).format(120.47)
    expect(formattedValue).toEqual(expectedFormattedValue)

    formattedValue = formatCurrency(120.47,'USD')
    expectedFormattedValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0}).format(120.47)
    expect(formattedValue).toEqual(expectedFormattedValue)

    formattedValue = formatCurrency(120.47,'CNY')
    expectedFormattedValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'CNY', minimumFractionDigits: 0, maximumFractionDigits: 0}).format(120.47)
    expect(formattedValue).toEqual(expectedFormattedValue)

    formattedValue = formatCurrency(120679.764,'KRW')
    expectedFormattedValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'KRW', minimumFractionDigits: 0, maximumFractionDigits: 0}).format(120679.764)
    expect(formattedValue).toEqual(expectedFormattedValue)
  })
})

