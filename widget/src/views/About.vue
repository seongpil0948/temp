<template>
  <w-flex justify-center align-center class="text-center" id="widget-view">
    <w-card style="min-width: 50%;">
      <template #title>
        <w-toolbar>
          <div class="ml12 title3" style="font-weight: bold">INSA Widget</div>
          <div class="spacer"></div>
        </w-toolbar>
      </template>
      <w-form
        :value="formValid"
        @update:model-value="formValid = $event"
        @submit.prevent="onSubmit"
        @validate="onValidate"
        @success="onSuccess"
      >
        <w-flex
          v-for="(section, idx) in Object.keys(data)"
          :key="idx"
          justify-center
          align-center
          class="wrapper mt6"
        >
          <!-- :value="data[section][element].value" -->
          <w-input
            v-for="(element, idx2) in Object.keys(data[section])"
            :key="idx2"
            :label="data[section][element].label"
            :model-value="data[section][element].value"
            @update:model-value="data[section][element].value = $event"
          />
        </w-flex>
        <w-button class="text-right mt6" type="submit">제출하기</w-button>
      </w-form>
    </w-card>
  </w-flex>
</template>
<script>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
export default {
  setup(props, context) {
    onMounted(() => {
      console.log("Mounted")
    })

    const formValid = ref(false)
    const data = reactive({
      shop: {
        name: {
          label: `쇼핑몰 이름`,
          value: null
        }
      },
      widget: {
        size: {
          label: `추천 목록 상자의 크기`,
          value: null
        },
        numOfElements: {
          label: `상자의 추천 아이템 개수`,
          value: null
        },
      },
      content: {
        size: {
          label: `추천 아이템 크기`,
          value: null
        },
        src: {
          label: `커스텀 아이템 주소`,
          value: null
        },
      }
    })
    const postWidget = () => {
      return axios.post("http://127.0.0.1:8000/resource/widget/", {
        shop: data.shop.name.value,
        box_size: data.widget.size.value,
        num_of_item: data.widget.numOfElements.value,
        item_size: data.content.size.value,
      })
    }
    const onSubmit = (e) => {
      console.log('onSubmit', e, context)
      return true
    }
    const onValidate = (e) => {
      console.log('onValidate', e, context)
      return true
    }
    const onSuccess = (e) => {
      console.log('onSuccess', e, context)
      postWidget()
    }
    return {
      data, postWidget, formValid, onValidate, onSuccess, onSubmit
    }
  }
}
</script>