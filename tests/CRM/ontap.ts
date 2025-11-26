interface Product {
    id:number,
    namePro:string,
    price: number,
    isSale : boolean
}

const laptop : Product = {id:1, namePro:'ASUS', price:150,isSale :true}
const mouse : Product = {id:2, namePro: 'Logitech', price:50, isSale:false}

type productType = keyof Product;

function demo(productKey : keyof Product) {
    return laptop[productKey]
}

const prodName = demo('namePro')
console.log(prodName)