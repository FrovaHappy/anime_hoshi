export function canSendMessage({ inAwait, settings, currentTime }) {
    const maxRemittedDisabled = settings.maxRemitted === 0;
    const lengthPagesInvalid = inAwait.pastLengthPages >= inAwait.anime.namePages.length;
    if (lengthPagesInvalid)
        return false;
    if (maxRemittedDisabled)
        return true;
    const canRemitted = settings.maxRemitted < inAwait.cantRemitted;
    const minPagesForSend = settings.minPages <= inAwait.anime.namePages.length;
    const delayExpired = inAwait.created + settings.delay <= currentTime;
    if (!canRemitted)
        return false;
    if (minPagesForSend)
        return true;
    return delayExpired;
}
