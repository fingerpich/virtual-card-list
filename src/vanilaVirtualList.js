import VirtualCardList from './virtualCardList';

class VanilaVirtualList{
    constructor(element,options){
        const scrollContainer = document.createElement('div');
        scrollContainer.style.cssText="position:relative;overflow:auto;";
        element.appendChild(scrollContainer);

        const cardsContainer = document.createElement('div');
        cardsContainer.style.cssText="position:absolute;";
        scrollContainer.appendChild(cardsContainer);
    }
}