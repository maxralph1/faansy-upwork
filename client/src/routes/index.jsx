const routeNames = {
    /** Public Routes */
    'index': '/',
    'create-account': '/create-account',

    /** Private Routes */
    'home': '/home',
    'home.posts.index': '/home/posts',
    'home.posts.create': '/home/posts/create',
    'home.posts.show': '/home/posts/show',
    'home.posts.edit': '/home/posts/edit',
}

function route(name, params = {}) {
    let url = routeNames[name]

    for (let prop in params) {
        if (Object.prototype.hasOwnProperty.call(params, prop)) {
            url = url.replace(`:${prop}`, params[prop])
        }
    }

    return url;
}

export { route }