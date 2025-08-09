document.getElementById('comparar').addEventListener('click', async () => {
  const img1 = document.getElementById('imagem1').files[0];
  const img2 = document.getElementById('imagem2').files[0];
  const resultadoDiv = document.getElementById('resultado');

  if (!img1 || !img2) {
    alert('Por favor, selecione as duas imagens.');
    return;
  }

  resultadoDiv.innerHTML = 'Processando imagens...';

  try {
    const texto1 = await extrairTexto(img1);
    const texto2 = await extrairTexto(img2);

    const lista1 = texto1.split(/\r?\n/).map(l => l.trim()).filter(l => l);
    const lista2 = texto2.split(/\r?\n/).map(l => l.trim()).filter(l => l);

    const novos = lista2.filter(item => !lista1.includes(item));
    const removidos = lista1.filter(item => !lista2.includes(item));
    const iguais = lista1.filter(item => lista2.includes(item));

    resultadoDiv.innerHTML = `
      <h3>Itens novos:</h3>
      <pre>${novos.join("\n") || "Nenhum"}</pre>
      <h3>Itens removidos:</h3>
      <pre>${removidos.join("\n") || "Nenhum"}</pre>
      <h3>Itens iguais:</h3>
      <pre>${iguais.join("\n") || "Nenhum"}</pre>
    `;
  } catch (error) {
    resultadoDiv.innerHTML = 'Erro ao processar imagens.';
    console.error(error);
  }
});

async function extrairTexto(file) {
  const { data: { text } } = await Tesseract.recognize(file, 'por');
  return text;
}
