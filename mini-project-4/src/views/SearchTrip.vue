<template>
    <div class="container">
        <h2>Hareket Noktaları</h2>
        <form @submit.prevent="sefer_ara">
            <div class="row align-items-center g-2">
                <div class="col-sm-2">
                    <label class="form-label">Kalkış Noktası</label>
                    <select class="form-select" v-model="kalkis_noktasi">
                        <option value="">Seçiniz</option>
                        <option v-for="(item, index) in hareket_noktalari" :key="index" :value="item.id">
                            {{ item.aciklama }}
                        </option>
                    </select>
                </div>
                <div class="col-sm-2">
                    <label class="form-label">Varış Noktası</label>
                    <select class="form-select" v-model="varis_noktasi">
                        <option value="">Seçiniz</option>
                        <option v-for="(item, index) in hareket_noktalari" :key="index" :value="item.id">
                            {{ item.aciklama }}
                        </option>
                    </select>
                </div>
                <div class="col-sm-2">
                    <label class="form-label">Gidiş Tarihi</label>
                    <input type="date" class="form-control" v-model="gidis_tarihi">
                </div>
                <div class="col-auto">
                    <label class="form-label d-block">&nbsp;</label>
                    <button type="submit" class="btn btn-primary w-100">Ara</button>
                </div>
            </div>
        </form>

        <hr>

        <div v-if="isLoading">Seferler Yükleniyor...</div>
        {{ mesaj }}

        <div v-if="bulunan_seferler.length">
            <h2>Sefer Listesi</h2>
            <table class="table table-hover">
                <tr v-for="(item, index) in bulunan_seferler" :key="index">
                    <td>
                        Kalkış Saati
                        <h4>{{ getSaat(item.kalkis_tarihi) }}</h4>
                    </td>
                    <td>
                        Bilet Fiyatı
                        <h4>{{ item.bilet_fiyati }} ₺</h4>
                    </td>
                    <td>
                        <button class="btn btn-success btn-sm" @click="sefer_sec(item.id)">
                            Koltuk Seç
                        </button>
                    </td>
                </tr>
            </table>
        </div>
    </div>

</template>

<script>
import db from '../assets/db.json';

export default {
    name: 'SearchTripView',
    props: {
        msg: String
    },
    data() {
        return {
            kalkis_noktasi: '',
            varis_noktasi: '',
            gidis_tarihi: '',
            hareket_noktalari: [],
            seferler: [],
            bulunan_seferler: [],
            isLoading: false,
            mesaj: ''
        }
    },
    created() {
        this.hareket_noktalari = db.hareket_noktalari;
        this.seferler = db.seferler;
        console.log(this.hareket_noktalari);
    },
    methods: {
        sefer_ara() {
            this.isLoading = true;
            this.bulunan_seferler = this.seferler.filter(x =>
                x.kalkis_noktasi === this.kalkis_noktasi &&
                x.varis_noktasi === this.varis_noktasi &&
                this.getTarih(x.kalkis_tarihi) === this.getTarih(this.gidis_tarihi)
            );
            if (this.bulunan_seferler.length === 0) {
                this.mesaj = 'Bir sefer bulunamadı!';
            }
            else{
                this.mesaj = '';
            }
            this.isLoading = false;
        },
        getTarih(val) {
            var tarihsaat = new Date(val);
            var tarih = tarihsaat.getFullYear() + '-' +
                ('0' + tarihsaat.getMonth()).slice(-2) + '-' +
                ('0' + tarihsaat.getDate()).slice(-2);
            return tarih;
        },
        getSaat(val) {
            var tarihsaat = new Date(val);
            var saat = ('0' + tarihsaat.getHours()).slice(-2) + ':' +
                ('0' + tarihsaat.getMinutes()).slice(-2);
            return saat;
        },
        sefer_sec(sefer_id) {
            this.$router.push({ name: 'selectseat', params: { sefer_id } });
        }
    }
}
</script>