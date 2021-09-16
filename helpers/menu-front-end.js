const getFrontendMenu = (role = "USER_ROLE") => {
  const menu = [
    {
      title: "Dashboard",
      icon: "mdi mdi-gauge",
      submenu: [
        { title: "Main", url: "/" },
        { title: "Progress bar", url: "progress" },
        { title: "Gráfica", url: "grafica1" },
        { title: "Promesas", url: "promises" },
        { title: "RxJs", url: "rxjs" },
      ],
    },
    {
      title: "Mantenimiento",
      icon: "mdi mdi-folder-lock-open",
      submenu: [
        // { title: "Usuarios", url: "users" },
        { title: "Hospitales", url: "hospitals" },
        { title: "Médicos", url: "medics" },
      ],
    },
  ];

  if (role === "ADMIN_ROLE") {
    menu[1].submenu.unshift({ title: "Usuarios", url: "users" });
  }

  return menu;
};

module.exports = {
  getFrontendMenu,
};
