<template>
    <table style="width: 100%; margin-bottom: 20px;">

      <tr v-for="(item, index) in tableItemsList" :key="item" @mouseover="hover = true" @mouseleave="hover = false">
        <td :style="{ borderTopLeftRadius: hover && index === 0 ? '12px' : 'none' }" class="column-title">{{item.text}}: </td>
        <td :style="`width: auto; ${!item.isReadable ? 'padding: 10px 15px' : 'padding: 0'}`">
          <slot v-if="$slots[item.name] && !item.isReadable" :name="item.name" :item="item"></slot>
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
            v-if="!$slots[item.name]"
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
              @click.prevent="editElement(item, index)"
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

</template>



<script>


export default {
  name: "uiTableContent.vue",
  components: {},
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
      entityDataField: '',
      tableItemsList: [],
      hover: false,
      isReadable: true,
    }
  },

  methods: {

    editElement(item, index) {
      this.entityDataField = item.value;
      this.tableItemsList.forEach(el => el.isReadable = false);
      this.changeReadableStatus(index);

      if (item.name !== 'deliveryMethod' && item.name !== 'paymentMethod' ) {
        this.$refs.inputs[index].focus()
        console.log(this.$refs.inputs)
      }

    },
    changeReadableStatus(index) {
      this.tableItemsList[index].isReadable = !this.tableItemsList[index].isReadable;
    },
    confirmEditedElement(item, index) {
      this.changeReadableStatus(index);

      const fieldMap = {
        receiver: () => ({ "deliveryInfo.receiver.fullName": item.value }),
        phone: () => ({ "deliveryInfo.receiver.phone": item.value }),
        email: () => ({ "deliveryInfo.receiver.email": item.value }),
        address: () => ({ "deliveryInfo.fullAddress": item.value }),
        deliveryMethod: () => ({ "deliveryInfo.deliveryMethod": item.value }),
        paymentMethod: () => ({ "deliveryInfo.paymentMethod": item.value }),
        comment: () => ({ "deliveryInfo.userComment": item.value })
      };

      const dataField = fieldMap[item.name]();
      this.updateOrder(dataField)
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



.select-list
  padding: 8px 11px
  width: 100%
  background-color: var(--colorTextButton)
  font-size: 1rem
  font-family: inherit
  border-radius: 12px
  box-shadow: 1px -1px 6px inset rgba(94, 92, 90, 0.58)
</style>
