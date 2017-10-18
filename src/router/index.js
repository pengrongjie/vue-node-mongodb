import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/client/index'
import Index_list from '../views/client/index_list'
import Datail from '../views/client/detail'

import Admin from '../views/admin/admin'
import Admin_index from '../views/admin/admin_index'

import Admin_users from '../views/admin/admin_users'

import Admin_category from '../views/admin/admin_category'
import Admin_category_add from '../views/admin/admin_category_add'
import Admin_category_update from '../views/admin/admin_category_update'

import Admin_article from '../views/admin/admin_article'
import Admin_article_add from '../views/admin/admin_article_add'
import Admin_article_update from '../views/admin/admin_article_update'
import Admin_article_comment from '../views/admin/admin_article_comment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/',
          name: 'Index_list',
          component: Index_list
        },
        {
          path:'/detail',
          name: 'Datail',
          component: Datail
        }
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: '/admin',
          name: 'Admin_index',
          component: Admin_index
        },
        {
          path: '/admin_users',
          name: 'Admin_users',
          component: Admin_users
        },
        {
          path: '/admin_category',
          name: 'Admin_category',
          component: Admin_category
        },
        {
          path: '/admin_category_add',
          name: 'Admin_category_add',
          component: Admin_category_add
        },
        {
          path: '/admin_category_update',
          name: 'Admin_category_update',
          component: Admin_category_update
        },
        {
          path: '/admin_article',
          name: 'Admin_article',
          component: Admin_article
        },
        {
          path: '/admin_article_add',
          name: 'Admin_article_add',
          component: Admin_article_add
        },
        {
          path: '/admin_article_update',
          name: 'Admin_article_update',
          component: Admin_article_update
        },
        {
          path: '/admin_article_comment',
          name: 'Admin_article_comment',
          component: Admin_article_comment
        },
      ]
    }
  ]
})
