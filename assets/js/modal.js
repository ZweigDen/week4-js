export default {
    template: `<div class="modal-dialog modal-xl" role="document">
    <div class="modal-content border-light">
        <div class="modal-header bg-dark text-white">
            <h5 id="exampleModalLabel" class="modal-title">
                <span>新增桌遊</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-sm-12">
                    <div class="form-row">
                        <div class="form-group col-sm-6">
                            <label for="title">桌遊名稱</label>
                            <input id="title" v-model="tempProduct.title" type="text"
                                class="form-control" placeholder="請輸入桌遊名稱">
                        </div>
                        <div class="form-group col-sm-6">
                            <label for="imageUrl">輸入圖片網址</label>
                            <input id="imageUrl" v-model="tempProduct.imageUrl[0]" type="text"
                                class="form-control" placeholder="請輸入圖片連結">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="category">分類</label>
                            <select class="form-control" id="category" v-model="tempProduct.category">
                                <option>兒童遊戲</option>
                                <option>派對遊戲</option>
                                <option>抽象棋類</option>
                                <option>策略遊戲</option>
                                <option>戰爭遊戲</option>
                                <option>卡牌構築</option>
                                <option>情境遊戲</option>
                                <option>家庭遊戲</option>
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="unit">遊戲難度</label>
                            <input id="unit" v-model="tempProduct.unit" type="number"
                                class="form-control" placeholder="請輸入０～５">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="origin_price">ＢＧＧ排名</label>
                            <input id="origin_price" v-model="tempProduct.origin_price" type="number"
                                class="form-control" placeholder="請輸入排名">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">售價</label>
                            <input id="price" v-model="tempProduct.price" type="number"
                                class="form-control" placeholder="請輸入售價">
                        </div>
                    </div>
                    <hr>

                    <div class="form-group">
                        <label for="description">遊戲描述</label>
                        <textarea id="description" v-model="tempProduct.description" type="text"
                            class="form-control" placeholder="請輸入產品描述">
    </textarea>
                    </div>
                    <div class="form-group">
                        <label for="content">說明內容</label>
                        <textarea id="content" v-model="tempProduct.content" type="text"
                            class="form-control" placeholder="請輸入說明內容">
    </textarea>
                    </div>
                    <img class="img-fluid" :src="tempProduct.imageUrl" alt>
                    <div class="form-group">
                        <div class="form-check text-center">
                            <input id="enabled" v-model="tempProduct.enabled" class="form-check-input"
                                type="checkbox" :true-value="1" :false-value="0">
                            <label class="form-check-label" for="enabled">是否有文字需求</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
                取消
            </button>
            <button type="button" class="btn btn-dark" @click="updateProduct">
                確認
            </button>
        </div>
    </div>
</div>`,
    props: ['tempProduct', 'api'],
    data() {
        return {

        }
    },
    methods: {
        updateProduct() {
            if (this.tempProduct.id) {
                const url = `${this.api.path}/${this.api.uuid}/admin/ec/product/${this.tempProduct.id}`;
                axios.patch(url, this.tempProduct)//更新單筆資料
                        .then(res => {
                            this.$emit('update');
                        });
            } else {
                const id = new Date().getTime();
                const url = `${this.api.path}/${this.api.uuid}/admin/ec/product`
                this.tempProduct.id = id;
                axios.post(url, this.tempProduct)//新增商品
                    .then(res => {
                        this.$emit('update');
                    });
            };
            
            $('#productModal').modal('hide');  
        }
    }
}
