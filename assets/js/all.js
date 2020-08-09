import pagination from './pagination.js';
import modal from './modal.js';
import delPro from './delete.js';

Vue.component('pagination', pagination);
Vue.component('modal', modal);
Vue.component('delPro', delPro);

new Vue({
  el: '#app',
  data: {
    products: [

    ],
    tempProduct: {
      imageUrl: []
    },
    pagination: {},
    api: {
      uuid: 'e36c04b7-caa5-4a11-ab85-cd3ab214a719',
      path: 'https://course-ec-api.hexschool.io/api'
    },
    api_token: ''
  },
  methods: {
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
          this.tempProduct = {
            imageUrl: []
          };
          $('#productModal').modal('show');
          break;
        case 'edit':
          const url = `${this.api.path}/${this.api.uuid}/admin/ec/product/${item.id}`;
          axios.get(url)
            .then(res => {
              this.tempProduct = res.data.data;
            });
          this.tempProduct = Object.assign({}, item);
          $('#productModal').modal('show');
          break;
        case 'delete':
          this.tempProduct = Object.assign({}, item);
          $('#delProductModal').modal('show');
          break;
        case 'out':
          $('#signOut').modal('show');
          break;
      }
    },
    signOut() {
      document.cookie = `token=; expires=; path=/`;
      window.location = '/week4-js/login.html';
    },
    getProducts(num = 1) {
      const url = `${this.api.path}/${this.api.uuid}/admin/ec/products?page=${num}&paged=12`;
      axios.get(url)
        .then(res => {
          console.log(res);
          this.products = res.data.data;
          this.pagination = res.data.meta.pagination;

          this.tempProduct = {
            imageUrl: []
          }
        });
    }
  },
  created() {
    this.api_token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.api_token}`;
    this.getProducts();
  }
});

