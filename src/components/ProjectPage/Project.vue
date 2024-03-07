<template>
    <div class="flex flex-row w-full bg-white shadow-default px-[16px] py-[11px]">
        <img src="@/assets/arrow-left1.svg" alt="">
        <h1 class="text-xl font-semibold ml-[12px]">@italent</h1>
    </div>
    <div class="flex flex-col  w-full bg-background px-[20px] pb-[200px]">
        <div class="my-[24px]">
            <img src="@/assets/Logo.svg" alt="">
        </div>
        <!-- название -->
        <div class="flex flex-col mb-[24px]">
            <h1 class="flex flex-row justify-between font-semibold">Italant
                <button class="bg-white border-[1px] py-[3px] px-[15px] rounded-[8px]">Venture Capital
                </button>
            </h1>
            <h2>Teamwork is powerful</h2>
        </div>
        <!-- подписаться    подедиться    огоньки -->
        <div class="flex flex-row justify-between gap-[29.5px] mb-[16px]">
            <button class="w-3/5 py-[13px] px-[20px] follow_button text-white">Подписаться</button>
            <button class="w-1/5 px-[19px] py-[14px] chat_button"><img src="@/assets/share.svg" alt=""></button>
            <button class="w-1/5 flame_btn"><img src="@/assets/flame.svg" alt=""></button>

        </div>
        <!-- переход в чат  -->
        <div class="w-full mb-[48px]">
            <button
                class="chat_button w-full gap-[24px] flex flex-row justify-center rounded-[12px] py-[16px] px-[20px] "><img
                    src="@/assets/projectChat.svg"> Обсуждение проекта</button>
        </div>
        <!-- слайдер -->
        <a-carousel autoplay class="slider">
            <div style="height:;">
                <h3>1</h3>
            </div>
            <div style="height:;">
                <h3>2</h3>
            </div>
            <div style="height:;">
                <h3>3</h3>
            </div>
            <div style="height:x;">
                <h3>4</h3>
            </div>
        </a-carousel>

        <!-- переключатель -->
        <div class="flex w-full  mt-[24px] gap-[8px]">
            <button class="bg-hover w-1/3 px-[12px] py-[6px] text-textProject rounded-[8px]">Инвестиции</button>
            <button class="bg-hover w-1/3 px-[12px] py-[6px] text-textProject rounded-[8px]">Стартапы</button>
            <button class="bg-hover w-1/3 px-[12px] py-[6px] text-textProject rounded-[8px]">Нетворкинг</button>
        </div>
        <div class="mb-[48px]">
            <h1 class="mb-[12px]">Собери команду в 2 клика</h1>
            <p class="mb-[24px]">В России полно талантливых ребят, готовых с горящими глазами отдавать себя целиком,
                создавая поистине
                инновационные продукты, сервисы.</p>
            <p class="mb-[24px]">Но сила в синергии, у всех известных безумцев совершивших переворот в IT индустрии были
                напарники.</p>
            <p class="mb-[24px]">У нас вы найдёте команду, чтобы объединиться и создать продукт, который изменит мир!</p>
        </div>
        <!--  -->

        <!-- Заявки -->
        <div class="flex flex-row justify-between items-center mb-[8px]">
            <h3 class="text-lg font-medium">Наша команда:</h3>
            <button class="px-[16px] py-[11px] bg-marine text-white rounded-[8px]">Заявки</button>
        </div>
        <!--  -->

        <!-- Команда -->
        <div class="flex flex-col bg-white rounded-[12px] mb-[48px]">
            <div class="flex flex-row items-center justify-between py-[16px] pl-[16px] pr-[9px]">
                <span style="padding: 5.55px 3.7px 2.775px 4.625px;" class="m-[6px] rounded-full border-[1px]">
                    <img class="m-[7px]" src="@/assets/ava.svg" alt="">
                </span>
                <div class="flex-1 flex flex-col ml-[16px]">
                    <h1>Евгений Анисимов </h1>
                    <h2>Database ninja</h2>
                </div>
                <img src="@/assets/iconRight.svg" alt="">
            </div>
            <hr />
            <div class="flex flex-row items-center justify-between py-[16px] pl-[16px] pr-[9px]">
                <span style="padding: 5.55px 3.7px 2.775px 4.625px;" class="m-[6px] rounded-full border-[1px]">
                    <img class="m-[7px]" src="@/assets/ava.svg" alt="">
                </span>
                <div class="flex-1 flex flex-col ml-[16px]">
                    <h1>Евгений Анисимов </h1>
                    <h2>Database ninja</h2>
                </div>
                <img src="@/assets/iconRight.svg" alt="">
            </div>
            <hr />
            <div class="flex flex-row items-center justify-between py-[16px] pl-[16px] pr-[9px]">
                <span style="padding: 5.55px 3.7px 2.775px 4.625px;" class="m-[6px] rounded-full border-[1px]">
                    <img class="m-[7px]" src="@/assets/ava.svg" alt="">
                </span>
                <div class="flex-1 flex flex-col ml-[16px]">
                    <h1>Евгений Анисимов </h1>
                    <h2>Database ninja</h2>
                </div>
                <img src="@/assets/iconRight.svg" alt="">
            </div>
        </div>
        <!--  -->

        <!-- Ваансии -->
        <div class="mb-[48px]">
            <h3>Будем рады видеть в команде:</h3>
            <div class="mb-[8px] py-[23px] px-[20px] rounded-[12px] bg-white flex justify-between items-center">
                <div class="bg-hover px-[20px] rounded-[12px] py-[10px] gap-[10px] flex flex-row">
                    <img src="@/assets/vakansiya.svg" alt=""> Driver
                </div>
                <button class="flex flex-row gap-[5px]">Подробнее <img src="@/assets/podrobnee.svg" alt=""></button>
            </div>
            <div class="py-[23px] px-[20px] rounded-[12px] bg-white flex justify-between items-center">
                <div class="bg-hover px-[20px] rounded-[12px] py-[10px] gap-[10px] flex flex-row">
                    <img src="@/assets/vakansiya.svg" alt=""> Driver
                </div>
                <button class="flex flex-row gap-[5px]">Подробнее <img src="@/assets/podrobnee.svg" alt=""></button>
            </div>
        </div>
        <!--  -->

        <!-- Этап -->
        <div class="mb-[48px]">
            <h3>Мы сейчас на этоп этапе:</h3>
            <div class="bg-white rounded-[12px] p-[20px]">
                <div class="">
                    <!-- step -->
                </div>
                <div class="flex flex-row mb-[8px]">
                    <span class="px-[2.5px] rounded-[8px] bg-marine"></span>
                    <h1 class="px-[10px] py-[7px] font-medium">Сид-Раунд (Seed-раунд)</h1>
                </div>
                <div class="text-xs font-medium">
                    <p class="mb-[24px]">На этой стадии привлекают от 25 тыс до
                        1 млн $.
                        Деньги нужны для того, чтобы завершить разработку прототипа или довести его до требований рынка</p>
                    <p class="mb-[24px]">Главный продукт - программа, итогом сид раунда должен стать финальный релиз
                        программы.
                    </p>
                    <p class="mb-[24px]">Основная сложность - показать инвесторам перспективы проекта и правильно оценить
                        необходимый объем финансирования.
                    </p>
                </div>

            </div>
        </div>

        <!-- Вложенные ссылки -->
        <div class="">
            <div class="flex flex-row gap-[20px]">
                <h3>Вложенные файлы и ссылки</h3>
                <p class="text-optional">3 / 6</p>
            </div>
            <div class=" grid grid-cols-2 gap-[12px]">
                <div class="bg-white py-[20px] pl-[20px] pr-[10px] rounded-[12px] cols-span-1 ">
                    <div class="flex flex-row gap-[10px] items-center">
                        <img src="@/assets/player.svg" alt="">
                        <p class="text-optional">12 Mb</p>
                    </div>
                    <h4 class="text-marine text-sm font-medium mt-[16px]">Демонстрация продукта</h4>
                </div>
                <div class="bg-white py-[20px] pl-[20px] pr-[10px] rounded-[12px] cols-span-1 ">
                    <div class="flex flex-row gap-[10px] items-center">
                        <span class="bg-marine text-white rounded-[5px] py-[8px] px-[6px]">PPT</span>
                        <p class="text-optional">12 Mb</p>
                    </div>
                    <h4 class="text-marine text-sm font-medium mt-[16px]">Привлечение инвестиций</h4>
                </div>
                <div class="bg-white py-[20px] pl-[20px] pr-[10px] rounded-[12px] cols-span-1 ">
                    <div class="flex flex-row gap-[10px] items-center">
                        <img src="@/assets/youtube.svg" alt="">
                        <p class="text-optional">12mb</p>
                    </div>
                    <h4 class="text-marine text-sm font-medium mt-[16px]">Промо ролик для социальных сетей</h4>
                </div>
            </div>

        </div>


        <!-- Краудинвестинг -->
        <div class="">
            <h3>Краудинвестинг:</h3>
            <div class="flex flex-row mt-[16px]">
                <img src="@/assets/question.svg" />
                <p class="ml-[8px] text-xs text-optional">Что такое Краудинвестинг и почему он может быть вам интересен?
                    <span class="text-marine">Узнать</span>
                </p>
            </div>
            <div class="bg-white rounded-[12px] px-[20px] py-[30px] ">
                <div class="flex flex-row gap-[7px]">
                    <div class="bg-hover rounded-[12px] w-4/5">
                        <h5 class="ml-[20px] mt-[18px] mr-[15px] mb-[17px]">Участники сообщества могут приобрести долю в
                            нашем проекте.</h5>
                    </div>
                    <div class="bg-hover rounded-[12px] flex w-4/12 justify-center items-center">
                        <h1 class="_h1">до <h5 class="_h5">20%</h5>
                        </h1>
                    </div>
                </div>
                <div class="mb-4">
                    <ToggleSwitch @change="handleChange" />
                </div>
                <div class="pb-[12px] bg-white flex justify-between items-center">
                    <div class="border-[1.5px] border-hover text-marine px-[20px] rounded-[8px] py-[10px]">
                        от $100
                    </div>
                    <h1>Минимальный взнос</h1>
                </div>
                <div class="pb-[12px] bg-white flex justify-between items-center">
                    <div class="border-[1.5px] border-hover text-marine px-[20px] rounded-[8px] py-[10px]">
                        $20 000
                    </div>
                    <h1>Общая стоимость доли</h1>
                </div>
                <div class="pb-[12px] bg-white flex justify-between items-center">
                    <div class="border-[1.5px] border-hover text-marine px-[20px] rounded-[8px] py-[10px]">
                        $16 000
                    </div>
                    <h1>Доступно к покупке</h1>
                </div>
                <div class="pb-[12px] bg-white flex justify-between items-center">
                    <div class="border-[1.5px] border-hover text-marine px-[20px] rounded-[8px] py-[10px]">
                        $4 000
                    </div>
                    <h1>Сумма выкупленной доли</h1>
                </div>
                <button class="w-full py-[13px] px-[20px] follow_button text-white">Приобрести долю в проекте</button>
                <ProjectQuestion />

                <div class=" grid grid-cols-2 gap-[12px]">
                    <div class="bg-white py-[20px] pl-[20px] pr-[10px] rounded-[12px] cols-span-1 ">
                        <div class="flex flex-row gap-[10px] items-center">
                            <img src="@/assets/youtube.svg" alt="">
                            <p class="text-optional">12 Mb</p>
                        </div>
                        <h4 class="text-marine text-sm font-medium mt-[16px]">Демонстрация продукта</h4>
                    </div>
                    <div class="bg-white py-[20px] pl-[20px] pr-[10px] rounded-[12px] cols-span-1 ">
                        <div class="flex flex-row gap-[10px] items-center">
                            <span class="bg-marine text-white rounded-[5px] py-[8px] px-[6px]">PPT</span>
                            <p class="text-optional">12 Mb</p>
                        </div>
                        <h4 class="text-marine text-sm font-medium mt-[16px]">Привлечение инвестиций</h4>
                    </div>
                </div>

                <button
                    class="w-full py-[13px] px-[20px] border-[1px] shadow-default rounded-[12px]   text-black">Приобрести
                    долю в проекте</button>
                <ProjectContribution />

            </div>
            <ProjectComment />

            <ProjectBlog />
        </div>
        <!--  -->
    </div>
</template>

<script>
import ProjectBlog from '@/components/ProjectPage/ProjectBlog.vue';
import ProjectComment from '@/components/ProjectPage/ProjectComment.vue'
import ProjectQuestion from '@/components/ProjectPage/ProjectQuestion.vue';
import ToggleSwitch from '@/components/ProjectPage/ToggleSwitch.vue';
import ProjectContribution from '@/components/ProjectPage/ProjectContibution.vue'
export default {
    name: 'project-page',
    components: {
        ToggleSwitch, ProjectQuestion, ProjectContribution, ProjectComment, ProjectBlog
    },
    methods: {
        handleToggleChange(toggled) {
            console.log('Toggle is now: ' + toggled);
        }
    }
}
</script>

<style>
._h5 {
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

._h1 {
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
    /* 107.692% */
    letter-spacing: 0.13px;
}

.flame_btn {
    display: flex;
    width: 62px;
    height: 52px;
    padding: 11px 16px 10px 15px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 2px 12px 12px 12px;
    border: 1px solid #FFAF13;
    background: linear-gradient(97deg, #FFAF13 -0.02%, #FF7313 94.31%);
    box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.20) inset, 0px 9px 9px -9px #FF7C13;
}

.chat_button {
    border-radius: 12px;
    border: 1px solid rgba(158, 158, 158, 0.20);
    background: var(--Background-Surface, #FFF);

    /* Button Smooth Shadow */
    box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.20) inset, 0px 23px 10px -23px rgba(0, 0, 0, 0.15);
}

.follow_button {
    border-radius: 12px;
    border: 1px solid #12B7EC;
    background: linear-gradient(97deg, #13D5FF -0.02%, #12A1DE 94.31%);
    box-shadow: 0px 17px 19px -17px #29B6F6;
}

:deep(.slick-slide) {
    text-align: center;
    line-height: 160px;
    background-color: antiquewhite;
    overflow: hidden;
}

:deep(.slick-slide h3) {
    color: #ab7070;

}

:deep(.slick-dots li button) {
    border-radius: 50%;
    width: 10px;
    height: 10px;
    margin-top: -30px;
}

.slider div {
    height: 30vh;
}

.range_slider {
    height: 24px;
    background-color: #12A1DE;
}

.range_slider::-webkit-slider-thumb {
    width: 30px;
    height: 28px;
    color: #FF7313;
}
</style>
