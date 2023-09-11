export function updateNotifications({ inAwaits, pushes, currentTime, settings }) {
    pushes.forEach(push => {
        const index = inAwaits.findIndex(inAwait => inAwait.anime.id === push.id);
        if (index === -1) {
            inAwaits.push({
                cantRemitted: 0,
                expireIn: currentTime + settings.expireIn,
                created: currentTime,
                anime: push,
                pastLengthPages: 0
            });
            return;
        }
        const currentInAwait = inAwaits[index];
        currentInAwait.anime = push;
        inAwaits.splice(index, 1, currentInAwait);
    });
    return inAwaits;
}
