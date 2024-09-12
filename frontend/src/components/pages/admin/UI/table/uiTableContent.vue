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
      <ui-modal-template
        save
        v-if="isDisplayDialog"
        :value="isDisplayDialog !== ''"
        @close="isDisplayDialog = ''"
        @save="saveEditedDataFromDialog(isDisplayDialog)"
        width="50%"
        height="fit-content"
        :header="isDisplayDialog === 'receiver' ? 'Редактировать данные получателя' : 'Редактировать адрес доставки'"
      >
        <template #tableData >
          <table class="change-data-table" style="width: 100%; margin-bottom: 20px;" >
            <tr
              v-for="item in dialogEditItemsList"
              :key="item.value + item.text"
            >
              <td style="width: 20%">{{item.text }}</td>
              <td style="width: 50px; border-right: none" >
                <input
                  type="text"
                  v-model="entityDataEditFromDialog[item.name]"
                  style="background-color: white; padding: 10px 15px; box-shadow: 1px -1px 6px inset rgba(94, 92, 90, 0.58); font-size: 1rem; border-radius: 12px; width: 100%"
                />
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
    orderId: {
      type: String,
      default: ''
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
      entityDataEditFromDialog: {},
      dialogEditItemsList: [],
      isDisplayDialog: '',
      entityDataField: '',
      tableItemsList: [],
      hover: false,
      isReadable: true,
      currentOrder: {}
    }
  },
  emits: ['error'],
  computed: {
    tableItems() {
      return [
        { text: 'Заказ №', value: this.currentOrder._id, name: 'title', id: this.currentOrder._id},
        { text: 'Получатель', value: this.currentOrder.deliveryInfo.receiver, name: 'receiver' },
        { text: 'Адресс доставки', value: this.currentOrder.deliveryInfo.address, name: 'address'  },
        { text: 'Телефон', value: this.currentOrder.deliveryInfo.receiver.phone, name: 'phone' },
        { text: 'E-mail', value: this.currentOrder.deliveryInfo.receiver.email, name: 'email'  },
        { text: 'Комментарий', value: this.currentOrder.deliveryInfo.userComment, name: 'comment'  },
        { text: 'Способ доставки', value: this.currentOrder.deliveryInfo.deliveryMethod, name: 'deliveryMethod'  },
        { text: 'Способ оплаты', value: this.currentOrder.deliveryInfo.paymentMethod, name: 'paymentMethod'  },

      ]
    },
  },
  methods: {
    saveEditedDataFromDialog(value) {
      const parsedObjectForEditing = { name: value, value: this.entityDataEditFromDialog };

      const index = this.tableItemsList.findIndex(el => el.name === value);
      if (index === -1) return;

      this.confirmEditedElement(parsedObjectForEditing, index);
      this.isDisplayDialog = '';
      this.dialogEditItemsList = [];
    },

    openDialogForEditing(item) {
      this.entityDataEditFromDialog = { ...item.value };
      this.isDisplayDialog = item.name;
      const element = { ...item };

      if (element.name === 'receiver') {
        this.dialogEditItemsList = [
          { text: 'Фамилия', value: element.value.lastName, name: 'lastName'},
          { text: 'Имя', value: element.value.name, name: 'name' },
          { text: 'Отчество', value: element.value.surName, name: 'surName' },
        ]
      }

      if (element.name === 'address') {
        this.dialogEditItemsList = [
          { text: 'Город', value: element.value.city, name: 'city' },
          { text: 'Улица', value: element.value.street, name: 'street' },
          { text: 'Номер дома', value: element.value.house, name: 'house' },
          { text: 'Квартира', value: element.value.apartment, name: 'apartment' },
          { text: 'Индекс', value: element.value.zipCode, name: 'zipCode' },
        ]
      }
    },

    editElement(item, index) {
      this.entityDataField = item.value;

      this.tableItemsList.forEach(el => el.isReadable = false);
      this.changeReadableStatus(index);

      if (item.name !== 'deliveryMethod' && item.name !== 'paymentMethod' ) {
        this.$refs.inputs[index-3].focus();
      }
    },

    changeReadableStatus(index) {
      this.tableItemsList[index].isReadable = !this.tableItemsList[index].isReadable;
    },

    confirmEditedElement(item, index) {
      const fieldMap = {
        receiver: () => ({"deliveryInfo.receiver": item.value }),
        address: () => ({ "deliveryInfo.address": item.value }),
        phone: () => ({ "deliveryInfo.receiver.phone": item.value }),
        email: () => ({ "deliveryInfo.receiver.email": item.value }),
        deliveryMethod: () => ({ "deliveryInfo.deliveryMethod": item.value }),
        paymentMethod: () => ({ "deliveryInfo.paymentMethod": item.value }),
        comment: () => ({ "deliveryInfo.userComment": item.value })
      };

      const dataField = fieldMap[item.name]();

      if (item.name !== 'receiver' && item.name !== 'address') {
        this.changeReadableStatus(index);
      }

      this.updateOrder(dataField);

      this.tableItemsList[index].value = item.value;
      this.entityDataEditFromDialog = {};
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
        console.log(data);
      } catch (error) {
        console.log('Update error', error)
      }
    },

    async initPage() {
      try {
        const result = await fetch(`http://localhost:3000/api/orders/${this.orderId}`)
        const data = await result.json();
        this.currentOrder = data.data;
        this.tableItemsList = this.tableItems.map(el => ({ ...el, isReadable: false }));
      } catch (error) {
        console.log('Get order error', error)
      }
    }
  },
  async mounted() {
    await this.initPage();
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
