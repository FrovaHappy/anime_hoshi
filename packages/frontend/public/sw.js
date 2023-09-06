import DBLocal from './sw_modules/DBLocal.js';
// MODULE FORMATTED
function stringToObject(s) {
    try {
        const object = JSON.parse(s);
        return object;
    }
    catch {
        return null;
    }
}
// MODULE MAIN ****************************************************************
function canSendMessage(inAwait, notificationSetting, currentTime) {
    const delayExpired = inAwait.created + notificationSetting.delay <= currentTime;
    const minPagesEnabled = notificationSetting.minPages !== 0;
    const maxRemittedEnabled = notificationSetting.maxRemitted !== 0;
    const lengthPagesValid = inAwait.pastLengthPages < inAwait.anime.namePages.length;
    const rangeOfRemitted = notificationSetting.maxRemitted >= inAwait.cantRemitted;
    const rangeOfMinPages = notificationSetting.minPages <= inAwait.anime.namePages.length;
    console.log({ lengthPagesValid, maxRemittedEnabled, rangeOfRemitted, minPagesEnabled, delayExpired, rangeOfMinPages });
    if (!lengthPagesValid)
        return false;
    if (!maxRemittedEnabled)
        return true;
    if (!rangeOfRemitted)
        return false;
    if (delayExpired || (minPagesEnabled && rangeOfMinPages))
        return true;
    console.warn({ message: 'caso no controlado', inAwait, notificationSetting });
    return false;
}
/**
 * @param {import('../../types/Payloads').PayloadAnimeNof[]} push
 * @param {import('../types').NotificationInAwait} inAwaitCollection
 * @param {number} expireIn
 * @param {number} currentTime
 */
function addInAwaitToCollection(push, inAwaitCollection, expireIn, currentTime) {
    for (const anime of push) {
        let inAwait = inAwaitCollection.find(notification => notification.anime.id === anime.id);
        inAwaitCollection = inAwaitCollection.filter(notification => notification.anime.id !== anime.id);
        inAwait = {
            anime,
            cantRemitted: inAwait?.cantRemitted ?? 0,
            created: inAwait?.created ?? currentTime,
            expireIn: inAwait?.expireIn ?? currentTime + expireIn,
            pastLengthPages: inAwait?.anime.namePages.length ?? 0
        };
        inAwaitCollection.push(inAwait);
    }
    console.log(inAwaitCollection);
    return inAwaitCollection;
}
/**
 * @param {import('../types').InAwait} inAwait
 */
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
    /** @type {import('../../types/Payloads').PayloadAnimeNof[]} */
    const data = e.data.json();
    /** @type {import('../types').NotificationsInAired} */
    const notificationsSettings = stringToObject((await DBLocal.get('notifications'))?.value);
    if (!notificationsSettings) {
        console.error('Notifications not found in IndexedDB');
        return;
    }
    let notificationsInAwait = stringToObject((await DBLocal.get('notificationsInAwait'))?.value) ?? [];
    const currentTime = Date.now();
    notificationsInAwait = notificationsInAwait.filter(notification => notification.expireIn > currentTime);
    notificationsInAwait = addInAwaitToCollection(data, notificationsInAwait, notificationsSettings.expireIn, currentTime);
    const newInAwaitCollections = [];
    for await (const inAwait of notificationsInAwait) {
        if (!canSendMessage(inAwait, notificationsSettings, currentTime)) {
            newInAwaitCollections.push(inAwait);
            continue;
        }
        inAwait.cantRemitted += 1;
        newInAwaitCollections.push(inAwait);
        const message = buildMessage(inAwait);
        await self.registration.showNotification(message.title, message.options);
    }
    await DBLocal.set('notificationsInAwait', JSON.stringify(newInAwaitCollections));
});
// ON CLICK NOTIFICATION ********************************
self.addEventListener('notificationclick', event => {
    event.notification.close();
    const url = '/?id=' + `${event.notification.data.id}`;
    event.waitUntil((async () => {
        await self.clients.openWindow(url);
    })());
});
