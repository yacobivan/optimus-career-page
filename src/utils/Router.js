import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// Layouts
import LoginLayout from '../views/_layouts/LoginLayout';
import SinglePageAppLayout from '../views/_layouts/SinglePageAppLayout';

// Pages
import JobList from '../views/job/JobList';
import JobDetail from '../views/job/JobDetail';

const router = new VueRouter({
    mode: 'hash',
    routes: [
      {
        path: '',
        name: 'SinglePageAppLayout',
        component: SinglePageAppLayout,
        children: [
          {
            path: 'jobs',
            name: 'Jobs',
            component: JobList,
            meta: {
              title: 'Job List'
            }
          },
          {
            path: 'jobs/:id',
            name: 'JobDetail',
            component: JobDetail,
            meta: {
              title: 'Job Detail'
            }
          },
          {
            path: '*',
            redirect: '/jobs'
          }
        ]
      },
      {
        path: '/login',
        name: 'LoginLayout',
        component: LoginLayout
      },
      {
        path: '*',
        redirect: '/home'
      }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router