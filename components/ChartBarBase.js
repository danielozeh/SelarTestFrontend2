import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ["chartData"],
  data() {
    return {
      options: {
        responsive: true
      }
    };
  },
  mounted() {
    this.renderChart(this.chartData, {
      borderWidth: "10px",
      hoverBackgroundColor: "red",
      hoverBorderWidth: "10px"
    });
  }
};