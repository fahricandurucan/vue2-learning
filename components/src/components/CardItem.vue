<template>
  <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <div class="card" style="height: 400px">
            <img class="card-img-top img-fluid" :src="item.imageUrl" alt="Card image cap" style="height: 180px">
            <div class="card-body">
                <h3 class="card-title" v-text="item.title"></h3>
                <p class="card-text" v-text="item.description"></p>
            </div>
            <div class="card-footer">
                <a href="javascript:" class="btn btn-primary" @click="showDetail">Detay</a>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from "bootstrap";
import Vue from "vue";

window.EventBus = new Vue();

export default {
    name: 'CardItem',
    props: {
        item: {required: true, default: {}}

    },
    methods: {
        showDetail() {
            const modalEl = document.getElementById('itemModalDetail');
            this.userModal = new Modal(modalEl);
            this.userModal.show();
            window.EventBus.$emit('show-modal', this.item);
            
        }
    }
}

</script>