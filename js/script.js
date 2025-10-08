
// Dados dos produtos
const products = [
    {
        id: 1,
        name: "Mangá Demon Slayer vol. 1",
        price: 36.90,
        image: "image/kny1.webp"
    },
    {
        id: 2,
        name: "Box Demon Slayer vols. 1 ao 23",
        price: 806.50,
        image: "image/knyBox.webp"
    },
    {
        id: 3,
        name: "Mangá Hanako-kun vol. 1",
        price: 36.90,
        image: "image/hanako1.jpg"
    },
    {
        id: 4,
        name: "Box Hanako-kun vols. 1 ao 22",
        price: 351.90,
        image: "image/HanakoBox.jpg"
    },
    {
        id: 5,
        name: "Mangá Tokyo Ghoul vol. 1",
        price: 66.50,
        image: "image/TG1.jpg"
    },
    {
        id: 6,
        name: "Box Tokyo Ghoul vols. 1 ao 14",
        price: 380.00,
        image: "image/TGbox.webp"
    },
    {
        id: 7,
        name: "Mangá Chainsaw Man vol. 1",
        price: 42.90,
        image: "image/Chainsaw1.webp"
    },
    {
        id: 8,
        name: "LBox Chainsaw Man vols. 1 ao 11",
        price: 360.00,
        image: "image/ChainsawBox.webp"
    },
];

// Estado do carrinho
let cart = [];

// Elementos DOM
const productsGrid = document.getElementById('products-grid');
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');

// Inicializar a página
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCart();
});

// Renderizar produtos
function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });

    // Adicionar event listeners aos botões
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Adicionar produto ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // Verificar se o produto já está no carrinho
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} adicionado ao carrinho!`);
}

// Remover produto do carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Atualizar carrinho
function updateCart() {
    // Atualizar contador
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Atualizar lista de itens
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Seu carrinho está vazio</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
                <button class="cart-item-remove" data-id="${item.id}">Remover</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Atualizar total
    cartTotal.textContent = total.toFixed(2);
    
    // Adicionar event listeners aos botões de remover
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// Mostrar notificação
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #2ecc71;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        transition: transform 0.3s, opacity 0.3s;
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateY(20px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Abrir/fechar carrinho
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// 1. Selecionar o campo CEP
var campoCep = document.getElementById('cep');

// 2. Adicionar evento 'blur' (quando o campo perde o foco)
campoCep.addEventListener('blur', function () {
    let valorCep = campoCep.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (valorCep.length !== 8) {
        mudaBorda(1);
        alert("CEP inválido. Digite 8 números.");
        return;
    }

    fetch(`https://viacep.com.br/ws/${valorCep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                mudaBorda(1);
                alert("CEP não encontrado.");
                return;
            }

            // Preencher os campos com os dados retornados
            document.getElementById('logradouro').value = data.logradouro || '';
            document.getElementById('bairro').value = data.bairro || '';
            document.getElementById('cidade').value = data.localidade || '';
            document.getElementById('estado').value = data.uf || ''; // Corrigido para "uf", que é o retorno certo
            mudaBorda(0);
        })
        .catch(error => {
            console.error("Erro ao buscar o CEP:", error);
            mudaBorda(1);
        });
});

// Função que muda a borda do campo de CEP
function mudaBorda(erro) {
    if (erro === 1) {
        campoCep.style.border = '2px solid red';
    } else {
        campoCep.style.border = '2px solid green';
    }
}

        function ConfirmarSenha() {
            // Pega os valores dos campos
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmarsenha').value;
        
            // Verifica se são iguais
            if (senha === confirmarSenha) {
                alert("As senhas coincidem!");
                return true; // Pode enviar o formulário
            } else {
                alert("As senhas não coincidem!");
                return false; // Bloqueia envio do formulário
            }
        };
        
        function toggleSenha(id) {
            const input = document.getElementById(id);
            const container = input.nextElementSibling;
            const olhoAberto = container.querySelector('.olho-aberto');
            const olhoFechado = container.querySelector('.olho-fechado');
        
            if (input.type === "password") {
                input.type = "text";
                olhoAberto.style.display = "inline";
                olhoFechado.style.display = "none";
            } else {
                input.type = "password";
                olhoAberto.style.display = "none";
                olhoFechado.style.display = "inline";
            }
        }