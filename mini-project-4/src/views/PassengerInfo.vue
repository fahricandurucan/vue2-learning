<template>
    <div class="container">
        <h2>Yolcu Bilgileri</h2>
        <form method="post" action="#" @submit.prevent="odeme_bilgileri">
            <div v-for="(item, index) in secilen_koltuklar" :key="index" class="row g-2 align-items-center mb-3">

                <div class="col-auto">
                    <label class="form-label" for="koltuk">Koltuk Numarası</label>
                    <input type="text" class="form-control" v-model="item.numara" id="koltuk" readonly>
                </div>

                <div class="col-auto">
                    <label class="form-label" for="fiyat">Fiyat</label>
                    <input type="text" class="form-control" v-model="secilen_sefer.bilet_fiyati" id="fiyat" readonly>
                </div>

                <div class="col-auto">
                    <label class="form-label" for="tck">TCK</label>
                    <input type="text" class="form-control" name="tck" id="tck">
                </div>

                <div class="col-auto">
                    <label class="form-label" for="adsoyad">Ad Soyad</label>
                    <input type="text" class="form-control" name="adsoyad" id="adsoyad">
                </div>

                <div class="col-auto">
                    <label class="form-label" for="cinsiyet">Cinsiyet</label>
                    <input type="text" class="form-control" name="cinsiyet" id="cinsiyet">
                </div>

            </div>

            <div class="text-end">
                <button type="submit" class="btn btn-success">
                    Ödeme Bilgilerini Gir
                </button>
            </div>
        </form>
    </div>

</template>

<script>
import { GlobalData } from '../main';

export default {
    name: 'PassengerInfoView',
    data() {
        return {
            secilen_sefer: {},
            secilen_koltuklar: []
        }
    },
    created() {
        if (GlobalData.secilen_sefer == null)
            this.$router.push({ name: 'searchtrip' });

        this.secilen_sefer = GlobalData.secilen_sefer;
        this.secilen_koltuklar = GlobalData.secilen_koltuklar;
    },
    methods: {
        odeme_bilgileri() {
            this.$router.push({ name: 'paymentInfo' });
        }
    }
}
</script>