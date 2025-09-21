<template>
                <div class="col">
              <h3>{{ title }}</h3>
              <div class="table-responsive">
                <table class="table table-sm table-hover">
                  <thead class="table-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Başlık</th>
                      <th scope="col">Kategori</th>
                      <th scope="col">Adet</th>
                      <th scope="col">Fiyat</th>
                      <th scope="col">İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="!envanterList.length">
                      <td colspan="6" class="text-center">Listede kayıt yok</td>
                    </tr>
                    <tr v-for="(item, index) in envanterList" :key="index">
                      <th scope="row">{{ item.id }}</th>
                      <td>{{ item.baslik }}</td>
                      <td>{{ item.kategori }}</td>
                      <td>{{ item.adet }}</td>
                      <td>{{ item.fiyat }} TL</td>
                      <td>
                        <button class="btn btn-sm btn-danger me-1" @click=deleteItem(item.id)>Sil</button>
                        <button class="btn btn-sm btn-secondary me-1" @click="changeItemStatus(item)" v-if="!item.arsiv">Arşiv</button>
                        <button class="btn btn-sm btn-info" @click="changeItemStatus(item)" v-if="item.arsiv">Arşivden Kaldır</button>
                      </td>
                    </tr>
                    <tr v-if="envanterList.length">
                      <td colspan="3" class="fw-bold">Toplam</td>
                      <td class="fw-bold">{{ totalAdet }}</td>
                      <td colspan="2" class="fw-bold">{{ totalFiyat }} TL</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            
            
            </div>

</template>


<script>


export default {
  name: 'EnvanterList',
  props: {
    envanterList: {
      type: Array,
      required: true,
      default: () => []
    },
    title: {
      type: String,
      required: true,
      default: 'Liste'
    }

  },
  methods:{
    changeItemStatus(item) {
        item.arsiv = !item.arsiv;
    },
    deleteItem(itemId){
        // this.$parent.$data.allItems = this.$parent.$data.allItems.filter(item => item.id !== itemId);
        this.$emit('delete-item', itemId);
        
        
    }
    

  },
    computed: {
        totalAdet() {
            return this.envanterList.reduce((sum, item) => sum + parseInt(item.adet), 0);

        },
        totalFiyat() {
            return this.envanterList.reduce((sum, item) => sum + parseInt(item.fiyat), 0);
        }
    },  
}


</script>