import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/seal',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'seal',
        component: () => import('@/views/seal/index'),
        meta: { title: '印章鉴定', icon: 'el-icon-s-check' }
      }
    ]
  },

  {
    path: '/shufa',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'shufa',
        component: () => import('@/views/shufa/index'),
        meta: { title: '书法鉴定', icon: 'el-icon-document' }
      }
    ]
  },

  {
    path: '/personal',
    component: Layout,
    redirect: '/personal/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/personal/index'),
        name: 'PersonalManagement',
        meta: { title: '个人信息管理', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/datasource',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'dataSource',
        component: () => import('@/views/datasource/index'),
        meta: {
          title: '数据源管理',
          icon: 'el-icon-setting',
          roles: ['superadmin']
        }
      }
    ]
  },

  {
    path: '/management',
    component: Layout,
    redirect: '/management/client',
    alwaysShow: true, // will always show the root menu
    name: 'Management',
    meta: {
      title: '用户管理',
      icon: 'el-icon-s-custom',
      roles: ['superadmin', 'admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'admin',
        component: () => import('@/views/management/admin'),
        name: 'adminManagement',
        meta: {
          title: '用户信息管理(super)',
          roles: ['superadmin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'client',
        component: () => import('@/views/management/client'),
        name: 'clientManagement',
        meta: {
          title: '用户信息管理(admin)',
          roles: ['admin']
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
