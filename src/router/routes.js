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
        path: "/",
        name:"home",
        component:()=> import("../Views/Home/Home"),
        meta:{
            title: "Recomend.me",
        }
    }
]