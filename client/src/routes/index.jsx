const routeNames = {
    /** Private Routes */
    'home.users.create': '/home/users/create',
    'home.users.show': '/home/users/:username',
    'home.users.edit': '/home/users/:username/edit',
    'home.users.index': '/home/users',
    'home.user-likes.index': '/home/user-likes',
    'home.streams.index': '/home/streams',
    'home.blocks.index': '/home/blocks',
    'home.restricts.index': '/home/restricts',
    'home.livestreams.index': '/home/livestreams',
    'home.posts.edit': '/home/posts/:id/edit',
    'home.posts.index': '/home/posts',
    'home.post-comments.edit': '/home/post-comments/:id/edit',
    'home.post-comments.index': '/home/post-comments',
    'home.bookmarks.index': '/home/bookmarks',
    'home.subscriptions.edit': '/home/subscriptions/:id/edit',
    'home.subscriptions.index': '/home/subscriptions',
    'home.tips.edit': '/home/tips/:id/edit',
    'home.tips.index': '/home/tips',
    'home.wallet.index': '/home/wallet',
    'home.cards.edit': '/home/cards/:id/edit',
    'home.cards.index': '/home/cards',
    'home.chats.show': '/home/chats/:id',
    'home.chats.index': '/home/chats',
    'home.notifications.edit': '/home/notifications/:id/edit',
    'home.notifications.index': '/home/notifications',
    'home.stats.index': '/home/stats',
    'home.my-profile': '/home/my-profile',
    'home.index': '/home',

    /** Public Routes */
    'create-account': '/create-account',
    'reset-password-request': '/reset-password-request',
    'reset-password': '/reset-password/:email/:token',
    'passwordless-signin-request': '/passwordless-signin-request',
    'passwordless-signin': '/passwordless-signin/:username/:token',
    'index': '/',
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