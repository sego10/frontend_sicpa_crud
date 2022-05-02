<template>
  <div class="department">
    <DepartmentComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import DepartmentComponent from '@/components/DepartmentComponent.vue'

export default {
  name: 'DepartmentView',
  components: {
    DepartmentComponent
  }
}
</script>