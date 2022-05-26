module.exports = {
  theme: {
    extend: {
      flexGrow: {
        'spacer': 1
      },
      colors: {
        card: '#898574',
      },
      backgroundImage: {
        main:        "url('~assets/menus/Main.png')",
        card:        "url('~assets/menus/Card.png')",
        panel_small: "url('~assets/menus/Panel_Small.png')",
        panel_large: "url('~assets/menus/Panel_Large.png')",
        sidebar:     "url('~assets/menus/Sidebar.png')",
        sidebar_top:     "url('~assets/menus/Sidebar_Top.png')",
        sidebar_bot:     "url('~assets/menus/Sidebar_Bot.png')",
        searchbar:   "url('~assets/menus/Searchbar.png')"
      }, fontFamily: { genshin: ['Genshin'], },
      backgroundSize: {
        '100%': '100%',
      },
      backgroundColor: {
        sidebar_clr: '#ede5d8'
      },
      width: {
        big_card: "432px",
        small_card: "432px",
        sidebar_header: "400px",
        sidebar_footer: "400px"
      },
      height: {
        big_card: "212px",
        small_card: "143px",
        sidebar_header: "38px",
        sidebar_footer: "26px"
      }
    }
  },
  variants: {},
  plugins: []
}