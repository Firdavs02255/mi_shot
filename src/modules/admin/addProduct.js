import { postData, getData, deleteData } from "../api"

export const addProduct = () =>{
 const titleInp = document.getElementById('product-title')
 const nameInp = document.getElementById('product-name')
 const priceInp = document.getElementById('product-price')
 const previewInp = document.getElementById('product-image')
 const saveBtn = document.getElementById('product-add-btn')
 const container = document.getElementById('product-table')
 const select = document.getElementById('product-category')

 const productData = {
  title: '',
  name: '',
  price: 0,
  preview: '',
  category: 0
 }

 const render = (data) => {
  container.innerHTML = ''
  console.log(data);


   data.forEach((item, index) => {
     container.insertAdjacentHTML(
       "beforeend",
       `
       <tr>
       <th scope="row">${index + 1}</th>
       <td>${item.title}</td>
       <td>${item.name}</td>
       <td>${item.price} ₽</td>
       <td class="text-end">
           <button type="button" class="btn btn-outline-danger btn-sm" data-product="${item.id}">
               удалить
           </button>
       </td>
   </tr>
       `
     );
   });
 };

 console.log(select.value);

 const checkValues = () =>{ 
  if(
   nameInp.value === '' ||
    previewInp.value === '' || 
    titleInp.value === '' || 
    Number(priceInp.value) === 0 ||
    select.value === 'default'
    ){
   saveBtn.disabled = true
  } else {
   saveBtn.disabled = false
  }
}

const updateTable = () =>{
  getData('/products').then((data) => {
     render(data)
  })
 }

select.addEventListener('change', () =>{
  productData.category = select.value
  const url = select.value !== 'default' ? `/products?category=${select.value}` : `/products`

  getData(url).then((data) => {
    render(data)
 })

  checkValues()
})

titleInp.addEventListener('input', () => {
  productData.title = titleInp.value
  checkValues()
 })

 nameInp.addEventListener('input', () => {
  productData.name = nameInp.value
  checkValues()
 })

 priceInp.addEventListener('input', () => {
  productData.price = Number(priceInp.value)
  checkValues()
 })
 
 previewInp.addEventListener('input', () =>{
  const file = previewInp.files[0]
 
  if(file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'){
    const reader = new FileReader()
 
    reader.onload = () => {
     productData.preview = reader.result
    }
 
    reader.onerror = () => {
     productData.preview = ''
     previewInp.value = ''
    }
 
    reader.readAsDataURL(file)
  }else{
   previewInp.value = ''
   alert('Wrong type of image')
  }
 
  checkValues()
 })

 saveBtn.addEventListener('click', () =>{
  postData('/products', productData).then(() => {
  nameInp.value = ''
  titleInp.value = ''
  priceInp.value = ''
  previewInp.value = ''
  updateTable()
 })
 })

 container.addEventListener('click', (event)=>{

  if(event.target.tagName === 'BUTTON'){
   const id = event.target.dataset.product
   deleteData(`/products/${id}`).then((data) => {
    updateTable()
   })
  }
  })

 updateTable()
 
checkValues()
}