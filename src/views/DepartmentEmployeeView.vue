<template>
  <div class="departmentemployee">
    <DepartmentEmployeeComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import DepartmentEmployeeComponent from '@/components/DepartmentEmployeeComponent.vue'

export default {
  name: 'DepartmentEmployeeView',
  components: {
    DepartmentEmployeeComponent
  }
}
</script>