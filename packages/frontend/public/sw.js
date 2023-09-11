import DBLocal from './sw_modules/DBLocal.js';
import { updateNotifications } from './sw_modules/updateNotifications.js';
import { filterNotifications } from './sw_modules/filterNotifications.js';
function stringToObject(s) {
    try {
        const object = JSON.parse(s);
        return object;
    }
    catch {
        return null;
    }
}
function buildMessage(inAwait) {
    const title = `Ep. ${inAwait.anime.episode} de: ${inAwait.anime.title}`;
    const namePages = inAwait.anime.namePages;
    const lastNamePages = namePages.pop() ?? '';
    const body = `En: ${namePages.join(', ')}${namePages.length === 0 ? '' : ' y '}${lastNamePages}.`;
    const options = {
        body,
        icon: inAwait.anime.image,
        data: inAwait.anime
    };
    return { title, options };
}
self.addEventListener('push', async (e) => {
    const data = e.data?.json();
    const currentTime = Date.now();
    const notificationsSettings = stringToObject((await DBLocal.get('notifications'))?.value);
    if (!notificationsSettings) {
        console.error('Notifications not found in IndexedDB');
        return;
    }
    let notificationsInAwait = stringToObject((await DBLocal.get('notificationsInAwait'))?.value) ?? [];
    notificationsInAwait = updateNotifications({
        currentTime,
        inAwaits: notificationsInAwait,
        pushes: data,
        settings: notificationsSettings
    });
    const { forSend, retained } = filterNotifications({
        inAwaits: notificationsInAwait,
        currentTime,
        settings: notificationsSettings
    });
    await DBLocal.set('notificationsInAwait', JSON.stringify([...forSend, ...retained]));
    for await (const inAwait of forSend) {
        const message = buildMessage(inAwait);
        await self.registration.showNotification(message.title, message.options);
    }
});
// ON CLICK NOTIFICATION ********************************
self.addEventListener('notificationclick', event => {
    event.notification.close();
    const url = '/?id=' + `${event.notification.data.id}`;
    event.waitUntil((async () => {
        await self.clients.openWindow(url);
    })());
});
