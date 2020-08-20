export default function mergeHotelsAndPrices(hotels, prices) {
  const objectsWithoutPrice = [];
  let mergedResult = []
  if(!hotels) {
    hotels = []
  }
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
 
