<template>
  <!--第三步.使用组件-->
  <CompositionImport2 />

  <CompositionImport />
  <TheWelcome />
  <IFVue />
  <ListVue />
  <Events />
  <FromData />
  <TemplateImport />
</template>

<script setup>
import TheWelcome from './components/TheWelcome.vue'
import IFVue from './components/If.vue'
import ListVue from './components/List.vue'
import Events from './components/Event.vue'
import FromData from './components/from.vue'
import TemplateImport from './components/Template.vue'
import CompositionImport from './components/Composition.vue'

//第一步.引入组件
import CompositionImport2 from './components/Compostition2.vue'

//如果<script>标签中有setup()函数(<script setup>)，那么就不需要再写export default了,有setup为组合式 API 
/*export default {
  //第二步.注入组件
  components: {
    CompositionImport2,
    CompositionImport
  }
}*/

</script>

<style></style>