HTMLElement.prototype.removeAllChildren = function() {
    while (this.lastChild) {
        this.removeChild(this.lastChild);
    }
}