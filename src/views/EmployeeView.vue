<template>
  <div class="employee">
    <EmployeeComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import EmployeeComponent from '@/components/EmployeeComponent.vue'

export default {
  name: 'EmployeeView',
  components: {
    EmployeeComponent
  }
}
</script>