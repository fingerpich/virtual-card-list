// import VirtualCardList from '../virtualCardList';
class VanilaVirtualList{
    constructor(element,options,dataProvider){
        this.dataProvider=dataProvider||function(index){
            return {
                content:index,
                className:"item",
            }
        };
        this.scrollContainer = document.createElement('div');
        this.scrollContainer.style.cssText="position:relative;overflow:auto;";
        element.appendChild(this.scrollContainer);

        this.cardsContainer = document.createElement('div');
        this.cardsContainer.style.cssText="position:absolute;";
        this.scrollContainer.appendChild(this.cardsContainer);
    }
    //this method could override
    cardGenerator({content,className}){
        const card = document.createElement('div');
        card.className=className;
        card.innerText=content;
        card.style.cssText="position:absolute;width:50px;height:50px;border:1px solid silver";
        this.cardsContainer.appendChild(card);
    }
    startIndex=0;
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