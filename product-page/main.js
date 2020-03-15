/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
        <div class="product">
        <div>
          <img v-bind:src="image" class="product-image">
        </div>

        <div class="product-info">
          <h1>{{ title }}</h1>
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
          <p>Shipping: {{ shipping }}</p>

          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>

          <div v-for="(variant, index) in variants"
               :key="variant.variantID"
               class="color-box"
               :style="{ backgroundColor: variant.variantColor }"
               @mouseover="updateProduct(index)">
          </div>

          <button v-on:click="addToCart"
                  :disabled="!inStock"
                  :class="{ disabledButton: !inStock }">Add to Cart</button>
        </div>
      </div>
  `,
  data() {
    return {
      brand: 'Dejou',
      product: 'Knit Scarf',
      selectedVariant: 0,
      details: ['80% cotton', '20% polyester', 'warm and soft'],
      variants: [
        {
          variantID: 2234,
          variantColor: 'rgb(97, 65, 65)',
          variantImage: './images/fringescarf1.jpg',
          variantQuantity: 10
        },
        {
          variantID: 2235,
          variantColor: 'rgb(150, 118, 118)',
          variantImage: './images/ribbedscarf1.jpg',
          variantQuantity: 0
        }
      ]
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantID)
    },
    updateProduct(index) {
      this.selectedVariant = index
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].variantImage
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity
    },
    shipping() {
      if (this.premium) {
        return "Free"
      }
      return "2.99"
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: false,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    }
  }
})
