// export default router
/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from "vue";
// import VueAnalytics from 'vue-analytics'
import Router from "vue-router";
// import Meta from 'vue-meta'

// Routes
import paths from "./path";

function route(options) {
    let path = options.path;
    let view = options.view;
    let name = options.name;
    let meta = options.meta ? options.meta : "";
    let children = options.children ? options.children : null;
    let redirect = options.redirect ? options.redirect : null;
    let currentRoute = {
        name: name || view,
        path,
        meta,
        component: resovle => import(`../views/${view}.vue`).then(resovle)
    };
    if (children && Array.isArray(children)) {
        children = children.map(path => {
            path.view = view + "/" + path.view;
            return path;
        });
        currentRoute["children"] = children.map(path => route(path));
    }
    if (redirect) {
        currentRoute["redirect"] = redirect;
    }
    return currentRoute;
}

Vue.use(Router);

// Create a new router
const router = new Router({
    mode: "history",
    routes: paths
        .map(path => route(path))
        .concat([{ path: "*", redirect: "admin/home" }]),

    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        if (to.hash) {
            return { selector: to.hash };
        }
        return { x: 0, y: 0 };
    }
});

// Vue.use(Meta)

import { TokenService } from "@/services/storage.services.js";

router.beforeEach((to, from, next) => {
    const isPublic = to.matched.some(record => record.meta.public);
    const loggedIn = !!TokenService.getToken();

    let currentUser = JSON.parse(localStorage.getItem("user"));
    let isAdmin = currentUser ? !!currentUser.is_admin : false;

    if (!isPublic && !loggedIn) {
        if (router.currentRoute.name === "main-home") {
            return;
        } else {
            return router.push({ name: "main-home" });
        }
    }


    if (to.path.toLowerCase().startsWith('/admin') && !isAdmin) {
        if (router.currentRoute.name === "main-home") {
            return;
        } else {
            return router.push({ name: "main-home" });
        }
    }


    next();
});

export default router;
