
var DocumentView = (function (_super) {
    function DocumentView() {
        var _this = _super.call(this) || this;
        var page = 1;
        return _this;
    }
    DocumentView.prototype.componentWillMount = function (page) {
        $.getJSON("http://localhost/api/" + page, function (result) {
            console.log("API WAS CALLED %s", documents);
            var documentstoload = result[documents];
        });
    };
    DocumentView.prototype.htmlgenerate = function (loadingdocuments) {
        for (var i = 0; i < loadingdocuments.length; i++) {
            return this.htmlgenerateindividual(loadingdocuments[i]);
        }
    };
    DocumentView.prototype.htmlgenerateindividual = function (documentid) {
        return "<div class='documentplace' documentid='" + documentid + "' />";
    };
    DocumentView.prototype.render = function () {
        return (React.createElement("section", null,
            React.createElement("container", null,
                React.createElement("row", null,
                    React.createElement("div", { class: "col-md-12" },
                        React.createElement("ul", { class: "list-group" }, this.htmlgenerate(this.documentstoload)))))));
    };
    return DocumentView;
}(React.Component));
ReactDOM.render(React.createElement(DocumentView, null), document.querySelector(".documentview"));
