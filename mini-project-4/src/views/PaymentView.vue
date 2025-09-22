<template>
    <div class="container">
        <h2>Ödeme Bilgileri</h2>
        <form method="post" action="#" @submit.prevent="odeme_yap">
            <p><b>Toplam Tutar:</b> {{ toplam_tutar }} TL</p>

            <div class="row g-2 align-items-center">
                <div class="col-2">
                    <label class="form-label me-2" for="kk_no">Kart No</label>
                    <input type="text" class="form-control" name="kk_no" id="kk_no">
                </div>

                <div class="col-2">
                    <label class="form-label me-2" for="kk_adsoyad">Ad Soyad</label>
                    <input type="text" class="form-control" name="kk_adsoyad" id="kk_adsoyad">
                </div>

                <div class="col-2">
                    <label class="form-label me-2" for="kk_ccv">CCV</label>
                    <input type="text" class="form-control" name="kk_ccv" id="kk_ccv">
                </div>

                <div class="col-3">
                    <label class="form-label me-2" for="kk_skt_ay">Son Kullanma Tarihi (Ay)</label>
                    <input type="text" class="form-control" name="kk_skt_ay" id="kk_skt_ay">
                </div>

                <div class="col-3">
                    <label class="form-label me-2" for="kk_skt_yil">Son Kullanma Tarihi (Yıl)</label>
                    <input type="text" class="form-control" name="kk_skt_yil" id="kk_skt_yil">
                </div>
            </div>

            <div class="text-end mt-2">
                <button type="submit" class="btn btn-success">
                    Ödeme Yap
                </button>
            </div>
        </form>
    </div>

</template>

<script>
import { GlobalData } from '../main';

export default {
    name: 'PaymentView',
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
    computed: {
        toplam_tutar() {
            if (this.secilen_sefer)
                return this.secilen_sefer.bilet_fiyati * this.secilen_koltuklar.length;
            else
                return 0;
        }
    },
    methods: {
        odeme_yap() {
            alert('Ödemeniz alındı');
            GlobalData.secilen_sefer = null;
            GlobalData.secilen_koltuklar = null;
            this.$router.push({ name: 'searchtrip' });
        }
    }
}
</script>