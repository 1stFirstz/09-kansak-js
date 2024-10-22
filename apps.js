document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById('nameInput');
    const priceInput = document.getElementById('priceInput');
    const imageUrlInput = document.getElementById('imageUrlInput');
    const addButton = document.getElementById('addButton');
    const addCart = document.getElementById('addCart');
     const itemList = document.getElementById('itemList');
     const totalPriceElement = document.getElementById('totalPrice');
     const checkOut = document.getElementById('checkOut');
     const cartList = document.getElementById('cartList');
     const selectAllButton = document.getElementById('selectAllButton');
     const disselectAllButton = document.getElementById('dis-selectAllButton');
     const addToCartBtn = document.getElementById("add-cart-btn");
     let cartItems = [];

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        checkedCheckboxes.forEach(checkbox => {
            const listItem = checkbox.closest('li');
            const priceSpan = listItem.querySelector('.priceSpan');
            const quantityInput = listItem.querySelector('.quantityInput');
            const price = parseFloat(priceSpan.textContent.replace('Price: ', '').replace(' $', ''));
            const quantity = parseInt(quantityInput.value);
            if (!isNaN(price)) {
                totalPrice += price * quantity;
            }
        });
        totalPriceElement.textContent = `Total Price: ${totalPrice.toFixed(2)} $`;
    };
    
    const addItem = () => {
        const nameValue = nameInput.value.trim();
        const priceValue = Number(priceInput.value.trim());
        const imageUrlValue = imageUrlInput.value.trim();

        if (!nameValue || !imageUrlValue || isNaN(priceValue) || priceValue < 0) {
            alert('Invalid input.');
            return;
        }

        const newItem = {
            id: Date.now(),
            name: nameValue, 
            price: priceValue, 
            imgUrl: imageUrlValue 
        };
        renderProduct(newItem);

        nameInput.value = '';
        priceInput.value = '';
        imageUrlInput.value = '';
    };

    const renderProduct = (item) => {
        const newItem = document.createElement('li');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        newItem.appendChild(checkbox);


    
        const imgElement = document.createElement('img');
        imgElement.src = item.imgUrl;
        imgElement.alt = item.name;
        newItem.appendChild(imgElement);
    
        const nameSpan = document.createElement('span');
        nameSpan.textContent = `Name: ${item.name}, `;
        newItem.appendChild(nameSpan);
    
        const priceSpan = document.createElement('span');
        priceSpan.textContent = `Price: ${item.price.toFixed(2)} $ `;
        priceSpan.classList.add('priceSpan');
        newItem.appendChild(priceSpan);
    
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = 1;
        quantityInput.min = 1;
        quantityInput.addEventListener('input', () => {
            if (quantityInput.value < 1) {
                quantityInput.value = 1;
            }
        });
        newItem.appendChild(quantityInput);
    
        // ปุ่ม delete สำหรับลบบางรายการ
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add('delete-btn'); // เพิ่มคลาสสำหรับตกแต่งถ้าต้องการ
        newItem.appendChild(deleteBtn);
    
        // กำหนด event listener สำหรับลบรายการ
        deleteBtn.addEventListener('click', () => {
            newItem.remove(); // ลบ element นี้ออกจาก DOM
            calculateTotalPrice(); // คำนวณราคาใหม่หลังจากลบรายการ
        });
    
        itemList.appendChild(newItem);
    };
    

    

    addButton.addEventListener('click', addItem);
//ตรงนี้
    addToCartBtn.addEventListener('click', () => {
        // ดึงรายการสินค้าที่ถูกเลือก (checkbox ที่ถูกเลือก)
        const selectedItems = document.querySelectorAll('input[type="checkbox"]:checked');
    
        if (selectedItems.length === 0) {
            alert('Please select items to add to the cart.');
            return;
        }
    
        selectedItems.forEach(checkbox => {
            const listItem = checkbox.closest('li');
            
            // ดึงข้อมูลจากสินค้าที่เลือก
            const imgElement = listItem.querySelector('img').src;
            const nameText = listItem.querySelector('span').textContent;
            const priceText = listItem.querySelector('.priceSpan').textContent;
            const quantityValue = listItem.querySelector('.quantityInput').value;
    
            // สร้างรายการใหม่ใน cart
            const cartItem = document.createElement('li');
    
            const cartImg = document.createElement('img');
            cartImg.src = imgElement;
            cartItem.appendChild(cartImg);
    
            const cartName = document.createElement('span');
            cartName.textContent = `${nameText} x${quantityValue}`;
            cartItem.appendChild(cartName);
    
            const cartPrice = document.createElement('span');
            cartPrice.textContent = priceText;
            cartItem.appendChild(cartPrice);
    
            // ปุ่ม delete สำหรับลบออกจาก cart
            const deleteCartBtn = document.createElement('button');
            deleteCartBtn.textContent = 'Remove';
            deleteCartBtn.addEventListener('click', () => {
                cartItem.remove(); // ลบรายการออกจาก cart
            });
            cartItem.appendChild(deleteCartBtn);
    
            // เพิ่มรายการเข้าไปใน cart list
            cartList.appendChild(cartItem);
    
            // ยกเลิกการเลือก checkbox หลังจากเพิ่มไปใน cart
            checkbox.checked = false;
        });
    
        alert('Selected items have been added to the cart.');
    });

//ตรงนี้


    selectAllButton.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
        calculateTotalPrice(); 
    });
    disselectAllButton.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        calculateTotalPrice();
    });

    checkOut.addEventListener('click', () => {
        document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
            checkbox.closest('li').remove();
        });
    
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    
        calculateTotalPrice();
    
        alert('Please pay for what you ordered');
    });
    

    itemList.addEventListener('change', calculateTotalPrice);

    

})
