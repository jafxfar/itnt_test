<template>
    <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-end justify-center z-20" @click.self="closeModal">
        <div class="bg-white w-full md:w-1/3 rounded-lg shadow-lg z-50 overflow-y-auto px-[20px]">
            <!-- Modal header -->
            <div class="flex justify-between items-center p-5">
                <div class="">Выберите причину жалобы на пользователя: </div>
            </div>
            <!-- Modal body -->
            <div class="p-5">
                <h1 class="mb-[48px]">Анна Краснова</h1>
                <div v-for="reason in reasons" :key="reason" class="flex items-center my-3">
                    <input v-model="selectedReason" type="radio" :id="reason" :value="reason" name="complaintReason"
                        class=" h-auto" />
                    <label :for="reason" class="ml-4 text-xs">{{ reason }}</label>
                </div>
            </div>
            <!-- Modal footer -->
            <div class="flex justify-center items-center rounded-[12px]">
                <button class="flex justify-center border-[1px] border-black w-full text-black" :class="complainBtnClasses"
                    @click="submitComplaint">
                    {{ buttonText }}
                </button>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'chat-modal',
    data() {
        return {
            selectedReason: null,
            reasons: [
                'Спам',
                'Агрессивное поведение',
                'Взрослый контент (ссылки, картинки, видео и т.п.)'
            ],
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        submitComplaint() {
            this.$emit('submit-complaint', this.selectedReason);
            if (this.selectedReason
            ) {
                alert('Выбранная причина жалобы:', valueOf(this.selectedReason));
            } else {
                alert('Пожалуйста, выберите причину жалобы.');
            }
        },
        handleClick(event) {
            // Проверка, был ли клик вне модального окна
            if (!this.$el.contains(event.target)) {
                this.closeModal();
            }
        },
    },
    computed: {
        complainBtnClasses() {
            return {
                'border-[1px]': true,
                'py-[16px]': true,
                'px-[22px]': true,
                'rounded-[12px]': true,
                'selected': this.selectedReason !== null,
            };
        },
        buttonText() {
            return this.selectedReason !== null ? 'Отправить жалобу' : 'Выберите причину';
        },
    },
};
</script>
  

<style scoped>
.selected {
    color: white;
    background: var(--Gradients-Blue, linear-gradient(97deg, #13D5FF -0.02%, #12A1DE 94.31%));
    box-shadow: 0px 22px 22px -17px #29B6F6;
    border: 1px solid #12B7EC;
}
</style>