<template>
    <div class="row">
        <div class="col-sm-6">
            <h3>{{ title }}</h3>
            <form @submit.prevent="saveItem">
                <div class="row mb-3">
                    <label class="col-sm-2 col-form-label">Başlık</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" v-model="item.baslik" required>
                    </div>
                </div>

                <div class="row mb-3">
                    <label class="col-sm-2 col-form-label">Kategori</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" v-model="item.kategori">
                    </div>
                </div>

                <div class="row mb-3">
                    <label class="col-sm-2 col-form-label">Adet</label>
                    <div class="col-sm-10">
                        <input type="number" class="form-control" v-model="item.adet">
                    </div>
                </div>

                <div class="row mb-3">
                    <label class="col-sm-2 col-form-label">Fiyat</label>
                    <div class="col-sm-10">
                        <input type="number" class="form-control" v-model="item.fiyat" required>
                    </div>
                </div>

                <div class="row">
                    <div class="offset-sm-2 col-sm-2">
                        <button type="submit" class="btn btn-primary">Kaydet</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>


<script>

export default {
    name: 'EnvanterForm',
    props: {
        title: {
            type: String,
            required: true,
            default: 'Yeni Kayıt'
        }
    },
    data(){
        return {
            item: {
                baslik: '',
                kategori: '',
                adet: 0,
                fiyat: 0,
                arsiv: false
            }
        }
    },
    methods: {
        saveItem(){
            if(!this.item.baslik || !this.item.fiyat) return;

            this.item.id = this.$parent.$data.allItems.length + 1;
            this.$emit('save-item', this.item);

            this.item = {
                baslik: '',
                kategori: '',
                adet: 0,
                fiyat: 0,
                arsiv: false
            };
        }
    }


}



</script>