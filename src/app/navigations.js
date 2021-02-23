export const navigations = [
  {
    name: "Inicio",
    path: "/Inicio",
    icon: "home_icon",
  },
  // {
  //   name: "LSS",
  //   path: "/lss",
  //   icon: "content_paste",
  //   badge: { value: "New", color: "secondary" },
  // },
  { 
    name: "Reembolso Educativo",
    icon: "attach_money_icon",
    path: "/ReembolsoEducativo/ListaReembolsos",
  },
  {
    name: "Growth Opportunities",
    path: "/growth-opportunities",
    icon: "content_paste",
  },
  { 
    name: "Venta de Activos",
    icon: "laptop",
    display: "none",
    children:[
    {
      name: "Ventas Home",
      path: "/VentasHome",
      iconText: "AC",
      display: "none"
    },
    {
      name: "Administración Campaña",
      path: "/Ventas/Campaign",
      iconText: "AC",
      display: "none"
    },
    {
      name: "Administración Inventario",
      path: "/Ventas/Inventario",
      iconText: "AI",
      display: "none"
    },
    {
      name: "Consulta de Compras",
      path: "/Ventas/Compras",
      iconText: "CC",
      display: "none"
    },
    {
      name: "Consulta sobre Artículos Comprados",
      path: "/Ventas/ComprasItems",
      iconText: "CC",
      display: "none",
    },
    ]
     
  },
  {
    name: "Raft",
    path: "/Raft",
    icon: "person_add_alt_1",
    display: null
  },
  
];
