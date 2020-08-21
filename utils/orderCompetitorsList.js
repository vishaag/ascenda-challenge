/* Adds Airbrb and sorts (ascending order of prices) the competitors list 
Eg Usage:
  list = {Prestigia: 122.49, Kayak: 139.5}
  price = 125
  orderCompetitorsList(list, price) will return :
  [
    ["Prestigia", 122.49]
    ["Airbrb", 125]
    ["Kayak", 139.5]
  ]
*/

export default function orderCompetitorsList(list, price) {
  /* 
    list object should look like this : 
    {Prestigia: 122.49, Kayak: 139.5}
  */
  const listArray = list ? Object.entries(list) : []  //Convert list object into an array
  /* 
    listArray looks like this : 
    [
      ["Prestigia", 122.49]
      ["Kayak", 139.5]
    ]
  */
  if(listArray.length >= 1) {
    listArray.push(['Airbrb', price]) //Add Airbrb to the competitor pricing list
  }

  listArray.sort((a,b) => {
    return a[1] - b[1];
  })
  return listArray;
}
 



