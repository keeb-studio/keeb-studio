<template>
  <div>
    <List gist-type="load" />
  </div>
</template>

<script>
import List from "../components/SavedGists/List";
export default {
  name: "open",
  components: {
    List
  }
};
</script>
