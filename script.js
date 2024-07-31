let cart = [];
let modalQt = 1;
let modalKey = 0;

const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');

    // Adiciona o título ao PDF
    doc.setFontSize(22);
    doc.text('Resumo da Compra', 14, 20);

    // Adiciona o nome do cliente ao PDF
    const clientInfoDiv = document.getElementById('clientInfo');
    let userName = 'Nome não disponível';

    if (clientInfoDiv) {
        // Assume que o nome do cliente está no formato "Bem Vindo, Nome!"
        // Vamos extrair apenas o nome
        const clientText = clientInfoDiv.textContent.trim();
        const nameMatch = clientText.match(/Bem Vindo,\s*([^\s!]+)/);
        if (nameMatch) {
            userName = nameMatch[1];
        }
    }

    doc.setFontSize(16);
    doc.text(`Nome do Cliente: ${userName}`, 14, 30);

    // Adiciona um cabeçalho para a tabela
    doc.setFontSize(16);
    doc.setFillColor(200, 220, 255);
    doc.rect(14, 40, 180, 10, 'F');
    doc.setTextColor(0);
    doc.text('Descrição', 14, 45);
    doc.text('Quantidade', 60, 45);
    doc.text('Preço Unitário', 102, 45);
    doc.text('Total', 180, 45, null, null, 'right');

    let yPosition = 55;
    let subtotal = 0;

    async function addTableRow(description, quantity, unitPrice, totalPrice, imageData) {
        doc.setFontSize(14);
        doc.text(description, 14, yPosition);
        doc.text(quantity.toString(), 60, yPosition);
        doc.text(`R$ ${unitPrice.toFixed(2)}`, 102, yPosition);
        doc.text(`R$ ${totalPrice.toFixed(2)}`, 180, yPosition, null, null, 'right');
        
        // Adiciona a imagem
        if (imageData) {
            doc.addImage(imageData, 'PNG', 14, yPosition + 5, 60, 60); // Ajustado para 60x60
        }

        yPosition += 70; // Ajusta a posição vertical para a próxima linha
    }

    for (const item of cart) {
        const pizzaItem = pizzaJson.find(pizza => pizza.id === item.id);
        if (!pizzaItem) continue;

        const pizzaSizeName = item.size === 0 ? 'P' : (item.size === 1 ? 'M' : 'G');
        const pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

        const unitPrice = pizzaItem.price;
        const quantity = item.qt;
        const totalPrice = unitPrice * quantity;

        // Converte a imagem para Base64 e adiciona ao PDF
        const imagePath = `images/pizza${pizzaItem.id}.png`; // Ajuste conforme necessário

        const imageData = await fetch(imagePath)
            .then(res => res.blob())
            .then(blob => new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            }))
            .catch(error => {
                console.error('Erro ao carregar a imagem:', error);
                return null;
            });

        subtotal += totalPrice;

        await addTableRow(pizzaName, quantity, unitPrice, totalPrice, imageData);
    }

    const startY = yPosition;
    yPosition += 10;

    doc.setFontSize(16);
    doc.setFillColor(240, 240, 240);

    doc.rect(14, yPosition, 180, 10, 'F');
    doc.text('Subtotal', 14, yPosition + 7);
    doc.text(`R$ ${subtotal.toFixed(2)}`, 180, yPosition + 7, null, null, 'right');

    yPosition += 10;

    doc.rect(14, yPosition, 180, 10, 'F');
    doc.text('Desconto (10%)', 14, yPosition + 7);
    const discount = subtotal * 0.1;
    doc.text(`R$ ${discount.toFixed(2)}`, 180, yPosition + 7, null, null, 'right');

    yPosition += 10;

    doc.rect(14, yPosition, 180, 10, 'F');
    doc.text('Total', 14, yPosition + 7);
    const total = subtotal - discount;
    doc.text(`R$ ${total.toFixed(2)}`, 180, yPosition + 7, null, null, 'right');

    doc.setFontSize(12);
    doc.setTextColor(0);

    doc.save('resumo-compra.pdf');

    c('aside').classList.remove('show');
    c('aside').style.left = '100vw';
    cart = [];
    updateCart();

    alert('Seu pedido foi realizado com sucesso!');
}


// Listagem das pizzas
pizzaJson.map((item, index) => {
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;

        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        c('.pizzaInfo--qt').innerHTML = modalQt;

        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });

    c('.pizza-area').append(pizzaItem);
});

// Eventos do MODAL
function closeModal() {
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        c('.pizzaWindowArea').style.display = 'none';
    }, 500);
}
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});
c('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQt > 1) {
        modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt;
    }
});
c('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;
});
cs('.pizzaInfo--size').forEach((size) => {
    size.addEventListener('click', () => {
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});
c('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
    let identifier = pizzaJson[modalKey].id + '@' + size;
    let key = cart.findIndex((item) => item.identifier === identifier);
    if (key > -1) {
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQt
        });
    }
    updateCart();
    closeModal();
});

c('.menu-openner').addEventListener('click', () => {
    if (cart.length > 0) {
        c('aside').style.left = '0';
    }
});
c('.menu-closer').addEventListener('click', () => {
    c('aside').style.left = '100vw';
});

function updateCart() {
    c('.menu-openner span').innerHTML = cart.length;

    if (cart.length > 0) {
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for (let i in cart) {
            const pizza = pizzaJson.find(pizza => pizza.id === cart[i].id);
            const pizzaSizeName = cart[i].size === 0 ? 'P' : (cart[i].size === 1 ? 'M' : 'G');
            const pizzaName = `${pizza.name} (${pizzaSizeName})`;

            subtotal += pizza.price * cart[i].qt;

            c('.cart').innerHTML += `
                <div class="cart--item">
                    <div class="cart--item--img">
                        <img src="${pizza.img}" alt="${pizzaName}">
                    </div>
                    <div class="cart--item--text">
                        <div class="cart--item--name">${pizzaName}</div>
                        <div class="cart--item--price">R$ ${(pizza.price * cart[i].qt).toFixed(2)}</div>
                        <div class="cart--item--qt">
                            <button class="cart--item--qtmenos">-</button>
                            <div class="cart--item--qt">${cart[i].qt}</div>
                            <button class="cart--item--qtmais">+</button>
                        </div>
                    </div>
                </div>
            `;
        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

        cs('.cart--item--qtmenos').forEach((button, index) => {
            button.addEventListener('click', () => {
                if (cart[index].qt > 1) {
                    cart[index].qt--;
                } else {
                    cart.splice(index, 1);
                }
                updateCart();
            });
        });

        cs('.cart--item--qtmais').forEach((button, index) => {
            button.addEventListener('click', () => {
                cart[index].qt++;
                updateCart();
            });
        });

        c('.cart--finalizar').addEventListener('click', generatePDF);
    } else {
        c('aside').classList.remove('show');
    }
}

updateCart();
