<template>
    <div>
        <body class="ms-body ms-aside-left-open ms-primary-theme ">
            <!-- Preloader -->
              

              <!-- Overlays -->
              <div class="ms-aside-overlay ms-overlay-left ms-toggler" data-target="#ms-side-nav" data-toggle="slideLeft"></div>
              <div class="ms-aside-overlay ms-overlay-right ms-toggler" data-target="#ms-recent-activity" data-toggle="slideRight"></div>
            <Nuxt />
            <BackToTop />
        </body>
    </div>
</template>

<script>

export default {
    components: {
        
    },

    computed: {
        //...mapState(["page_title"]),
    },
};
</script>
