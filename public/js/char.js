
let graficoBarrasVerticais, graficoBarrasHorizontais, graficoPizza;

document.addEventListener("DOMContentLoaded", function () {
    iniciarTabela();
    startScrolling();
});

function iniciarTabela() {
    const tabela = document.getElementById("dataTable");
    const linhas = tabela.getElementsByTagName("tr");

    for (let i = 1; i < linhas.length; i++) {
        linhas[i].addEventListener("click", function () {
            const { titulo, valores } = extrairDadosLinha(this);
            criarGraficos(["Positivo", "Neutro", "Negativo"], valores, titulo);
        });
    }

    const { titulo, valores } = extrairDadosLinha(linhas[1]);
    criarGraficos(["Positivo", "Neutro", "Negativo"], valores, "Geral");
}

function criarGraficos(labels, valores, titulo) {
    const ctxBarraV = document.getElementById('graficoBarrasVerticais').getContext('2d');
    const ctxBarraH = document.getElementById('graficoBarrasHorizontais').getContext('2d');
    const ctxPizza = document.getElementById('graficoPizza').getContext('2d');

    if (graficoBarrasVerticais) graficoBarrasVerticais.destroy();
    if (graficoBarrasHorizontais) graficoBarrasHorizontais.destroy();
    if (graficoPizza) graficoPizza.destroy();

    const config = (type, indexAxis = 'x') => ({
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: titulo,
                data: valores,
                backgroundColor: ['#4CAF50', '#FFD700', '#FF5733']
            }]
        },
        options: indexAxis === 'y' ? { indexAxis: 'y' } : {}
    });

    graficoBarrasVerticais = new Chart(ctxBarraV, config('bar'));
    graficoBarrasHorizontais = new Chart(ctxBarraH, config('bar', 'y'));
    graficoPizza = new Chart(ctxPizza, { type: 'pie', data: config('pie').data });
}

function extrairDadosLinha(row) {
    const cells = row.getElementsByTagName('td');
    return {
        titulo: cells[0].textContent,
        valores: [
            parseInt(cells[1].textContent),
            parseInt(cells[2].textContent),
            parseInt(cells[3].textContent)
        ]
    };
}

function startScrolling() {
    let comments = Array.from(document.querySelectorAll('table tr td:first-child'));
    let scrollingText = document.getElementById('scrollingText');
    scrollingText.innerHTML = comments.map(row => `<div style:color:red;><p>${row.innerText}</p></div>`).join('');
}

function addComment() {
let commentText = document.getElementById('userComment').value;
if (commentText.trim() === '') return;

let table = document.getElementById('commentsTable');
let newRow = table.insertRow(-1);
let cell1 = newRow.insertCell(0);
let cell2 = newRow.insertCell(1);

cell1.innerText = commentText;
cell2.innerText = "Neutro";
cell2.classList.add("neutro");

document.getElementById('userComment').value = '';
startScrolling();
}


function filtrarComentarios() {
    renderizarComentarios();
  }

  function abrirModal() {
    document.getElementById("modalUpload").classList.remove("hidden");
  }

  function fecharModal() {
    document.getElementById("modalUpload").classList.add("hidden");
  }

  function toggleUserMenu() {
    const menu = document.getElementById("userMenu");
    const arrow = document.getElementById("arrowUserMenu");
    menu.classList.toggle("hidden");
    arrow.textContent = menu.classList.contains("hidden") ? "▼" : "▲";
  }

  function abrirModal() {
    document.getElementById('modal').classList.remove('hidden');
  }

  function fecharModal() {
    document.getElementById('modal').classList.add('hidden');
  }

  document.getElementById('detalhadaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Análise detalhada enviada com sucesso!');
    fecharModal();
  });

   function abrirModal() {
      document.getElementById('modal').classList.remove('hidden');
    }
  
    function fecharModal() {
      document.getElementById('modal').classList.add('hidden');
    }
  
    function abrirModalAssunto() {
      document.getElementById('modalAssunto').classList.remove('hidden');
    }
  
    function fecharModalAssunto() {
      document.getElementById('modalAssunto').classList.add('hidden');
    }
  
    document.getElementById('detalhadaForm').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Análise detalhada enviada com sucesso!');
      fecharModal();
    });
  
    document.getElementById('assuntoForm').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Novo assunto cadastrado com sucesso!');
      fecharModalAssunto();
    });
  
    // Função de pesquisa simples
    function filtrarTabela() {
      const input = document.getElementById("searchInput").value.toLowerCase();
      const linhas = document.querySelectorAll("#tabelaResultados tbody tr");
  
      linhas.forEach(linha => {
        const textoLinha = linha.textContent.toLowerCase();
        linha.style.display = textoLinha.includes(input) ? "" : "none";
      });
    }
    function openModal() {
        document.getElementById('modal').classList.remove('hidden');
        document.getElementById('modal').classList.add('flex');
    }

    function closeModal() {
        document.getElementById('modal').classList.add('hidden');
        document.getElementById('modal').classList.remove('flex');
    }


    //funcionalidade de clicar e arrastar
     const dropArea = document.getElementById('drop-area');
  const fileInput = document.getElementById('imagem');
  const preview = document.getElementById('preview');

  dropArea.addEventListener('click', () => fileInput.click());
  dropArea.addEventListener('dragover', e => {
    e.preventDefault();
    dropArea.classList.add('border-green-400');
  });
  dropArea.addEventListener('dragleave', () => dropArea.classList.remove('border-green-400'));
  dropArea.addEventListener('drop', e => {
    e.preventDefault();
    dropArea.classList.remove('border-green-400');
    fileInput.files = e.dataTransfer.files;
    showPreview(fileInput.files[0]);
  });
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) showPreview(fileInput.files[0]);
  });

  function showPreview(file) {
    const reader = new FileReader();
    reader.onload = e => {
      preview.innerHTML = `<img src="${e.target.result}" alt="Pré-visualização" class="w-32 h-32 object-cover rounded-lg border mt-2"> <p class='text-sm mt-2'>${file.name}</p>`;
    };
    reader.readAsDataURL(file);
  }
