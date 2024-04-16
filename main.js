// Objeto para controlar o último momento em que cada som foi reproduzido
const lastPlayTimes = {};

// Função para reproduzir um som com um intervalo entre as reproduções
function tocaSom(seletorAudio) {
  const elemento = document.querySelector(seletorAudio);
  if (elemento && elemento.localName === "audio") {
    const agora = new Date().getTime();
    const ultimaReproducao = lastPlayTimes[seletorAudio] || 0;
    const intervaloEntreSons = agora - ultimaReproducao;
    if (intervaloEntreSons > 300) {
      // Limite de 300ms entre as reproduções
      elemento.currentTime = 0; // Reinicia o áudio se já estiver tocando
      elemento.play();
      lastPlayTimes[seletorAudio] = agora;
    }
  } else {
    console.log("Elemento ou seletor não encontrado.");
  }
}

// Adicionando evento de clique aos botões do teclado
document.querySelectorAll(".tecla").forEach(function (tecla) {
  tecla.addEventListener("click", function () {
    const somId = `#som_${tecla.classList[1]}`;
    tocaSom(somId);
    tecla.classList.add("ativa");
    setTimeout(() => {
      tecla.classList.remove("ativa");
    }, 150);
  });
});

// Adicionando evento de teclado ao documento
document.addEventListener("keydown", function (evento) {
  // Mapeando as teclas do teclado para os sons correspondentes
  const teclas = {
    KeyR: "pom",
    KeyF: "puff",
    KeyI: "tim",
    KeyY: "clap",
    KeyH: "splash",
    KeyK: "toim",
    KeyC: "psh",
    KeyB: "tic",
    KeyM: "tom",
  };

  // Verificando se a tecla pressionada corresponde a um som mapeado
  if (teclas[evento.code]) {
    const tecla = document.querySelector(`.tecla.tecla_${teclas[evento.code]}`);
    if (tecla) {
      const somId = `#som_tecla_${teclas[evento.code]}`;
      tocaSom(somId);
      tecla.classList.add("ativa");
      setTimeout(() => {
        tecla.classList.remove("ativa");
      }, 150);
    }
  }
});

let isPlaying = false; // Variável para controlar se a música está sendo reproduzida

// Função para reproduzir ou pausar a música real
function toggleMusicaReal() {
  const audioReal = document.getElementById("audioReal");
  if (audioReal.paused) {
    audioReal.play();
    isPlaying = true;
  } else {
    audioReal.pause();
    isPlaying = false;
  }
}

// Adicionando evento de clique ao botão de reprodução de música real
document
  .getElementById("autoplayButton")
  .addEventListener("click", function () {
    if (!isPlaying) {
      // Se a música não estiver sendo reproduzida, inicie a reprodução
      reproduzirMusicaReal();
    } else {
      // Se a música estiver sendo reproduzida, pause-a
      toggleMusicaReal();
    }
  });

// Função para reproduzir a música real
function reproduzirMusicaReal() {
  const audioReal = document.getElementById("audioReal");
  audioReal.play();
  isPlaying = true;
}
