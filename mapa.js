mapboxgl.accessToken = 'pk.eyJ1IjoiaGVsbGVuYTEyM3VjIiwiYSI6ImNtOHUzamdqZDBlcmwya3M2bnUyeWhjcnAifQ.0n1MmLYsUN8qfMznT5tDUQ';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-50, -15], // Centraliza no Brasil
    zoom: 4
});

// Lista de guerras com localização, imagem e link da Wikipedia
const guerras = [
    {
        nome: "Guerra de Iguape (1534-1536)",
        descricao: "Disputa territorial entre portugueses e espanhóis.",
        coordenadas: [-47.5604, -24.7074],
        imagem: "imagens/guerra_iguape.jpg",
        wikipedia: "https://pt.wikipedia.org/wiki/Guerra_de_Iguape"
    },
    {
        nome: "Confederação dos Tamoios (1554-1567)",
        descricao: "Revolta de indígenas contra os portugueses.",
        coordenadas: [-44.5588, -23.0115],
        imagem: "imagens/confederacao_tamoios.jpg",
        wikipedia: "https://pt.wikipedia.org/wiki/Confedera%C3%A7%C3%A3o_dos_Tamoios"
    },
    {
        nome: "Guerra dos Aimorés (1555-1673)",
        descricao: "Conflito entre portugueses e indígenas Aimorés.",
        coordenadas: [-39.3200, -17.7300], // Região aproximada no Espírito Santo/Bahia
        imagem: "imagens/guerra_aimores.jpg",
        wikipedia: "https://pt.wikipedia.org/wiki/Guerra_dos_Aimor%C3%A9s"
    }
];

// Adicionando marcadores no mapa
guerras.forEach(guerra => {
    const marker = new mapboxgl.Marker()
        .setLngLat(guerra.coordenadas)
        .setPopup(new mapboxgl.Popup().setHTML(`
            <div style="text-align: center;">
                <h3>${guerra.nome}</h3>
                <p>${guerra.descricao}</p>
                <img src="${guerra.imagem}" class="popup-img">
                <br>
                <a href="#" onclick="abrirSidebar('${guerra.wikipedia}')" class="popup-link">Saiba mais</a>
            </div>
        `))
        .addTo(map);
});

// Função para abrir a barra lateral com o conteúdo da Wikipedia
function abrirSidebar(url) {
    const sidebar = document.getElementById("sidebar");
    const iframe = document.getElementById("sidebarContent");

    // Exibe a barra lateral
    sidebar.style.display = "block";
    sidebar.classList.add("open");

    // Carrega o conteúdo da Wikipedia no iframe
    iframe.src = url;
}

// Função para alternar a barra lateral (expandir/recolher)
const sidebarToggle = document.getElementById("sidebar-toggle");
sidebarToggle.addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    const isOpen = sidebar.classList.contains("open");

    if (isOpen) {
        sidebar.classList.remove("open");
        sidebar.style.display = "none"; // Retraí a barra lateral
    } else {
        sidebar.classList.add("open");
        sidebar.style.display = "block"; // Expande a barra lateral
    }
});

// Função para fechar a barra lateral ao clicar no botão "X"
const closeSidebar = document.getElementById("close-sidebar");
closeSidebar.addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.remove("open");
    sidebar.style.display = "none"; // Fecha a barra lateral
});
