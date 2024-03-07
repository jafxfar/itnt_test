<template>
    <v-row class="container pa-0 ma-0" justify="center" align="center">
        <v-col>
            <v-card class="card pl-8 pr-8 pt-3 pb-3">
                <p class="card-title ma-0">Пользовательское соглашение</p>
                <div class="card-content mt-2">
                    <p class="card-content-text pr-5 ma-0">
                        к iTalent (временно или навсегда). Будет не круто, поэтому используй приложение с умом и по
                        правилам. <br />
                        <br />
                        Третье правило: всякое бывает. Мы живём в непредсказуемом мире. Если случится какая-нибудь
                        безумная хрень (войны, землетрясения, наводнения, порабощение человечества искусственным
                        интеллектом… ну ладно, про интеллект я загнул, надеюсь), ни ты, ни компания не будете нести
                        ответственности за невыполнение обязательств. Да, в жизни бывает всякая фигня. Мы постарались
                        сделать соглашение максимально простым с юридической точки зрения, а также добавили пояснения
                        нормальным человеческим языком (сами знаем, многим юридическим документам этого очень не
                        хватает).
                    </p>
                </div>
            </v-card>
            <div class="pl-2 pr-2">
                <UiButton @click="$router.push('/entry')" block x-large class="button-next mt-7">
                    Я согласен, продолжить
                </UiButton>
                <UiButton
                    @click="$router.back()"
                    block
                    x-large
                    class="button-prev text-capitalize font-weight-regular mt-7"
                >
                    Вернуться
                </UiButton>
            </div>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import UiButton from '~/components/ui-kit/UiButton.vue'
</script>

<style scoped>
.container {
    height: 100vh;
}
.card {
    background: #ffffff !important;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05) !important;
    border-radius: 12px !important;
}
.card-title {
    font-size: 18px;
    line-height: 22px;
    color: #000000;
}
.card-content {
    height: 261px;
    overflow: scroll;
}
.card-content-text {
    font-size: 14px;
    line-height: 18px;
    color: #9e9e9e;
    max-width: 268px;
    word-break: break-word;
}
.button-next {
    background: linear-gradient(96.78deg, #13d5ff -0.02%, #12a1de 94.31%) !important;
    border: 1px solid #12b7ec !important;
    box-shadow: 0 22px 22px -17px #29b6f6 !important;
    border-radius: 12px !important;
    font-size: 18px !important;
    line-height: 22px;
    color: #ffffff;
}
.button-prev {
    background: #ffffff !important;
    border: 1px solid rgba(158, 158, 158, 0.2) !important;
    box-shadow: 0 23px 10px -23px rgba(0, 0, 0, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.2) !important;
    border-radius: 12px !important;
    font-size: 18px !important;
    line-height: 22px;
    color: #263238;
}
</style>
