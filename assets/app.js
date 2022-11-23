const listKgs = [

]
let priceList = document.querySelector('.price-list')

function renderHTML() {
    var htmls = listKgs.map((kg, index) => {
        return `
        <li class="price-items">
            <p class="price-text">Con thứ ${index + 1}: <span class = "numberKg" >${kg.kg}</span></p>
            <button class="price-btn" onclick = "deleteBtn(${index})" >
                <i class="fa-solid fa-trash"></i>
            </button>
        </li>
        `
    })
    priceList.innerHTML = htmls.join('')
    totalPig()
    
}

function addPig() {
    var btnAdd = document.querySelector('.btn-add')
    btnAdd.onclick = function() {
        var quantityInput = document.querySelector('.quantity-input').value
        const newLisstKgs = {
             kg: quantityInput
        }
        if(quantityInput != '') {
            listKgs.push(newLisstKgs)
            renderHTML()
            clearInput('.quantity-input')
        }
    }
}

function deleteBtn(index) {
    listKgs.splice(index,1)
    renderHTML()
}

function clearInput(value) {
     document.querySelector(value).value = ''
    
}

var deleteAll = document.querySelector('.deleteAll')
deleteAll.onclick = function() {
    clearInput('.price-input')
    var listItems = document.querySelectorAll('.price-items')
    for(var i of listItems) {
        i.remove()
    }
    
}

function totalPig() {
    let totalPig = document.querySelector('.caculate-quantity')
    let total = listKgs.length
    totalPig.inerHTML = ` <p>Đã nhập ${total} con</p>`
}

function cacutaleTotal() {
    let caculateTotal = document.querySelector('.caculateTotal')
    caculateTotal.onclick = function() {
        var inputPrice = +document.querySelector('.price-input').value
        
        var arrEmty = []
        var totalKg = 0
       for(var kg in listKgs) {
        var itemArrs = Object.values(listKgs[kg])
        for(var i of itemArrs) {
            arrEmty.push(+i)
        }
    }
    arrEmty.forEach((itemPig) => {
        totalKg += itemPig
    })
    if(inputPrice == '') {
        alert('Chưa nhập giá')
    } else {
        var finalTotal = ((totalKg - (+listKgs.length) ) * (inputPrice)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    document.querySelector('.showMoney').style.display = 'block'
    document.querySelector('.showMoney').innerHTML = 
    ` 
   
    <p>Tổng cân: ${totalKg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} kg</p>
    <p>Tổng con: ${listKgs.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} con </p>
    <p>Giá: ${inputPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</p>
    <p style = "font-size: 13px" >Thành tiền  = (Tổng cân - Tổng con) x Giá tiền </p>
    <p> Thành tiền: (${totalKg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} - ${listKgs.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}) x ${inputPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} = ${finalTotal}đ  </p>
   
`
    }
}


const app = {
    start: function() {
        renderHTML()
        addPig()
        cacutaleTotal() 
    }
}

app.start()