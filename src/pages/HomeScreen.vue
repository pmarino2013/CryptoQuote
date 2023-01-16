<template>
  <div class="container text-white">
    <div class="row mt-5 text-center">
      <div class="col">
        <h1>Cotización criptomonedas</h1>
        <span class="fs-3">En tiempo real</span>
      </div>
    </div>
    <div v-if="isOnline">
      <div class="row">
        <div class="col-12 col-md-6 offset-md-3 my-5">
          <div class="card">
            <div class="card-body">
              <div v-if="coins.length > 0">
                <div
                  v-for="coin in coins"
                  :key="coin.id"
                  class="d-flex justify-content-between align-items-center"
                >
                  <div class="d-flex align-items-center gap-2 mb-2">
                    <img
                      :src="`${url_icon}/${coin.symbol.toLowerCase()}@2x.png`"
                      :alt="coin.name"
                      class="icon-coin"
                    />
                    <h3 class="m-0">{{ coin.name }}:</h3>
                  </div>
                  <span class="fs-3">{{
                    numeral(coin.priceUsd).format("$0,0.00")
                  }}</span>
                </div>
              </div>
              <div v-else>
                <h3>Cargando data...</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-12 col-md-4 mb-3">
          <div class="input-group">
            <input
              type="number"
              aria-label="First name"
              class="form-control"
              v-model="valor"
              min="0"
            />
            <select
              v-model="coinCotizacion"
              class="form-select"
              id="inputGroupSelect01"
            >
              <option
                class="text-end"
                v-for="coin in coins"
                :value="coin.id"
                :key="coin.id"
              >
                {{ coin.id }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">USD</span>
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              v-model="valorCalculado"
              readonly
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row mt-5">
        <div class="col-12 col-md-6 offset-md-3">
          <img
            class="w-100"
            src="../assets/sin_conexion.png"
            alt="sin conexión"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, ref } from "vue";
import numeral from "numeral";
import { getCoin } from "../helpers/fetchAssets";
import { socketPrice } from "../helpers/socketPrice";

const coins = ref([]);
const valor = ref(1);
const coinCotizacion = ref("bitcoin");
const valorCalculado = ref(0);
const isOnline = ref(navigator.onLine);
const url_icon = "https://assets.coincap.io/assets/icons";

const calcular = () => {
  const coin = coins.value.find((item) => {
    return item.id == coinCotizacion.value;
  });
  valorCalculado.value = numeral(coin.priceUsd * valor.value).format("$0,0.00");
};

const traerDatos = async () => {
  coins.value = await getCoin();
  calcular();
};

onMounted(() => {
  if (isOnline.value) {
    traerDatos();
    socketPrice(coins);
  }
});

onUpdated(() => {
  if (isOnline.value) {
    calcular();
  }
});
</script>

<style scope>
.card-body {
  background-color: #20232a;
  border-radius: 0.375rem;
}
.form-control,
.form-select {
  background-color: transparent !important;
  color: white !important;
  font-size: 1.5rem !important;
}

.form-control:focus {
  box-shadow: none;
}

option {
  background-color: #282c34;
}

.icon-coin {
  width: 30px;
}
</style>
