import { canSendMessage } from './canSendMessage.js';
export function filterNotifications({ inAwaits, settings, currentTime }) {
    const forSend = [];
    const retained = [];
    inAwaits.forEach(inAwait => {
        if (inAwait.expireIn <= currentTime)
            return;
        if (canSendMessage({ inAwait, settings, currentTime })) {
            inAwait.pastLengthPages = inAwait.anime.namePages.length;
            inAwait.cantRemitted += 1;
            forSend.push(inAwait);
        }
        else {
            retained.push(inAwait);
        }
    });
    return { forSend, retained };
}
