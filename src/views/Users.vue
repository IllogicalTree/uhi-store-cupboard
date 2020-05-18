<template>
  <div class="dashboard">
    <TableView 
      title='User' 
      :headers='headers' 
      :fields='fields'
    />
  </div>
</template>

<script>
import TableView from '@/components/TableView'
import Snackbar from '@/components/Snackbar'

export default {
  name: 'App',
  components: { TableView, Snackbar },
  data () {
    return {
      fields: ['userId', 'class', 'level'],
      headers: [
        {
          text: 'User ID',
          align: 'left',
          sortable: false,
          value: 'userId'
        },
        { text: 'Class', value: 'class' },
        { text: 'Level', value: 'level' }
      ],
    }
  }
}
</script>
