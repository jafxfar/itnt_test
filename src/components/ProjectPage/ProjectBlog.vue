<template>
    <div class="py-2 flex justify-center time">
        <p class="date px-[20px] py-[6px] rounded-[20px] text-white bg-optional">Сегодня</p>
    </div>
    <div class=" rounded-[12px] bg-white ">
        <RouterLink to="/blog">
            <div class="flex flex-row  rounded-t-[12px] blog_header">
                <div class="p-4">
                    <p>2 часа назад</p>
                    <h1>Мы запустили собственный сервер!</h1>
                </div>
                <img src="" alt="1">
            </div>
            <div class="mt-16 p-4">
                <h2>Вчера наша талантливая команда прошла очередной рубеж! Мы выходим на IPO!<br />
                    <br />
                    В ближайший год ожидаем тонны новой работы. Больше кофе - Богу кофе!
                </h2>
            </div>
        </RouterLink>
        <div class="flex flex-row justify-start  gap-[29.5px] mb-[16px] p-4">
            <div class="">
                <button class=" px-[19px] py-[17px] share_button"><img src="@/assets/share.svg" alt=""></button>
            </div>
            <RouterLink to="/blog">
                <button class="px-[19px] text-xs py-[6px] chat_button"><img src="@/assets/project_chat.svg">2</button>
            </RouterLink>
            <div class="flex-1 flex justify-end">
                <button class=" flame_btn"><img src="@/assets/flame.svg" alt=""></button>
            </div>
        </div>
    </div>
</template>


<style>
.blog_header {
    display: flex;
    justify-content: space-between;
    /* Распределение контента внутри по вертикали */
    /* Радиус скругления углов */
    color: white;
    /* Цвет текста */
    background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
    /* Градиент начинается с темного сверху и становится прозрачным снизу */
    /* Высота элемента */
    width: auto;
    height: auto;
    /* Ширина элемента */
}

.share_button {
    border-radius: 12px;
    border: 1px solid rgba(158, 158, 158, 0.20);
    background: var(--Background-Surface, #FFF);

    /* Button Smooth Shadow */
    box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.20) inset, 0px 23px 10px -23px rgba(0, 0, 0, 0.15);
}
</style>