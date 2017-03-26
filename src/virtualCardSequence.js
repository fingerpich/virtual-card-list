class VirtualCardSequence{
    constructor(getItemAtIndex) {
        this.container = {
            rect: [],
            minIndex: 0,
            maxIndex: 'infinite',
        };
        this.cardsPosotion=[];
        this.window = {
            rect: [],
        };
        this.getItemRect = () => {};
        this.getItemAtIndex=getItemAtIndex;
        this.scrollChange = (scroll) => {
            // do We Need to load something new or remove things
        };
        this.changeCardSize = () => {};//overided scoll event || container scroll event

    }
    //TODO: add divs and work with them and styles affect on this div and app divs and they can have animate on origin div get ready
    //TODO: it just set position according to element in here and virtual Card sequence add the offset
    calculateCardRect() {
        const col=Math.min(this.maxColumn,Math.floor(this.size/this.childMinWidth));
        const width=this.size[0];
        const elementWidth=width/col;
        const colsElements=[];
        const colsTop=this.getColsTop(col);
        let index=this.startIndex;
        const elPos=this.elementPosition;
        let smallestCol=this.getSmallestCol(colsTop);
        while(this.needToLoadMore(colsTop[smallestCol])){
            if(!elPos[index])elPos[index]={};
            const eliPos=elPos[index];

            eliPos.top = colsTop[smallestCol];
            eliPos.left = smallestCol * elementWidth;
            eliPos.width = elementWidth;
            eliPos.height = getElementHeight?getElementHeight(index):this.childAvgSize;
            colsTop[smallestCol]+=eliPos.height;
            index++;
            smallestCol=this.getSmallestCol(colsTop);
        }
        return this.elementPosition;
    }
}
export default VirtualCardSequence;