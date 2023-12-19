document.addEventListener('DOMContentLoaded', function () {
    // Use indexedDB para obter os dados
    var request = window.indexedDB.open('formDataDB', 1);

    request.onsuccess = function (event) {
        var db = event.target.result;
        var transaction = db.transaction(['formDataStore'], 'readonly');
        var objectStore = transaction.objectStore('formDataStore');

        // Abre um cursor para percorrer todos os itens no objectStore
        var cursorRequest = objectStore.openCursor();

        cursorRequest.onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                // Recupera os dados do cursor
                var title = cursor.value.title;
                var price = cursor.value.price;
                var imageUrl = cursor.value.image;
                var text = cursor.value.text;

                // Formata o preço com separador de milhar e duas casas decimais
                var formattedPrice = parseFloat(price).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

                // Criar o elemento de card
                var cardElement = document.createElement('div');
                cardElement.classList.add('produtos');

                // Adicionar imagem ao card
                var imageElement = document.createElement('img');
                imageElement.src = imageUrl;
                cardElement.appendChild(imageElement);

                // Adicionar conteúdo ao card
                var cardContent = document.createElement('div');
                cardContent.classList.add('card-content');

                var cardTitle = document.createElement('div');
                cardTitle.classList.add('card-title');

                var titleElement = document.createElement('h2');
                titleElement.textContent = title; // Título fixo "Vende-se"
                var priceElement = document.createElement('p');
                priceElement.textContent = 'Preço: R$ ' + formattedPrice; // Adiciona o preço formatado
                var textElement = document.createElement('p');
                textElement.textContent = text; // Adiciona a descrição

                cardTitle.appendChild(titleElement);
                cardTitle.appendChild(priceElement);
                cardTitle.appendChild(textElement);

                // Adicionar botão ao card (se necessário)
                var buttonElement = document.createElement('button');
                buttonElement.innerHTML = '<span>Tenho interesse</span>';

                cardContent.appendChild(cardTitle);
                cardContent.appendChild(buttonElement);

                cardElement.appendChild(cardContent);

                // Adicionar o card ao contêiner na página
                document.getElementById('cardContainer').appendChild(cardElement);

                // Move para o próximo item no cursor
                cursor.continue();
            }
        };

        cursorRequest.onerror = function (event) {
            console.error('Erro ao abrir o cursor:', event.target.errorCode);
        };
    };

    request.onerror = function (event) {
        console.error('Erro ao abrir o banco de dados:', event.target.errorCode);
    };
});
