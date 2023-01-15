export const socketPrice = (array) => {
  const pricesWs = new WebSocket(
    "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,tether,cardano,polkadot"
  );

  pricesWs.onmessage = function (msg) {
    // console.log(msg.data);
    // traerDatos();
    const datos = JSON.parse(msg.data);
    const { bitcoin, ethereum, tether, cardano, polkadot } = datos;

    array.value.forEach((item) => {
      switch (item.id) {
        case "bitcoin":
          if (bitcoin) {
            item.priceUsd = bitcoin;
          }
          break;
        case "ethereum":
          if (ethereum) {
            item.priceUsd = ethereum;
          }
          break;
        case "tether":
          if (tether) {
            item.priceUsd = tether;
          }
          break;
        case "cardano":
          if (cardano) {
            item.priceUsd = cardano;
          }
          break;
        case "polkadot":
          if (polkadot) {
            item.priceUsd = polkadot;
          }
          break;
      }
    });
  };
};
