const url = "https://api.coincap.io/v2/assets";
const limit = 5;

export const getCoin = async () => {
  const resp = await fetch(
    `${url}?limit=${limit}&ids=bitcoin,ethereum,tether,cardano,polkadot`
  );
  const { data } = await resp.json();

  return data;
};
