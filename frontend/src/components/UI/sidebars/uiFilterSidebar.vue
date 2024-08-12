<template>
  <form action="#" class="main__product-page-sidebar-search" id="search-sidebar">
    <div class="main__product-page-sidebar-item">
      <h3 class="main__product-page-sidebar-title">
        Тип изделий
      </h3>
      <ul class="main__product-page-sidebar-block">

        <li>
          <label for="shpagat">
            <input v-model="search.type" type="checkbox" name="type" value="shpagat" id="shpagat">
            Шпагат, шнуры, веревки
          </label>
        </li>
        <li>
          <label for="kolco">
            <input v-model="search.type" type="checkbox" name="type" value="kolco" id="kolco">
            Кольца
          </label>
        </li>
        <li>
          <label for="dzut">
            <input v-model="search.type" type="checkbox" name="type" value="dzut" id="dzut">
            Джут
          </label>
        </li>
      </ul>
    </div>
    <div class="main__product-page-sidebar-item">
      <h3 class="main__product-page-sidebar-title">
        Состав
      </h3>
      <ul class="main__product-page-sidebar-block">
        <li>
          <label for="cotton">
            <input v-model="search.composition" type="checkbox" name="material" value="cotton" id="cotton">
            Хлопок
          </label>
        </li>
        <li>
          <label for="polyester">
            <input v-model="search.composition" type="checkbox" name="material" value="polyester" id="polyester">
            Синтетика
          </label>
        </li>
        <li>
          <label for="serdechnik">
            <input v-model="search.composition" type="checkbox" name="material" value="serdechnik" id="serdechnik">
            С сердечником
          </label>
        </li>
      </ul>
    </div>
    <div class="main__product-page-sidebar-item">
      <h3 class="main__product-page-sidebar-title">
        Диаметр
      </h3>
      <ul class="main__product-page-sidebar-block">

        <li>
          <label for="diam3">
            <input v-model="search.width" type="checkbox" name="diameter" value="3" id="diam3">
            3 мм
          </label>
        </li>
        <li>
          <label for="diam4">
            <input v-model="search.width" type="checkbox" name="diameter" value="4" id="diam4">
            4 мм
          </label>
        </li>
        <li>
          <label for="diam4-5">
            <input v-model="search.width" type="checkbox" name="diameter" value="4,5" id="diam4-5">
            4,5 мм
          </label>
        </li>
        <li>
          <label for="diam5">
            <input v-model="search.width" type="checkbox" name="diameter" value="5" id="diam5">
            5 мм
          </label>
        </li>
      </ul>
    </div>
    <div class="main__product-page-sidebar-item">
      <h3 class="main__product-page-sidebar-title">
        Производитель
      </h3>
      <ul class="main__product-page-sidebar-block">
        <li>
          <label for="macrametr">
            <input v-model="search.brand" type="checkbox" name="made-by" value="macrametr" id="macrametr">
            Macrametr
          </label>
        </li>
        <li>
          <label for="zefirka">
            <input v-model="search.brand" type="checkbox" name="made-by" value="zefirka" id="zefirka">
            Зефирка
          </label>
        </li>
        <li>
          <label for="gamma">
            <input v-model="search.brand" type="checkbox" name="made-by" value="gamma" id="gamma">
            Гамма
          </label>
        </li>
        <li>
          <label for="sibshnur">
            <input v-model="search.brand" type="checkbox" name="made-by" value="sibshnur" id="sibshnur">
            Сибшнур
          </label>
        </li>
      </ul>
    </div>

    <div class="main__product-page-sidebar-buttons">
      <button type="button" id="search-results" class="main__product-page-sidebar-button-style-color">Показать</button>
      <button type="reset" id="search-reset" class="main__product-page-sidebar-button">Очистить</button>
      <div class="main__product-page-sidebar-message" id="search-result-message">
        Подобрано 6 товаров
      </div>
    </div>

  </form>
</template>

<script>
export default {
  name: "uiFilterSidebar.vue",
  data() {
    return {
      search: {
        type: [],
        composition: [],
        width: [],
        brand: []
      }
    }
  }
}
</script>


<style scoped lang="sass">

</style>
