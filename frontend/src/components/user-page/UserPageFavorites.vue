<template>
  <div class="main__product-page-content-item" id="item-{{id}}">

<!--    product item header-->
    <div class="main__product-page-content-item-header">
      <svg class="red-color" width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 14.434C7.88951 14.4336 7.78224 14.3967 7.69495 14.3289C4.9145 12.1686 2.9992 10.3083 1.65898 8.47301C-0.0512953 6.12763 -0.441358 3.96228 0.498793 2.03698C1.1689 0.661755 3.09421 -0.463425 5.34457 0.19168C6.41752 0.501599 7.35364 1.16623 8 2.07698C8.64636 1.16623 9.58248 0.501599 10.6554 0.19168C12.9008 -0.453424 14.8311 0.661755 15.5012 2.03698C16.4414 3.96228 16.0513 6.12763 14.341 8.47301C13.0008 10.3083 11.0855 12.1686 8.30505 14.3289C8.21776 14.3967 8.11049 14.4336 8 14.434ZM4.06437 1.00681C3.52891 0.98597 2.99788 1.11135 2.52829 1.36949C2.0587 1.62763 1.66828 2.00879 1.39894 2.47204C0.623813 4.0623 0.97387 5.83258 2.46911 7.87791C4.05815 9.92753 5.91887 11.7512 8 13.2988C10.0808 11.7528 11.9415 9.93076 13.5309 7.88291C15.0311 5.83258 15.3762 4.0623 14.6011 2.47705C14.101 1.47689 12.6007 0.681758 10.9305 1.15183C10.3949 1.31011 9.89841 1.57876 9.47294 1.9405C9.04747 2.30223 8.70245 2.74904 8.46007 3.25217C8.4224 3.34389 8.3583 3.42234 8.27594 3.47755C8.19357 3.53276 8.09666 3.56224 7.9975 3.56224C7.89834 3.56224 7.80142 3.53276 7.71906 3.47755C7.63669 3.42234 7.5726 3.34389 7.53493 3.25217C7.29438 2.74778 6.94994 2.29993 6.52421 1.93797C6.09847 1.57601 5.60104 1.30811 5.06453 1.15183C4.73946 1.05742 4.40286 1.00861 4.06437 1.00681Z" fill="url(#paint0_linear_111_777)"/>
        <defs>
          <linearGradient id="paint0_linear_111_777" x1="-3.45946" y1="-9.02123" x2="19.9092" y2="-3.28645" gradientUnits="userSpaceOnUse">
            <stop stop-color="#976464"/>
            <stop offset="1" stop-color="#CFA5A5"/>
          </linearGradient>
        </defs>
      </svg>
      <svg width="22" height="6" viewBox="0 0 22 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="2.78261" cy="2.78261" r="2.78261" fill="url(#paint0_linear_111_778)"/>
        <circle cx="10.6674" cy="2.78261" r="2.78261" fill="url(#paint1_linear_111_778)"/>
        <circle cx="18.5507" cy="2.78261" r="2.78261" fill="url(#paint2_linear_111_778)"/>
        <defs>
          <linearGradient id="paint0_linear_111_778" x1="-1.20329" y1="-3.47826" x2="7.01181" y2="-1.65956" gradientUnits="userSpaceOnUse">
            <stop stop-color="#976464"/>
            <stop offset="1" stop-color="#CFA5A5"/>
          </linearGradient>
          <linearGradient id="paint1_linear_111_778" x1="6.68148" y1="-3.47826" x2="14.8966" y2="-1.65956" gradientUnits="userSpaceOnUse">
            <stop stop-color="#976464"/>
            <stop offset="1" stop-color="#CFA5A5"/>
          </linearGradient>
          <linearGradient id="paint2_linear_111_778" x1="14.5648" y1="-3.47826" x2="22.7799" y2="-1.65956" gradientUnits="userSpaceOnUse">
            <stop stop-color="#976464"/>
            <stop offset="1" stop-color="#CFA5A5"/>
          </linearGradient>
        </defs>
      </svg>
    </div>

<!--    finished product item header -->
    <div class="main__product-page-content-item-img favorites-img">
      <a href="">
        <img src="@/assets/img/catalog-img-link1.png" alt="card image">
      </a>
    </div>
    <div class="main__product-page-content-item-label">
      <a href="#">Тут название</a>
    </div>
    <div class="main__product-page-content-item-color-variants">
      <svg width="97" height="20" viewBox="0 0 97 20" fill="red" xmlns="http://www.w3.org/2000/svg">
        <path d="M86.08 10.88H83.104V13.792H82.096V10.88H79.12V9.936H82.096V7.008H83.104V9.936H86.08V10.88ZM90.9791 9.392C92.6005 9.392 93.7791 9.68533 94.5151 10.272C95.2618 10.848 95.6351 11.6587 95.6351 12.704C95.6351 13.3547 95.4805 13.936 95.1711 14.448C94.8725 14.96 94.4191 15.3653 93.8111 15.664C93.2031 15.952 92.4565 16.096 91.5711 16.096C90.7711 16.096 90.0085 15.968 89.2831 15.712C88.5685 15.4453 87.9925 15.0933 87.5551 14.656L88.1151 13.744C88.4885 14.128 88.9791 14.4427 89.5871 14.688C90.1951 14.9227 90.8511 15.04 91.5551 15.04C92.4831 15.04 93.1978 14.832 93.6991 14.416C94.2111 14 94.4671 13.4453 94.4671 12.752C94.4671 11.984 94.1791 11.4027 93.6031 11.008C93.0378 10.6133 92.0778 10.416 90.7231 10.416H88.3391L88.9151 4.8H95.0431V5.824H89.9231L89.5391 9.392H90.9791Z" fill="#424242"/>
        <circle cx="8.5" cy="9.5" r="8.5" fill="#696837"/>
        <circle cx="46.5" cy="9.5" r="8.5" fill="#D8C1AA"/>
        <circle cx="27.5" cy="9.5" r="8.5" fill="#81292F"/>
        <circle cx="65.5" cy="9.5" r="8.5" fill="#EED53A"/>
      </svg>
    </div>
    <div class="main__product-page-content-item-price">
      Тут цена
    </div>
    <a href="" class="main__product-page-content-item-btnBuy">
      В корзину
    </a>
  </div>
</template>

<script>
export default {
  name: "userPageFavorites",
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      id: 0
    }
  }
}
</script>

<style scoped lang="sass">

</style>
