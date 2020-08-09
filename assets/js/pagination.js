export default {
  template: `<nav aria-label="Page navigation example">
    <ul class="pagination d-flex justify-content-center">
      <li class="page-item ">
        <a class="page-link bg-dark text-white border-secondary" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="item in pages.total_pages" :key="item" :class="{active:pages.current_page === item}"><a class="page-link bg-dark text-white border-secondary" href="#" @click.prevent="updatePage(item)">{{item}}</a></li>
      <li class="page-item">
        <a class="page-link bg-dark text-light border-secondary" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`,
  props: ['pages'],
  methods: {
    updatePage(num) {
      this.$emit('updatepage', num);
    }
  }
}