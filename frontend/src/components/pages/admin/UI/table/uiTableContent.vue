<template>
  <div style="position: relative; width: 100%">
    <table style="width: 100%; margin-bottom: 20px;">
      <tr v-for="(item, index) in tableItemsList" :key="item" @mouseover="hover = true" @mouseleave="hover = false">
        <td :style="{ borderTopLeftRadius: hover && index === 0 ? '12px' : 'none' }" class="column-title">{{item.text}}:</td>
        <td :style="`width: auto; ${!item.isReadable ? 'padding: 10px 15px' : 'padding: 0'}`">
          <slot v-if="$slots[item.name] && !item.isReadable" :name="item.name" :item="item"></slot>
          <p v-if="item.name === 'title'">{{ item.value }}</p>
          <p v-if="item.name === 'receiver'">{{ item.value.lastName }} {{ item.value.name }} {{ item.value.surName }}</p>
          <p v-if="item.name === 'address'">Город: {{ item.value.city }}, ул. {{ item.value.street }}, дом {{ item.value.house }}, кв. {{ item.value.apartment }}. Индекс {{ item.value.zipCode }} </p>
          <select
            class="select-list"
            v-if="$slots[item.name] && item.isReadable"
            v-model="item.value"
          >
            <option
              v-for="option in (item.name === 'deliveryMethod' ? deliveryMethods : paymentMethod)"
              :key="option.value"
              :value="option.value"
            >
              {{ option.text }}
            </option>
          </select>

          <input
            v-if="!$slots[item.name] && item.name !== 'receiver' && item.name !== 'address' && item.name !== 'title'"
            ref="inputs"
            type="text"
            v-model="item.value"

            :style="`
                ${!item.isReadable
                    ? 'background-color: transparent; padding: 0'
                    : 'background-color: white; padding: 10px 15px; box-shadow: 1px -1px 6px inset rgba(94, 92, 90, 0.58)'
                 };
                font-size: 1rem; border-radius: 12px; width: 100%`"
            :readonly="!item.isReadable"
          />

        </td>
        <td class="column-edit" :style="{ borderTopRightRadius: hover && index === 0 ? '12px' : 'none' }">
          <div v-if="item.name !== 'title'" class="controls-content">
            <img
              v-if="!item.isReadable"
              src="@/assets/img/edit.svg"
              alt="edit icon"
              class="edit-pencil-style"
              @click.prevent="item.name === 'receiver' || item.name === 'address' ? openDialogForEditing(item) : editElement(item, index)"
            >
            <div v-else class="controls-content">
              <img
                src="@/assets/img/confirm-48.png"
                alt="edit icon"
                class="edit-pencil-style confirm"
                @click.prevent="confirmEditedElement(item, index)"
              >
              <img
                src="@/assets/img/close-30.png"
                alt="edit icon"
                class="edit-pencil-style close"
                @click.prevent="closeEditElement(item, index)"
              >
            </div>
          </div>

        </td>
      </tr>

    </table>

    <!--    USER NAME / ADDRESS CHANGE DATA DIALOG -->

    <ui-modal-template v-if="isDisplayDialog !== ''" :value="isDisplayDialog !== ''" @close="isDisplayDialog = ''" width="50%" height="fit-content">
        <template #tableData >
          <code>{{dialogEditItemsList}}</code>

          <table class="change-data-table" style="width: 100%; margin-bottom: 20px;" @mouseover="hover = true" @mouseleave="hover = false">
            <tr v-for="(item, index) in dialogEditItemsList" :key="item.value + item.text">
              <td style="width: 20%">{{item.text }}</td>
              <td style="width: 50px; border-right: none">
                <input
                  type="text"
                  v-model="item.value"
                  :style="`
                    ${!item.isReadable
                        ? 'background-color: transparent; padding: 0'
                        : 'background-color: white; padding: 10px 15px; box-shadow: 1px -1px 6px inset rgba(94, 92, 90, 0.58)'
                     };
                    font-size: 1rem; border-radius: 12px; width: 100%`"
                />
              </td>
              <td class="column-edit" style="border-left: none">
                <div class="controls-content">
                  <img
                    v-if="!item.isReadable"
                    src="@/assets/img/edit.svg"
                    alt="edit icon"
                    class="edit-pencil-style"
                    @click.prevent="editDataFromDialogs(item, index)"
                  >
                  <div v-else class="controls-content">
                    <img
                      src="@/assets/img/confirm-48.png"
                      alt="edit icon"
                      class="edit-pencil-style confirm"
                      @click.prevent="confirmEditedElement(item, index)"
                    >
                    <img
                      src="@/assets/img/close-30.png"
                      alt="edit icon"
                      class="edit-pencil-style close"
                      @click.prevent="closeEditDialogElement(item, index)"
                    >
                  </div>
                </div>

              </td>
            </tr>
          </table>
        </template>
      </ui-modal-template>

  </div>


</template>



<script>
import UiModalTemplate from "@/components/UI/modal/uiModalTemplate.vue";

export default {
  name: "uiTableContent.vue",
  components: { UiModalTemplate },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    deliveryMethods: {
      type: Array,
      default: () => []
    },
    paymentMethod: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      dialogEditItemsList: [],
      isDisplayDialog: '',
      entityDataField: '',
      tableItemsList: [],
      hover: false,
      isReadable: true,
    }
  },
  emits: ['error'],
  methods: {
    openDialogForEditing(item) {
      this.isDisplayDialog = item.name;
      const element = {...item}
      if (element.name === 'receiver') {

        this.dialogEditItemsList = [
          { text: 'Фамилия', value: element.value.lastName, isReadable: false },
          { text: 'Имя', value: element.value.name, isReadable: false },
          { text: 'Отчество', value: element.value.surName, isReadable: false },
        ]
      }
      if (element.name === 'address') {

        this.dialogEditItemsList = [
          { text: 'Город', value: element.value.city, isReadable: false },
          { text: 'Улица', value: element.value.street, isReadable: false },
          { text: 'Номер дома', value: element.value.house, isReadable: false },
          { text: 'Квартира', value: element.value.apartment, isReadable: false },
          { text: 'Индекс', value: element.value.zipCode, isReadable: false },
        ]
      }
    },

    editDataFromDialogs(item, index) {
      this.entityDataField = item.value;

      console.log('!!!!!!!', this.dialogEditItemsList)
      this.dialogEditItemsList.forEach(el => el.isReadable = false);
      this.dialogEditItemsList[index].isReadable = !this.dialogEditItemsList[index].isReadable;
      console.log(index)

      // this.$refs.editInputs[index].focus()
      // console.log(this.$refs.editInputs)

    },

    editElement(item, index) {
      this.entityDataField = item.value;

      this.tableItemsList.forEach(el => el.isReadable = false);
      this.changeReadableStatus(index);

      if (item.name !== 'deliveryMethod' && item.name !== 'paymentMethod' ) {
        this.$refs.inputs[index-3].focus()
        console.log(this.$refs.inputs)
      }

    },
    changeReadableStatus(index) {
      this.tableItemsList[index].isReadable = !this.tableItemsList[index].isReadable;
    },
    parseFullNameReverse(fullName) {
      if (!fullName) {
        this.$emit('error', 'Имя получателя не может быть пустым!')
        return false;
      }

      this.$emit('error', '')
      const nameArray = fullName.split(' ');

      return {
        name: nameArray[1] || '',
        lastName: nameArray[0] || '',
        surName: nameArray[2] || ''
      }
    },
    parseFullAddressReverse(fullAddress) {
      if (!fullAddress) {
        this.$emit('error', 'Поле Адрес не может быть пустым!')
        return false;
      }

      this.$emit('error', '')
      const addressArray = fullAddress.split(' ');

      return {
        city: addressArray[1] || '',
        street: addressArray[0] || '',
        house: addressArray[2] || null,
        apartment: addressArray[3] || null,
        zipCode: addressArray[4] || null,
      }
    },


    confirmEditedElement(item, index) {
      let fieldMap;

      if (item.name === 'receiver') {
        const { name, lastName, surName } = this.parseFullNameReverse(item.value);

        if (!name || !lastName || !surName) {
          return
        }

        fieldMap = {
          ...fieldMap,
          receiver: () => (
            {
              "deliveryInfo.receiver.name": name,
              "deliveryInfo.receiver.lastName": lastName,
              "deliveryInfo.receiver.surName": surName,
            }),
        }

      }

      if (item.name === 'address') {
        const { city, street, house, apartment, zipCode } = this.parseFullAddressReverse(item.value)

        if ( !city || !street || !house || !apartment || zipCode ) {
          return
        }

        fieldMap = {
          ...fieldMap,
          address: () => (
            {
              "deliveryInfo.address.city": city,
              "deliveryInfo.address.street": street,
              "deliveryInfo.address.house": house,
              "deliveryInfo.address.apartment": apartment,
              "deliveryInfo.address.zipCode": zipCode,
            }),
        }
      }


      fieldMap = {
        ...fieldMap,
        phone: () => ({ "deliveryInfo.receiver.phone": item.value }),
        email: () => ({ "deliveryInfo.receiver.email": item.value }),
        deliveryMethod: () => ({ "deliveryInfo.deliveryMethod": item.value }),
        paymentMethod: () => ({ "deliveryInfo.paymentMethod": item.value }),
        comment: () => ({ "deliveryInfo.userComment": item.value })
      };

      console.log(fieldMap)

      const dataField = fieldMap[item.name]();
      this.changeReadableStatus(index);
      this.$emit('error', '');
      this.updateOrder(dataField)
    },

    closeEditDialogElement(item, index) {
      this.dialogEditItemsList[index].isReadable = !this.dialogEditItemsList[index].isReadable;
      this.dialogEditItemsList[index].value = this.entityDataField
    },

    closeEditElement(item, index) {
      this.changeReadableStatus(index);
      this.tableItemsList[index].value = this.entityDataField;
    },

    async updateOrder(dataField) {
      const order = this.tableItemsList.find(el => el.name === 'title')
      if (!order) return false;

      try {
        const result = await fetch(`http://localhost:3000/api/orders/update/${order.id}`, {
          method: 'PATCH',
          credentials: 'include',
          body: JSON.stringify(dataField),
          headers: {'Content-Type': 'application/json'}
        })
        const data = await result.json();
        console.log(data)
      } catch (error) {
        console.log('Update error', error)
      }
    }
  },
  updated() {
    console.log('rerender!!!!!')
  },
  mounted() {
    this.tableItemsList = this.items.map(el => ({ ...el, isReadable: false }))

  }
}
</script>



<style scoped lang="sass">
table, th, td
  border-bottom: 1px solid var(--grayLinkColor)
  border-collapse: collapse
  & tr
    transition: all 0.3s ease-in-out 0s
    &:hover
      background: var(--colorTextButton)
      cursor: pointer
  & td
    &.column-title
      width: 200px
      padding: 15px 20px
    &.column-edit
      padding: 15px 20px
      width: 85px
.controls-content
  display: flex
  align-items: center
  justify-content: flex-end
  gap: 5px
.edit-pencil-style
  text-align: right
  cursor: pointer
  width: 20px
  height: auto
  display: block
  object-fit: contain
  &.close
    width: 20px
table.change-data-table, table.change-data-table th, table.change-data-table td
  border: 1px solid var(--grayLinkColor)
  border-collapse: collapse
  text-align: left
  & tr
    transition: all 0.3s ease-in-out 0s
    &:hover
      background: var(--colorLineBasket)
  & td
    padding: 10px


.select-list
  padding: 8px 11px
  width: 100%
  background-color: var(--colorTextButton)
  font-size: 1rem
  font-family: inherit
  border-radius: 12px
  box-shadow: 1px -1px 6px inset rgba(94, 92, 90, 0.58)
</style>
<script setup>
</script>
