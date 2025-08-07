async function extrairTexto(file) {
  const { data: { text } } = await Tesseract.recognize(file, 'por');
  return text;
}

function compararListas(lista1, lista2) {
  const set1 = new Set(lista1);
  const set2 = new Set(lista2);

  const novos = [...set2].filter(item => !set1.has(item));
  const ausentes = [...set1].filter(item => !set2.has(item));
  const iguais = [...set1].filter(item => set2.has(item));

  return { novos, ausentes, iguais };
}

async function compararImagens() {
  const img1 = document.getElementById("img1").files[0];
  const img2 = document.getElementById("img2").files[0];
  const resultado = document.getElementById("resultado");

  if (!img1 || !img2) {
    resultado.textContent = "Envie as duas imagens!";
    return;
  }

  resultado.textContent = "Extraindo textos...";

  const texto1 = await extrairTexto(img1);
  const texto2 = await extrairTexto(img2);

  const linhas1 = texto1.split("\n").map(l => l.trim()).filter(l => l);
  const linhas2 = texto2.split("\n").map(l => l.trim()).filter(l => l);

  const { novos, ausentes, iguais } = compararListas(linhas1, linhas2);

  resultado.innerHTML = `
    <h3>Itens Iguais:</h3>
    ${iguais.join("<br>") || "Nenhum"}<br><br>

    <h3>Itens Novos:</h3>
    ${novos.join("<br>") || "Nenhum"}<br><br>

    <h3>Itens Ausentes:</h3>
    ${ausentes.join("<br>") || "Nenhum"}
  `;
}
