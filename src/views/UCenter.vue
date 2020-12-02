<template>
  <div>
    <div>
      <p>个人中心</p>
    </div>
    <pdf
      ref="pdf"
      :src="src"
      :page="currentPage"
      @page-loaded="currentPage = $event"
      @loaded="loadPdfHandler"
    ></pdf>
  </div>
</template>

<script>
import pdf from "vue-pdf";
var loadingTask = pdf.createLoadingTask("../assets/pdf/dc.pdf");
export default {
  name: "UCenter",
  data() {
    return {
      src: "",
      currentPage: 0,
    };
  },
  components: {
    pdf,
  },
  methods: {
    loadPdfHandler() {},
  },
};
</script>

<style>
</style>