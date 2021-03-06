(function($) {
  'use strict';

  $("#default-wizard").steps({
    headerTag: "h3",
    bodyTag: "div",
    autoFocus: true,
    titleTemplate: '#title#',
    labels: {
      current: "",
      //finish: 'Add Template',
      previous: 'Back'
    },
    onFinished: function(event, currentIndex) {
      //alert("Form Submitted Successfully!");
      submitTemplate()
    }
  });

  $(".style2-wizard, .style3-wizard, .style4-wizard").steps({
    headerTag: "h3",
    bodyTag: "div",
    autoFocus: true,
    titleTemplate: '<span class="number">#index#</span> #title#',
    labels: {
      current: "",
      finish: 'Submit',
      previous: 'Back'
    },
    onFinished: function(event, currentIndex) {
      alert("Form Submitted Successfully!");
    }
  });

})(jQuery);


function submitTemplate() {
    $('#finalize_btn').show()
}
