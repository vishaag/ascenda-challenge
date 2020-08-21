/* Utility function to merge Hotels and Prices API responses 
  Eg Usage :
  hotels = [
    {"id":1, "name":"Shinagawa Prince Hotel", "rating":7.7, "stars":4 }.
    {"id":2, "name":"The Ritz-Carlton, Tokyo","rating":9.1,"stars":5}]

  prices = [
    {"id":1, "price":120, "competitors":{
      "Booking.com":125,
      "Hotels.com":121,
      }
   },
   {
      "id":2,
      "price":841
   }]

   mergeHotelsAndPrices(hotels, prices) will return : 
   [
     {"id":1, "name":"Shinagawa Prince Hotel", "rating":7.7, "stars":4, "price":120, "competitors":{ "Booking.com":125, "Hotels.com":121}},
     {"id":2, "name":"The Ritz-Carlton, Tokyo","rating":9.1,"stars":5, price:841}]
   ]

*/

export default function mergeHotelsAndPrices(hotels, prices) {
  const objectsWithoutPrice = [];
  let mergedResult = []
  hotels.map((hotel)=>{
    const pricesObj = prices.find(price => price.id === hotel.id);
    if(!pricesObj) {
      objectsWithoutPrice.push(hotel)
    } else {
      mergedResult.push({ ...hotel, ...pricesObj });
    }
  })
  mergedResult = mergedResult.concat(objectsWithoutPrice);
  return mergedResult;
}
 
