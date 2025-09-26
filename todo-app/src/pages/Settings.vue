<template>
  <q-page padding>
    <div class="text-h4 q-mb-lg">Ayarlar</div>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-8">
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6">Genel</div>
            <div class="text-caption text-grey">Uygulama deneyimini kişiselleştirin</div>
          </q-card-section>
          <q-separator />

          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>Uygulama Dili</q-item-label>
                <q-item-label caption>Arayüz dilini seçin</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-select
                  dense
                  outlined
                  emit-value
                  map-options
                  :options="languageOptions"
                  v-model="form.language"
                  style="min-width: 200px"
                />
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label>Tema</q-item-label>
                <q-item-label caption>Açık / Koyu / Sistem</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-select
                  dense
                  outlined
                  emit-value
                  map-options
                  :options="themeOptions"
                  v-model="form.theme"
                  style="min-width: 200px"
                />
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label>Koyu Tema</q-item-label>
                <q-item-label caption>Tercihinize göre koyu temayı açıp kapatın</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle v-model="form.darkMode" color="primary" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>

        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6">Bildirimler</div>
            <div class="text-caption text-grey">Hangi bildirimleri almak istediğinizi seçin</div>
          </q-card-section>
          <q-separator />
          <q-list>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>E-posta Bildirimleri</q-item-label>
                <q-item-label caption>Önemli güncellemeleri e-posta ile alın</q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-toggle v-model="form.emailNotif" color="primary" />
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>Anlık Bildirimler</q-item-label>
                <q-item-label caption>Cihazınıza bildirim gönderilsin</q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-toggle v-model="form.pushNotif" color="primary" />
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>Haftalık Özet</q-item-label>
                <q-item-label caption>Haftalık aktivite özeti e-postası</q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-toggle v-model="form.summaryEmail" color="primary" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>

        <div class="q-gutter-sm q-mt-md">
          <q-btn color="primary" label="Kaydet" unelevated />
          <q-btn color="grey-8" label="Sıfırla" flat />
        </div>
      </div>

      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <div class="text-h6">Hesap</div>
            <div class="text-caption text-grey">Profil ve güvenlik</div>
          </q-card-section>
          <q-separator />

          <q-list>
            <q-item>
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">U</q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>Kullanıcı Adı</q-item-label>
                <q-item-label caption>user@example.com</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-input dense outlined v-model="form.displayName" label="Görünen Ad" />
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-input dense outlined type="password" v-model="form.password" label="Yeni Şifre" />
              </q-item-section>
            </q-item>
          </q-list>

          <q-separator />
          <q-card-actions align="right">
            <q-btn flat color="negative" label="Hesabı Kaldır" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'SettingsPage',
  data () {
    return {
      form: {
        language: 'tr',
        theme: 'system',
        darkMode: false,
        emailNotif: true,
        pushNotif: true,
        summaryEmail: false,
        displayName: 'User',
        password: ''
      },
      languageOptions: [
        { label: 'Türkçe', value: 'tr' },
        { label: 'English', value: 'en' }
      ],
      themeOptions: [
        { label: 'Sistem Varsayılanı', value: 'system' },
        { label: 'Açık', value: 'light' },
        { label: 'Koyu', value: 'dark' }
      ]
    }
  }
}
</script>
