<template>
    <div class="team-block w-full mt-8">
        <div class="avatar"></div>
        <div class="team-name">Команда Danger Flower</div>
    </div>
    <div class="bg-[#E0E0E0] p-4 decoration">
        <p>Команда Danger Flower - это команда, которая занимается разработкой игр. Мы создаем игры для всех возрастов и
            интересов. Наша команда состоит из 5 человек, каждый из которых является профессионалом в своем деле.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi est ab libero tenetur fugit non, aliquid
            doloremque totam dignissimos quam labore rem saepe neque. Natus illum laboriosam tempore excepturi
            repellendus.</p>
    </div>
</template>


<style scoped>
.team-block {
    display: flex;
    align-items: center;
    /* Выравниваем элементы по центру */
    background-color: white;
    /* Цвет фона блока */
    padding: 10px;
    /* Отступы вокруг содержимого */
}

.avatar {
    width: 40px;
    /* Размер аватарки */
    height: 40px;
    /* Размер аватарки */
    border-radius: 50%;
    /* Круглая форма аватарки */
    background-color: #E0E0E0;
    /* Цвет фона аватарки */
    margin-right: 10px;
    /* Отступ между аватаркой и названием */
}

.team-name {
    font-size: 16px;
    /* Размер шрифта названия */
    color: #333;
    /* Цвет шрифта названия */
}
.decoration{
    border-radius: 2px 12px 12px 12px;
}
</style>