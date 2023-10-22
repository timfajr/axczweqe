const state = {
    selected_shape: {},
    selected_features : {},
    data : [],
    personal_series : [],
    statistik: {},
    statistik_wilayah: {},
    status : "global"
  }
  // getters
  const getters = {
        total_data: (state) => {
          return state.data
        },
        loadstatistik: (state) => {
          return state.statistik
        },
        loadstatistikwilayah: (state) => {
          return state.statistik_wilayah
        },
        loadselectedfeature: (state) => {
          return state.selected_features
        },
        loadselectedselected_shape: (state) => {
          return state.selected_shape
        },
  }
  
  // actions
  const actions = {

    addItem ({ state, commit }, map) {
        if ( map ) {
        const DataItem = state.data.find( item => item.name === map.name )
        if (!DataItem) {
          commit('pushData', {  })
          } 
        } 
    },

    addPoint ({ state, commit }, map) {
      if ( map ) {
        const PointItem = state.selected_features.name
        if ( !PointItem ) {
          commit('pushPoint', { name : map.name , canvaser: map.canvaser , catatan : map.catatan , memilih : map.memilih , mesjid : map.mesjid , tokoh : map.tokoh })
        }
        else if ( PointItem ) {
          commit('ClearData', 'point')
          commit('pushPoint', { name : map.name , canvaser: map.canvaser , catatan : map.catatan , memilih : map.memilih , mesjid : map.mesjid , tokoh : map.tokoh })
        } 
      }
    },

    addShape ({ state, commit }, map) {
      if ( map ) {
      const ShapeItem = state.selected_shape.kota
      if ( !ShapeItem ) {
        commit('pushShape', { kota : map.kota, mayoritas : map.mayoritas , total_suara : map.total_suara, total_suara_manual : map.total_suara_manual, ragu : map.ragu ,jokowi : map.jokowi, prabowo : map.prabowo, hoax_y : map.hoax_y, hoax_t : map.hoax_t , hoax_r : map.hoax_r})
      }
      else if ( ShapeItem ) {
        commit('ClearData', 'shape')
        commit('pushShape', { ragu : map.ragu ,kota : map.kota, mayoritas : map.mayoritas , total_suara : map.total_suara, total_suara_manual : map.total_suara_manual, jokowi : map.jokowi, prabowo : map.prabowo, hoax_y : map.hoax_y, hoax_t : map.hoax_t , hoax_r : map.hoax_r})
      } 
    }
    },

    addStatistik ({ state, commit }, map) {
      if ( map ) {
        const PointItem = state.statistik.Ragu
        if ( !PointItem ) {
          commit('pushStatistik', { "Ragu" : map.Ragu , "Jokowi" : map.Jokowi, "Prabowo" : map.Prabowo , "TotalSuara" : map.TotalSuara, "Y_hoax" : map.Y_hoax ,"T_hoax" : map.T_hoax , "pro" : map.pro, "t_pro" : map.t_pro , "Radikal" : map.Radikal })
        }
        else if ( PointItem ) {
          commit('ClearData', 'statistik')
          commit('pushStatistik', { "Ragu" : map.Ragu , "Jokowi" : map.Jokowi, "Prabowo" : map.Prabowo , "TotalSuara" : map.TotalSuara, "Y_hoax" : map.Y_hoax ,"T_hoax" : map.T_hoax , "pro" : map.pro, "t_pro" : map.t_pro , "Radikal" : map.Radikal })
        } 
      }
    },

    addStatistikWilayah ({ state, commit }, map) {
      if ( map ) {
        const PointItem = state.statistik.Ragu
        if ( !PointItem ) {
          commit('pushStatistikWilayah', { "Ragu" : map.Ragu , "Jokowi" : map.Jokowi, "Prabowo" : map.Prabowo , "TotalSuara" : map.TotalSuara, "Y_hoax" : map.Y_hoax ,"T_hoax" : map.T_hoax , "pro" : map.pro, "t_pro" : map.t_pro , "Radikal" : map.Radikal })
        }
        else if ( PointItem ) {
          commit('ClearData', 'statistik')
          commit('pushStatistikWilayah', { "Ragu" : map.Ragu , "Jokowi" : map.Jokowi, "Prabowo" : map.Prabowo , "TotalSuara" : map.TotalSuara, "Y_hoax" : map.Y_hoax ,"T_hoax" : map.T_hoax , "pro" : map.pro, "t_pro" : map.t_pro , "Radikal" : map.Radikal })
        } 
      }
    },

    addPersonal ({commit}, map) {
      commit('pushPersonal', map)
    },

    // Update Next ( must be array )
    cacheShapeData ({ state, commit }, map) {
      if ( map ) {
      const DataItem = state.data.find( item => item.kota === map.kota )
      if ( !DataItem ) {
        commit('pushShape', { })
        } 
    }
    },

    clearPoint (commit) {
      commit('ClearData', 'point')
    },

    clearShape (commit) {
      commit('ClearData', 'shape')
    },

    clearData (commit) {
      commit('ClearData', 'data')
    },

    clearAll (commit) {
      commit('ClearData', 'all')
    },

    resetStatus (commit) {
      commit('setStatus', 'global')
    },
  }
  
  // mutations
  const mutations = {
      initialiseStore(state) {
          if( localStorage.getItem('vuex.shape' )) {
              let shape = JSON.parse(localStorage.getItem('vuex.shape'));
              state.selected_shape = shape
          }
          if( localStorage.getItem('vuex.feature' )) {
              let feature = JSON.parse(localStorage.getItem('vuex.feature'));
              state.selected_features = feature
          }
          if( localStorage.getItem('vuex.data' )) {
            let data = JSON.parse(localStorage.getItem('vuex.data'));
            state.data = data
          }
          if( localStorage.getItem('vuex.Status' )) {
            let status = JSON.parse(localStorage.getItem('vuex.Status'));
            state.status = status
          }
          if ( localStorage.getItem('vuex.statistik') )
          {
            let statistikdata = JSON.parse(localStorage.getItem('vuex.statistik'));
            state.statistik = statistikdata
          }
          if ( localStorage.getItem('vuex.statistik_wilayah') )
          {
            let statistikdatawilayah = JSON.parse(localStorage.getItem('vuex.statistik_wilayah'));
            state.statistik_wilayah = statistikdatawilayah
          }
      },
  
      pushPoint (state, { name , canvaser , catatan , memilih , mesjid , tokoh }) {
          state.selected_features = { name , canvaser , catatan , memilih , mesjid , tokoh }
          localStorage.setItem('vuex.feature', JSON.stringify(state.selected_features));
      },

      pushPersonal (state, data) {
        state.personal_series = [data]
      },

      pushStatistik (state, { Ragu , Jokowi, Prabowo , TotalSuara, Y_hoax , T_hoax , pro, t_pro , Radikal }) {
        state.statistik = { Ragu , Jokowi, Prabowo , TotalSuara, Y_hoax , T_hoax , pro, t_pro , Radikal }
        localStorage.setItem('vuex.statistik', JSON.stringify(state.statistik));
      },

      pushStatistikWilayah (state, { Ragu , Jokowi, Prabowo , TotalSuara, Y_hoax , T_hoax , pro, t_pro , Radikal }) {
        state.statistik_wilayah = { Ragu , Jokowi, Prabowo , TotalSuara, Y_hoax , T_hoax , pro, t_pro , Radikal }
        localStorage.setItem('vuex.statistik', JSON.stringify(state.statistik_wilayah));
      },

      pushShape (state, { kota , mayoritas , total_suara , total_suara_manual , ragu ,jokowi , prabowo , hoax_y ,hoax_t , hoax_r }) {
        state.selected_shape = { kota , mayoritas , total_suara , ragu, total_suara_manual , jokowi , prabowo , hoax_y ,hoax_t , hoax_r }
        localStorage.setItem('vuex.shape', JSON.stringify(state.selected_shape));
      },

      ClearData (state , type) {
        if ( type == "shape" ){
          state.selected_shape = {}
          state.status = "global"
          localStorage.setItem('vuex.shape', JSON.stringify(state.selected_Shape));
          localStorage.setItem('vuex.Status', JSON.stringify(state.status));
        }
        else if ( type == "point" )
        {
          state.selected_features = {}
          localStorage.setItem('vuex.feature', JSON.stringify(state.selected_features));
        }
        else if ( type == "data")
        {
          state.data = []
          localStorage.setItem('vuex.data', JSON.stringify(state.data));
        }
        else if ( type == "statistik")
        {
          state.statistik = {}
          localStorage.setItem('vuex.statistik', JSON.stringify(state.statistik));
        }
        else if ( type == "all")
        {
          state.selected_shape = {}
          state.selected_features = {}
          state.statistik = {}
          state.data = []
          state.status = "global"
          localStorage.setItem('vuex.shape', JSON.stringify(state.selected_Shape));
          localStorage.setItem('vuex.Status', JSON.stringify(state.selected_features));
          localStorage.setItem('vuex.feature', JSON.stringify(state.selected_features));
          localStorage.setItem('vuex.data', JSON.stringify(state.data));
          localStorage.setItem('vuex.statistik', JSON.stringify(state.statistik));
        }
      },

      setStatistik (state, { items }) {
        state.statistik = items
        localStorage.setItem('vuex.statistik', JSON.stringify(state.statistik));
      },

      setData (state, { items }) {
          state.data = items
          localStorage.setItem('vuex.data', JSON.stringify(state.data));
      },

      setStatus (state, status) {
          state.status = status
          localStorage.setItem('vuex.Status', JSON.stringify(state.status));
      }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }