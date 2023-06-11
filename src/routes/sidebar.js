/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/patients', // the url
    icon: 'PeopleIcon', // the component being exported from icons/index.js
    name: 'Pacientes', // name that appear in Sidebar
  },
  {
    path: '/app/questions', // the url
    icon: 'QuestionIcon', // the component being exported from icons/index.js
    name: 'Preguntas', // name that appear in Sidebar
  },
{
  path: '/app/answers', // the url
  icon: 'FormsIcon', // the component being exported from icons/index.js
  name: 'Respuestas', // name that appear in Sidebar
},
  {
    path: '/app/profiles',
    icon: 'HomeIcon',
    name: 'Perfil',
  },
  /*{
    path: '/app/cards',
    icon: 'CardsIcon',
    name: 'Cards',
  },
  {
    path: '/app/charts',
    icon: 'ChartsIcon',
    name: 'Charts',
  },
  {
    path: '/app/buttons',
    icon: 'ButtonsIcon',
    name: 'Buttons',
  },
  {
    path: '/app/modals',
    icon: 'ModalsIcon',
    name: 'Modals',
  },
  {
    path: '/app/tables',
    icon: 'TablesIcon',
    name: 'Tables',
  },
  {
    icon: 'PagesIcon',
    name: 'Pages',
    routes: [
      // submenu
      {
        path: '/login',
        name: 'Login',
      },
      {
        path: '/create-account',
        name: 'Create account',
      },
      {
        path: '/forgot-password',
        name: 'Forgot password',
      },
      {
        path: '/app/404',
        name: '404',
      },
      {
        path: '/app/blank',
        name: 'Blank',
      },
    ],
  },*/
]

export default routes
