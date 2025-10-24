if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
   
      const reg = await navigator.serviceWorker.register('/sw.js', { type: "module" });
      console.log('Service Worker registrado!', reg);
    } catch (err) {
      console.log('Falha ao registrar o Service Worker:', err);
    }
  });
}


let posicaoInicial;


const capturarLocalizacao = document.getElementById('localizacao');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');


const sucesso = (posicao) => {
  posicaoInicial = posicao;
  latitude.innerHTML = posicaoInicial.coords.latitude;
  longitude.innerHTML = posicaoInicial.coords.longitude;
};


const erro = (error) => {
  let errorMessage;
  switch (error.code) {
    case 0:
      errorMessage = "Erro desconhecido";
      break;
    case 1:
      errorMessage = "Permissão negada!";
      break;
    case 2:
      errorMessage = "Captura de posição indisponível!";
      break;
    case 3:
      errorMessage = "Tempo de solicitação excedido!";
      break;
    default:
      errorMessage = "Erro inesperado.";
  }

  console.log("Ocorreu um erro: " + errorMessage);
};


capturarLocalizacao.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(sucesso, erro);
});
