document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Define os clientes fictícios e suas informações
    var clients = {
        'admin': 'Calebe Werneck Couto', // Nome fictício associado ao usuário admin
    };

    if (clients[username] && password === 'admin') {
        // Login successful
        document.getElementById('loginMessage').textContent = 'Login !';
        
        // Armazena o nome do cliente no localStorage
        localStorage.setItem('clientName', clients[username]);

        // Redireciona para a página principal após 1 segundo (tempo para mostrar a mensagem)
        setTimeout(function() {
            window.location.href = 'principal.html';
        }, 1000);
    } else {
        // Login failed
        document.getElementById('loginMessage').textContent = 'Usuário ou Senha Inválido. Tente Novamente!';
    }
});
