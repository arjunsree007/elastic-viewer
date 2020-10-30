export const MODAL_OPEN = "MODAL_OPEN";
export const MODAL_CLOSE = "MODAL_CLOSE";

export function openModal(){
    return {
        type: MODAL_OPEN,
        payload: true
    }
}

export function closeModal(){
    return {
        type: MODAL_CLOSE,
        payload: false
    }
}
