/**
 * Функция для получения случайной активности с внешнего API и ее обновления на веб-странице каждую минуту.
 * @returns {Promise<void>}
 */
export async function updateRandomActivityEveryMinute() {
    /**
     * Функция для получения случайной активности с внешнего API.
     * @returns {Promise<string>} Строка с активностью.
     */
    async function getRandomActivity() {
      try {
        const response = await fetch('https://www.boredapi.com/api/activity/');
        const data = await response.json();
        return data.activity;
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
        return "К сожалению, произошла ошибка";
      }
    }
  
    /**
     * Функция для обновления активности на веб-странице.
     * @param {string} activity - Новая активность для отображения.
     * @returns {Promise<void>}
     */
    async function updateActivity(activity){
      const element = document.querySelector("#activity");
      element.textContent = activity;
    }
  
    /**
     * Функция для обновления активности и установки интервала для обновления каждую минуту.
     * @returns {Promise<void>}
     */
    async function refreshActivity() {
      const activity = await getRandomActivity();
      updateActivity(activity);
      setTimeout(refreshActivity, 60000); // Устанавливаем новый таймаут для обновления каждую минуту
    }
  
    // Начинаем обновление активности
    await refreshActivity();
  }
  