import VirtualCardList from '../virtualCardList';

class VanilaVirtualList{
    constructor(parentElement,dataProvider,scrollElement) {
        this.dataProvider = dataProvider || function (index) {
                return {
                    content: index,
                    className: "item",
                }
            };
        this.scrollContainer = scrollElement || parentElement;

        this.cardsContainer = document.createElement('div');
        this.cardsContainer.style.cssText="position:relative;";
        parentElement.appendChild(this.cardsContainer);
        this.virtualList=new VirtualCardList({
            layout: {ltsm: "col", gtsm: "row"},
            startIndex: 0,
            size: {width:this.scrollContainer.width,height:this.scrollContainer.height}
        });
        this.startIndex=0;

        this.scrollContainer.onscroll = (scrollTop) => {
            this.virtualList.setScroll(scrollTop);
        }
    }
    //this method could override
    cardGenerator({content,className}){
        const card = document.createElement('div');
        card.className=className;
        card.innerText=content;
        card.style.cssText="position:absolute;width:50px;height:50px;border:1px solid silver";
        this.cardsContainer.appendChild(card);
    }

    generateCards(){
        let i=this.startIndex;
        while(this.needToLoadMore(i)) {
            this.cardGenerator(this.dataProvider(i));
            i++;
        }
    }

    needToLoadMore(index){
        if(index-this.startIndex<20){
            return true;
        }
        return false;
    }
}
export default VanilaVirtualList;