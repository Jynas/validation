<template>
  <div class="wrapper">
    <img
      :src="require(`../assets/` + getCardType + '.png')"
      v-if="getCardType"
      :key="getCardType"
      alt=""
      class="card-item__typeImg"
    />
    <div class="white__block">
      <div>
        <label for="cardNumber">Card Number</label>
        <input
          type="text"
          id="cardNumber"
          v-model="cardNumber"
          autocomplete="off"
          oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/\s/g,'').replace(/(.{4})/g,'$1 ')"
          maxlength="19"
        />
      </div>
      <div>
        <label for="cardName">Card Name</label>
        <input
          type="text"
          id="cardName"
          v-model="cardName"
          autocomplete="off"
        />
      </div>
      <div>
        <label for="cardDate">Expiration Date</label>
        <select id="cardDate" :value="cardMonth">
          <option value="" disabled selected>Month</option>
          <option
            :value="n < 10 ? '0' + n : n"
            v-for="n in 12"
            :disabled="n < minCardMonth"
            v-bind:key="n"
          >
            {{ n < 10 ? "0" + n : n }}
          </option>
        </select>
        <select id="cardYear" v-model="cardYear">
          <option>Year</option>
          <option
            :value="$index + minCardYear"
            v-for="(n, $index) in 12"
            :key="n"
          >
            {{ $index + minCardYear }}
          </option>
        </select>
      </div>
      <label for="cardCVV">{{ labelCVV }}</label>
      <input type="number" id="cardCVV" autocomplete="off" />
    </div>
  </div>
</template>

<script>
export default {
  name: "validatorCard",
  data() {
    return {
      cardNumber: "",
      cardName: "",
      labelCVV: "",
      cardMonth: "",
      cardYear: "",
      minCardYear: new Date().getFullYear(),
      maxLengthNumber: "3",
    };
  },
  methods: {},
  computed: {
    getCardType() {
      let number = this.cardNumber;
      let re = new RegExp("^4");
      if (number.match(re) != null) return "visa";
      re = new RegExp("^5[1-5]");
      if (number.match(re) != null) return "mastercard";
      re = new RegExp("^2");
      if (number.match(re) != null) return "mir";
      return "visa";
    },
    minCardMonth() {
      if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
      return 1;
    },
  },
  watch: {
    cardYear() {
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = "";
      }
    },
  },
};
</script>

<style scoped>
.card-item__typeImg {
  width: 100px;
  height: 100px;
}
</style>
