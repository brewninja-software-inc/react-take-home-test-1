// noinspection SpellCheckingInspection

export function generateUUID(): string { // Public Domain/MIT
    let now = new Date().getTime();//Timestamp
    let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let n  = Math.random() * 16;//random number between 0 and 16
        if(now > 0){
            //Use timestamp until depleted
            n = (now + n)%16 | 0;
            now = Math.floor(now/16);
        } else {
            //Use microseconds since page-load if supported
            n = (d2 + n)%16 | 0;
            d2 = Math.floor(d2/16);
        }

        // eslint-disable-next-line no-mixed-operators
        return (c === 'x' ? n : (n & 0x3 | 0x8)).toString(16);
    });
}
