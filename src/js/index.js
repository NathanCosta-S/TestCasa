function submitForm() {
    var form = document.getElementById('myForm');
    var formData = new FormData(form);

    var imageFile = formData.get('image');
    if (imageFile) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var imageDataUrl = e.target.result;

            // Use indexedDB para armazenar os dados
            var request = window.indexedDB.open('formDataDB', 1);

            request.onupgradeneeded = function (event) {
                var db = event.target.result;
                db.createObjectStore('formDataStore', { keyPath: 'id', autoIncrement: true });
            };

            request.onsuccess = function (event) {
                var db = event.target.result;
                var transaction = db.transaction(['formDataStore'], 'readwrite');
                var objectStore = transaction.objectStore('formDataStore');

                // Adicionar os novos dados ao objectStore
                objectStore.add({
                    title: 'Vende-se',
                    price: formData.get('price'),
                    image: imageDataUrl,
                    text: formData.get('text')
                });

                // Exibir mensagem de sucesso
                alert('Anúncio de venda enviado com sucesso!');

                // Redirecionar para a mesma página para criar mais cards
                window.location.reload();
            };

            request.onerror = function (event) {
                console.error('Erro ao abrir o banco de dados:', event.target.errorCode);
            };
        };

        reader.readAsDataURL(imageFile);
    } else {
        alert('Por favor, selecione uma imagem.');
    }
}
