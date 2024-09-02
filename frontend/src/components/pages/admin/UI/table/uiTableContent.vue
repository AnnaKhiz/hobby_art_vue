<template>
  <div>
    <code>tableItemsList: {{tableItemsList}}</code>
    <code>entityDataField: {{entityDataField}}</code>
    <table style="width: 100%; margin-bottom: 20px;">

      <tr v-for="(item, index) in tableItemsList" :key="item" @mouseover="hover = true" @mouseleave="hover = false">
        <td :style="{ borderTopLeftRadius: hover && index === 0 ? '12px' : 'none' }" class="column-title">{{item.text}}: </td>
        <td :style="`width: auto; ${!item.isReadable ? 'padding: 10px 15px' : 'padding: 0'}`">
          <slot v-if="$slots[item.name]" :name="item.name" :item="item"></slot>
          <input
            v-else
            type="text"

            v-model="item.value"
            :autofocus="!item.isReadable"
            :style="`
                ${!item.isReadable ? 'background-color: transparent; padding: 0' : 'background-color: white; padding: 10px 15px;' };
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
              @click.prevent="editElement(item)"
            >
            <div v-else class="controls-content">
              <img
                src="@/assets/img/confirm-48.png"
                alt="edit icon"
                class="edit-pencil-style confirm"
                @click.prevent="confirmEditedElement(item)"
              >
              <img
                src="@/assets/img/close-30.png"
                alt="edit icon"
                class="edit-pencil-style close"
                @click.prevent="closeEditElement(item)"
              >
            </div>


          </div>

        </td>
      </tr>

    </table>
  </div>

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
    updateHoverState({hover}) {
      console.log(hover)
    },
    editElement(item) {
      this.entityDataField = item.value;
      this.tableItemsList.forEach(el => el.isReadable = false);
      this.findElement(item);
    },
    async confirmEditedElement(item) {
      this.findElement(item);

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
      await this.updateOrder(dataField)
    },

    closeEditElement(item) {
      const index = this.findElement(item);
      this.tableItemsList[index].value = this.entityDataField;
    },

    findElement(elem) {
      const index = this.tableItemsList.findIndex(el => el.value === elem.value);

      if (index === -1) return false;

      this.tableItemsList[index].isReadable = !this.tableItemsList[index].isReadable;

      return index
    },

    async updateOrder(dataField) {
      const order = this.tableItemsList.find(el => el.name === 'title')
      if (!order) return false;

      try {
        const result = await fetch(`http://localhost:3000/api/orders/update/${order.value}`, {
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


</style>
