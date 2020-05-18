<template>
  <div>
    <TableView 
      title="Computer" 
      :headers="headers" 
      :fields="fields" />
  </div>
</template>

<script>
import TableView from "@/components/TableView";

export default {
  name: "Computers",
  components: { TableView },
  data() {
    return {
      headers: [
        { text: "Computer Id", value: "computerId", align: "left" },
        { text: "Memory", value: "memory" },
        { text: "Processor", value: "processor" },
        { text: "Graphics", value: "graphics" },
        { text: "Username", value: "username" },
        { text: "Password", value: "password" },
        { text: "Assignment", value: "assignment" },
        { text: "Functional", value: "functional" }
      ]
    };
  },
  computed: {
    fields() {
      return this.headers.map(computer => computer.value);
    }
  }
};
</script>
