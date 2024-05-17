import { createRouter, createWebHistory } from 'vue-router';
import landingPage from './views/ladingPage.vue';
import blogPage from './views/blogPage.vue';
import petList from './views/petList.vue';
import petProfile from './views/petProfile.vue';
import petRegister from './views/petRegister.vue';
import contacter from './views/contacter.vue';
import signUp from './views/auth/signUp.vue';
import logIn from './views/auth/logIn.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: landingPage,
      },
      {
        path: '/blog',
        component: blogPage,
      },
      {
        path: '/pets',
        component: petList,
      },
      {
        path: '/pets/:id',
        component: petProfile,
        props: true,
      },
      {
        path: '/register',
        component: petRegister,
      },
      {
        path: '/contacter',
        component: contacter,
      },
      {
        path: '/signUp',
        component: signUp,
      },
      {
        path: '/logIn',
        component: logIn,
      }
    ],
  }
);

export default router