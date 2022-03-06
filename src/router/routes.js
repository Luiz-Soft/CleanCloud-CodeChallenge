export default [
    /*{
        path: "*",
        name: "notfound",
        component: () => import("../Views/NotFound"),
        meta:{
            title: "Página não encontrada"
        }
    },*/
    {
        path: '/:cep?',
        name:"home",
        component:()=> import("../Views/Home/Home"),
        props: (route) => ({
            cep: route.params.cep,
          }),
        meta:{
            title: "CleanCloud-Challenge",
        }
    },

]