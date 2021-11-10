const env = require('dotenv').config();

export default {
	env: env.parsed,
    target: 'server',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Selar Test',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', href: '/logo.png' },
      { rel: 'stylesheet', href:"https://fonts.googleapis.com/icon?family=Material+Icons"},
      { rel: 'stylesheet', href:"/vendors/iconic-fonts/font-awesome/css/all.min.css"},

      /////////ICONIC FONTS
      { rel: 'stylesheet', href:"/vendors/iconic-fonts/cryptocoins/cryptocoins.css"},
      { rel: 'stylesheet', href:"/vendors/iconic-fonts/flat-icons/flaticon.css"},
      { rel: 'stylesheet', href:"/vendors/iconic-fonts/cryptocoins/cryptocoins-colors.css"},

      ////////////BOOTSTRAP CORE CSS
      { rel: 'stylesheet', href:"/assets/css/bootstrap.min.css"},

      //////////JQUERY UI
      { rel: 'stylesheet', href:"/assets/css/jquery-ui.min.css"},

      //////PAGE SPECIFIC CSS (SLICK SLIDER CSS)
      { rel: 'stylesheet', href:"/assets/css/slick.css"},

      ///////MAIN CSS
      { rel: 'stylesheet', href:"/assets/css/style.css"},
    ],
    script: [
      /////GLOBAL REQUIRED SCRIPT
      { src: "/assets/js/jquery-3.3.1.min.js", body: true, async: true, defer: true },
      { src: "/assets/js/popper.min.js", body: true, async: true, defer: true },
      { src: "/assets/js/bootstrap.min.js", body: true, async: true, defer: true },
      { src: "/assets/js/perfect-scrollbar.js", body: true, async: true, defer: true },
      { src: "/assets/js/jquery-ui.min.js", body: true, async: true, defer: true },


      /////PAGE SPECIFIC SCRIPT
      { src: "/assets/js/moment.j", body: true, async: true, defer: true },
      { src: "/assets/js/jquery.webticker.min.js", body: true, async: true, defer: true },
      { src: "/assets/js/Chart.bundle.min.js", body: true, async: true, defer: true },
      { src: "/assets/js/Chart.Financial.js", body: true, async: true, defer: true },
      { src: "/assets/js/table-line.js", body: true, async: true, defer: true },
      { src: "/assets/js/index-chart.js", body: true, async: true, defer: true },

      { src: "/assets/js/d3.v3.min.js", body: true, async: true, defer: true },
      { src: "/assets/js/topojson.v1.min.js", body: true, async: true, defer: true },
      { src: "/assets/js/datamaps.all.min.js", body: true, async: true, defer: true },
      { src: "/assets/js/index-map.js", body: true, async: true, defer: true },

      //////CORE JAVASCRIPT
      { src: "/assets/js/framework.js", body: true, async: true, defer: true },
      { src: "/assets/js/settings-map.js", body: true, async: true, defer: true },
    ]
  },

  server: {
    port: 3000,
    host: '0.0.0.0',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-content-placeholder.js' },
    { src: '~/plugins/vue-tables-2.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'vue-sweetalert2/nuxt'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: env.API_URL,
  },

  auth: {

    redirect: {
      login: '/login',
      logout: false,
      callback: false,
      home: false
    },

    localStorage: false,
    cookie: {
        options: {
            expires: 7
        }
    },

    strategies: {
        local: {
            endpoints: {
                login: { url: '/auth/login', method: 'post', propertyName: 'access_token' },
                logout: { url: '/auth/logout', method: 'post', propertyName: '' },
                user: { url: '/user/profile', method: 'get', propertyName: '' }
            },
            tokenRequired: true,
            tokenType: 'Bearer',
            //tokenName: 'Authorization',
        }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
}
