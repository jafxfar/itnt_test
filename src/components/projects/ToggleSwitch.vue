<template>
  <div class="w-full mt-4 slider-container">
    <input type="range" min="0" max="20" v-model="value" @input="updateValues" class="slider" id="myRange"
      :style="sliderBackgroundStyle">
    <div class="slider-info">
      <span>{{ soldToday }}% - продано на сегодня</span>
      <span>{{ remaining }}% - осталось</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomSlider',
  data() {
    return {
      value: 20, // начальное значение проданного
      soldToday: 4,
      remaining: 16
    }
  },
  watch: {
    value(newValue) {
      this.soldToday = newValue;
      this.remaining = 20 - newValue;
    }
  },
  methods: {
    updateValues() {
      // Метод для обновления значений, когда пользователь двигает ползунок
    }
  },
  computed: {
    sliderBackgroundStyle() {
      // Рассчитываем процент заполнения для слайдера
      const filledPercentage = (this.value / 20) * 100;
      return {
        background: `linear-gradient(to right, #29B6F6 ${filledPercentage}%, #E1F5FE ${filledPercentage}%)`
      };
    }
  },
}
</script>

<style scoped>
.slider-container {
  position: relative;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 20px;
  border-radius: 22px;
  background: linear-gradient(to right, #29B6F6 0%, #29B6F6 var(--slider-percentage), #E1F5FE var(--slider-percentage), #E1F5FE 100%);
  outline: none;
  box-shadow: inset 0 0px 0px rgba(0, 0, 0, 0.2); /* внутренняя тень для слайдера */
  transition: background 0.3s ease;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 37px;
  height: 20px; /* изменено для соответствия размеру изображения */
  border-radius: 20px;
  background: white;
  box-shadow: 0 4px 9px rgba(0, 0, 0, 0.3); /* тень для ползунка, более заметная, как на изображении */
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.slider::-moz-range-thumb {
  width: 37px;
  height: 37px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 4px 9px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  border: 2px solid #29B6F6;
}

/* Дополнительный класс для неактивной части слайдера */
.slider-inactive {
  background: #ccc;
  position: absolute;
  pointer-events: none; /* Убираем взаимодействие с элементом */
}

.slider-info {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  font-size: 12px;
  color: #333;
}</style>
