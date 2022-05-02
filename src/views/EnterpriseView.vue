<template>
  <div class="enterprise">
    <EnterpriseComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import EnterpriseComponent from '@/components/EnterpriseComponent.vue'

export default {
  name: 'EnterpriseView',
  components: {
    EnterpriseComponent
  }
}
</script>