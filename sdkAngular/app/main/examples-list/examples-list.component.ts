import { Component, OnInit } from "angular2/core";
import { ObservableArray } from "data/observable-array";
import { ExampleItem } from "../exampleItem";
import { ExampleItemService } from "../exampleItemService.service";
import { Router, RouteParams } from "angular2/router";

@Component({
    selector: "examples",
    templateUrl: "main/examples-list/examples-list.component.html",
    styleUrls: ["main/examples-list/examples-list.component.css"]
})
export class ExamplesListComponent implements OnInit {
    private _currentExample: ExampleItem;
    private _hasBack;

    constructor(private _router: Router, private _routeParams: RouteParams, private _exampleItemsService: ExampleItemService) {

    }

    ngOnInit() {
        var parentTitle = this._routeParams.get('parentTitle');
        var tappedTitle = this._routeParams.get('tappedTitle');
        this._currentExample = this._exampleItemsService.getChildExampleItem(parentTitle, tappedTitle);
    }

    public get currentExample(): ExampleItem {
        return this._currentExample;
    }

    public set currentExample(value: ExampleItem) {
        this._currentExample = value;
    }

    public onNavigationItemTap(args) {
        var itemIndex = args.itemIndex;
        var tappedItem = this._currentExample.subItems[itemIndex];
        this._router.navigate([tappedItem.path]);
    }
}