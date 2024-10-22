document.addEventListener("DOMContentLoaded", () => { 
    // ดึงข้อมูล elements ในหน้า HTML ที่มี id ที่กำหนดไว้
    const nameInput = document.getElementById('nameInput');
    const priceInput = document.getElementById('priceInput');
    const imageUrlInput = document.getElementById('imageUrlInput');
    const addButton = document.getElementById('addButton');
    const itemList = document.getElementById('itemList');
    const totalPriceElement = document.getElementById('totalPrice');
    const cartList = document.getElementById('cartList');
    const addToCartBtn = document.getElementById("add-cart-btn");
    const selectAllButton = document.getElementById('selectAllButton');
    const disselectAllButton = document.getElementById('dis-selectAllButton');

    // ฟังก์ชันเพิ่มสินค้าใหม่
    const addItem = () => {
        const nameValue = nameInput.value.trim();
        const priceValue = Number(priceInput.value.trim());
        const imageUrlValue = imageUrlInput.value.trim();

        if (!nameValue || !imageUrlValue || isNaN(priceValue) || priceValue < 0) {
            alert('Invalid input.');
            return;
        }

        // สร้างสินค้าใหม่เป็น object
        const newItem = {
            id: Date.now(),
            name: nameValue,
            price: priceValue,
            imgUrl: imageUrlValue 
        };

        // เรียกฟังก์ชัน renderProduct เพื่อแสดงสินค้าใหม่ใน list
        renderProduct(newItem);

        // ล้างค่าในฟอร์มหลังจากเพิ่มสินค้า
        nameInput.value = '';
        priceInput.value = '';
        imageUrlInput.value = '';
    };

    // ฟังก์ชันแสดงสินค้าใหม่ใน list
    const renderProduct = (item) => {
        const newItem = document.createElement('li'); // สร้าง element ใหม่ (li)
        
        // สร้าง checkbox สำหรับเลือกสินค้า
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox'; // ตั้งค่าเป็น checkbox
        newItem.appendChild(checkbox); // เพิ่ม checkbox ในสินค้า

        // สร้างรูปภาพของสินค้า
        const imgElement = document.createElement('img');
        imgElement.src = item.imgUrl;
        imgElement.alt = item.name; // กำหนด alt text
        newItem.appendChild(imgElement);

        // สร้าง span สำหรับชื่อสินค้า
        const nameSpan = document.createElement('span');
        nameSpan.textContent = `Name: ${item.name}, `;
        newItem.appendChild(nameSpan);

        // สร้าง span สำหรับราคาสินค้า
        const priceSpan = document.createElement('span');
        priceSpan.textContent = `Price: ${item.price.toFixed(2)} $ `;
        priceSpan.classList.add('priceSpan'); // กำหนด class สำหรับการอ้างอิงภายหลัง
        newItem.appendChild(priceSpan);

        // สร้าง input สำหรับจำนวนสินค้า
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number'; // กำหนดให้เป็น input ประเภทจำนวน
        quantityInput.value = 1; // ตั้งค่าจำนวนเริ่มต้นเป็น 1
        quantityInput.min = 1; // กำหนดค่าต่ำสุดเป็น 1
        newItem.appendChild(quantityInput); // เพิ่ม input จำนวนสินค้าเข้าไปในรายการ

        // ปุ่มลบสินค้า
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete"; // ตั้งค่าข้อความให้ปุ่ม
        newItem.appendChild(deleteBtn);

        // เมื่อกดปุ่มลบสินค้า
        deleteBtn.addEventListener('click', () => {
            newItem.remove(); // ลบสินค้าออกจาก list
            calculateTotalPrice(); // คำนวณราคารวมใหม่
        });

        // เพิ่มสินค้าเข้าไปใน list
        itemList.appendChild(newItem);
    };

    // Event listener สำหรับปุ่ม 'Add'
    addButton.addEventListener('click', addItem); // เมื่อกดปุ่ม 'Add' จะเรียกใช้ฟังก์ชัน addItem

    // Event listener สำหรับปุ่ม 'Add to Cart'
    addToCartBtn.addEventListener('click', () => {
        // ดึงรายการสินค้าที่ถูกเลือก (checkbox ที่ถูกเลือก)
        const selectedItems = document.querySelectorAll('input[type="checkbox"]:checked');
    
        if (selectedItems.length === 0) {
            alert('Please select items to add to the cart.'); // ถ้าไม่มีการเลือกสินค้า
            return;
        }
    
        selectedItems.forEach(checkbox => {
            const listItem = checkbox.closest('li'); // ดึงข้อมูลสินค้าที่ checkbox อยู่

            // ดึงข้อมูลจากสินค้าที่เลือก
            const imgElement = listItem.querySelector('img').src;
            const nameText = listItem.querySelector('span').textContent;
            const priceText = listItem.querySelector('.priceSpan').textContent;
            const quantityValue = listItem.querySelector('input[type="number"]').value; // เปลี่ยนจาก .quantityInput เป็น selector ตามประเภท input
    
            // สร้างรายการใหม่ใน cart
            const cartItem = document.createElement('li');

            const cartImg = document.createElement('img');
            cartImg.src = imgElement; // แสดงรูปภาพของสินค้าใน cart
            cartItem.appendChild(cartImg);

            const cartName = document.createElement('span');
            cartName.textContent = `${nameText} x${quantityValue}`; // แสดงชื่อและจำนวนสินค้าใน cart
            cartItem.appendChild(cartName);
    
            const cartPrice = document.createElement('span');
            const priceNumber = parseFloat(priceText.replace('Price: ', '').replace(' $', '')); // แปลงราคาจาก text เป็น number
            const totalItemPrice = priceNumber * quantityValue; // คำนวณราคารวมสำหรับจำนวนที่เลือก
            cartPrice.textContent = `Price: ${totalItemPrice.toFixed(2)} $`; // แสดงราคาสินค้าใน cart
            cartItem.appendChild(cartPrice);

            // ปุ่มลบสินค้าใน cart
            const deleteCartBtn = document.createElement('button');
            deleteCartBtn.textContent = 'Remove'; // ตั้งค่าข้อความให้ปุ่มลบใน cart
            deleteCartBtn.addEventListener('click', () => {
                cartItem.remove(); // ลบสินค้าออกจาก cart
            });
            cartItem.appendChild(deleteCartBtn);
    
            // เพิ่มรายการเข้าไปใน cart list
            cartList.appendChild(cartItem);
    
            // ยกเลิกการเลือก checkbox หลังจากเพิ่มไปใน cart
            checkbox.checked = false;
        });
    
        alert('Selected items have been added to the cart.'); // แสดงข้อความเมื่อเพิ่มสินค้าลงใน cart สำเร็จ
    });

    // ปุ่มเลือกสินค้าทั้งหมด
    selectAllButton.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = true; // เลือก checkbox ทั้งหมด
        });
    });

    // เมื่อมีการเปลี่ยนแปลงใด ๆ ใน list จะคำนวณราคารวมใหม่
    itemList.addEventListener('change', calculateTotalPrice);
});