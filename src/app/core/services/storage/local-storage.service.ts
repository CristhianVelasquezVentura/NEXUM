import {Injectable} from "@angular/core";
import {StorageBase} from "@app/core/services/storage/storage.base";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService extends StorageBase {
    constructor() {
        super(window.localStorage);
    }
}

