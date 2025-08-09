// Função para extrair texto de uma imagem usando Tesseract.js
async function extrairTexto(file) {
    if (!file) return "";
    const { data: { text } } = await Tesseract.recognize(file, 'por', {
        logger: m => console.log(m) // mostra progresso no console
    });
    return text
        .split('\n')
        .map(l => l.trim())
        .filter(l => l.length > 0);
}

// Comparar os dois textos extraídos
function compararListas(lista1, lista2) {
    const novos = lista2.filter(item => !lista1.includes(item));
    const faltando = lista1.filter(item => !lista2.includes(item));
    const iguais = lista1.filter(item => lista2.includes(item));

    return { novos, faltando, iguais };
}

// Lidar com clique no botão
document.getElementById('comparar').addEventListener('click', async () => {
    const img1 = document.getElementById('imagem1').files[0];
    const img2 = document.getElementById('imagem2').files[0];
    const resultadoDiv = document.getElementById('resultado');

    if (!img1 || !img2) {
        alert("Por favor, envie as duas imagens.");
        return;
    }

    resultadoDiv.innerHTML = "<p>⏳ Processando... Aguarde.</p>";

    // Extrai texto das imagens
    const texto1 = await extrairTexto(img1);
    const texto2 = await extrairTexto(img2);

    // Faz comparação
    const { novos, faltando, iguais } = compararListas(texto1, texto2);

    // Mostra resultado
    resultadoDiv.innerHTML = `
        <h3>Resultado da Comparação</h3>
        <p class="novo"><strong>Novos:</strong> ${novos.join(', ') || "Nenhum"}</p>
        <p class="faltando"><strong>Faltando:</strong> ${faltando.join(', ') || "Nenhum"}</p>
        <p class="igual"><strong>Iguais:</strong> ${iguais.join(', ') || "Nenhum"}</p>
    `;
});
